import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawnSync } from 'child_process';
import { MemoryManager } from './memory-manager.js';
import { loadTeamMode, readJsonIfExists, redactObject, redactString, redactedTask, resolveTenant, tenantHash, tenantTracePath, hashValue } from './redaction.js';

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function appendJsonl(filePath, entry) {
  ensureDirFor(filePath);
  fs.appendFileSync(filePath, `${JSON.stringify(entry)}\n`);
}

function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function writeJson(filePath, value) {
  ensureDirFor(filePath);
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function routeIdFrom(route) {
  if (!route) return 'route.meta-system.supreme-router';
  if (typeof route === 'string') return route;
  return route.route_id || route.id || 'route.meta-system.supreme-router';
}

export class LearningEngine {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
    this.policy = config.policy || readJsonIfExists(path.join(this.repoRoot, 'registry/learning-policy.json'), {});
    this.teamMode = config.teamMode || loadTeamMode(this.repoRoot);
    this.memory = config.memoryManager || new MemoryManager({
      memoryDir: config.memoryDir || path.join(this.repoRoot, 'graph/memory')
    });
    this.learningDir = config.learningDir || path.join(this.repoRoot, this.policy.outcome_tracking?.state_dir || 'graph/memory/learning');
    this.outcomesFile = path.join(this.learningDir, 'outcomes.jsonl');
    this.routeStatsFile = path.join(this.learningDir, 'route-outcomes.json');
    this.feedbackDir = config.feedbackDir || path.join(this.repoRoot, 'staging/feedback');
    this.mistakeGraphFile = config.mistakeGraphFile || path.join(this.repoRoot, this.policy.mistake_graph?.state_file || 'graph/memory/learning/mistake-graph.json');
  }

  createTrace(context = {}) {
    const tenantId = resolveTenant(context, this.teamMode);
    const route_id = routeIdFrom(context.route || context.route_id);
    const workflow_id = context.workflow_id || context.route?.target?.workflow || null;
    const task = context.task || '';
    const trace = {
      trace_id: context.trace_id || crypto.randomBytes(16).toString('hex'),
      task_hash: hashValue(task || context.task_hash || 'empty', 24),
      task_redacted: redactedTask(task, this.teamMode),
      tenant_id: this.teamMode.isolation?.hash_tenant_ids === false ? tenantId : null,
      tenant_hash: tenantHash(tenantId, this.teamMode),
      host: context.host || process.env.YES_HOST || 'local',
      route_id,
      workflow_id,
      agents: context.agents || [context.route?.target?.agent].filter(Boolean),
      skills: context.skills || context.route?.target?.skills || [],
      tools: context.tools || [],
      input_tokens_est: context.input_tokens_est || 0,
      output_tokens_est: context.output_tokens_est || 0,
      cost_band: context.cost_band || context.route?.budget_band || 'micro',
      success: Boolean(context.success),
      failure_class: context.failure_class || null,
      duration_ms: Math.max(0, Number(context.duration_ms || context.duration || 0)),
      created_at: new Date().toISOString(),
      redaction: {
        applied: this.teamMode.redaction?.enabled !== false,
        dropped_raw_task: this.teamMode.redaction?.drop_raw_task !== false,
        patterns: this.teamMode.redaction?.redact_patterns || []
      },
      verification: context.verification || undefined,
      learning_candidate: Boolean(context.learning_candidate),
      outcome: context.outcome || undefined,
      offline: Boolean(context.offline),
      recovery_checkpoint: context.recovery_checkpoint || null
    };

    return Object.fromEntries(Object.entries(trace).filter(([, value]) => value !== undefined));
  }

  recordTrace(context = {}) {
    const trace = this.createTrace(context);
    const tenantId = resolveTenant(context, this.teamMode);
    const tracePath = tenantTracePath(this.repoRoot, tenantId, this.teamMode);
    appendJsonl(tracePath, trace);

    this.memory.addEpisodicMemory('tasks', {
      trace_id: trace.trace_id,
      task_hash: trace.task_hash,
      route_id: trace.route_id,
      workflow_id: trace.workflow_id,
      agents: trace.agents,
      tools: trace.tools,
      duration_ms: trace.duration_ms,
      success: trace.success,
      failure_class: trace.failure_class
    });

    return { trace, trace_path: tracePath };
  }

  trackOutcome(outcome = {}) {
    const normalized = {
      trace_id: outcome.trace_id || null,
      route_id: outcome.route_id || 'route.meta-system.supreme-router',
      workflow_id: outcome.workflow_id || null,
      success: Boolean(outcome.success),
      score: typeof outcome.score === 'number' ? Math.max(0, Math.min(1, outcome.score)) : (outcome.success ? 1 : 0),
      source: outcome.source || 'manual',
      feedback: outcome.feedback ? redactString(String(outcome.feedback).slice(0, 1000), this.teamMode) : null,
      failure_class: outcome.failure_class || null,
      tenant_hash: tenantHash(resolveTenant(outcome, this.teamMode), this.teamMode),
      created_at: new Date().toISOString()
    };

    appendJsonl(this.outcomesFile, normalized);
    const stats = readJsonIfExists(this.routeStatsFile, { version: '1.0.0', generated_at: new Date().toISOString(), routes: {} });
    const decay = this.policy.outcome_tracking?.decay ?? 0.92;
    const current = stats.routes[normalized.route_id] || {
      route_id: normalized.route_id,
      events: 0,
      decayed_success: 0,
      decayed_failure: 0,
      last_outcome_at: null
    };

    current.events += 1;
    current.decayed_success = current.decayed_success * decay + (normalized.success ? normalized.score : 0);
    current.decayed_failure = current.decayed_failure * decay + (!normalized.success ? 1 - normalized.score || 1 : 0);
    current.last_outcome_at = normalized.created_at;
    const total = current.decayed_success + current.decayed_failure;
    current.success_rate = total > 0 ? current.decayed_success / total : null;
    current.signal_ready = current.events >= (this.policy.outcome_tracking?.min_events_for_signal || 3);
    stats.generated_at = new Date().toISOString();
    stats.routes[normalized.route_id] = current;
    writeJson(this.routeStatsFile, stats);

    if (!normalized.success) {
      this.updateMistakeGraph({
        trace_id: normalized.trace_id,
        route_id: normalized.route_id,
        workflow_id: normalized.workflow_id,
        failure_class: normalized.failure_class || 'unspecified',
        task_hash: outcome.task_hash || null,
        suggested_route: outcome.suggested_route || null
      });
    }

    return { outcome: normalized, route_stats: current };
  }

  stageFeedback(feedback = {}) {
    const forbidden = new Set(this.policy.feedback_gate?.forbidden_mutations || []);
    const entry = {
      id: hashValue(`${Date.now()}:${feedback.trace_id}:${feedback.type}`, 20),
      trace_id: feedback.trace_id || null,
      type: feedback.type || 'partial',
      route_id: feedback.route_id || null,
      suggested_route: feedback.suggested_route || null,
      note: feedback.note ? redactString(String(feedback.note).slice(0, 1000), this.teamMode) : null,
      metadata: redactObject(feedback.metadata || {}, this.teamMode),
      production_mutation: false,
      blocked_mutations: Array.from(forbidden),
      status: 'staged_eval_required',
      created_at: new Date().toISOString()
    };

    const outPath = path.join(this.feedbackDir, `${entry.created_at.replace(/[:.]/g, '-')}-${entry.id}.json`);
    writeJson(outPath, entry);
    return { feedback: entry, path: outPath };
  }

  updateMistakeGraph(mistake = {}) {
    const graph = readJsonIfExists(this.mistakeGraphFile, {
      version: '1.0.0',
      generated_at: new Date().toISOString(),
      nodes: {},
      edges: []
    });
    const route_id = mistake.route_id || 'route.meta-system.supreme-router';
    const failure_class = mistake.failure_class || 'unspecified';
    const nodeId = `${route_id}#${failure_class}`;
    const node = graph.nodes[nodeId] || {
      id: nodeId,
      route_id,
      failure_class,
      count: 0,
      traces: [],
      suggested_routes: {}
    };
    node.count += 1;
    if (mistake.trace_id && !node.traces.includes(mistake.trace_id)) {
      node.traces.push(mistake.trace_id);
      node.traces = node.traces.slice(-20);
    }
    if (mistake.suggested_route) {
      node.suggested_routes[mistake.suggested_route] = (node.suggested_routes[mistake.suggested_route] || 0) + 1;
      graph.edges.push({
        from: nodeId,
        to: mistake.suggested_route,
        type: 'suggested_correction',
        trace_id: mistake.trace_id || null,
        created_at: new Date().toISOString()
      });
    }
    node.candidate_ready = node.count >= (this.policy.mistake_graph?.min_repeats_for_candidate || 2);
    graph.generated_at = new Date().toISOString();
    graph.nodes[nodeId] = node;
    writeJson(this.mistakeGraphFile, graph);
    return { node, graph_path: this.mistakeGraphFile };
  }

  status() {
    const outcomes = readJsonl(this.outcomesFile);
    const routeStats = readJsonIfExists(this.routeStatsFile, { routes: {} });
    const mistakeGraph = readJsonIfExists(this.mistakeGraphFile, { nodes: {}, edges: [] });
    return {
      policy_enabled: this.policy.enabled !== false,
      outcomes: outcomes.length,
      route_stats: Object.keys(routeStats.routes || {}).length,
      mistake_nodes: Object.keys(mistakeGraph.nodes || {}).length,
      mistake_edges: (mistakeGraph.edges || []).length,
      learning_dir: path.relative(this.repoRoot, this.learningDir)
    };
  }
}

