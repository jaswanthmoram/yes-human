import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CodeGraph } from '../../packages/yes-graph/code-graph.js';
import { buildContextPack, promptWantsGraphAssist } from '../../packages/yes-runtime/lib/code-graph-assist.js';

let workDir;
before(async () => {
  workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-assist-'));
  fs.writeFileSync(path.join(workDir, 'router.js'), 'export function resolveRoute() {}\n');
  fs.mkdirSync(path.join(workDir, 'registry'), { recursive: true });
  fs.writeFileSync(
    path.join(workDir, 'registry/graph-routing.json'),
    JSON.stringify({
      code_graph_assist: true,
      db_path: 'graph/indexes/yes.sqlite'
    })
  );
  fs.mkdirSync(path.join(workDir, 'graph/indexes'), { recursive: true });
  await CodeGraph.build(workDir, path.join(workDir, 'graph/indexes/yes.sqlite'));
});

after(() => fs.rmSync(workDir, { recursive: true, force: true }));

test('detects path-like prompts', () => {
  assert.equal(promptWantsGraphAssist('fix packages/yes-runtime/router.js'), true);
});

test('returns context pack when graph exists', () => {
  const pack = buildContextPack(workDir, 'refactor router.js resolveRoute function');
  assert.ok(pack.length > 0);
  assert.ok(pack[0].file);
});
