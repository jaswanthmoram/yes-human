#!/usr/bin/env node
process.on('unhandledRejection', (reason) => {
  console.error(`[yes-human] Unhandled rejection: ${reason?.message || reason}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[yes-human] Uncaught exception: ${err.message}`);
  process.exit(1);
});

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../yes-runtime/router.js';
import { checkAgentPromotion } from '../../validators/promotion.validator.js';
import { proposeRouteProposal } from '../yes-runtime/learning-propose.js';
import { DreamCycle } from '../yes-runtime/dream-cycle.js';
import { MemoryManager } from '../yes-runtime/memory-manager.js';
import { YesEvaluator } from '../yes-runtime/yes-evaluator.js';
import { YesTrainer } from '../yes-runtime/yes-trainer.js';
import { WorkflowMiner } from '../yes-runtime/workflow-miner.js';
import { WorkflowOrchestrator } from '../yes-workflows/index.js';
import { OfflineRecovery } from '../yes-runtime/offline-recovery.js';
import { loadBuildContext, buildHost, buildAll } from '../yes-adapters/index.js';
import { validateHostBundle } from '../../validators/host-bundle.validator.js';
import { CodeGraph } from '../yes-graph/index.js';
import { buildPlanCard, appendEpisodicOutcome } from '../yes-runtime/lib/plan-card.js';
import { buildContextPack, readGraphRoutingConfig, isGraphStale } from '../yes-runtime/lib/code-graph-assist.js';
import * as absorber from '../yes-absorber/index.js';
import { copySkillsFromStaging } from '../yes-absorber/copy-skills.js';
import { runPlan } from '../yes-runtime/spawner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function runScript(relativeScript, extraArgs = []) {
  const result = spawnSync('node', [path.join(repoRoot, relativeScript), ...extraArgs], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
  return result.status ?? 1;
}

