import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { resolveRoute } from '../../packages/yes-runtime/router.js';
import { loadBuildContext, buildHost, repoRoot } from '../../packages/yes-adapters/index.js';
import { validateHostBundle } from '../../validators/host-bundle.validator.js';
import { WorkflowOrchestrator } from '../../packages/yes-workflows/index.js';
import { runDriftCheck } from '../../packages/yes-schema/validate-drift.js';

function readJSON(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function estimateAgentTokens(agentId) {
  if (!agentId) return 0;
  const parts = agentId.split('.');
  const file = path.join(repoRoot, 'content', 'agents', parts[0], `${parts.slice(1).join('.')}.md`);
  if (!fs.existsSync(file)) return 0;
  return Math.ceil(fs.readFileSync(file, 'utf8').length / 4);
}

test('offline E2E smoke resolves representative tasks through hooks within context budget', async () => {
  const costPolicy = readJSON('registry/cost-policy.json');
  const agents = readJSON('registry/agents.json').items;
  const cases = [
    ['review code', 'route.engineering.code-reviewer', false],
    ['campaign analysis', 'route.marketing.campaign-analyst', false],
    ['brand management', 'route.marketing.brand-manager', false],
    ['expense audit', 'route.finance.expense-auditor', true],
    ['zzzz totally unknown task qwerty', 'route.meta-system.supreme-router', false]
  ];

  for (const [prompt, expectedRoute, expectsDisclaimer] of cases) {
    const route = await resolveRoute(prompt);
    const band = route.budget_band ?? 'micro';
    const maxContext = costPolicy.bands?.[band]?.max_context_tokens;
    const agent = agents.find((item) => item.id === route.target?.agent);

    assert.equal(route.route_id, expectedRoute, prompt);
    assert.ok(route._hooks?.pre_route?.length >= 1, `${prompt} did not run pre-route hooks`);
    assert.ok(Number.isFinite(maxContext), `${prompt} missing cost policy band`);
    assert.ok(estimateAgentTokens(route.target?.agent) <= maxContext, `${prompt} exceeds context band`);
    assert.equal(Boolean(agent?.requires_disclaimer || agent?.human_review_gate), expectsDisclaimer, prompt);
  }
});

test('offline E2E smoke builds and reparses the generic host bundle', async () => {
  const ctx = loadBuildContext();
  await buildHost('generic', ctx);

  const dir = path.join(repoRoot, 'generated', 'generic');
  const { ok, checks } = validateHostBundle('generic', dir);
  const failures = checks.filter((check) => !check.passed).map((check) => `${check.label}: ${check.detail}`);
  assert.ok(ok, failures.join('; '));

  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  assert.equal(manifest.name, 'yes-human-generic');
  assert.equal(manifest.trust_model, 'zero-trust');
  assert.equal(manifest.route_table, 'graph/indexes/ROUTE_TABLE.min.json');
  assert.equal(manifest.registries?.agents, 'registry/agents.json');
});

test('workflow dry-run and drift', async () => {
  const o = new WorkflowOrchestrator({ repoRoot });
  const plan = await o.run('workflow.engineering.code-review-with-security', { dryRun: true });
  assert.ok(plan.steps.length >= 1);
  assert.ok(runDriftCheck(repoRoot));
});
