import fs from 'fs';
import path from 'path';
import { buildPlanCard } from './lib/plan-card.js';

/**
 * Minimal execution spawner — dry-run and local (read-only) modes only.
 */
export async function runPlan({ task, route, mode = 'dry-run', repoRoot = process.cwd() }) {
  const plan = buildPlanCard(repoRoot, route);
  const base = {
    task,
    route_id: route.route_id,
    agent_id: route.target?.agent ?? null,
    execution_mode: mode,
    plan
  };

  if (mode === 'dry-run') {
    return { ...base, executed: false, message: 'Dry-run: no tools or writes invoked.' };
  }

  if (mode === 'local') {
    const agentId = route.target?.agent;
    if (!agentId) {
      return { ...base, executed: false, blocked: true, reason: 'no agent on route' };
    }
    const [domain, ...rest] = agentId.split('.');
    const agentFile = path.join(repoRoot, 'content/agents', domain, `${rest.join('.')}.md`);
    if (!fs.existsSync(agentFile)) {
      return { ...base, executed: false, blocked: true, reason: 'agent file missing' };
    }
    const body = fs.readFileSync(agentFile, 'utf8');
    return {
      ...base,
      executed: true,
      blocked: false,
      local_actions: ['read_agent_markdown'],
      agent_bytes: body.length,
      network: 'denied',
      writes: 'denied'
    };
  }

  return { ...base, executed: false, blocked: true, reason: `unsupported mode: ${mode}` };
}