export function runEvalGate(repoRoot = process.cwd(), checks = ['route', 'workflow', 'skill', 'cost']) {
  const commands = {
    route: ['node', ['packages/yes-schema/eval-route.js']],
    workflow: ['node', ['packages/yes-schema/eval-workflow.js']],
    skill: ['node', ['packages/yes-schema/eval-skill.js']],
    cost: ['node', ['packages/yes-schema/eval-cost.js']]
  };
  const results = [];
  for (const check of checks) {
    const command = commands[check];
    if (!command) continue;
    const result = spawnSync(command[0], command[1], { cwd: repoRoot, encoding: 'utf8' });
    results.push({
      check,
      command: `${command[0]} ${command[1].join(' ')}`,
      status: result.status ?? 1,
      passed: (result.status ?? 1) === 0,
      stdout_tail: (result.stdout || '').split('\n').slice(-8).join('\n'),
      stderr_tail: (result.stderr || '').split('\n').slice(-8).join('\n')
    });
  }
  const passed = results.every((entry) => entry.passed);
  const report = [
    '# Phase 9 Feedback Gate',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Passed: ${passed}`,
    '',
    ...results.flatMap((entry) => [
      `## ${entry.check}`,
      '',
      `- Command: \`${entry.command}\``,
      `- Passed: ${entry.passed}`,
      ''
    ])
  ].join('\n');
  const reportPath = path.join(repoRoot, 'reports/phase9-feedback-gate.md');
  writeJson(path.join(repoRoot, 'reports/phase9-feedback-gate.json'), { generated_at: new Date().toISOString(), passed, results });
  fs.writeFileSync(reportPath, report);
  return { passed, results, report: reportPath };
}
