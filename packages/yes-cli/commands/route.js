import { resolveRoute } from '../../yes-runtime/router.js';
import { runPlan } from '../../yes-runtime/spawner.js';
import { buildPlanCard, appendEpisodicOutcome } from '../../yes-runtime/lib/plan-card.js';
import { buildContextPack, readGraphRoutingConfig } from '../../yes-runtime/lib/code-graph-assist.js';
import {
  repoRoot,
  readJSON,
  estimateAgentTokens,
  buildRunTrace,
  appendRunTrace,
  stripFlags
} from './helpers.js';

export async function cmdRoute(args) {
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

export async function cmdRun(args) {
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
