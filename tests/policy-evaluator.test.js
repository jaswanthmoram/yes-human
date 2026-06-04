import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';

test('loads rules from rules/ directory', () => {
  const evaluator = new PolicyEvaluator();
  const rules = evaluator.getRules();

  assert.ok(Object.keys(rules).length > 0);
  assert.ok(rules['budget']);
  assert.ok(rules['safety']);
  assert.ok(rules['routing']);
});

test('loads policies from policies/ directory', () => {
  const evaluator = new PolicyEvaluator();
  const policies = evaluator.getPolicies();

  assert.ok(Object.keys(policies).length > 0);
  assert.ok(policies['filesystem']);
  assert.ok(policies['privacy']);
  assert.ok(policies['network']);
});

test('budget rule blocks over-cap request', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'route',
    estimatedTokens: 500
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Exceeds hard cap/);
});

test('budget rule allows within-cap request', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'route',
    estimatedTokens: 100
  });

  assert.equal(result.allowed, true);
});

test('safety rule blocks destructive operations', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'tool.execute',
    tool: 'bash',
    args: { command: 'rm -rf /' }
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Destructive/);
});

test('filesystem policy blocks .env write', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'file.write',
    filePath: '.env'
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Sensitive files/);
});

test('filesystem policy blocks SSH key write', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'file.write',
    filePath: '~/.ssh/id_rsa'
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /SSH keys/);
});

test('privacy policy blocks API key', () => {
  const evaluator = new PolicyEvaluator();
  const fakeOpenAIKey = `sk-${'1234567890abcdef'.repeat(2)}`;
  const result = evaluator.evaluate({
    action: 'file.write',
    content: `API_KEY=${fakeOpenAIKey}`
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /API key/);
});

test('privacy policy blocks GitHub token', () => {
  const evaluator = new PolicyEvaluator();
  const fakeGitHubToken = `ghp_${'1234567890abcdef'.repeat(2)}12`;
  const result = evaluator.evaluate({
    action: 'file.write',
    content: `GITHUB_TOKEN=${fakeGitHubToken}`
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /GitHub/);
});

test('network policy blocks HTTP URLs', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'tool.execute',
    tool: 'webfetch',
    url: 'http://example.com'
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /HTTP/);
});

test('network policy allows HTTPS URLs', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'tool.execute',
    tool: 'webfetch',
    url: 'https://example.com'
  });

  assert.equal(result.allowed, true);
});

test('MCP trust policy allows trusted servers', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'tool.execute',
    tool: 'mcp',
    server: 'github'
  });

  assert.equal(result.allowed, true);
});

test('MCP trust policy blocks unknown servers', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'tool.execute',
    tool: 'mcp',
    server: 'unknown-server'
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Unknown MCP/);
});

test('licensing policy allows MIT license', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'absorb',
    license: 'MIT'
  });

  assert.equal(result.allowed, true);
});

test('licensing policy blocks unknown license', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'absorb',
    license: 'UNKNOWN'
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Unknown license/);
});

test('loop prevention blocks depth > 2', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'route',
    depth: 3
  });

  assert.equal(result.allowed, false);
  assert.match(result.reason, /Max routing depth/);
});

test('returns allowed when no rules match', () => {
  const evaluator = new PolicyEvaluator();
  const result = evaluator.evaluate({
    action: 'unknown-action',
    data: 'test'
  });

  assert.equal(result.allowed, true);
  assert.match(result.reason, /No rules or policies matched/);
});
