#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { readGraphRoutingConfig, isGraphStale } from '../yes-runtime/lib/code-graph-assist.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const gr = readGraphRoutingConfig(repoRoot);
const graphStale = isGraphStale(repoRoot, gr);
let routeAcc = 'n/a';
try {
  const out = execSync('node packages/yes-schema/eval-route.js', { cwd: repoRoot, encoding: 'utf8' });
  routeAcc = out.match(/top-1 accuracy: ([\d.]+)%/)?.[1] || routeAcc;
} catch (_) {}
const profiles = fs.existsSync(path.join(repoRoot, 'registry/connector-profiles.json'));
const oss = fs.existsSync(path.join(repoRoot, 'staging/normalized/anthropics-skills/manifest.json'));
const lines = [
  '# Phase 10 Acceptance',
  '',
  'Generated: ' + new Date().toISOString(),
  '',
  '## Summary',
  '- Code graph assist: ' + (gr.code_graph_assist ? 'enabled' : 'disabled'),
  '- Graph DB stale: ' + graphStale.stale + (graphStale.built_at ? ' (built ' + graphStale.built_at + ')' : ''),
  '- Route eval accuracy: ' + routeAcc + '%',
  '- Connector profiles: ' + profiles,
  '- OSS absorber slice manifest: ' + oss,
  ''
];
fs.writeFileSync(path.join(repoRoot, 'reports/phase10-acceptance.md'), lines.join('\n') + '\n');
console.log('✓ Wrote reports/phase10-acceptance.md');
