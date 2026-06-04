import { WorkflowMiner } from '../../yes-runtime/workflow-miner.js';
import { WorkflowOrchestrator } from '../../yes-workflows/index.js';
import { repoRoot } from './helpers.js';

export async function cmdWorkflow(args) {
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
