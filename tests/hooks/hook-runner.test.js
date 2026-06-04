import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HookRunner } from '../../hooks/hook-runner.js';
import { PolicyEvaluator } from '../../packages/yes-core/policy-evaluator.js';

test('loads hooks from registry', () => {
  const runner = new HookRunner();
  const hooks = runner.getHooks();

  assert.ok(Object.keys(hooks).length > 0);
  assert.ok(hooks['pre-route']);
  assert.ok(hooks['pre-tool']);
  assert.ok(hooks['post-tool']);
});

test('returns hooks for specific event', () => {
  const runner = new HookRunner();
  const preRouteHooks = runner.getEventHooks('pre-route');

  assert.ok(Array.isArray(preRouteHooks));
  assert.ok(preRouteHooks.length > 0);
});

test('returns empty array for unknown event', () => {
  const runner = new HookRunner();
  const hooks = runner.getEventHooks('unknown-event');

  assert.deepEqual(hooks, []);
});

test('checks if event has hooks', () => {
  const runner = new HookRunner();

  assert.equal(runner.hasHooks('pre-route'), true);
  assert.equal(runner.hasHooks('unknown-event'), false);
});

test('runs pre-route hooks', async () => {
  const evaluator = new PolicyEvaluator();
  const runner = new HookRunner('hooks', evaluator);

  const result = await runner.run('pre-route', {
    task: 'review code',
    estimatedTokens: 100
  });

  assert.equal(result.blocked, false);
  assert.ok(Array.isArray(result.results));
});

test('blocks on budget violation', async () => {
  const evaluator = new PolicyEvaluator();
  const runner = new HookRunner('hooks', evaluator);

  const result = await runner.run('pre-route', {
    task: 'review code',
    estimatedTokens: 500 // Over budget
  });

  assert.equal(result.blocked, true);
  assert.ok(result.reason);
});

test('runs pre-tool hooks', async () => {
  const evaluator = new PolicyEvaluator();
  const runner = new HookRunner('hooks', evaluator);

  const result = await runner.run('pre-tool', {
    tool: 'webfetch',
    args: { url: 'https://example.com' },
    agent: 'engineering.code-reviewer'
  });

  assert.equal(result.blocked, false);
});

test('runs post-tool hooks', async () => {
  const runner = new HookRunner();

  const result = await runner.run('post-tool', {
    tool: 'webfetch',
    args: { url: 'https://example.com' },
    result: { status: 'ok' },
    duration: 1000
  });

  assert.equal(result.blocked, false);
});

test('runs on-error hooks', async () => {
  const runner = new HookRunner();

  const result = await runner.run('on-error', {
    error: new Error('test error'),
    task: 'test task',
    agent: 'test-agent'
  });

  assert.equal(result.blocked, false);
});

test('runs on-task-complete hooks', async () => {
  const runner = new HookRunner();

  const result = await runner.run('on-task-complete', {
    task: 'test task',
    route: 'route.engineering.code-reviewer',
    agents: ['engineering.code-reviewer'],
    duration: 5000,
    success: true
  });

  assert.equal(result.blocked, false);
});

test('continues on hook failure', async () => {
  const runner = new HookRunner();

  // This should not throw even if a hook fails
  const result = await runner.run('pre-route', {
    task: 'test task'
  });

  assert.ok(result);
});
