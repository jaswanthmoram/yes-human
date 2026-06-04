#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const md = [
  '# ECC adapter parity',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '| ECC | yes-human | Status |',
  '|---|---|---|',
  '| orchestrate | yes run / yes workflow run | partial |',
  '| eval harness | yes eval * | yes |'
].join('\n');
fs.mkdirSync(path.join(repoRoot, 'reports'), { recursive: true });
fs.writeFileSync(path.join(repoRoot, 'reports/adapter-parity-ecc.md'), md + '\n');
console.log('wrote reports/adapter-parity-ecc.md');
