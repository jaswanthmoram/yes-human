#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkSkillPromotion } from '../validators/promotion.validator.js';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');
const onlyStaging = process.argv.includes('--only-staging');
const domainArg = process.argv.find((a, i) => process.argv[i - 1] === '--domain');
function skillPath(skillId) {
  const [domain, ...rest] = skillId.split('.');
  return path.join(repoRoot, 'content/skills', domain, ...rest, 'SKILL.md');
}
function parseSkillMeta(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
  const gate = text.match(/^quality_gate:\s*(.+)$/m)?.[1]?.trim() || 'staging';
  if (!id) return null;
  return { id, gate, domain: id.split('.')[0] };
}
function listSkills() {
  const base = path.join(repoRoot, 'content/skills');
  const out = [];
  for (const domain of fs.readdirSync(base)) {
    const d = path.join(base, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    const walk = (dir) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p);
        else if (ent.name === 'SKILL.md') {
          const m = parseSkillMeta(p);
          if (m) out.push(m);
        }
      }
    };
    walk(d);
  }
  return out;
}
function setQualityGate(skillId, gate) {
  const fp = skillPath(skillId);
  if (!fs.existsSync(fp)) return false;
  let text = fs.readFileSync(fp, 'utf8');
  if (!text.startsWith('---')) return false;
  text = /quality_gate:\s*\w+/.test(text)
    ? text.replace(/quality_gate:\s*\w+/, 'quality_gate: ' + gate)
    : text.replace('---\n', '---\nquality_gate: ' + gate + '\n');
  fs.writeFileSync(fp, text);
  return true;
}
let skills = listSkills();
if (domainArg) skills = skills.filter((s) => s.domain === domainArg);
if (onlyStaging) skills = skills.filter((s) => s.gate !== 'production');
const results = skills.map(({ id }) => {
  const check = checkSkillPromotion(repoRoot, id, { targetGate: 'production' });
  if (apply && check.allowed) setQualityGate(id, 'production');
  return { skill_id: id, allowed: check.allowed, blockers: check.blockers };
});
const passed = results.filter((r) => r.allowed);
const failed = results.filter((r) => !r.allowed);
const lines = ['# Skill promotion gap', '', 'Generated: ' + new Date().toISOString(), 'Passed: ' + passed.length + '/' + results.length, '', '## Failed', ...failed.map((r) => '- ' + r.skill_id + ': ' + r.blockers.join('; '))];
fs.writeFileSync(path.join(repoRoot, 'reports/skill-promotion-gap.md'), lines.join('\n'));
console.log('skills', passed.length + '/' + results.length);
if (failed.length) process.exit(1);
