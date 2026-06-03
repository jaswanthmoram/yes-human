#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productionIds = new Set();
const agentsDir = path.join(repoRoot, 'content/agents');
for (const domain of fs.readdirSync(agentsDir)) {
  const d = path.join(agentsDir, domain);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(d, f), 'utf8');
    if (!/quality_gate:\s*production/.test(text)) continue;
    const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
    if (id) productionIds.add(id);
  }
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.sources.json')) acc.push(p);
  }
  return acc;
}

let n = 0;
for (const filePath of walk(path.join(repoRoot, 'references'))) {
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!d.agent_id || !productionIds.has(d.agent_id)) continue;
  if (d.promotion_decision === 'production') continue;
  d.promotion_decision = 'production';
  fs.writeFileSync(filePath, JSON.stringify(d, null, 2) + '\n');
  n++;
}
console.log(`Synced ${n} dossiers`);
