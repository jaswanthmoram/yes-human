import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateStagingDossier, MIN_STAGING_SOURCES } from '../validators/promotion.validator.js';
import { scoreDossier } from '../packages/yes-schema/dossier-scorer.js';
const licenseRegistry = { allowed: ['MIT', 'Apache-2.0', 'CC0-1.0'], forbidden: ['GPL-3.0'], restricted: ['MPL-2.0'] };
function stagingDossier() {
  const official = { url: 'https://docs.example.com/guide', license: 'Apache-2.0', version_or_commit: '2026-06-02', used_for: ['official guidance'], copy_policy: 'patterns_only', source_type: 'official_docs', last_updated: '2026-05-15T00:00:00Z' };
  const github = { url: 'https://github.com/example/repo', license: 'MIT', version_or_commit: 'abc123', used_for: ['checklist'], copy_policy: 'patterns_only', stars: 1200, last_updated: '2026-05-15T00:00:00Z', source_type: 'github_repo' };
  const sources = [official, github];
  let i = 0;
  while (sources.length < MIN_STAGING_SOURCES) sources.push({ ...github, url: 'https://github.com/example/repo-' + (i++) });
  const scores = scoreDossier({ sources });
  return { agent_id: 'engineering.code-reviewer', domain: 'engineering', expires_at: '2999-01-01T00:00:00Z', sources, scores, promotion_decision: 'staging' };
}
test('self-ref-only dossier fails staging gate', () => {
  const d = stagingDossier();
  d.sources = Array.from({ length: MIN_STAGING_SOURCES }, (_, i) => ({ url: 'https://github.com/yes-human/yes-human', license: 'MIT', version_or_commit: 'main', used_for: ['p'+i], copy_policy: 'patterns_only', source_type: 'github_repo', stars: 500, last_updated: '2026-05-15T00:00:00Z' }));
  d.scores = scoreDossier(d);
  const r = evaluateStagingDossier(d, { licenseRegistry });
  assert.equal(r.allowed, false);
});
test('rich dossier passes staging gate', () => {
  assert.equal(evaluateStagingDossier(stagingDossier(), { licenseRegistry }).allowed, true);
});
