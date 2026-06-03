import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute } from '../packages/yes-runtime/router.js';

test('semantic fallback routes related wording without exact phrase match', async () => {
  const route = await resolveRoute('mock database helper behavior');
  assert.equal(route.route_id, 'route.engineering.testing-unit');
  assert.equal(route._match.stage, 'semantic');
  assert.ok(route._match.semantic_score >= 0.42);
});

test('semantic fallback still respects negative keyword vetoes', async () => {
  const route = await resolveRoute('unit test integration test strategy');
  assert.notEqual(route.route_id, 'route.engineering.testing-unit');
});
