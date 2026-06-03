#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SECTION_32_4 = {
  engineering: ['planner','architect','code-reviewer','security-reviewer','tdd-guide','build-resolver','e2e-runner','refactor-cleaner','docs-updater','typescript-reviewer','python-reviewer','java-reviewer','go-reviewer','rust-reviewer','kotlin-reviewer','cpp-reviewer','swift-reviewer'],
  platform: ['devops-engineer','ci-cd-engineer','observability-engineer','cloud-architect','release-manager','incident-responder'],
  'data-ai': ['rag-engineer','eval-engineer','ml-engineer','data-engineer','analytics-engineer','graph-rag-engineer'],
  'product-business': ['ceo-advisor','cto-advisor','cfo-advisor','product-manager','growth-marketer','sales-operator','customer-success-advisor'],
  marketing: ['marketing-strategist','content-marketer','seo-analyst','social-media-manager','email-marketer','campaign-analyst','brand-manager'],
  sales: ['sales-strategist','pipeline-analyst','proposal-generator','competitive-intel-analyst','account-manager','pricing-strategist'],
  finance: ['financial-analyst','budget-planner','forecasting-analyst','cash-flow-manager','payroll-analyst','expense-auditor'],
  'legal-compliance': ['contract-reviewer','compliance-checker','privacy-advisor','terms-drafter','nda-reviewer'],
  hr: ['hiring-manager','onboarding-coordinator','compensation-analyst','performance-reviewer','policy-drafter'],
  'design-content': ['ui-ux-designer','frontend-design-agent','accessibility-auditor','brand-strategist','technical-writer','presentation-designer'],
  integrations: ['github-operator','browser-auto','figma-agent','notion-agent','vercel-agent','stripe-agent','mcp-connector-designer'],
  'meta-system': ['source-miner','plugin-absorber','deduplicator','stub-detector','graph-builder','workflow-miner','cost-controller','adapter-generator','eval-runner']
};

function agentExists(agentId) {
  const [domain, ...rest] = agentId.split('.');
  return fs.existsSync(path.join(repoRoot, 'content/agents', domain, rest.join('.') + '.md'));
}

function isProduction(agentId) {
  const [domain, ...rest] = agentId.split('.');
  const p = path.join(repoRoot, 'content/agents', domain, rest.join('.') + '.md');
  return /quality_gate:\s*production/.test(fs.readFileSync(p, 'utf8'));
}

const expected = [];
for (const [domain, slugs] of Object.entries(SECTION_32_4)) {
  for (const slug of slugs) expected.push(`${domain}.${slug}`);
}

const notProduction = [];
const absent = [];
for (const agentId of expected) {
  if (!agentExists(agentId)) absent.push(agentId);
  else if (!isProduction(agentId)) notProduction.push(agentId);
}

const lines = [
  '# Section 32.4 gap report', '',
  `Generated: ${new Date().toISOString()}`,
  `Not production: ${notProduction.length}`,
  `Absent from repo: ${absent.length}`, '',
  '## Not production', ...notProduction.map((id) => `- ${id}`), '',
  '## Absent', ...absent.map((id) => `- ${id}`), ''
];
fs.writeFileSync(path.join(repoRoot, 'reports/section-32-4-gap.md'), lines.join('\n'));
console.log(`§32.4 gap: ${notProduction.length} not production`);
if (notProduction.length) process.exit(1);
