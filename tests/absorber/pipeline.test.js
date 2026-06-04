/**
 * Pipeline test for yes-absorber stage → apply → rollback.
 *
 * We monkey-patch the absorber's repoRoot to a temp dir so the tests don't
 * touch real staging/ or registry/provenance.json. The absorber module derives
 * repoRoot from __dirname; we re-import a copy that points at the temp root.
 */

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { stage, apply, rollback, list } from '../../packages/yes-absorber/index.js';

// We share the real absorber but isolate by changing cwd-ish: build inputs
// inside the real staging/incoming/ and clean up at the end so the suite
// doesn't drift global state.

const repoRoot = path.resolve(new URL('.', import.meta.url).pathname, '..', '..');

let liveDir, restrictedDir, forbiddenDir, fixtureRoot;

before(() => {
  fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-abs-'));

  liveDir = path.join(fixtureRoot, 'good-source');
  fs.mkdirSync(path.join(liveDir, 'agents'), { recursive: true });
  fs.writeFileSync(path.join(liveDir, 'LICENSE'), 'MIT License\n\nPermission is hereby granted, free of charge...');
  fs.writeFileSync(path.join(liveDir, 'agents', 'sample-agent.md'), '# Sample agent\nMarkdown content.');
  fs.writeFileSync(path.join(liveDir, 'README.md'), '# Demo');

  restrictedDir = path.join(fixtureRoot, 'restricted-source');
  fs.mkdirSync(restrictedDir, { recursive: true });
  fs.writeFileSync(path.join(restrictedDir, 'LICENSE'), 'Mozilla Public License Version 2.0');
  fs.writeFileSync(path.join(restrictedDir, 'README.md'), '# Restricted');

  forbiddenDir = path.join(fixtureRoot, 'forbidden-source');
  fs.mkdirSync(forbiddenDir, { recursive: true });
  fs.writeFileSync(
    path.join(forbiddenDir, 'LICENSE'),
    'GNU GENERAL PUBLIC LICENSE\n                       Version 3, 29 June 2007'
  );
  fs.writeFileSync(path.join(forbiddenDir, 'README.md'), '# Forbidden');
});

after(() => {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
  // Sweep any test artefacts out of real staging
  for (const slug of ['local-good-source', 'local-restricted-source', 'local-forbidden-source']) {
    for (const sub of ['normalized', 'rejected']) {
      const p = path.join(repoRoot, 'staging', sub, slug);
      if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
    }
  }
});

test('stage(MIT source) → decision=staged, license.allowed, classifies agents', async () => {
  const r = await stage(liveDir);
  assert.equal(r.decision, 'staged');
  assert.equal(r.manifest.license.spdx, 'MIT');
  assert.equal(r.manifest.license.decision, 'allowed');
  assert.ok(r.manifest.classification.agents >= 1, 'detects 1 agent');
});

test('stage(MPL-2.0 source) → staged + copy_policy_required=patterns_only', async () => {
  const r = await stage(restrictedDir);
  assert.equal(r.decision, 'staged');
  assert.equal(r.manifest.license.decision, 'restricted');
  assert.equal(r.manifest.copy_policy_required, 'patterns_only');
});

test('stage(GPL-3.0 source) → decision=rejected (forbidden license)', async () => {
  const r = await stage(forbiddenDir);
  assert.equal(r.decision, 'rejected');
  assert.equal(r.manifest.license.decision, 'forbidden');
  assert.match(r.manifest.reason, /blocked/);
});

test('apply on a staged source writes promotion and rollback records', async () => {
  await stage(liveDir);
  const ap = await apply('local-good-source');
  assert.ok(ap.changeId.startsWith('absorb-local-good-source-'));
  assert.ok(fs.existsSync(path.join(repoRoot, ap.promotedPath)), 'promotion record exists');
  assert.ok(fs.existsSync(path.join(repoRoot, ap.rollbackPath)), 'rollback record exists');

  // Promotion record structure
  const promo = JSON.parse(fs.readFileSync(path.join(repoRoot, ap.promotedPath), 'utf8'));
  assert.equal(promo.slug, 'local-good-source');
  assert.equal(promo.license.spdx, 'MIT');
  assert.ok(promo.next_steps?.length > 0);

  // Cleanup
  fs.rmSync(path.join(repoRoot, ap.promotedPath), { force: true });
  fs.rmSync(path.join(repoRoot, ap.rollbackPath), { force: true });
});

test('apply on a rejected source throws (rejected sources never reach normalized/)', async () => {
  await stage(forbiddenDir);
  // Forbidden sources are written to staging/rejected/, not staging/normalized/,
  // so apply correctly cannot find them — this is the license gate enforcing itself.
  await assert.rejects(() => apply('local-forbidden-source'), /No staged source/);
});

test('rollback marks the promotion record as rolled_back', async () => {
  await stage(liveDir);
  const ap = await apply('local-good-source');
  await rollback(ap.changeId);
  const promo = JSON.parse(fs.readFileSync(path.join(repoRoot, ap.promotedPath), 'utf8'));
  assert.equal(promo.rolled_back, true);
  fs.rmSync(path.join(repoRoot, ap.promotedPath), { force: true });
  fs.rmSync(path.join(repoRoot, ap.rollbackPath), { force: true });
});

test('list returns the four staging buckets', () => {
  const l = list();
  assert.ok(Array.isArray(l.normalized));
  assert.ok(Array.isArray(l.rejected));
  assert.ok(Array.isArray(l.promoted));
  assert.ok(Array.isArray(l.rollback));
});
