import fs from 'fs';
import path from 'path';

const READ_ONLY_TOOLS = new Set([
  'filesystem.read', 'shell.readonly', 'diff_inspection', 'grep', 'readFile'
]);

export class WorkflowOrchestrator {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
  }

  loadWorkflow(workflowId) {
    const [domain, ...rest] = workflowId.replace(/^workflow\./, '').split('.');
    const fileName = rest.join('.') + '.json';
    const filePath = path.join(this.repoRoot, 'content/workflows', domain, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Workflow not found: ${workflowId} (${filePath})`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  plan(workflowId, context = {}) {
    const wf = this.loadWorkflow(workflowId);
    const steps = (wf.steps || []).map((s, i) => ({
      index: i + 1,
      id: s.id,
      summary: s.summary,
      read_only: true,
      tools_allowed: (wf.tools || []).filter((t) => READ_ONLY_TOOLS.has(t) || t.includes('read'))
    }));
    return {
      workflow_id: wf.id,
      dry_run: context.dryRun !== false,
      steps,
      rollback: wf.rollback || { mode: 'no_write' },
      gates: wf.gates || []
    };
  }

  async run(workflowId, options = {}) {
    const dryRun = options.dryRun !== false;
    const plan = this.plan(workflowId, { dryRun });
    const executed = [];
    if (!dryRun) {
      for (const step of plan.steps) {
        executed.push({ step_id: step.id, status: 'skipped', reason: 'execute supports read-only plan logging only' });
      }
    }
    return { ...plan, executed };
  }
}
