import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, '../../..');

export function runScript(relativeScript, extraArgs = []) {
  const result = spawnSync('node', [path.join(repoRoot, relativeScript), ...extraArgs], {
    cwd: repoRoot,
    stdio: 'inherit'
  });
  return result.status ?? 1;
}

export function readJSON(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

export function readJSONSafe(relativePath, fallback = null) {
  try {
    return readJSON(relativePath);
  } catch {
    return fallback;
  }
}

export function stripFlags(args, flags) {
  return args.filter((arg) => !flags.has(arg));
}

export function estimateTextTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

export function resolveAgentPath(agentId) {
  const parts = String(agentId || '').split('.');
  if (parts.length < 2) return null;
  return path.join(repoRoot, 'content', 'agents', parts[0], `${parts.slice(1).join('.')}.md`);
}

export function lookupAgent(agentId) {
  const agents = readJSONSafe('registry/agents.json', { items: [] });
  return agents.items?.find((agent) => agent.id === agentId || agent.agent_id === agentId) || null;
}

export function estimateAgentTokens(agentId) {
  const agentPath = resolveAgentPath(agentId);
  if (!agentPath || !fs.existsSync(agentPath)) return 0;
  return estimateTextTokens(fs.readFileSync(agentPath, 'utf8'));
}

export function traceDate(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function traceDir() {
  return process.env.YES_TRACE_DIR || path.join(repoRoot, 'staging', 'traces');
}

export function appendRunTrace(trace) {
  const dir = traceDir();
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${traceDate()}.jsonl`);
  trace.trace_file = file;
  fs.appendFileSync(file, `${JSON.stringify(trace)}\n`);
  return file;
}

export function buildHookTrace(route) {
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

export function buildRunTrace({ task, route, agentTokens, maxTokens }) {
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

export function flagValue(args, name, fallback = null) {
  const idx = args.indexOf(name);
  if (idx < 0) return fallback;
  return args[idx + 1] ?? fallback;
}

export function boolFlag(args, name, fallback = false) {
  const value = flagValue(args, name, null);
  if (value === null) return args.includes(name) ? true : fallback;
  return ['1', 'true', 'yes', 'pass', 'passed', 'success'].includes(String(value).toLowerCase());
}

export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
