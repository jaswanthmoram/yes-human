import fs from 'fs';
import path from 'path';
import { readJsonIfExists, hashValue } from './redaction.js';

function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

export class WorkflowMiner {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
    this.policy = config.policy || readJsonIfExists(path.join(this.repoRoot, 'registry/learning-policy.json'), {});
    this.memoryDir = config.memoryDir || path.join(this.repoRoot, 'graph/memory');
    this.suggestionDir = config.suggestionDir || path.join(this.repoRoot, this.policy.workflow_miner?.suggestion_dir || 'staging/workflow-suggestions');
    this.minSuccesses = config.minSuccesses || this.policy.workflow_miner?.min_successes || 3;
    this.minDistinctTaskHashes = config.minDistinctTaskHashes || this.policy.workflow_miner?.min_distinct_task_hashes || 2;
  }

  loadTraces() {
    const traces = [];
    const episodicTasks = path.join(this.memoryDir, 'episodic/tasks.jsonl');
    traces.push(...readJsonl(episodicTasks));

    const tenantsDir = path.join(this.memoryDir, 'tenants');
    if (fs.existsSync(tenantsDir)) {
      for (const tenant of fs.readdirSync(tenantsDir)) {
        const traceFile = path.join(tenantsDir, tenant, 'traces.jsonl');
        traces.push(...readJsonl(traceFile));
      }
    }
    return traces;
  }

  suggest() {
    const traces = this.loadTraces();
    const groups = new Map();

    for (const trace of traces) {
      if (trace.success !== true) continue;
      const routeId = trace.route_id || 'unknown';
      const workflowId = trace.workflow_id || 'none';
      const key = `${routeId}|${workflowId}`;
      if (!groups.has(key)) {
        groups.set(key, {
          route_id: routeId,
          workflow_id: workflowId === 'none' ? null : workflowId,
          success_count: 0,
          task_hashes: new Set(),
          agents: new Set(),
          tools: new Set(),
          trace_ids: []
        });
      }
      const group = groups.get(key);
      group.success_count += 1;
      if (trace.task_hash) group.task_hashes.add(trace.task_hash);
      for (const agent of trace.agents || []) group.agents.add(agent);
      for (const tool of trace.tools || []) group.tools.add(tool);
      if (trace.trace_id) group.trace_ids.push(trace.trace_id);
    }

    const candidates = [];
    for (const group of groups.values()) {
      if (group.success_count < this.minSuccesses) continue;
      if (group.task_hashes.size < this.minDistinctTaskHashes) continue;
      const candidate = {
        id: `workflow-suggestion.${hashValue(`${group.route_id}:${group.workflow_id}:${group.success_count}`, 16)}`,
        route_id: group.route_id,
        existing_workflow_id: group.workflow_id,
        kind: group.workflow_id ? 'workflow-optimization' : 'new-workflow-candidate',
        success_count: group.success_count,
        distinct_task_hashes: group.task_hashes.size,
        task_hashes: Array.from(group.task_hashes).slice(0, 20),
        observed_agents: Array.from(group.agents).sort(),
        observed_tools: Array.from(group.tools).sort(),
        trace_ids: group.trace_ids.slice(-20),
        status: 'staged_eval_required',
        production_mutation: false,
        created_at: new Date().toISOString()
      };
      candidates.push(candidate);
    }

    const outFile = path.join(this.suggestionDir, `suggestions-${new Date().toISOString().slice(0, 10)}.json`);
    writeJson(outFile, {
      version: '1.0.0',
      generated_at: new Date().toISOString(),
      count: candidates.length,
      items: candidates
    });
    return { candidates, path: outFile };
  }
}
