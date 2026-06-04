// Issue #28: loadConnectorRegistry caches the parsed registry by mtime so
// repeated selectConnectorsForTask calls don't re-read disk.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { loadConnectorRegistry, selectConnectorsForTask } from '../../packages/yes-connectors/index.js';

function makeRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yes-conn-'));
  fs.mkdirSync(path.join(dir, 'registry'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'registry/mcps.json'),
    JSON.stringify({
      items: [
        { id: 'gh', provider: 'github', kind: 'mcp', purpose: 'github code search', policy: 'read', enabled: true },
        { id: 'slack', provider: 'slack', kind: 'mcp', purpose: 'team chat', policy: 'read', enabled: true }
      ]
    })
  );
  fs.writeFileSync(
    path.join(dir, 'registry/connector-profiles.json'),
    JSON.stringify({ default_profile: 'all', profiles: { all: { enable: ['gh', 'slack'] } } })
  );
  return dir;
}

test('loadConnectorRegistry returns same object identity across calls (cache hit)', () => {
  const repo = makeRepo();
  const first = loadConnectorRegistry(repo);
  const second = loadConnectorRegistry(repo);
  assert.strictEqual(first.connectors, second.connectors);
});

test('selectConnectorsForTask matches by token overlap', () => {
  const repo = makeRepo();
  const results = selectConnectorsForTask('search github for an issue', { repoRoot: repo, profileName: 'all' });
  assert.ok(results.length > 0);
  assert.equal(results[0].id, 'gh');
});

test('selectConnectorsForTask returns empty array when no tokens match', () => {
  const repo = makeRepo();
  const results = selectConnectorsForTask('alpaca llama', { repoRoot: repo, profileName: 'all' });
  assert.deepEqual(results, []);
});
