import fs from 'fs';
import path from 'path';
function readJson(repoRoot, rel, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8')); }
  catch { return fallback; }
}
export function buildPlanCard(repoRoot, route) {
  const workflows = readJson(repoRoot, 'registry/workflows.json', { items: [] }).items || [];
  const agents = readJson(repoRoot, 'registry/agents.json', { items: [] }).items || [];
  const workflowId = route.target?.workflow || null;
  const agentId = route.target?.agent || null;
  const workflow = workflows.find((w) => w.id === workflowId);
  const agent = agents.find((a) => a.id === agentId);
  const steps = [];
  if (workflow?.steps?.length) {
    for (const step of workflow.steps.slice(0, 8)) steps.push(step.name || step.id || String(step));
  } else {
    steps.push('Load agent: ' + (agentId || 'unknown'));
    if (agent?.summary) steps.push(agent.summary);
  }
  const gotchas = [route._match?.stage === 'fallback' ? 'Route fell back to supreme-router' : null].filter(Boolean);
  const successCriteria = [agent?.verification?.[0] || 'Task completes without policy violation'].filter(Boolean);
  return { steps, gotchas, successCriteria, workflow_id: workflowId, agent_id: agentId };
}
export function appendEpisodicOutcome(repoRoot, entry) {
  const filePath = path.join(repoRoot, 'graph/memory/episodic/outcomes.jsonl');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.appendFileSync(filePath, JSON.stringify({ ...entry, created_at: new Date().toISOString() }) + '\n');
}
