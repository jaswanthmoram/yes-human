#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

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

function evalMetric(cmd, pattern) {
  try {
    const out = execSync(cmd, { cwd: repoRoot, encoding: 'utf8' });
    return out.match(pattern)?.[1] || 'n/a';
  } catch {
    return 'fail';
  }
}

const routeAcc = evalMetric('node packages/yes-schema/eval-route.js', /top-1 accuracy: ([\d.]+)%/);
const skillAcc = evalMetric('node packages/yes-schema/eval-skill.js', /top-1 accuracy: ([\d.]+)%/);
const wfAcc = evalMetric('node packages/yes-schema/eval-workflow.js', /top-1 accuracy: ([\d.]+)%/);
const gap32 = fs.existsSync(path.join(repoRoot, 'reports/section-32-4-gap.md'))
  ? fs.readFileSync(path.join(repoRoot, 'reports/section-32-4-gap.md'), 'utf8').match(/Not production: (\d+)/)?.[1] || '?'
  : '?';

const lines = [
  '# Phase 11 Acceptance',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Summary',
  `- Production agents: ${countProductionAgents()}/325`,
  `- Section 32.4 not production: ${gap32}`,
  `- Route eval top-1: ${routeAcc}%`,
  `- Skill eval top-1: ${skillAcc}%`,
  `- Workflow eval top-1: ${wfAcc}%`,
  ''
];
fs.writeFileSync(path.join(repoRoot, 'reports/phase11-acceptance.md'), lines.join('\n') + '\n');
console.log('✓ Wrote reports/phase11-acceptance.md');
