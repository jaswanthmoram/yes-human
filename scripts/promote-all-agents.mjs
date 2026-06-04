#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkAgentPromotion } from '../validators/promotion.validator.js';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');
const onlyStaging = process.argv.includes('--only-staging');
const domainArg = process.argv.find((a, i) => process.argv[i - 1] === '--domain');
const idsArg = process.argv.find((a, i) => process.argv[i - 1] === '--ids');
function agentPath(agentId) {
  const [domain, ...rest] = agentId.split('.');
  return path.join(repoRoot, 'content/agents', domain, rest.join('.') + '.md');
}
function parseAgentMeta(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
  const gate = text.match(/^quality_gate:\s*(.+)$/m)?.[1]?.trim() || 'staging';
  if (!id) return null;
  return { id, gate, domain: id.split('.')[0] };
}
function listAgentIds() {
  const agentsDir = path.join(repoRoot, 'content/agents');
  const ids = [];
  for (const domain of fs.readdirSync(agentsDir)) {
    const d = path.join(agentsDir, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.md')) continue;
      const meta = parseAgentMeta(path.join(d, f));
      if (meta) ids.push(meta);
    }
  }
  return ids;
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
let agents = listAgentIds();
if (domainArg) agents = agents.filter((a) => a.domain === domainArg);
if (onlyStaging) agents = agents.filter((a) => a.gate !== 'production');
if (idsArg) {
  const want = new Set(
    idsArg
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  );
  agents = agents.filter((a) => want.has(a.id));
}
const results = agents.map(({ id }) => {
  const check = checkAgentPromotion(repoRoot, id, { targetGate: 'production' });
  if (apply && check.allowed) setQualityGate(id, 'production');
  return { agent_id: id, allowed: check.allowed, blockers: check.blockers };
});
const passed = results.filter((r) => r.allowed);
const failed = results.filter((r) => !r.allowed);
const lines = [
  '# Promotion gap report',
  '',
  'Generated: ' + new Date().toISOString(),
  'Mode: ' + (apply ? 'apply' : 'check'),
  'Scope: ' + agents.length + ' agents',
  'Passed: ' + passed.length + '/' + results.length,
  '',
  '## Passed',
  ...passed.map((r) => '- ' + r.agent_id),
  '',
  '## Failed',
  ...failed.map((r) => '- ' + r.agent_id + ': ' + r.blockers.join('; ')),
  ''
];
fs.writeFileSync(path.join(repoRoot, 'reports/promotion-gap.md'), lines.join('\n'));
console.log('Wrote reports/promotion-gap.md', passed.length + '/' + results.length);
if (failed.length) process.exit(1);
