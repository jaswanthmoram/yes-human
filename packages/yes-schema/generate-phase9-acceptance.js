#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function readJson(rel) { return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8')); }
function countProductionAgents() {
  let n = 0;
  const base = path.join(repoRoot, 'content/agents');
  for (const domain of fs.readdirSync(base)) {
    const d = path.join(base, domain);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d)) {
      if (!f.endsWith('.md')) continue;
      if (/quality_gate:\s*production/.test(fs.readFileSync(path.join(d, f), 'utf8'))) n++;
    }
  }
  return n;
}
let skillTop1 = 'n/a';
try {
  const out = execSync('node packages/yes-schema/eval-skill.js', { cwd: repoRoot, encoding: 'utf8' });
  skillTop1 = out.match(/top-1 top-1 accuracy: ([\d.]+)%/)?.[1] || skillTop1;
} catch (_) {}
const da = fs.existsSync(path.join(repoRoot, 'reports/dossier-scores.json')) ? readJson('reports/dossier-scores.json') : {};
const gate = fs.existsSync(path.join(repoRoot, 'reports/phase9-feedback-gate.json')) ? readJson('reports/phase9-feedback-gate.json') : { passed: false };
const lines = ['# Phase 9 Acceptance', '', 'Generated: ' + new Date().toISOString(), '', '## Summary', '- Feedback gate: ' + gate.passed, '- Dossier failures: ' + (da.required_failures ?? 0), '- Self-ref only: ' + (da.self_ref_only ?? 0), '- Skill top-1: ' + skillTop1 + '%', '- Production agents: ' + countProductionAgents(), ''];
fs.writeFileSync(path.join(repoRoot, 'reports/phase9-acceptance.md'), lines.join('\n') + '\n');
console.log('✓ Wrote reports/phase9-acceptance.md');
