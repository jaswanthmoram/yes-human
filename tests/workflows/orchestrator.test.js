import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WorkflowOrchestrator } from '../../packages/yes-workflows/orchestrator.js';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

test('orchestrator dry-run plans engineering code review workflow', async () => {
  const o = new WorkflowOrchestrator({ repoRoot });
  const plan = await o.run('workflow.engineering.code-review-with-security', { dryRun: true });
  assert.ok(plan.workflow_id.includes('code-review-with-security'));
  assert.ok(plan.steps.length >= 2);
  assert.equal(plan.dry_run, true);
});
