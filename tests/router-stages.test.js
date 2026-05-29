import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, MAX_ROUTE_DEPTH } from '../packages/yes-runtime/router.js';

test('alias resolves to the agent route', async () => {
  const r = await resolveRoute('cr');
  assert.equal(r.route_id, 'route.engineering.code-reviewer');
  assert.equal(r._match.stage, 'alias');
});

test('negative keyword vetoes a keyword match and falls back', async () => {
  const r = await resolveRoute('legal review code');
  assert.equal(r.route_id, 'route.meta-system.supreme-router');
  assert.equal(r._match.stage, 'fallback');
});

test('exact match reports the exact stage with confidence', async () => {
  const r = await resolveRoute('review code');
  assert.equal(r._match.stage, 'exact');
  assert.ok(r._match.confidence >= 0.9);
});

test('depth beyond MAX_ROUTE_DEPTH falls back (loop prevention)', async () => {
  const r = await resolveRoute('review code', { depth: MAX_ROUTE_DEPTH + 1 });
  assert.equal(r.route_id, 'route.meta-system.supreme-router');
});

test('already-visited route is not re-entered', async () => {
  const r = await resolveRoute('review code', { visited: ['route.engineering.code-reviewer'] });
  assert.equal(r.route_id, 'route.meta-system.supreme-router');
});
