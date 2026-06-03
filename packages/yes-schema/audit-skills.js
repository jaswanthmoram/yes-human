#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkSkillPromotion } from '../../validators/promotion.validator.js';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const strict = process.argv.includes('--strict');
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === 'SKILL.md') acc.push(p);
  }
  return acc;
}
const failures = [];
let count = 0;
for (const filePath of walk(path.join(repoRoot, 'content/skills'))) {
  const text = fs.readFileSync(filePath, 'utf8');
  const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
  const gate = text.match(/^quality_gate:\s*(.+)$/m)?.[1]?.trim() || 'staging';
  if (!id || gate !== 'production') continue;
  count++;
  const result = checkSkillPromotion(repoRoot, id, { targetGate: 'production' });
  if (!result.allowed) failures.push({ skill_id: id, blockers: result.blockers });
}
console.log('production skills:', count, 'failures:', failures.length);
failures.forEach((f) => console.log('  ✗', f.skill_id, f.blockers.join(', ')));
if (strict && failures.length) process.exit(1);
if (!failures.length) console.log('✓ All production skills pass promotion gate.');
