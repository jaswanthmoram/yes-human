// Verifies the fail-closed-on-unknown semantics for the prefix-based DSL
// in PolicyEvaluator.evaluatePrecondition / evaluateInvariant.
// Issue #38: typos like `has_tools:` (trailing s) must not silently pass.

import test from 'node:test';
import assert from 'node:assert/strict';
import { PolicyEvaluator } from '../../packages/yes-core/policy-evaluator.js';

const originalLenient = process.env.YES_LENIENT_DSL;

test.before(() => {
  delete process.env.YES_LENIENT_DSL;
});

test.after(() => {
  if (originalLenient !== undefined) process.env.YES_LENIENT_DSL = originalLenient;
  else delete process.env.YES_LENIENT_DSL;
});

test('evaluatePrecondition: known prefix has_tool', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluatePrecondition('has_tool:grep', { tools: ['grep'] }), true);
  assert.equal(e.evaluatePrecondition('has_tool:grep', { tools: ['rg'] }), false);
});

test('evaluatePrecondition: known prefix has_permission', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluatePrecondition('has_permission:route:read', { permissions: ['route:read'] }), true);
  assert.equal(e.evaluatePrecondition('has_permission:route:write', { permissions: ['route:read'] }), false);
});

test('evaluatePrecondition: typo fails closed (no env flag)', () => {
  const e = new PolicyEvaluator();
  // `has_tools` is a common typo (extra s)
  assert.equal(e.evaluatePrecondition('has_tools:grep', { tools: ['grep'] }), false);
});

test('evaluatePrecondition: malformed precondition (no colon) fails closed', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluatePrecondition('garbage', {}), false);
  assert.equal(e.evaluatePrecondition(null, {}), false);
});

test('evaluatePrecondition: lenient mode (YES_LENIENT_DSL=true) preserves legacy fail-open', () => {
  process.env.YES_LENIENT_DSL = 'true';
  try {
    const e = new PolicyEvaluator();
    assert.equal(e.evaluatePrecondition('has_tools:grep', {}), true);
    assert.equal(e.evaluatePrecondition('garbage', {}), true);
  } finally {
    delete process.env.YES_LENIENT_DSL;
  }
});

test('evaluateInvariant: max_tokens bounds check', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluateInvariant('max_tokens:1000', { estimatedTokens: 500 }), true);
  assert.equal(e.evaluateInvariant('max_tokens:1000', { estimatedTokens: 1500 }), false);
});

test('evaluateInvariant: max_tokens with non-numeric value fails closed', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluateInvariant('max_tokens:abc', { estimatedTokens: 500 }), false);
});

test('evaluateInvariant: no_secrets detects API keys', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluateInvariant('no_secrets', { content: 'hello world' }), true);
  assert.equal(
    e.evaluateInvariant('no_secrets', { content: 'sk-abcdef1234567890abcdef1234567890' }),
    false
  );
});

test('evaluateInvariant: unknown invariant fails closed', () => {
  const e = new PolicyEvaluator();
  assert.equal(e.evaluateInvariant('mystery:check', {}), false);
});
