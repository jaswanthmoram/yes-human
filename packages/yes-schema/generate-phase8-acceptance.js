import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../yes-runtime/router.js';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function estimateTokens(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter(Boolean);
  let tokens = 0;
  for (const word of words) {
    const specialChars = word.match(/[{}[\]()=+\-*/&|!><;,.]/g);
    const specialCount = specialChars ? specialChars.length : 0;
    const cleanWord = word.replace(/[{}[\]()=+\-*/&|!><;,.]/g, '');
    if (cleanWord.length > 0) {
      tokens += Math.max(1, Math.ceil(cleanWord.length / 4));
    }
    tokens += specialCount;
  }
  return tokens;
}

function loadFixtureFiles(relativeDir) {
  const dir = path.join(repoRoot, relativeDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.fixtures.json')).sort();
}

function loadFixtures(relativeDir) {
  const files = loadFixtureFiles(relativeDir);
  const fixtures = [];
  for (const file of files) {
    const parsed = readJson(path.join(relativeDir, file));
    for (const fixture of parsed.fixtures || []) {
      fixtures.push({ ...fixture, file });
    }
  }
  return fixtures;
}

function domainOfRoute(routeId) {
  const parts = String(routeId || '').split('.');
  if (parts[1] === 'workflow') return parts[2] || 'unknown';
  return parts[1] || 'unknown';
}

async function evaluateRoutes() {
  const thresholds = readJson('registry/eval-thresholds.json').routing || {};
  const fixtures = loadFixtures('tests/routing');
  const fallback = 'route.meta-system.supreme-router';
  let correct = 0;
  let wrongDomain = 0;
  let missingRoute = 0;

  for (const fixture of fixtures) {
    const resolved = await resolveRoute(fixture.prompt);
    const actual = resolved.route_id;
    const expected = fixture.expected_route;
    const expectedDomain = fixture.expected_domain || domainOfRoute(expected);
    const actualDomain = domainOfRoute(actual);
    if (actual === expected) {
      correct++;
      continue;
    }
    const expectedFallback = expected === fallback;
    if (!expectedFallback && actual === fallback) missingRoute++;
    else if (!expectedFallback && actualDomain !== expectedDomain) wrongDomain++;
  }

  const total = fixtures.length || 1;
  return {
    fixtures: fixtures.length,
    top1: correct / total,
    wrongDomainRate: wrongDomain / total,
    missingRouteRate: missingRoute / total,
    thresholds
  };
}

async function evaluateWorkflows() {
  const thresholds = readJson('registry/eval-thresholds.json').routing || {};
  const fixtures = loadFixtures('tests/workflows');
  let correct = 0;

  for (const fixture of fixtures) {
    const resolved = await resolveRoute(fixture.prompt);
    const workflowMatch = resolved.target?.workflow === fixture.expected_workflow;
    const agentMatch = !fixture.expected_primary_agent || resolved.target?.agent === fixture.expected_primary_agent;
    if (workflowMatch && agentMatch) {
      correct++;
    }
  }

  const total = fixtures.length || 1;
  return {
    fixtures: fixtures.length,
    top1: correct / total,
    thresholds
  };
}

function dossierCoverage() {
  const agents = readJson('registry/agents.json').items;
  const workflows = readJson('registry/workflows.json').items;

  const agentRequired = agents.filter((agent) => agent.quality_gate === 'staging' || agent.quality_gate === 'production');
  const agentPresent = agentRequired.filter((agent) => {
    const [domain, ...rest] = agent.id.split('.');
    return fileExists(`references/${domain}/${rest.join('.')}.sources.json`);
  });

  const workflowRequired = workflows.filter((workflow) => workflow.status !== 'draft');
  const workflowPresent = workflowRequired.filter((workflow) => {
    const [domain, ...rest] = workflow.id.split('.');
    return fileExists(`references/workflows/${domain}/${rest.join('.')}.sources.json`);
  });

  return {
    agents: { present: agentPresent.length, total: agentRequired.length },
    workflows: { present: workflowPresent.length, total: workflowRequired.length }
  };
}

function connectorCoverage() {
  const connectors = readJson('registry/mcps.json').items;
  return {
    total: connectors.length,
    enabled: connectors.filter((connector) => connector.enabled !== false).length,
    disabled: connectors.filter((connector) => connector.enabled === false).map((connector) => connector.id)
  };
}

async function main() {
  const manifest = readJson('yes-human.plugin.json');
  const bootText = fs.readFileSync(path.join(repoRoot, manifest.startup.boot_file), 'utf8');
  const bootTokens = estimateTokens(bootText);
  const thresholds = readJson('registry/eval-thresholds.json');
  const routeEval = await evaluateRoutes();
  const workflowEval = await evaluateWorkflows();
  let skillTop1 = 'n/a';
  let skillFixtures = 'n/a';
  let dossierFailures = 0;
  let selfRefOnly = 0;
  try {
    const skillEvalOut = execSync('node packages/yes-schema/eval-skill.js', { cwd: repoRoot, encoding: 'utf8' });
    const m1 = skillEvalOut.match(/top-1 accuracy: ([\d.]+)%/);
    const m2 = skillEvalOut.match(/fixtures: (\d+)/);
    if (m1) skillTop1 = m1[1];
    if (m2) skillFixtures = m2[1];
  } catch (_) {}
  if (fileExists('reports/dossier-scores.json')) {
    const da = readJson('reports/dossier-scores.json');
    dossierFailures = da.required_failures ?? 0;
    selfRefOnly = da.self_ref_only ?? 0;
  }
  const coverage = dossierCoverage();
  const connectors = connectorCoverage();
  const agents = readJson('registry/agents.json');
  const skills = readJson('registry/skills.json');
  const workflows = readJson('registry/workflows.json');
  const knowledgePacks = readJson('registry/knowledge-packs.json');
  const hookBindings = readJson('registry/hook-bindings.json');
  const categoryPacks = readJson('registry/category-packs.json');

  const lines = [
    '# Phase 8 Acceptance',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    '- Phase 8 scope: Waves 7A–7H longtail + acceptance freeze',
    `- Agents: ${agents.count}`,
    `- Skills: ${skills.count}`,
    `- Canonical workflows: ${workflows.count}`,
    `- Knowledge packs: ${knowledgePacks.count}`,
    `- Hook bindings: ${(hookBindings.bindings?.length ?? hookBindings.count ?? 0)}`,
    `- Category packs: ${categoryPacks.count}`,
    `- Connectors: ${connectors.total} (${connectors.enabled} enabled, ${connectors.disabled.length} disabled)`,
    '',
    '## Evaluation',
    '',
    `- Routing top-1: ${(routeEval.top1 * 100).toFixed(1)}% across ${routeEval.fixtures} fixtures`,
    `- Wrong-domain rate: ${(routeEval.wrongDomainRate * 100).toFixed(1)}%`,
    `- Missing-route rate: ${(routeEval.missingRouteRate * 100).toFixed(1)}%`,
    `- Skill top-1: ${skillTop1}% across ${skillFixtures} fixtures`,
    `- Dossier staging failures: ${dossierFailures}`,
    `- Self-ref-only dossiers: ${selfRefOnly}`,
    `- Workflow top-1: ${(workflowEval.top1 * 100).toFixed(1)}% across ${workflowEval.fixtures} fixtures`,
    '',
    '## Token Budget',
    '',
    `- Boot file: ${manifest.startup.boot_file}`,
    `- Estimated boot tokens: ${bootTokens}`,
    `- Target: ${thresholds.startup_tokens.target}`,
    `- Hard cap: ${thresholds.startup_tokens.hard_cap}`,
    '',
    '## Dossier Coverage',
    '',
    `- Agent dossiers: ${coverage.agents.present}/${coverage.agents.total}`,
    `- Workflow dossiers: ${coverage.workflows.present}/${coverage.workflows.total}`,
    '',
    '## Connector Coverage',
    '',
    `- Enabled connectors: ${connectors.enabled}`,
    `- Disabled declarations: ${connectors.disabled.join(', ') || 'none'}`,
    '',
    '## Notes',
    '',
    '- Workflow routes now target real workflow ids rather than legacy placeholder ids.',
    '- Category packs are generated from categories, agents, workflows, connector mappings, and fixture coverage.',
    '- Optional adapter packs remain out of scope for Phase 8.'
  ];

  const reportPath = path.join(repoRoot, 'reports', 'phase8-acceptance.md');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`);
  console.log(`✓ Wrote ${path.relative(repoRoot, reportPath)}`);
}

await main();
