import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../yes-runtime/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const FALLBACK = 'route.meta-system.supreme-router';
const domainOf = (routeId) => (routeId || '').split('.')[1] || 'unknown';

function loadFixtures() {
  const dir = path.join(repoRoot, 'tests', 'routing');
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.fixtures.json'))) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const fx of data.fixtures || []) out.push({ ...fx, file });
  }
  return out;
}

const thresholds =
  JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'eval-thresholds.json'), 'utf8')).routing || {};

const fixtures = loadFixtures();
if (fixtures.length === 0) {
  console.error('✗ No routing fixtures found in tests/routing/*.fixtures.json');
  process.exit(1);
}

let correct = 0;
let wrongDomain = 0;
let missingRoute = 0;
const failures = [];

for (const fx of fixtures) {
  const resolved = (await resolveRoute(fx.prompt)).route_id;
  const expected = fx.expected_route;
  const expectedDomain = fx.expected_domain || domainOf(expected);
  const resolvedDomain = domainOf(resolved);

  if (resolved === expected) {
    correct++;
  } else {
    failures.push(`"${fx.prompt}" → ${resolved} (expected ${expected})`);
    const expectedFallback = expected === FALLBACK;
    if (!expectedFallback && resolved === FALLBACK) missingRoute++;
    else if (!expectedFallback && resolvedDomain !== expectedDomain) wrongDomain++;
  }
}

const total = fixtures.length;
const top1 = correct / total;
const wrongDomainRate = wrongDomain / total;
const missingRouteRate = missingRoute / total;

console.log('--- Routing eval ---');
console.log(`fixtures: ${total}`);
console.log(`top-1 accuracy: ${(top1 * 100).toFixed(1)}% (min ${(thresholds.exact_alias_top1_min ?? 0.95) * 100}%)`);
console.log(
  `wrong-domain rate: ${(wrongDomainRate * 100).toFixed(1)}% (max ${(thresholds.wrong_domain_rate_max ?? 0.03) * 100}%)`
);
console.log(
  `missing-route rate: ${(missingRouteRate * 100).toFixed(1)}% (max ${(thresholds.missing_route_rate_max ?? 0.02) * 100}%)`
);

if (failures.length) {
  console.log('\nmismatches:');
  for (const f of failures) console.log(`  ✗ ${f}`);
}

let ok = true;
if (top1 < (thresholds.exact_alias_top1_min ?? 0.95)) ok = false;
if (wrongDomainRate > (thresholds.wrong_domain_rate_max ?? 0.03)) ok = false;
if (missingRouteRate > (thresholds.missing_route_rate_max ?? 0.02)) ok = false;

console.log(ok ? '\n✓ Routing eval passed.' : '\n✗ Routing eval failed thresholds.');
process.exit(ok ? 0 : 1);
