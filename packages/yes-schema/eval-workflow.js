import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../yes-runtime/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function loadFixtures() {
  const dir = path.join(repoRoot, 'tests', 'workflows');
  if (!fs.existsSync(dir)) return [];

  const out = [];
  for (const file of fs
    .readdirSync(dir)
    .filter((entry) => entry.endsWith('.fixtures.json'))
    .sort()) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const fixture of data.fixtures || []) {
      out.push({ ...fixture, file });
    }
  }
  return out;
}

const thresholds =
  JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'eval-thresholds.json'), 'utf8')).routing || {};

const fixtures = loadFixtures();
if (fixtures.length === 0) {
  console.error('✗ No workflow fixtures found in tests/workflows/*.fixtures.json');
  process.exit(1);
}

let correct = 0;
let evaluated = 0;
const failures = [];

for (const fixture of fixtures) {
  if (fixture.expected_route && !fixture.expected_workflow) {
    continue;
  }
  evaluated++;
  const resolved = await resolveRoute(fixture.prompt);
  const resolvedWorkflow = resolved.target?.workflow || null;
  const resolvedAgent = resolved.target?.agent || null;
  const expectedWorkflow = fixture.expected_workflow;
  const expectedPrimaryAgent = fixture.expected_primary_agent || null;

  const workflowMatch = resolvedWorkflow === expectedWorkflow;
  const agentMatch = !expectedPrimaryAgent || resolvedAgent === expectedPrimaryAgent;

  if (workflowMatch && agentMatch) {
    correct++;
    continue;
  }

  const details = [`workflow ${resolvedWorkflow} (expected ${expectedWorkflow})`];
  if (expectedPrimaryAgent) {
    details.push(`agent ${resolvedAgent} (expected ${expectedPrimaryAgent})`);
  }
  failures.push(`"${fixture.prompt}" -> ${details.join(', ')}`);
}

const total = evaluated;
const top1 = total > 0 ? correct / total : 0;
const minTop1 = thresholds.exact_alias_top1_min ?? 0.95;
const ok = top1 >= minTop1;

console.log('--- Workflow eval ---');
console.log(`fixtures: ${total} (${fixtures.length} loaded)`);
console.log(`top-1 accuracy: ${(top1 * 100).toFixed(1)}% (min ${(minTop1 * 100).toFixed(1)}%)`);

if (failures.length) {
  console.log('\nmismatches:');
  for (const failure of failures) {
    console.log(`  ✗ ${failure}`);
  }
}

console.log(ok ? '\n✓ Workflow eval passed.' : '\n✗ Workflow eval failed thresholds.');
process.exit(ok ? 0 : 1);
