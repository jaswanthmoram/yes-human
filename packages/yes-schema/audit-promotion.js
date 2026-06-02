#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkAgentPromotion } from '../../validators/promotion.validator.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const strict = process.argv.includes('--strict');

function parseAgent(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
  const gate = text.match(/^quality_gate:\s*(.+)$/m)?.[1]?.trim() || 'staging';
  return id ? { id, gate } : null;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const failures = [];
let count = 0;
for (const filePath of walk(path.join(repoRoot, 'content/agents'))) {
  const meta = parseAgent(filePath);
  if (!meta || meta.gate !== 'production') continue;
  count++;
  const result = checkAgentPromotion(repoRoot, meta.id, { targetGate: 'production' });
  if (!result.allowed) failures.push({ agent_id: meta.id, blockers: result.blockers });
}

console.log('production agents:', count, 'failures:', failures.length);
failures.forEach((f) => console.log('  ✗', f.agent_id, f.blockers.join(', ')));
if (strict && failures.length) process.exit(1);
if (!failures.length) console.log('✓ All production agents pass promotion gate.');
