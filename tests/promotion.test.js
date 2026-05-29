import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePromotion } from '../validators/promotion.validator.js';

const licenseRegistry = {
  allowed: ['MIT', 'Apache-2.0'],
  forbidden: ['GPL-3.0', 'Unclear'],
  restricted: ['MPL-2.0']
};

const goodDossier = {
  agent_id: 'engineering.code-reviewer',
  expires_at: '2999-01-01T00:00:00Z',
  sources: [{
    url: 'https://github.com/example/repo',
    license: 'MIT',
    version_or_commit: 'abc123',
    used_for: ['review checklist'],
    copy_policy: 'patterns_only'
  }],
  scores: { total: 86 }
};

test('a complete MIT dossier is eligible for production', () => {
  const r = evaluatePromotion(goodDossier, { licenseRegistry, targetGate: 'production' });
  assert.equal(r.allowed, true);
  assert.equal(r.blockers.length, 0);
});

test('forbidden license blocks promotion', () => {
  const d = structuredClone(goodDossier);
  d.sources[0].license = 'GPL-3.0';
  const r = evaluatePromotion(d, { licenseRegistry, targetGate: 'production' });
  assert.equal(r.allowed, false);
  assert.ok(r.blockers.some((b) => b.includes('license')));
});

test('low score blocks production but not staging', () => {
  const d = structuredClone(goodDossier);
  d.scores.total = 50;
  assert.equal(evaluatePromotion(d, { licenseRegistry, targetGate: 'production' }).allowed, false);
  assert.equal(evaluatePromotion(d, { licenseRegistry, targetGate: 'staging' }).allowed, true);
});

test('expired dossier is blocked', () => {
  const d = structuredClone(goodDossier);
  d.expires_at = '2000-01-01T00:00:00Z';
  const r = evaluatePromotion(d, { licenseRegistry, targetGate: 'production' });
  assert.equal(r.allowed, false);
  assert.ok(r.blockers.some((b) => b.includes('expired')));
});

test('source without used_for is too generic and blocked', () => {
  const d = structuredClone(goodDossier);
  d.sources[0].used_for = [];
  const r = evaluatePromotion(d, { licenseRegistry, targetGate: 'production' });
  assert.equal(r.allowed, false);
  assert.ok(r.blockers.some((b) => b.includes('too generic')));
});

test('restricted license with exact_copy is blocked; patterns_only warns', () => {
  const exact = structuredClone(goodDossier);
  exact.sources[0].license = 'MPL-2.0';
  exact.sources[0].copy_policy = 'exact_copy';
  assert.equal(evaluatePromotion(exact, { licenseRegistry, targetGate: 'production' }).allowed, false);

  const patterns = structuredClone(goodDossier);
  patterns.sources[0].license = 'MPL-2.0';
  const r = evaluatePromotion(patterns, { licenseRegistry, targetGate: 'production' });
  assert.equal(r.allowed, true);
  assert.ok(r.warnings.length > 0);
});
