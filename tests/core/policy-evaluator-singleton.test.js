// Issues #21 + #36: getSharedPolicyEvaluator returns the same instance for
// equivalent configs, so router + hook-runner + pre-route share one evaluator
// instead of constructing per-request.

import test from 'node:test';
import assert from 'node:assert/strict';
import { getSharedPolicyEvaluator, PolicyEvaluator } from '../../packages/yes-core/policy-evaluator.js';

test('getSharedPolicyEvaluator: returns same instance for same config', () => {
  const a = getSharedPolicyEvaluator();
  const b = getSharedPolicyEvaluator();
  assert.strictEqual(a, b);
  assert.ok(a instanceof PolicyEvaluator);
});

test('getSharedPolicyEvaluator: different configs get different instances', () => {
  const a = getSharedPolicyEvaluator({ rulesDir: 'rules' });
  const b = getSharedPolicyEvaluator({ rulesDir: 'other-rules' });
  assert.notStrictEqual(a, b);
});

test('getSharedPolicyEvaluator: config-equivalent calls share instance', () => {
  const a = getSharedPolicyEvaluator({ rulesDir: 'rules', policiesDir: 'policies' });
  const b = getSharedPolicyEvaluator({ rulesDir: 'rules', policiesDir: 'policies' });
  assert.strictEqual(a, b);
});
