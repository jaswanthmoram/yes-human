import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PolicyEvaluator } from '../../packages/yes-core/policy-evaluator.js';

const ev = new PolicyEvaluator();

test('high-stakes policy is loaded', () => {
  const policies = ev.getPolicies();
  assert.ok(policies['high-stakes'], 'high-stakes.policy.json present and parsed');
  assert.equal(policies['high-stakes'].id, 'high-stakes.policy');
});

test('PHI content is denied on file.write', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: '/tmp/notes.md',
    content: 'Patient John Doe was given diagnosis Type 2 diabetes, MRN 12345.'
  });
  assert.equal(r.allowed, false);
  assert.match(r.reason, /PHI|patient/i);
});

test('contract filename triggers ask', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'drafts/master-services-agreement.docx',
    content: 'draft'
  });
  assert.equal(r.allowed, false); // ask is not allowed without confirmation
  assert.match(r.reason, /legal|attorney/i);
});

test('finance agent output requires ask gate', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'reports/q3-forecast.md',
    agent: 'finance.master',
    content: 'forecast content'
  });
  assert.equal(r.allowed, false);
  assert.match(r.reason, /finance|disclaimer|review/i);
});

test('healthcare agent output requires ask gate', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'notes/clinical.md',
    agent: 'healthcare.master',
    content: 'guideline summary, no PHI'
  });
  assert.equal(r.allowed, false);
  assert.match(r.reason, /healthcare|clinician|medical advice/i);
});

test('legal-compliance agent output requires ask gate', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'reviews/contract-risk.md',
    agent: 'legal-compliance.master',
    content: 'risk summary'
  });
  assert.equal(r.allowed, false);
  assert.match(r.reason, /legal|attorney/i);
});

test('hr agent output requires ask gate', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'drafts/onboarding.md',
    agent: 'hr.master',
    content: 'onboarding plan'
  });
  assert.equal(r.allowed, false);
  assert.match(r.reason, /hr|employment|manager review/i);
});

test('engineering agent output is unaffected by high-stakes policy', () => {
  const r = ev.evaluate({
    action: 'file.write',
    filePath: 'src/router.js',
    agent: 'engineering.code-reviewer',
    content: 'function add() {}'
  });
  // Should NOT be denied by high-stakes; falls through to default allow
  // (other policies may still gate it, but high-stakes specifically should not)
  assert.ok(
    !/healthcare|attorney|clinician|employment|finance|hr/i.test(r.reason || ''),
    `expected reason without high-stakes marker, got: ${r.reason}`
  );
});