function readJSON(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function readJSONSafe(relativePath, fallback = null) {
  try {
    return readJSON(relativePath);
  } catch {
    return fallback;
  }
}

function stripFlags(args, flags) {
  return args.filter((arg) => !flags.has(arg));
}

function estimateTextTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

function resolveAgentPath(agentId) {
  const parts = String(agentId || '').split('.');
  if (parts.length < 2) return null;
  return path.join(repoRoot, 'content', 'agents', parts[0], `${parts.slice(1).join('.')}.md`);
}

function lookupAgent(agentId) {
  const agents = readJSONSafe('registry/agents.json', { items: [] });
  return agents.items?.find((agent) => agent.id === agentId || agent.agent_id === agentId) || null;
}

function estimateAgentTokens(agentId) {
  const agentPath = resolveAgentPath(agentId);
  if (!agentPath || !fs.existsSync(agentPath)) return 0;
  return estimateTextTokens(fs.readFileSync(agentPath, 'utf8'));
}

function traceDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

function traceDir() {
  return process.env.YES_TRACE_DIR || path.join(repoRoot, 'staging', 'traces');
}

function appendRunTrace(trace) {
  const dir = traceDir();
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${traceDate()}.jsonl`);
  trace.trace_file = file;
  fs.appendFileSync(file, `${JSON.stringify(trace)}\n`);
  return file;
}

function buildHookTrace(route) {
  const preRoute = route._hooks?.pre_route || [];
  const combined = preRoute.find((item) => item.hook === 'hook.pre-route.budget-safety')?.result || {};
  const blocked = route._match?.stage === 'blocked';

  return {
    pre_route: {
      budget: {
        status: blocked && route._match?.blocked_by === 'budget' ? 'blocked' : 'allowed',
        estimated_tokens: combined.estimated_tokens ?? null
      },
      safety: {
        status: blocked && route._match?.blocked_by === 'safety' ? 'blocked' : 'allowed',
        reason: blocked ? (route._match?.reason ?? null) : null
      },
      signal_words: {
        status: combined.routing_hint ? 'hinted' : 'none',
        words: combined.signal_words || [],
        route_hint: combined.routing_hint?.routeId || null
      },
      loop_prevention: {
        status: blocked && route._match?.blocked_by === 'loop-prevention' ? 'blocked' : 'allowed'
      },
      persona: {
        status: combined.active_persona ? 'applied' : 'none',
        active_persona: combined.active_persona || null
      },
      raw_hooks: preRoute.map((item) => ({
        hook: item.hook,
        allowed: item.result?.allowed ?? null,
        blocked: item.result?.blocked ?? false
      }))
    },
    post_route: (route._hooks?.post_route || []).map((item) => ({
      hook: item.hook,
      status: item.result?.allowed === false ? 'blocked' : 'ok'
    }))
  };
}

function buildRunTrace({ task, route, agentTokens, maxTokens }) {
  const target = route.target || {};
  const agent = lookupAgent(target.agent);
  const disclaimerGateFired = Boolean(agent?.requires_disclaimer || agent?.human_review_gate);

  return {
    event: 'yes.run.trace',
    created_at: new Date().toISOString(),
    input: task,
    matched_route: {
      route_id: route.route_id,
      stage: route._match?.stage ?? 'unknown',
      confidence: route._match?.confidence ?? null,
      reason: route._match?.reason ?? null
    },
    selected_agent: target.agent ?? null,
    domain_master: target.domain_master ?? null,
    workflow: target.workflow ?? null,
    budget_band: route.budget_band ?? 'micro',
    estimated_tokens: {
      agent: agentTokens,
      max_context: maxTokens
    },
    hook_chain: buildHookTrace(route),
    disclaimer_gate_fired: disclaimerGateFired,
    human_review_gate: Boolean(agent?.human_review_gate),
    trace_file: null
  };
}

function flagValue(args, name, fallback = null) {
  const idx = args.indexOf(name);
  if (idx < 0) return fallback;
  return args[idx + 1] ?? fallback;
}

function boolFlag(args, name, fallback = false) {
  const value = flagValue(args, name, null);
  if (value === null) return args.includes(name) ? true : fallback;
  return ['1', 'true', 'yes', 'pass', 'passed', 'success'].includes(String(value).toLowerCase());
}

async function cmdRoute(args) {
  const dryRun = args.includes('--dry-run');
  const showHints = args.includes('--hints');
  const showPlan = args.includes('--plan');
  const ROUTE_FLAGS = new Set(['--dry-run', '--hints', '--plan']);
  const task = args
    .filter((a) => !ROUTE_FLAGS.has(a))
    .join(' ')
    .trim();
  if (!task) {
    console.error('Usage: yes route <task> [--dry-run] [--hints] [--plan]');
    return 1;
  }
  let route;
  try {
    route = await resolveRoute(task);
  } catch (err) {
    console.error(`✗ Routing failed: ${err.message}`);
    return 1;
  }
  if (dryRun) {
    const target = route.target || {};
    const band = route.budget_band ?? 'micro';
    let maxTokens = null;
    try {
      const costPolicy = readJSON('registry/cost-policy.json');
      maxTokens = costPolicy.bands?.[band]?.max_context_tokens ?? null;
    } catch {
      /* ignore */
    }
    const match = route._match || {};
    const card = {
      task,
      route_id: route.route_id,
      domain_master: target.domain_master ?? null,
      agent: target.agent ?? null,
      skills: target.skills ?? [],
      workflow: target.workflow ?? null,
      budget_band: band,
      max_context_tokens: maxTokens,
      match_stage: match.stage ?? 'unknown',
      confidence: match.confidence ?? null,
      why: match.reason ?? (route.route_id?.startsWith('route.meta-system') ? 'fallback' : 'matched route table')
    };
    if (showHints && route.routing_hints) card.routing_hints = route.routing_hints;
    if (showPlan) card.plan = buildPlanCard(repoRoot, route);
    const grCfg = readGraphRoutingConfig(repoRoot);
    if (grCfg.code_graph_assist) {
      const pack = buildContextPack(repoRoot, task, grCfg);
      if (pack.length) card.context_pack = pack;
    }
    appendEpisodicOutcome(repoRoot, { task, route_id: route.route_id, dry_run: true });
    console.log(JSON.stringify(card, null, 2));
  } else {
    console.log(JSON.stringify(route, null, 2));
  }
  return 0;
}

function cmdDoctor() {
  const checks = [];
  const add = (ok, label, detail = '') => checks.push({ ok, label, detail });

  // Node version
  const major = Number(process.versions.node.split('.')[0]);
  add(major >= 20, `Node >= 20`, `found ${process.versions.node}`);

  // Python + MarkItDown
  const venvPython = path.join(repoRoot, '.venv', 'bin', 'python');
  const python =
    process.env.YES_PYTHON && fs.existsSync(process.env.YES_PYTHON)
      ? process.env.YES_PYTHON
      : fs.existsSync(venvPython)
        ? venvPython
        : 'python3';
  const mk = spawnSync(python, ['-c', 'import markitdown'], { encoding: 'utf8' });
  add(mk.status === 0, 'MarkItDown installed', mk.status === 0 ? python : `not importable for ${python}`);

  // Schemas load
  let schemaCount = 0;
  try {
    schemaCount = fs
      .readdirSync(path.join(repoRoot, 'packages/yes-schema/schemas'))
      .filter((f) => f.endsWith('.json')).length;
  } catch {
    /* ignore */
  }
  add(schemaCount > 0, 'Schemas present', `${schemaCount} schema files`);

  // Route table resolves to routes.json
  let routesOk = false;
  let routeDetail;
  try {
    const table = readJSON('graph/indexes/ROUTE_TABLE.min.json');
    const routes = readJSON('registry/routes.json');
    const ids = new Set(routes.map((r) => r.route_id));
    const missing = Object.values(table.routes).filter((id) => !ids.has(id));
    routesOk = missing.length === 0 && ids.has(table.fallback);
    routeDetail = routesOk
      ? `${Object.keys(table.routes).length} hot routes resolve`
      : `unresolved: ${missing.join(', ') || table.fallback}`;
  } catch (e) {
    routeDetail = e.message;
  }
  add(routesOk, 'Route table resolves', routeDetail);

  // Registry counts
  let countsOk = true;
  const countDetail = [];
  for (const name of ['agents', 'skills', 'workflows', 'categories', 'category-packs']) {
    try {
      const reg = readJSON(`registry/${name}.json`);
      const match = reg.count === reg.items.length;
      countsOk = countsOk && match;
      countDetail.push(`${name}:${reg.items.length}${match ? '' : '!'}`);
    } catch {
      countsOk = false;
      countDetail.push(`${name}:err`);
    }
  }
  add(countsOk, 'Registry counts match', countDetail.join(' '));

  // Code graph staleness
  try {
    const grCfg = readGraphRoutingConfig(repoRoot);
    const stale = isGraphStale(repoRoot, grCfg);
    add(!stale.stale, 'Code graph fresh', stale.stale ? stale.reason || 'stale' : `built ${stale.built_at || 'ok'}`);
  } catch (e) {
    add(false, 'Code graph check', e.message);
  }

  // Connector env vars (profile-scoped enabled MCPs only)
  try {
    const mcps = readJSON('registry/mcps.json');
    const profiles = readJSON('registry/connector-profiles.json');
    const profileName = process.env.YES_CONNECTOR_PROFILE || profiles.default_profile || 'minimal';
    const enableSet = new Set(profiles.profiles?.[profileName]?.enable || []);
    const missing = [];
    for (const item of mcps.items || []) {
      if (!item.enabled || !item.env_var) continue;
      if (enableSet.size && !enableSet.has(item.id)) continue;
      if (!process.env[item.env_var]) missing.push(item.env_var);
    }
    add(
      missing.length === 0,
      `MCP env vars (profile: ${profileName})`,
      missing.length ? `missing: ${missing.join(', ')}` : 'all set for profile'
    );
  } catch (e) {
    add(false, 'MCP env check', e.message);
  }

  // RBAC policy
  try {
    const rbac = readJSON('registry/rbac.json');
    add(Boolean(rbac.default_role && rbac.roles), 'RBAC policy', `default_role: ${rbac.default_role || 'none'}`);
  } catch (e) {
    add(false, 'RBAC policy', e.message);
  }

  // Retention policy
  try {
    const retention = readJSON('registry/retention-policy.json');
    add(
      Boolean(retention.default_mode && retention.policies),
      'Retention policy',
      `mode: ${retention.default_mode || 'none'}`
    );
  } catch (e) {
    add(false, 'Retention policy', e.message);
  }

  try {
    const profiles = readJSON('registry/connector-profiles.json');
    add(Boolean(profiles.default_profile), 'Connector profiles', profiles.default_profile || 'none');
  } catch (e) {
    add(false, 'Connector profiles', e.message);
  }

  console.log('yes doctor\n');
  for (const c of checks) {
    console.log(`${c.ok ? '✓' : '✗'} ${c.label}${c.detail ? ` — ${c.detail}` : ''}`);
  }
  const allOk = checks.every((c) => c.ok);
  console.log(`\n${allOk ? '✓ All checks passed.' : '✗ Some checks failed.'}`);
  return allOk ? 0 : 1;
}

function cmdPromote(args) {
  if (args[0] !== '--check' || !args[1]) {
    console.error('Usage: yes promote --check <agent-id> [--gate production|staging]');
    return 1;
  }
  const agentId = args[1];
  const gateIdx = args.indexOf('--gate');
  const targetGate = gateIdx >= 0 ? args[gateIdx + 1] : 'production';
  let result;
  try {
    result = checkAgentPromotion(repoRoot, agentId, { targetGate });
  } catch (err) {
    console.error(`✗ Promotion check failed: ${err.message}`);
    return 1;
  }
  console.log(`promotion check: ${agentId} (gate: ${targetGate})\n`);
  for (const w of result.warnings) console.log(`⚠ ${w}`);
  if (result.allowed) {
    console.log(`✓ eligible for ${targetGate}`);
    return 0;
  }
  for (const b of result.blockers) console.log(`✗ ${b}`);
  console.log(`\n✗ blocked from ${targetGate}`);
  return 1;
}

async function cmdDream(args) {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });

  console.log('Starting dream cycle...\n');

  try {
    const result = await dream.run();

    console.log(`\n✓ Dream cycle complete`);
    console.log(`  Candidates staged: ${result.candidates.length}`);
    console.log(`  Report: ${result.report}`);

    // Show summary by type
    const byType = {};
    for (const candidate of result.candidates) {
      byType[candidate.type] = (byType[candidate.type] || 0) + 1;
    }

    console.log('\n  Summary:');
    for (const [type, count] of Object.entries(byType)) {
      console.log(`    ${type}: ${count}`);
    }

    return 0;
  } catch (error) {
    console.error(`✗ Dream cycle failed: ${error.message}`);
    return 1;
  }
}

function cmdMemory(args) {
  const subcommand = args[0];
  const memory = new MemoryManager();

  if (subcommand === 'status') {
    let stats;
    try {
      stats = memory.getStats();
    } catch (err) {
      console.error(`✗ Memory stats failed: ${err.message}`);
      return 1;
    }

    console.log('Memory Status\n');
    console.log(`  Working memory:`);
    console.log(`    Files: ${stats.working.count}`);
    console.log(`    Size: ${formatBytes(stats.working.size)}`);

    console.log(`\n  Episodic memory:`);
    console.log(`    Entries: ${stats.episodic.count}`);
    console.log(`    Size: ${formatBytes(stats.episodic.size)}`);

    console.log(`\n  Semantic memory:`);
    console.log(`    Lessons: ${stats.semantic.count}`);
    console.log(`    Size: ${formatBytes(stats.semantic.size)}`);

    console.log(`\n  Personal memory:`);
    console.log(`    Preferences: ${stats.personal.count}`);
    console.log(`    Size: ${formatBytes(stats.personal.size)}`);

    const totalSize = stats.working.size + stats.episodic.size + stats.semantic.size + stats.personal.size;
    console.log(`\n  Total: ${formatBytes(totalSize)}`);

    return 0;
  }

  if (subcommand === 'clear') {
    const confirm = args.includes('--confirm');

    if (!confirm) {
      console.error('Usage: yes memory clear --confirm');
      console.error('Warning: This will delete all memory files!');
      return 1;
    }

    try {
      memory.clearAll();
    } catch (err) {
      console.error(`✗ Memory clear failed: ${err.message}`);
      return 1;
    }
    console.log('✓ All memory cleared');
    return 0;
  }

  if (subcommand === 'archive') {
    let archived;
    try {
      archived = memory.archiveWorkingMemory();
    } catch (err) {
      console.error(`✗ Memory archive failed: ${err.message}`);
      return 1;
    }
    console.log(`✓ Archived ${archived} working memory entries to episodic`);
    return 0;
  }

  console.error('Usage: yes memory <status|clear|archive>');
  return 1;
}

function cmdEvaluator(args) {
  const evaluator = new YesEvaluator({ repoRoot });
  const sub = args[0] || 'status';

  if (sub === 'status') {
    try {
      console.log(JSON.stringify(evaluator.status(), null, 2));
    } catch (err) {
      console.error(`✗ Evaluator status failed: ${err.message}`);
      return 1;
    }
    return 0;
  }

  if (sub === 'trace') {
    const task = flagValue(
      args,
      '--task',
      args
        .slice(1)
        .filter((a) => !a.startsWith('--'))
        .join(' ')
        .trim()
    );
    const routeId = flagValue(args, '--route', 'route.meta-system.supreme-router');
    const success = boolFlag(args, '--success', true);
    let result;
    try {
      result = evaluator.trace({
        task,
        route_id: routeId,
        workflow_id: flagValue(args, '--workflow', null),
        tenant_id: flagValue(args, '--tenant', null),
        host: flagValue(args, '--host', 'cli'),
        success,
        failure_class: flagValue(args, '--failure-class', null),
        duration_ms: Number(flagValue(args, '--duration-ms', 0))
      });
    } catch (err) {
      console.error(`✗ Evaluator trace failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return 0;
  }

  if (sub === 'outcome') {
    const routeId = flagValue(args, '--route', null);
    if (!routeId) {
      console.error('Usage: yes evaluator outcome --route <route-id> --success <true|false> [--trace <trace-id>]');
      return 1;
    }
    let result;
    try {
      result = evaluator.outcome({
        trace_id: flagValue(args, '--trace', null),
        route_id: routeId,
        workflow_id: flagValue(args, '--workflow', null),
        success: boolFlag(args, '--success', true),
        score: Number(flagValue(args, '--score', boolFlag(args, '--success', true) ? 1 : 0)),
        source: flagValue(args, '--source', 'manual'),
        feedback: flagValue(args, '--feedback', null),
        failure_class: flagValue(args, '--failure-class', null),
        suggested_route: flagValue(args, '--suggested-route', null),
        tenant_id: flagValue(args, '--tenant', null)
      });
    } catch (err) {
      console.error(`✗ Evaluator outcome failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return 0;
  }

  if (sub === 'gate') {
    const checks = flagValue(args, '--checks', 'route,workflow,skill,cost')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    let result;
    try {
      result = evaluator.gate(checks);
    } catch (err) {
      console.error(`✗ Evaluator gate failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return result.passed ? 0 : 1;
  }

  console.error('Usage: yes evaluator <status|trace|outcome|gate>');
  return 1;
}

function cmdTrainer(args) {
  const trainer = new YesTrainer({ repoRoot });
  const sub = args[0] || 'report';

  if (sub === 'report') {
    try {
      const result = trainer.report();
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Trainer report failed: ${err.message}`);
      return 1;
    }
  }

  if (sub === 'suggest' || sub === 'suggest-workflows') {
    try {
      const result = trainer.suggestWorkflows();
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Trainer suggest failed: ${err.message}`);
      return 1;
    }
  }

  console.error('Usage: yes trainer <report|suggest>');
  return 1;
}

function cmdFeedback(args) {
  const sub = args[0];
  const evaluator = new YesEvaluator({ repoRoot });
  const engine = evaluator.engine;

  if (sub === 'list') {
    try {
      console.log(JSON.stringify(engine.listFeedback(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Feedback list failed: ${err.message}`);
      return 1;
    }
  }

  if (sub === 'review') {
    const id = flagValue(args, '--id', null);
    const decision = flagValue(args, '--accept', null) ? 'accept' : flagValue(args, '--reject', null) ? 'reject' : null;
    if (!id || !decision) {
      console.error('Usage: yes feedback review --id <id> --accept|--reject [--skip-gate]');
      return 1;
    }
    try {
      const result = engine.reviewFeedback(id, decision, { run_gate: !args.includes('--skip-gate') });
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  if (sub === 'apply') {
    const id = flagValue(args, '--id', null);
    if (!id) {
      console.error('Usage: yes feedback apply --id <id> [--phrase "..."] [--write]');
      return 1;
    }
    try {
      const result = engine.applyFeedback(id, {
        dry_run: !args.includes('--write'),
        phrase: flagValue(args, '--phrase', null)
      });
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  if (sub === 'promote') {
    const id = flagValue(args, '--id', null);
    if (!id) {
      console.error('Usage: yes feedback promote --id <id>');
      return 1;
    }
    try {
      const result = engine.promoteFeedback(id);
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  const type = sub;
  if (!['accept', 'reject', 'partial', 'wrong-agent'].includes(type)) {
    console.error('Usage: yes feedback <list|review|apply|promote|accept|reject|partial|wrong-agent> ...');
    return 1;
  }
  let result;
  try {
    result = engine.stageFeedback({
      type,
      trace_id: flagValue(args, '--trace', null),
      route_id: flagValue(args, '--route', null),
      suggested_route: flagValue(args, '--suggested-route', null),
      note: flagValue(args, '--note', null),
      metadata: { source: 'cli', phrase: flagValue(args, '--phrase', null) }
    });
  } catch (err) {
    console.error(`✗ Feedback staging failed: ${err.message}`);
    return 1;
  }
  console.log(JSON.stringify(result, null, 2));
  return 0;
}

async function cmdWorkflow(args) {
  const sub = args[0];
  if (sub === 'suggest') {
    const miner = new WorkflowMiner({ repoRoot });
    try {
      const result = miner.suggest();
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Workflow suggest failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'run') {
    const workflowId = args[1];
    const dryRun = !args.includes('--execute');
    if (!workflowId || workflowId.startsWith('--')) {
      console.error('Usage: yes workflow run <workflow-id> [--dry-run] [--execute]');
      return 1;
    }
    const orchestrator = new WorkflowOrchestrator({ repoRoot, role: process.env.YES_ROLE || null });
    try {
      const result = await orchestrator.run(workflowId, { dryRun });
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Workflow run failed: ${err.message}`);
      return 1;
    }
  }
  console.error('Usage: yes workflow suggest | yes workflow run <workflow-id> [--execute]');
  return 1;
}

function cmdTeam(args) {
  const sub = args[0] || 'status';
  if (sub !== 'status') {
    console.error('Usage: yes team status');
    return 1;
  }
  let config;
  try {
    config = readJSON('registry/team-mode.json');
  } catch (err) {
    console.error(`✗ Failed to load team config: ${err.message}`);
    return 1;
  }
  const tenant = flagValue(args, '--tenant', process.env.YES_TENANT_ID || config.default_tenant);
  const project = flagValue(args, '--project', process.env.YES_PROJECT_ID || config.default_project || 'default');
  const evaluator = new YesEvaluator({ repoRoot });
  const trace = evaluator.engine.createTrace({
    task: 'tenant status probe',
    tenant_id: tenant,
    project_id: project,
    route_id: 'route.meta-system.supreme-router',
    success: true
  });
  console.log(
    JSON.stringify(
      {
        enabled: config.enabled,
        tenant_hash: trace.tenant_hash,
        project_hash: trace.project_hash,
        raw_tenant_stored: config.isolation?.hash_tenant_ids === false,
        raw_project_stored: config.isolation?.hash_project_ids === false,
        trace_base_dir: config.isolation?.base_dir,
        redaction: config.redaction
      },
      null,
      2
    )
  );
  return 0;
}

function cmdOffline(args) {
  const recovery = new OfflineRecovery({ repoRoot });
  const sub = args[0] || 'status';
  if (sub === 'status') {
    try {
      console.log(JSON.stringify(recovery.status(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline status failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'checkpoint') {
    const stage = flagValue(args, '--stage', args[1] || 'manual');
    try {
      console.log(JSON.stringify(recovery.checkpoint(stage, { source: 'cli' }), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline checkpoint failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'resume') {
    try {
      console.log(JSON.stringify(recovery.resume(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline resume failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'clear') {
    try {
      console.log(JSON.stringify(recovery.clear(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline clear failed: ${err.message}`);
      return 1;
    }
  }
  console.error('Usage: yes offline <status|checkpoint|resume|clear>');
  return 1;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// ── yes status ────────────────────────────────────────────────────────────────

function cmdStatus() {
  const j = (rel) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
    } catch {
      return null;
    }
  };
  const agents = j('registry/agents.json');
  const skills = j('registry/skills.json');
  const workflows = j('registry/workflows.json');
  const mcps = j('registry/mcps.json');
  const boot = fs.existsSync(path.join(repoRoot, 'packages/yes-schema/eval-cost.js'))
    ? (() => {
        try {
          return fs.readFileSync(path.join(repoRoot, 'YES_BOOT.md'), 'utf8').trim().split(/\s+/).length;
        } catch {
          return '?';
        }
      })()
    : '?';
  const sqliteExists = fs.existsSync(path.join(repoRoot, 'graph/indexes/yes.sqlite'));
  const personaFile = path.join(process.cwd(), '.yes-human-persona');
  const activePersona = fs.existsSync(personaFile) ? fs.readFileSync(personaFile, 'utf8').trim() : '(none)';
  const adaptersBuilt = ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'generic'].filter((h) =>
    fs.existsSync(path.join(repoRoot, 'generated', h))
  );

  console.log('yes-human status\n');
  console.log(`  Node           : ${process.versions.node}`);
  console.log(`  Boot tokens    : ~${boot} (target ≤180, hard cap 300)`);
  console.log(`  Active persona : ${activePersona}`);
  console.log(`  Code graph     : ${sqliteExists ? '✓ built' : '○ not built (run: yes graph build .)'}`);
  console.log(`  Agents         : ${agents?.count ?? '?'}`);
  console.log(`  Skills         : ${skills?.count ?? '?'}`);
  console.log(`  Workflows      : ${workflows?.count ?? '?'}`);
  console.log(`  Connectors     : ${mcps?.count ?? '?'}`);
  console.log(
    `  Adapter packs  : ${adaptersBuilt.length > 0 ? adaptersBuilt.join(', ') : '(none built — run: yes build all)'}`
  );
  return 0;
}

// ── yes agent ──────────────────────────────────────────────────────────────────

async function cmdAgent(args) {
  const { cmdAgent: delegate } = await import('./commands/agent.js');
  return await delegate(args, repoRoot);
}

// ── yes run ───────────────────────────────────────────────────────────────────

async function cmdRun(args) {
  const trace = args.includes('--trace');
  const execute = args.includes('--execute');
  const localExec = args.includes('--local');
  const localTools = args.includes('--local-tools');
  const RUN_FLAGS = new Set(['--dry-run', '--plan', '--trace', '--execute', '--local', '--local-tools']);
  const task = stripFlags(args, RUN_FLAGS).join(' ').trim();
  if (!task) {
    console.error('Usage: yes run "<task>" [--dry-run] [--trace] [--execute] [--local] [--local-tools]');
    return 1;
  }
  let route;
  try {
    route = await resolveRoute(task);
  } catch (err) {
    console.error(`✗ Routing failed: ${err.message}`);
    return 1;
  }
  const target = route.target || {};
  const band = route.budget_band ?? 'micro';
  let maxTokens = null;
  try {
    const cp = readJSON('registry/cost-policy.json');
    maxTokens = cp.bands?.[band]?.max_context_tokens ?? null;
  } catch {
    /* ignore */
  }

  // Load agent body for context size estimate
  const agentTokens = target.agent ? estimateAgentTokens(target.agent) : 0;

  if (trace) {
    const traceRecord = buildRunTrace({ task, route, agentTokens, maxTokens });
    appendRunTrace(traceRecord);
    console.error(JSON.stringify(traceRecord));
  }

  console.log('yes run — routing + context plan\n');
  console.log(`  Task           : ${task}`);
  console.log(`  Route          : ${route.route_id}`);
  console.log(
    `  Match stage    : ${route._match?.stage ?? 'unknown'} (confidence: ${route._match?.confidence ?? '?'})`
  );
  console.log(`  Domain master  : ${target.domain_master ?? '(none)'}`);
  console.log(`  Agent          : ${target.agent ?? '(none)'} (~${agentTokens} tokens)`);
  console.log(`  Workflow       : ${target.workflow ?? '(none)'}`);
  console.log(`  Budget band    : ${band} (max ${maxTokens?.toLocaleString() ?? '?'} tokens)`);
  console.log(`  Why            : ${route._match?.reason ?? 'unknown'}`);
  console.log('\n  Policy gates that apply:');
  console.log('    pre-route: budget + safety + loop-prevention');
  console.log('    pre-tool: tool-use policy');
  console.log('    pre-write: filesystem + privacy policy');
  if (route._match?.stage === 'fallback') {
    console.log('\n  ⚠ Fallback route — no specific agent matched this task.');
    console.log('    Add triggers to an agent or add a route fixture to improve coverage.');
  }

  if (execute || localExec || localTools) {
    const mode = localTools ? 'local-tools' : localExec ? 'local' : 'dry-run';
    const result = await runPlan({ task, route, mode, repoRoot });
    console.log('\n  Execution (' + mode + '):');
    console.log(JSON.stringify(result, null, 2));
  }
  return 0;
}

// ── yes persona ───────────────────────────────────────────────────────────────

function cmdPersona(args) {
  const sub = args[0];
  const personaFile = path.join(process.cwd(), '.yes-human-persona');
  const reg = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'personas.json'), 'utf8'));
    } catch {
      return { items: [] };
    }
  })();

  if (sub === 'set') {
    const personaId = args[1];
    if (!personaId) {
      console.error('Usage: yes persona set <persona-id>');
      return 1;
    }
    const found = reg.items.find((p) => p.persona_id === personaId);
    if (!found) {
      console.error(`Unknown persona: ${personaId}`);
      console.error(`Available: ${reg.items.map((p) => p.persona_id).join(', ')}`);
      return 1;
    }
    try {
      fs.writeFileSync(personaFile, personaId);
    } catch (err) {
      console.error(`✗ Failed to set persona: ${err.message}`);
      return 1;
    }
    console.log(`✓ Persona set to: ${found.name} (${personaId})`);
    console.log(`  Default domain : ${found.default_domain}`);
    console.log(`  Budget bias    : ${found.budget_bias}`);
    if (found.disclaimer_level && found.disclaimer_level !== 'none') {
      console.log(`  ⚠ Disclaimer level: ${found.disclaimer_level}`);
    }
    return 0;
  }

  if (sub === 'clear') {
    try {
      if (fs.existsSync(personaFile)) fs.rmSync(personaFile);
    } catch (err) {
      console.error(`✗ Failed to clear persona: ${err.message}`);
      return 1;
    }
    console.log('✓ Persona cleared');
    return 0;
  }

  if (!sub || sub === 'list') {
    const active = fs.existsSync(personaFile) ? fs.readFileSync(personaFile, 'utf8').trim() : null;
    console.log(`Available personas (${reg.items.length}):\n`);
    for (const p of reg.items) {
      const marker = p.persona_id === active ? ' ← active' : '';
      console.log(`  ${p.persona_id.padEnd(22)} ${p.name}${marker}`);
    }
    if (active) console.log(`\nActive: ${active}`);
    else console.log('\n(no active persona — routing is unbiased)');
    return 0;
  }

  console.error(`Unknown persona subcommand: ${sub}. Try: yes persona list | set <id> | clear`);
  return 1;
}

// ── yes version ───────────────────────────────────────────────────────────────

function cmdVersion(args) {
  const sub = args[0];
  const ledgerPath = path.join(repoRoot, 'registry', 'version-ledger.json');
  let ledger;
  try {
    ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : { entries: [] };
  } catch (err) {
    console.error(`✗ Failed to read version ledger: ${err.message}`);
    return 1;
  }

  if (!sub || sub === 'list') {
    const artifactId = args[1];
    const entries = artifactId ? ledger.entries.filter((e) => e.artifact_id === artifactId) : ledger.entries.slice(-20);
    if (entries.length === 0) {
      console.log(
        artifactId ? `No version history for: ${artifactId}` : 'Version ledger is empty. Run `yes compile` to populate.'
      );
      return 0;
    }
    console.log(artifactId ? `Version history: ${artifactId}\n` : `Recent artifact versions (${entries.length}):\n`);
    for (const e of entries) {
      console.log(
        `  ${e.artifact_id.padEnd(40)} v${e.artifact_version}  ${e.artifact_type.padEnd(8)}  ${e.hash.slice(0, 8)}  ${e.recorded_at.slice(0, 10)}`
      );
    }
    return 0;
  }

  if (sub === 'diff') {
    const artifactId = args[1];
    if (!artifactId) {
      console.error('Usage: yes version diff <artifact-id> <v1> <v2>');
      return 1;
    }
    const v1 = args[2],
      v2 = args[3];
    const entries = ledger.entries.filter((e) => e.artifact_id === artifactId);
    const e1 = entries.find((e) => e.artifact_version === v1);
    const e2 = entries.find((e) => e.artifact_version === v2);
    if (!e1) {
      console.error(`Version ${v1} not found for ${artifactId}`);
      return 1;
    }
    if (!e2) {
      console.error(`Version ${v2} not found for ${artifactId}`);
      return 1;
    }
    console.log(`Diff ${artifactId}: v${v1} (${e1.hash.slice(0, 8)}) → v${v2} (${e2.hash.slice(0, 8)})`);
    console.log(`  Recorded: ${e1.recorded_at.slice(0, 16)} → ${e2.recorded_at.slice(0, 16)}`);
    if (e1.hash === e2.hash) console.log('  (no content change)');
    else console.log('  Content changed (hashes differ).');
    return 0;
  }

  if (sub === 'copy-skills') {
    const slug = args[1];
    if (!slug) {
      console.error('Usage: yes absorb copy-skills <slug> [--domain meta-system]');
      return 1;
    }
    const domainIdx = args.indexOf('--domain');
    const domain = domainIdx >= 0 ? args[domainIdx + 1] : 'meta-system';
    const changeIdx = args.indexOf('--change-id');
    const changeId = changeIdx >= 0 ? args[changeIdx + 1] : null;
    try {
      const r = copySkillsFromStaging(slug, { domain, maxFiles: 5, changeId });
      console.log(`✓ Copied ${r.copied.length} skill(s) from ${slug}`);
      for (const c of r.copied) console.log(`  ${c.skillId} → ${c.dest}`);
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'rollback') {
    const artifactId = args[1],
      version = args[2];
    const confirm = args.includes('--confirm');
    if (!artifactId || !version) {
      console.error('Usage: yes version rollback <artifact-id> <version> [--confirm]');
      return 1;
    }
    if (!confirm) {
      console.log(`Would rollback ${artifactId} to v${version}. Add --confirm to apply.`);
      console.log('This writes a rollback record to staging/rollback/.');
      return 0;
    }
    const rollback = {
      change_id: `version-rollback-${artifactId.replace(/\./g, '-')}-${version}-${Date.now()}`,
      created_at: new Date().toISOString(),
      reason: `version rollback ${artifactId} to v${version}`,
      files_added: [],
      files_modified: [],
      registry_entries_added: [],
      graph_edges_added: [],
      previous_hashes: {},
      rollback_command: `yes version rollback ${artifactId} ${version} --confirm`,
      safe_to_auto_rollback: false
    };
    const rollbackDir = path.join(repoRoot, 'staging', 'rollback');
    fs.mkdirSync(rollbackDir, { recursive: true });
    fs.writeFileSync(path.join(rollbackDir, `${rollback.change_id}.json`), JSON.stringify(rollback, null, 2));
    console.log(`✓ Rollback record written: staging/rollback/${rollback.change_id}.json`);
    console.log('  Review the record and manually restore the artifact to complete the rollback.');
    return 0;
  }

  console.error('Usage: yes version list [<artifact-id>] | diff <id> <v1> <v2> | rollback <id> <version> [--confirm]');
  return 1;
}

// ── yes contribute ────────────────────────────────────────────────────────────

function cmdLearning(args) {
  const sub = args[0];
  if (sub === 'propose-route') {
    const phraseIdx = args.indexOf('--phrase');
    const routeIdx = args.indexOf('--route');
    const phrase = phraseIdx >= 0 ? args[phraseIdx + 1] : null;
    const routeId = routeIdx >= 0 ? args[routeIdx + 1] : null;
    if (!phrase || !routeId) {
      console.error('Usage: yes learning propose-route --phrase "<text>" --route <route-id>');
      return 1;
    }
    try {
      const r = proposeRouteProposal(repoRoot, { phrase, route_id: routeId });
      console.log(JSON.stringify(r, null, 2));
      return 0;
    } catch (e) {
      console.error('✗ ' + e.message);
      return 1;
    }
  }
  console.error('Usage: yes learning propose-route --phrase "<text>" --route <route-id>');
  return 1;
}

function cmdContribute(args) {
  const kind = args[0]; // agent | skill
  const filePath = args[1];
  if (!kind || !filePath || !['agent', 'skill'].includes(kind)) {
    console.error('Usage: yes contribute agent <path> | yes contribute skill <path>');
    return 1;
  }
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    return 1;
  }

  let content;
  try {
    content = fs.readFileSync(absPath, 'utf8');
  } catch (err) {
    console.error(`✗ Failed to read file: ${err.message}`);
    return 1;
  }
  const slug = path.basename(absPath, path.extname(absPath));
  const stagingDir = path.join(repoRoot, 'staging', 'incoming', `contrib-${kind}-${slug}`);
  try {
    fs.mkdirSync(stagingDir, { recursive: true });
    fs.copyFileSync(absPath, path.join(stagingDir, path.basename(absPath)));
  } catch (err) {
    console.error(`✗ Failed to stage file: ${err.message}`);
    return 1;
  }

  // Basic validation
  const issues = [];
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!frontmatterMatch) issues.push('missing YAML frontmatter');
  else {
    if (!content.includes('triggers:')) issues.push('missing triggers field');
    if (!content.includes('quality_gate:')) issues.push('missing quality_gate field');
    if (!content.includes('source_references:')) issues.push('missing source_references field');
  }

  const manifest = {
    kind,
    slug,
    source_file: path.relative(repoRoot, absPath),
    staged_at: new Date().toISOString(),
    validation_issues: issues,
    decision: issues.length === 0 ? 'pending_review' : 'needs_fixes',
    next_steps:
      issues.length === 0
        ? [
            `Create references/<domain>/${slug}.sources.json dossier`,
            'Run: yes dossier validate <agent-id>',
            'Submit PR for human review'
          ]
        : issues.map((i) => `Fix: ${i}`)
  };
  fs.writeFileSync(path.join(stagingDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\nContribution staged: contrib-${kind}-${slug}`);
  console.log(`  File     : ${manifest.source_file}`);
  console.log(`  Decision : ${manifest.decision}`);
  if (issues.length > 0) {
    console.log('\n  Issues to fix:');
    for (const i of issues) console.log(`    ✗ ${i}`);
  } else {
    console.log('\n  Next steps:');
    for (const s of manifest.next_steps) console.log(`    → ${s}`);
  }
  return issues.length === 0 ? 0 : 1;
}

function cmdDossier(args) {
  if (args[0] !== 'validate' || !args[1]) {
    console.error('Usage: yes dossier validate <agent-id> [--gate production|staging]');
    return 1;
  }
  const agentId = args[1];
  const gateIdx = args.indexOf('--gate');
  const targetGate = gateIdx >= 0 ? args[gateIdx + 1] : 'production';
  let result;
  try {
    result = checkAgentPromotion(repoRoot, agentId, { targetGate });
  } catch (err) {
    console.error(`✗ Dossier validation failed: ${err.message}`);
    return 1;
  }
  let total = null;
  try {
    const p = path.join(
      repoRoot,
      'references',
      agentId.split('.')[0],
      `${agentId.split('.').slice(1).join('.')}.sources.json`
    );
    total = JSON.parse(fs.readFileSync(p, 'utf8')).scores?.total ?? null;
  } catch {
    /* ignore */
  }
  console.log(`dossier: ${agentId} (gate: ${targetGate})`);
  if (total !== null) console.log(`score: ${total}/100`);
  for (const w of result.warnings) console.log(`⚠ ${w}`);
  if (result.allowed) {
    console.log(`✓ dossier valid for ${targetGate}`);
    return 0;
  }
  for (const b of result.blockers) console.log(`✗ ${b}`);
  console.log(`\n✗ dossier not valid for ${targetGate}`);
  return 1;
}

// ── yes graph ─────────────────────────────────────────────────────────────────

const LARGE_REPO_FILE_THRESHOLD = 5000;
const DEFAULT_GRAPH_DB = 'graph/indexes/yes.sqlite';

function countCandidateFiles(repoPath) {
  const SKIP = new Set([
    'node_modules',
    '.git',
    '.venv',
    'venv',
    '__pycache__',
    'dist',
    'build',
    'target',
    '.next',
    '.nuxt',
    'coverage',
    '.cache',
    'generated'
  ]);
  const KNOWN_EXT = new Set([
    '.js',
    '.mjs',
    '.cjs',
    '.ts',
    '.tsx',
    '.jsx',
    '.py',
    '.go',
    '.rs',
    '.java',
    '.rb',
    '.md',
    '.json',
    '.yaml',
    '.yml',
    '.toml',
    '.sql'
  ]);
  let n = 0;
  (function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (SKIP.has(e.name) || e.name.startsWith('.git')) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && KNOWN_EXT.has(path.extname(e.name))) n++;
    }
  })(path.resolve(repoPath));
  return n;
}

async function cmdGraph(args) {
  const sub = args[0];

  if (sub === 'build') {
    const target = args[1] || '.';
    const force = args.includes('--yes') || args.includes('-y');
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);

    const candidateCount = countCandidateFiles(target);
    if (candidateCount > LARGE_REPO_FILE_THRESHOLD && !force) {
      console.error(
        `✗ Large repo detected (${candidateCount} candidate files > ${LARGE_REPO_FILE_THRESHOLD} threshold).`
      );
      console.error(`  Re-run with --yes to confirm: yes graph build ${target} --yes`);
      return 1;
    }

    console.log(`Building code graph for ${path.resolve(target)} → ${DEFAULT_GRAPH_DB}`);
    console.log(`Candidate files: ${candidateCount}`);
    const t0 = Date.now();
    let result;
    try {
      result = await CodeGraph.build(target, dbPath, {
        onProgress: (n, total) => process.stderr.write(`\r  indexed ${n}/${total}`)
      });
    } catch (err) {
      console.error(`✗ Graph build failed: ${err.message}`);
      return 1;
    }
    process.stderr.write('\n');
    const dt = ((Date.now() - t0) / 1000).toFixed(2);
    console.log(
      `✓ Indexed ${result.filesIndexed} files, ${result.symbols} symbols, ${result.imports} imports in ${dt}s`
    );
    return 0;
  }

  if (sub === 'stats') {
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);
    if (!fs.existsSync(dbPath)) {
      console.error('✗ No graph yet. Run: yes graph build <path>');
      return 1;
    }
    let brief;
    const graph = new CodeGraph(dbPath);
    try {
      brief = graph.briefing();
    } finally {
      graph.close();
    }
    console.log(`Repo: ${brief.repo_path}`);
    console.log(`Built: ${brief.built_at}`);
    console.log(`Files: ${brief.file_count} | Symbols: ${brief.symbol_count} | Imports: ${brief.import_count}\n`);
    console.log('Languages:');
    for (const r of brief.languages) console.log(`  ${r.language.padEnd(12)} ${r.n}`);
    console.log('\nSymbol kinds:');
    for (const r of brief.symbol_kinds) console.log(`  ${r.kind.padEnd(12)} ${r.n}`);
    return 0;
  }

  if (sub === 'query') {
    const query = args.slice(1).join(' ').trim();
    if (!query) {
      console.error('Usage: yes graph query "<symbol or path keyword>"');
      return 1;
    }
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);
    if (!fs.existsSync(dbPath)) {
      console.error('✗ No graph yet. Run: yes graph build <path>');
      return 1;
    }
    let hits;
    const graph = new CodeGraph(dbPath);
    try {
      hits = graph.search(query, { limit: 20 });
    } finally {
      graph.close();
    }
    if (hits.length === 0) {
      console.log('(no matches)');
      return 0;
    }
    console.log(`${hits.length} hit(s):\n`);
    for (const h of hits) {
      const loc = h.source === 'symbol' ? `${h.file}:${h.line}` : h.file;
      const label = h.source === 'symbol' ? `${h.kind} ${h.name}` : `file (${h.kind})`;
      console.log(`  ${loc.padEnd(60)} ${label}`);
    }
    return 0;
  }

  console.error('Usage: yes graph <build|stats|query>');
  return 1;
}

// ── yes absorb ────────────────────────────────────────────────────────────────

async function cmdAbsorb(args) {
  const sub = args[0];

  if (!sub || sub === 'help') {
    console.error('Usage:');
    console.error('  yes absorb stage <github-url | local-path>   Stage a source through the license gate');
    console.error(
      '  yes absorb apply <slug> [--promote]            Promote staged source; --promote copies into content/'
    );
    console.error(
      '  yes absorb list                              Show staged / promoted / rejected / rollback records'
    );
    console.error('  yes absorb copy-skills <slug> [--domain D]   Copy staged SKILL.md files into content/skills/');
    console.error('  yes absorb rollback <change-id>              Revert a promotion');
    return 1;
  }

  if (sub === 'stage') {
    const input = args[1];
    if (!input) {
      console.error('Usage: yes absorb stage <url-or-path>');
      return 1;
    }
    console.log(`Staging: ${input}\n`);
    try {
      const r = await absorber.stage(input);
      const m = r.manifest;
      console.log(`  slug         : ${r.slug}`);
      console.log(`  source       : ${m.source.kind} ${m.source.origin_url}`);
      console.log(`  commit/ver   : ${m.source.commit_or_version}`);
      console.log(`  license      : ${m.license.spdx ?? '(unknown)'} → ${m.license.decision}`);
      console.log(
        `  classification: ${m.classification.total_files} files (agents:${m.classification.agents}, skills:${m.classification.skills}, workflows:${m.classification.workflows}, commands:${m.classification.commands}, hooks:${m.classification.hooks})`
      );
      console.log(
        `  duplicates   : ${m.duplicates.exact_overlap_count} exact, ${m.duplicates.slug_collision_count} slug collisions`
      );
      console.log(`  manifest     : ${r.manifestPath}`);
      console.log(
        r.decision === 'staged'
          ? `\n✓ Staged. Review then run: yes absorb apply ${r.slug}`
          : `\n✗ Rejected: ${m.reason}`
      );
      return r.decision === 'staged' ? 0 : 1;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'apply') {
    const slug = args[1];
    const promote = args.includes('--promote');
    const domainArg = args.find((a, i) => args[i - 1] === '--domain');
    if (!slug || slug.startsWith('--')) {
      console.error('Usage: yes absorb apply <slug> [--promote] [--domain D]');
      return 1;
    }
    try {
      const r = await absorber.apply(slug, { promote, domain: domainArg });
      console.log(`✓ Promoted ${slug}${promote ? ' (content copied)' : ''}`);
      console.log(`  change_id : ${r.changeId}`);
      console.log(`  promoted  : ${r.promotedPath}`);
      console.log(`  rollback  : ${r.rollbackPath}`);
      if (r.promote) {
        console.log(`  files     : ${r.promote.files_added.length} added`);
        console.log(
          `  agents    : ${r.promote.promoted.agents.length}, skills: ${r.promote.promoted.skills.length}, workflows: ${r.promote.promoted.workflows.length}`
        );
      }
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'rollback') {
    const changeId = args[1];
    if (!changeId) {
      console.error('Usage: yes absorb rollback <change-id>');
      return 1;
    }
    try {
      const r = await absorber.rollback(changeId);
      console.log(`✓ Rolled back ${r.changeId}`);
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'list') {
    let l;
    try {
      l = absorber.list();
    } catch (err) {
      console.error(`✗ Absorb list failed: ${err.message}`);
      return 1;
    }
    console.log(`Staged (normalized): ${l.normalized.length}`);
    for (const e of l.normalized) console.log(`  ${e.slug.padEnd(40)} ${e.license ?? '?'.padEnd(10)} ${e.origin}`);
    console.log(`\nRejected: ${l.rejected.length}`);
    for (const e of l.rejected) console.log(`  ${e.slug.padEnd(40)} ${e.license ?? '?'.padEnd(10)} ${e.origin}`);
    console.log(`\nPromoted: ${l.promoted.length}`);
    for (const e of l.promoted) console.log(`  ${e.change_id}`);
    console.log(`\nRollback records: ${l.rollback.length}`);
    for (const e of l.rollback) console.log(`  ${e.change_id}`);
    return 0;
  }

  console.error(`Unknown absorb subcommand: ${sub}`);
  return 1;
}

async function cmdBuild(args) {
  const HOSTS = ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'vscode', 'sourcegraph', 'generic', 'all'];
  const host = args[0];
  if (!host || !HOSTS.includes(host)) {
    console.error(`Usage: yes build <host>  (hosts: ${HOSTS.join(', ')})`);
    return 1;
  }
  console.log(`Building yes-human bundle: ${host}\n`);
  let ctx;
  try {
    ctx = loadBuildContext();
  } catch (e) {
    console.error(`✗ Failed to load build context: ${e.message}`);
    return 1;
  }

  try {
    if (host === 'all') {
      await buildAll(ctx);
    } else {
      await buildHost(host, ctx);
    }
  } catch (e) {
    console.error(`✗ Build failed: ${e.message}`);
    return 1;
  }

  let allOk = true;
  try {
    const hostsBuilt =
      host === 'all'
        ? ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'vscode', 'sourcegraph', 'generic']
        : [host];
    for (const h of hostsBuilt) {
      const dir = path.join(repoRoot, 'generated', h);
      const { ok, checks } = validateHostBundle(h, dir);
      const icon = ok ? '✓' : '✗';
      console.log(`\n${icon} ${h} bundle validation:`);
      for (const c of checks) {
        console.log(`  ${c.passed ? '✓' : '✗'} ${c.label}${c.detail ? ' — ' + c.detail : ''}`);
      }
      if (!ok) allOk = false;
    }
  } catch (err) {
    console.error(`✗ Bundle validation failed: ${err.message}`);
    return 1;
  }

  console.log(allOk ? '\n✓ All bundles valid.' : '\n✗ Some bundles failed validation.');
  return allOk ? 0 : 1;
}

function help() {
  console.log(`yes — Yes-human control plane CLI

Usage:
  yes route <task> [--dry-run]   Resolve a task to a route (--dry-run prints a PlanCard)
  yes eval cost                  Check startup token budget
  yes eval route                 Score routing fixtures against eval thresholds
  yes eval workflow              Score workflow fixtures against eval thresholds
  yes eval skill                 Score skill fixtures against eval thresholds
  yes evaluator status           Show Phase 9 learning/outcome status
  yes evaluator trace            Record a redacted tenant-scoped trace
  yes evaluator outcome          Record a lightweight route outcome
  yes evaluator gate             Run eval-gated feedback checks
  yes trainer report             Summarize learning signals without mutating prod
  yes trainer suggest            Stage workflow suggestions from repeated traces
  yes feedback <type>            Stage feedback; never mutates production routing
  yes workflow suggest           Stage workflow-miner suggestions
  yes team status                Show tenant isolation/redaction status
  yes offline status             Show offline/crash-recovery state
  yes recover <status|resume>    Alias for offline recovery
  yes validate                   Validate schemas, registries, routes, hooks, rules, policies
  yes compile                    Recompile registries and route table from content
  yes promote --check <agent>    Check if an agent's dossier qualifies for promotion
  yes dossier validate <agent>   Validate an agent's source dossier and score
  yes build <host|all>           Generate host bundle (claude|codex|opencode|mcp|all)
  yes graph build [<path>]       Build local code graph (SQLite); --yes for large repos
  yes graph stats                Show indexed graph statistics
  yes graph query "<term>"       Search symbols and file paths
  yes absorb stage <url|path>    Stage external source through license + dedupe gates
  yes absorb apply <slug>        Promote staged source (writes rollback record)
  yes absorb list                Show staged / promoted / rejected / rollback records
  yes absorb rollback <id>       Revert a promotion
  yes doctor                     Environment + project health check
  yes dream                      Run nightly dream cycle (pattern extraction)
  yes memory <status|clear|archive>  Memory management
  yes help                       Show this help

Phase 3 Commands:
  yes dream                      Extract patterns from episodic memory, stage candidates
  yes memory status              Show memory statistics (working/episodic/semantic/personal)
  yes memory clear --confirm     Clear all memory (requires confirmation)
  yes memory archive             Archive expired working memory to episodic
`);
}

const [, , command, ...rest] = process.argv;

async function main() {
  switch (command) {
    case 'route':
      return await cmdRoute(rest);
    case 'eval':
      if (rest[0] === 'cost') return runScript('packages/yes-schema/eval-cost.js');
      if (rest[0] === 'route') return runScript('packages/yes-schema/eval-route.js');
      if (rest[0] === 'workflow') return runScript('packages/yes-schema/eval-workflow.js');
      if (rest[0] === 'skill') return runScript('packages/yes-schema/eval-skill.js');
      console.error(
        `Unknown eval subcommand: ${rest[0] ?? ''}. Try: yes eval cost | yes eval route | yes eval workflow | yes eval skill`
      );
      return 1;
    case 'evaluator':
      return cmdEvaluator(rest);
    case 'trainer':
      return cmdTrainer(rest);
    case 'feedback':
      return cmdFeedback(rest);
    case 'workflow':
      return cmdWorkflow(rest);
    case 'team':
      return cmdTeam(rest);
    case 'offline':
      return cmdOffline(rest);
    case 'recover':
      return cmdOffline(rest.length ? rest : ['status']);
    case 'validate':
      return runScript('packages/yes-schema/validate.js', rest);
    case 'compile':
      return runScript('packages/yes-cli/commands/compile.js');
    case 'promote':
      return cmdPromote(rest);
    case 'dossier':
      return cmdDossier(rest);
    case 'build':
      return await cmdBuild(rest);
    case 'graph':
      return await cmdGraph(rest);
    case 'absorb':
      return await cmdAbsorb(rest);
    case 'status':
      return cmdStatus();
    case 'agent':
      return await cmdAgent(rest);
    case 'run':
      return await cmdRun(rest);
    case 'persona':
      return cmdPersona(rest);
    case 'version':
      return cmdVersion(rest);
    case 'learning':
      return cmdLearning(rest);
    case 'contribute':
      return cmdContribute(rest);
    case 'export':
      // `yes export <host>` is an alias for `yes build <host>`
      return await cmdBuild(rest);
    case 'doctor':
      return cmdDoctor();
    case 'dream':
      return await cmdDream(rest);
    case 'memory':
      return cmdMemory(rest);
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      help();
      return 0;
    default:
      console.error(`Unknown command: ${command}\n`);
      help();
      return 1;
  }
}

main()
  .then((code) => process.exit(code ?? 0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
