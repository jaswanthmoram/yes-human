import fs from 'fs';
import path from 'path';
import { assertPermission, loadRbacPolicy } from '../yes-core/rbac.js';

const READ_ONLY_TOOLS = new Set(['filesystem.read', 'shell.readonly', 'diff_inspection', 'grep', 'readFile']);

export class WorkflowOrchestrator {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
    this.role = config.role || process.env.YES_ROLE || null;
    this.rbac = config.rbac || loadRbacPolicy(this.repoRoot);
    this.workflowCache = new Map();
  }

  loadWorkflow(workflowId) {
    const [domain, ...rest] = workflowId.replace(/^workflow\./, '').split('.');
    const fileName = rest.join('.') + '.json';
    const filePath = path.join(this.repoRoot, 'content/workflows', domain, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Workflow not found: ${workflowId} (${filePath})`);
    }

    const stats = fs.statSync(filePath);
    const mtime = stats.mtimeMs;
    const cached = this.workflowCache.get(filePath);
    if (cached && cached.mtime === mtime) {
      return cached.workflow;
    }

    const workflow = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    this.workflowCache.set(filePath, { workflow, mtime });
    return workflow;
  }

  fanOutPlan(workflow) {
    const route = workflow.route || {};
    const primary = route.primary || route.primary_agent || workflow.primary_agent;
    const participants = route.participants || [];
    const agents = Array.from(new Set([...(route.agents || []), primary, ...participants].filter(Boolean)));
    const maxParallel = Math.max(1, Number(route.max_parallel_agents || agents.length || 1));
    if (!route.parallel || agents.length <= 1) {
      return { enabled: false, max_parallel_agents: 1, groups: agents.map((agent) => [agent]) };
    }
    const groups = [];
    for (let i = 0; i < agents.length; i += maxParallel) {
      groups.push(agents.slice(i, i + maxParallel));
    }
    return { enabled: true, max_parallel_agents: maxParallel, groups };
  }

  plan(workflowId, context = {}) {
    assertPermission(this.role, 'workflow:read', this.rbac);
    const wf = this.loadWorkflow(workflowId);
    const fan_out = this.fanOutPlan(wf);
    // Parallel-eligibility rules (explicit, no name-pattern guessing):
    //   1. `s.parallel === true`  → parallel (if fan_out enabled)
    //   2. `s.parallel === false` → never parallel
    //   3. `s.parallel === undefined` → fall back to workflow-level default
    //      (`wf.default_parallel_steps`), default false. The regex-on-step-name
    //      heuristic was removed because it made parallelism a function of
    //      English wording, not intent.
    const workflowDefault = wf.default_parallel_steps === true;
    const steps = (wf.steps || [])
      .map((s, i) => {
        const isStepParallel = s.parallel === undefined ? workflowDefault : s.parallel === true;
        return {
          index: i + 1,
          id: s.id,
          summary: s.summary,
          read_only: true,
          parallel_agents: fan_out.enabled && isStepParallel ? fan_out.groups[0] : undefined,
          tools_allowed: (wf.tools || []).filter((t) => READ_ONLY_TOOLS.has(t) || t.includes('read'))
        };
      })
      .map((step) => Object.fromEntries(Object.entries(step).filter(([, value]) => value !== undefined)));
    return {
      workflow_id: wf.id,
      dry_run: context.dryRun !== false,
      primary_agent: wf.primary_agent,
      fan_out,
      steps,
      rollback: wf.rollback || { mode: 'no_write' },
      gates: wf.gates || []
    };
  }

  async run(workflowId, options = {}) {
    const dryRun = options.dryRun !== false;
    if (!dryRun) assertPermission(this.role, 'workflow:execute', this.rbac);
    const plan = this.plan(workflowId, { dryRun });
    const executed = [];
    if (!dryRun) {
      // Load routes registry to match agent IDs to routes
      const routesPath = path.join(this.repoRoot, 'registry/routes.json');
      let routes = [];
      if (fs.existsSync(routesPath)) {
        try {
          routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
        } catch (err) {
          console.error(`⚠ [WorkflowOrchestrator] Failed to load routes registry: ${err.message}`);
        }
      }

      for (const step of plan.steps) {
        if (step.parallel_agents?.length) {
          const results = await Promise.all(
            step.parallel_agents.map(async (agent) => {
              const route = routes.find((r) => r.target?.agent === agent);
              if (route) {
                try {
                  const { runPlan } = await import('../yes-runtime/spawner.js');
                  const runResult = await runPlan({
                    task: options.task || step.summary,
                    route,
                    mode: options.mode || 'local',
                    repoRoot: this.repoRoot
                  });
                  return { agent, status: 'executed', result: runResult };
                } catch (e) {
                  return { agent, status: 'failed', error: e.message };
                }
              }
              return { agent, status: 'planned_read_only' };
            })
          );
          executed.push({ step_id: step.id, status: 'parallel_executed', agents: results });
        } else {
          const primaryAgent = plan.primary_agent;
          const route = routes.find((r) => r.target?.agent === primaryAgent);
          if (route) {
            try {
              const { runPlan } = await import('../yes-runtime/spawner.js');
              const runResult = await runPlan({
                task: options.task || step.summary,
                route,
                mode: options.mode || 'local',
                repoRoot: this.repoRoot
              });
              executed.push({
                step_id: step.id,
                status: 'executed',
                result: runResult
              });
            } catch (e) {
              executed.push({
                step_id: step.id,
                status: 'failed',
                error: e.message
              });
            }
          } else {
            executed.push({
              step_id: step.id,
              status: 'skipped',
              reason: `no agent route found for primary agent: ${primaryAgent}`
            });
          }
        }
      }
    }
    return { ...plan, executed };
  }
}
