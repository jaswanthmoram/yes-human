import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runPlan } from '../../packages/yes-runtime/spawner.js';

test('dry-run does not execute', async () => {
  const route = {
    route_id: 'route.engineering.planner',
    target: { agent: 'engineering.planner', workflow: null }
  };
  const r = await runPlan({ task: 'plan feature', route, mode: 'dry-run' });
  assert.equal(r.executed, false);
  assert.ok(r.plan?.steps);
});

test('local mode reads agent file only', async () => {
  const route = {
    route_id: 'route.engineering.planner',
    target: { agent: 'engineering.planner', workflow: null }
  };
  const r = await runPlan({ task: 'plan', route, mode: 'local' });
  assert.equal(r.executed, true);
  assert.equal(r.network, 'denied');
  assert.ok(r.agent_bytes > 0);
});
