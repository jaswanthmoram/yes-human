#!/usr/bin/env node
/**
 * Remove exact duplicate trigger keys in ROUTE_TABLE.min.json (keeps first).
 * Guard: eval-route must stay >= 95%.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tablePath = path.join(repoRoot, 'graph/indexes/ROUTE_TABLE.min.json');
const apply = process.argv.includes('--apply');

const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
const routes = table.routes || {};
const seen = new Map();
const dupes = [];
for (const [trigger, routeId] of Object.entries(routes)) {
  const key = trigger + '::' + routeId;
  if (seen.has(trigger) && seen.get(trigger) === routeId) {
    dupes.push(trigger);
    continue;
  }
  if (seen.has(trigger) && seen.get(trigger) !== routeId) {
    console.warn('collision (different routes):', trigger, seen.get(trigger), routeId);
  }
  seen.set(trigger, routeId);
}
const uniqueKeys = [...new Set(Object.keys(routes))];
const exactDupKeyCount =
  Object.keys(routes).length - new Set(Object.entries(routes).map(([k, v]) => k + '::' + v)).size;

let removed = 0;
if (apply && exactDupKeyCount === 0) {
  const next = {};
  const used = new Set();
  for (const [trigger, routeId] of Object.entries(routes)) {
    const sig = trigger + '::' + routeId;
    if (used.has(sig)) {
      removed++;
      continue;
    }
    used.add(sig);
    next[trigger] = routeId;
  }
  if (removed) {
    table.routes = next;
    table.generated_at = new Date().toISOString();
    fs.writeFileSync(tablePath, JSON.stringify(table, null, 2) + '\n');
  }
}

function evalRoute() {
  const out = execSync('node packages/yes-schema/eval-route.js', { cwd: repoRoot, encoding: 'utf8' });
  const m = out.match(/accuracy: ([\d.]+)%/);
  return m ? Number(m[1]) : 0;
}

const before = evalRoute();
console.log(
  'Route triggers:',
  Object.keys(routes).length,
  'exact duplicate sigs:',
  exactDupKeyCount,
  'removed:',
  removed
);
console.log('Route eval accuracy:', before + '%');
if (before < 95) {
  console.error('✗ eval-route below 95% — abort');
  process.exit(1);
}
console.log(apply ? '✓ apply complete' : 'dry-run only (pass --apply to write)');
