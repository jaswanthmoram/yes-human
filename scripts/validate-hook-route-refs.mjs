#!/usr/bin/env node
// scripts/validate-hook-route-refs.mjs
//
// Pre-commit (and CI) check: ensure every `routeId: 'route.foo.bar'` literal
// inside hooks/*.js exists in registry/routes.json. Catches drift between
// hardcoded routing hints and the actual registry.
//
// Exits 1 with a list of dangling references; 0 if everything resolves.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '..');

const routesPath = path.join(repoRoot, 'registry/routes.json');
if (!fs.existsSync(routesPath)) {
  console.error(`✗ registry/routes.json not found at ${routesPath}`);
  process.exit(1);
}
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const validIds = new Set(routes.map((r) => r.route_id));

const hooksDir = path.join(repoRoot, 'hooks');
if (!fs.existsSync(hooksDir)) {
  console.log('No hooks directory — nothing to validate.');
  process.exit(0);
}

const hookFiles = fs
  .readdirSync(hooksDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => path.join(hooksDir, f));

const routeRefRegex = /['"](route\.[a-z0-9_.-]+)['"]/g;
const dangling = [];

for (const file of hookFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const seen = new Set();
  let match;
  while ((match = routeRefRegex.exec(content)) !== null) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    if (!validIds.has(id)) {
      // Compute line number for the offending match.
      const upto = content.slice(0, match.index);
      const line = upto.split('\n').length;
      dangling.push({ file: path.relative(repoRoot, file), line, id });
    }
  }
}

if (dangling.length === 0) {
  console.log(`✓ All route references in hooks/ resolve against registry/routes.json (${validIds.size} routes).`);
  process.exit(0);
}

console.error(`✗ Found ${dangling.length} dangling route reference(s) in hooks/:`);
for (const { file, line, id } of dangling) {
  console.error(`  ${file}:${line}  → ${id}`);
}
console.error('\nEither add these routes to registry/routes.json or remove the references.');
process.exit(1);
