import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { LearningEngine } from '../../packages/yes-runtime/learning-engine.js';
import { resolveRouteSync } from '../../packages/yes-runtime/router.js';

test('mistake graph hints when routing_hints enabled', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-hints-'));
  const prev = process.cwd();
  try {
    fs.mkdirSync(path.join(dir, 'graph/memory/learning'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'graph/indexes'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'registry'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'graph/indexes/ROUTE_TABLE.min.json'), JSON.stringify({ version:'1', fallback:'route.meta-system.supreme-router', routes:{'code review':'route.engineering.code-reviewer'} }));
    fs.writeFileSync(path.join(dir, 'graph/indexes/ALIAS_TABLE.min.json'), JSON.stringify({ aliases:{} }));
    fs.writeFileSync(path.join(dir, 'registry/routes.json'), JSON.stringify([{ route_id:'route.engineering.code-reviewer', target:{ agent:'engineering.code-reviewer' }, match:{ negative_keywords:[] } }]));
    fs.writeFileSync(path.join(dir, 'registry/learning-policy.json'), JSON.stringify({ routing_hints:{ enabled:true }, mistake_graph:{ state_file:'graph/memory/learning/mistake-graph.json', min_repeats_for_candidate:1 } }));
    const engine = new LearningEngine({ repoRoot:dir, learningDir:path.join(dir,'graph/memory/learning'), mistakeGraphFile:path.join(dir,'graph/memory/learning/mistake-graph.json'), policy:{ routing_hints:{enabled:true}, mistake_graph:{min_repeats_for_candidate:1} } });
    engine.trackOutcome({ route_id:'route.engineering.code-reviewer', success:false, failure_class:'wrong-agent', suggested_route:'route.security.security-reviewer' });
    process.chdir(dir);
    const route = await resolveRouteSync('please code review this PR');
    assert.equal(route.route_id, 'route.engineering.code-reviewer');
    assert.ok(route.routing_hints?.length > 0);
  } finally { process.chdir(prev); fs.rmSync(dir, { recursive:true, force:true }); }
});
