#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkAgentPromotion, dossierPathForAgent } from '../validators/promotion.validator.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');

const P0_SPECIALISTS = [
  'engineering.planner','engineering.architect','engineering.code-reviewer','engineering.security-reviewer',
  'engineering.tdd-guide','engineering.build-resolver','engineering.e2e-runner','engineering.docs-updater',
  'platform.devops-engineer','platform.ci-cd-engineer','platform.observability-engineer','platform.cloud-architect',
  'platform.release-manager','platform.incident-responder','data-ai.rag-engineer','data-ai.eval-engineer',
  'data-ai.ml-engineer','data-ai.data-engineer','data-ai.analytics-engineer','data-ai.graph-rag-engineer',
  'product-business.ceo-advisor','product-business.cto-advisor','product-business.sales-operator',
  'marketing.campaign-analyst','sales.account-manager','sales.pricing-strategist','finance.expense-auditor',
  'finance.payroll-analyst','legal-compliance.nda-reviewer','legal-compliance.terms-drafter','hr.policy-drafter',
  'design-content.presentation-designer'
];

function agentPath(agentId) {
  const [domain, ...rest] = agentId.split('.');
  return path.join(repoRoot, 'content/agents', domain, rest.join('.') + '.md');
}

function listMasters() {
  const agentsDir = path.join(repoRoot, 'content/agents');
  return fs.readdirSync(agentsDir)
    .filter((d) => fs.existsSync(path.join(agentsDir, d, 'master.md')))
    .map((d) => d + '.master')
    .sort();
}

function setQualityGate(agentId, gate) {
  const filePath = agentPath(agentId);
  if (!fs.existsSync(filePath)) return false;
  let text = fs.readFileSync(filePath, 'utf8');
  if (!text.startsWith('---')) return false;
  text = /quality_gate:\s*\w+/.test(text)
    ? text.replace(/quality_gate:\s*\w+/, 'quality_gate: ' + gate)
    : text.replace('---\n', '---\nquality_gate: ' + gate + '\n');
  fs.writeFileSync(filePath, text);
  return true;
}

const cohort = [...new Set([...listMasters(), ...P0_SPECIALISTS])].filter((id) => fs.existsSync(agentPath(id)));
const results = cohort.map((agentId) => {
  const check = checkAgentPromotion(repoRoot, agentId, { targetGate: 'production' });
  if (apply && check.allowed) setQualityGate(agentId, 'production');
  return { agent_id: agentId, allowed: check.allowed, blockers: check.blockers };
});

const passed = results.filter((r) => r.allowed);
const failed = results.filter((r) => !r.allowed);
const report = [
  '# Production promotion cohort', '', 'Generated: ' + new Date().toISOString(),
  'Apply: ' + apply, 'Passed: ' + passed.length + '/' + cohort.length, '',
  '## Passed', ...passed.map((r) => '- ' + r.agent_id), '',
  '## Failed', ...failed.map((r) => '- ' + r.agent_id + ': ' + r.blockers.join('; ')), ''
].join('\n');
fs.writeFileSync(path.join(repoRoot, 'reports/production-promotion.md'), report);
console.log('Wrote reports/production-promotion.md', passed.length + '/' + cohort.length);
if (failed.length) { failed.forEach((f) => console.error('✗', f.agent_id, f.blockers)); process.exit(1); }
