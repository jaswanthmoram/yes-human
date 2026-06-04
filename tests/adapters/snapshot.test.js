import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { loadBuildContext, buildAll, repoRoot } from '../../packages/yes-adapters/index.js';

const generatedRoot = path.join(repoRoot, 'generated');
const snapshotDir = path.join(repoRoot, 'tests', 'fixtures', 'snapshots');

before(async () => {
  const ctx = loadBuildContext();
  await buildAll(ctx);
  fs.mkdirSync(snapshotDir, { recursive: true });
});

function assertSnapshot(name, content) {
  const snapshotPath = path.join(snapshotDir, `${name}.snap`);
  // Normalize date/version fields that naturally change every build
  const normalizedContent = content
    .replace(/"generated_at":\s*"[^"]*"/g, '"generated_at": "normalized-date"')
    .replace(/"version":\s*"[^"]*"/g, '"version": "normalized-version"')
    .replace(/"value":\s*"[^"]*"/g, '"value": "normalized-value"')
    .replace(/"public_key":\s*"[^"]*"/g, '"public_key": "normalized-public_key"')
    .replace(/"signed_at":\s*"[^"]*"/g, '"signed_at": "normalized-signed_at"')
    .replace(/on\s*\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?/g, 'on normalized-date');

  if (!fs.existsSync(snapshotPath)) {
    fs.writeFileSync(snapshotPath, normalizedContent, 'utf8');
    console.log(`✓ Stored snapshot for ${name}`);
    return;
  }

  const expected = fs.readFileSync(snapshotPath, 'utf8');
  assert.equal(normalizedContent, expected, `Snapshot mismatch for ${name}. If intentional, delete the snapshot file in tests/fixtures/snapshots/ to regenerate.`);
}

test('claude CLAUDE.md matches snapshot', () => {
  const p = path.join(generatedRoot, 'claude', 'CLAUDE.md');
  if (fs.existsSync(p)) {
    assertSnapshot('claude-claude-md', fs.readFileSync(p, 'utf8'));
  }
});

test('mcp mcp-manifest.json matches snapshot', () => {
  const p = path.join(generatedRoot, 'mcp', 'mcp-manifest.json');
  if (fs.existsSync(p)) {
    assertSnapshot('mcp-manifest-json', fs.readFileSync(p, 'utf8'));
  }
});

test('generic manifest.json matches snapshot', () => {
  const p = path.join(generatedRoot, 'generic', 'manifest.json');
  if (fs.existsSync(p)) {
    assertSnapshot('generic-manifest-json', fs.readFileSync(p, 'utf8'));
  }
});
