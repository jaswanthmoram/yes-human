#!/usr/bin/env node
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../yes-runtime/router.js';
import { checkAgentPromotion } from '../../validators/promotion.validator.js';
import { DreamCycle } from '../yes-runtime/dream-cycle.js';
import { MemoryManager } from '../yes-runtime/memory-manager.js';

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

async function cmdRoute(args) {
  const dryRun = args.includes('--dry-run');
  const task = args.filter((a) => a !== '--dry-run').join(' ').trim();
  if (!task) {
    console.error('Usage: yes route <task> [--dry-run]');
    return 1;
  }
  const route = await resolveRoute(task);
  if (dryRun) {
    const target = route.target || {};
    const band = route.budget_band ?? 'micro';
    let maxTokens = null;
    try {
      const costPolicy = readJSON('registry/cost-policy.json');
      maxTokens = costPolicy.bands?.[band]?.max_context_tokens ?? null;
    } catch { /* ignore */ }
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
  const python = process.env.YES_PYTHON && fs.existsSync(process.env.YES_PYTHON)
    ? process.env.YES_PYTHON
    : (fs.existsSync(venvPython) ? venvPython : 'python3');
  const mk = spawnSync(python, ['-c', 'import markitdown'], { encoding: 'utf8' });
  add(mk.status === 0, 'MarkItDown installed', mk.status === 0 ? python : `not importable for ${python}`);

  // Schemas load
  let schemaCount = 0;
  try {
    schemaCount = fs.readdirSync(path.join(repoRoot, 'packages/yes-schema/schemas')).filter((f) => f.endsWith('.json')).length;
  } catch { /* ignore */ }
  add(schemaCount > 0, 'Schemas present', `${schemaCount} schema files`);

  // Route table resolves to routes.json
  let routesOk = false;
  let routeDetail = '';
  try {
    const table = readJSON('graph/indexes/ROUTE_TABLE.min.json');
    const routes = readJSON('registry/routes.json');
    const ids = new Set(routes.map((r) => r.route_id));
    const missing = Object.values(table.routes).filter((id) => !ids.has(id));
    routesOk = missing.length === 0 && ids.has(table.fallback);
    routeDetail = routesOk ? `${Object.keys(table.routes).length} hot routes resolve` : `unresolved: ${missing.join(', ') || table.fallback}`;
  } catch (e) {
    routeDetail = e.message;
  }
  add(routesOk, 'Route table resolves', routeDetail);

  // Registry counts
  let countsOk = true;
  const countDetail = [];
  for (const name of ['agents', 'skills', 'categories']) {
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
  const result = checkAgentPromotion(repoRoot, agentId, { targetGate });
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
    const stats = memory.getStats();
    
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
    
    memory.clearAll();
    console.log('✓ All memory cleared');
    return 0;
  }
  
  if (subcommand === 'archive') {
    const archived = memory.archiveWorkingMemory();
    console.log(`✓ Archived ${archived} working memory entries to episodic`);
    return 0;
  }
  
  console.error('Usage: yes memory <status|clear|archive>');
  return 1;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function cmdDossier(args) {
  if (args[0] !== 'validate' || !args[1]) {
    console.error('Usage: yes dossier validate <agent-id> [--gate production|staging]');
    return 1;
  }
  const agentId = args[1];
  const gateIdx = args.indexOf('--gate');
  const targetGate = gateIdx >= 0 ? args[gateIdx + 1] : 'production';
  const result = checkAgentPromotion(repoRoot, agentId, { targetGate });
  let total = null;
  try {
    const p = path.join(repoRoot, 'references', agentId.split('.')[0], `${agentId.split('.').slice(1).join('.')}.sources.json`);
    total = JSON.parse(fs.readFileSync(p, 'utf8')).scores?.total ?? null;
  } catch { /* ignore */ }
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

function help() {
  console.log(`yes — Yes-human control plane CLI

Usage:
  yes route <task> [--dry-run]   Resolve a task to a route (--dry-run prints a PlanCard)
  yes eval cost                  Check startup token budget
  yes eval route                 Score routing fixtures against eval thresholds
  yes validate                   Validate schemas, registries, routes, hooks, rules, policies
  yes compile                    Recompile registries and route table from content
  yes promote --check <agent>    Check if an agent's dossier qualifies for promotion
  yes dossier validate <agent>   Validate an agent's source dossier and score
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
      console.error(`Unknown eval subcommand: ${rest[0] ?? ''}. Try: yes eval cost | yes eval route`);
      return 1;
    case 'validate':
      return runScript('packages/yes-schema/validate.js');
    case 'compile':
      return runScript('packages/yes-cli/commands/compile.js');
    case 'promote':
      return cmdPromote(rest);
    case 'dossier':
      return cmdDossier(rest);
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

main().then((code) => process.exit(code ?? 0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
