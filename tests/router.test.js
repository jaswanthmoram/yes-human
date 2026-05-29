import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute } from '../packages/yes-runtime/router.js';

test('exact trigger match routes to code-reviewer', async () => {
  const route = await resolveRoute('review code');
  assert.equal(route.route_id, 'route.engineering.code-reviewer');
});

test('containment match routes a build error to build-resolver', async () => {
  const route = await resolveRoute('please check my build error');
  assert.equal(route.route_id, 'route.engineering.build-resolver');
});

test('unknown task falls back to supreme-router', async () => {
  const route = await resolveRoute('do some random unknown thing');
  assert.equal(route.route_id, 'route.meta-system.supreme-router');
});

test('longer keyword wins over shorter substring', async () => {
  const route = await resolveRoute('please execute system route check');
  assert.equal(route.route_id, 'route.meta-system.master');
});

test('empty/invalid input returns fallback route', async () => {
  const route1 = await resolveRoute('');
  assert.equal(route1.route_id, 'route.meta-system.supreme-router');
  const route2 = await resolveRoute(null);
  assert.equal(route2.route_id, 'route.meta-system.supreme-router');
});
