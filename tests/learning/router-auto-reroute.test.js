import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { LearningEngine } from '../../packages/yes-runtime/learning-engine.js';
import { resolveRouteSync } from '../../packages/yes-runtime/router.js';

test('dynamic rerouting based on mistake graph suggestions', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-auto-reroute-'));
  const prev = process.cwd();
  try {
    fs.mkdirSync(path.join(dir, 'graph/memory/learning'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'graph/indexes'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'registry'), { recursive: true });
    
    // Write routes index
    fs.writeFileSync(
      path.join(dir, 'graph/indexes/ROUTE_TABLE.min.json'),
      JSON.stringify({
        version: '1',
        fallback: 'route.meta-system.supreme-router',
        routes: {
          'code review': 'route.engineering.code-reviewer',
          'security audit': 'route.security.security-reviewer'
        }
      })
    );
    fs.writeFileSync(path.join(dir, 'graph/indexes/ALIAS_TABLE.min.json'), JSON.stringify({ aliases: {} }));
    
    // Write registry routes
    fs.writeFileSync(
      path.join(dir, 'registry/routes.json'),
      JSON.stringify([
        { route_id: 'route.engineering.code-reviewer', target: { agent: 'engineering.code-reviewer' }, match: { negative_keywords: [] } },
        { route_id: 'route.security.security-reviewer', target: { agent: 'security.security-reviewer' }, match: { negative_keywords: [] } },
        { route_id: 'route.meta-system.supreme-router', target: { agent: 'meta-system.supreme-router' }, match: { negative_keywords: [] } }
      ])
    );
    
    // Write learning policy with read_only: false
    fs.writeFileSync(
      path.join(dir, 'registry/learning-policy.json'),
      JSON.stringify({
        routing_hints: { enabled: true, read_only: false },
        mistake_graph: { state_file: 'graph/memory/learning/mistake-graph.json', min_repeats_for_candidate: 1 }
      })
    );
    
    // Create mistake graph entry pointing from code-reviewer to security-reviewer
    const engine = new LearningEngine({
      repoRoot: dir,
      learningDir: path.join(dir, 'graph/memory/learning'),
      mistakeGraphFile: path.join(dir, 'graph/memory/learning/mistake-graph.json'),
      policy: {
        routing_hints: { enabled: true, read_only: false },
        mistake_graph: { min_repeats_for_candidate: 1 }
      }
    });
    
    engine.trackOutcome({
      route_id: 'route.engineering.code-reviewer',
      success: false,
      failure_class: 'wrong-agent',
      suggested_route: 'route.security.security-reviewer'
    });
    
    process.chdir(dir);
    
    // Resolve route and verify it rerouted automatically!
    const route = await resolveRouteSync('please code review');
    assert.equal(route.route_id, 'route.security.security-reviewer');
    assert.equal(route._match.stage, 'mistake_reroute');
    assert.equal(route._match.original_route, 'route.engineering.code-reviewer');
    
  } finally {
    process.chdir(prev);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('does not reroute when read_only is true', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-read-only-reroute-'));
  const prev = process.cwd();
  try {
    fs.mkdirSync(path.join(dir, 'graph/memory/learning'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'graph/indexes'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'registry'), { recursive: true });
    
    fs.writeFileSync(
      path.join(dir, 'graph/indexes/ROUTE_TABLE.min.json'),
      JSON.stringify({
        version: '1',
        fallback: 'route.meta-system.supreme-router',
        routes: { 'code review': 'route.engineering.code-reviewer' }
      })
    );
    fs.writeFileSync(path.join(dir, 'graph/indexes/ALIAS_TABLE.min.json'), JSON.stringify({ aliases: {} }));
    
    fs.writeFileSync(
      path.join(dir, 'registry/routes.json'),
      JSON.stringify([
        { route_id: 'route.engineering.code-reviewer', target: { agent: 'engineering.code-reviewer' }, match: { negative_keywords: [] } }
      ])
    );
    
    // Write learning policy with read_only: true
    fs.writeFileSync(
      path.join(dir, 'registry/learning-policy.json'),
      JSON.stringify({
        routing_hints: { enabled: true, read_only: true },
        mistake_graph: { state_file: 'graph/memory/learning/mistake-graph.json', min_repeats_for_candidate: 1 }
      })
    );
    
    const engine = new LearningEngine({
      repoRoot: dir,
      learningDir: path.join(dir, 'graph/memory/learning'),
      mistakeGraphFile: path.join(dir, 'graph/memory/learning/mistake-graph.json'),
      policy: {
        routing_hints: { enabled: true, read_only: true },
        mistake_graph: { min_repeats_for_candidate: 1 }
      }
    });
    
    engine.trackOutcome({
      route_id: 'route.engineering.code-reviewer',
      success: false,
      failure_class: 'wrong-agent',
      suggested_route: 'route.security.security-reviewer'
    });
    
    process.chdir(dir);
    
    // Resolve route and verify it did NOT reroute
    const route = await resolveRouteSync('please code review');
    assert.equal(route.route_id, 'route.engineering.code-reviewer');
    assert.notEqual(route._match.stage, 'mistake_reroute');
    
  } finally {
    process.chdir(prev);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
