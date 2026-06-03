#!/usr/bin/env node
import { copySkillsFromStaging } from '../packages/yes-absorber/copy-skills.js';

const slug = process.argv[2];
const domainIdx = process.argv.indexOf('--domain');
const domain = domainIdx >= 0 ? process.argv[domainIdx + 1] : 'meta-system';
const changeIdx = process.argv.indexOf('--change-id');
const changeId = changeIdx >= 0 ? process.argv[changeIdx + 1] : null;

if (!slug) {
  console.error('Usage: node scripts/absorb-skills-from-staging.mjs <slug> [--domain meta-system] [--change-id id]');
  process.exit(1);
}

const r = copySkillsFromStaging(slug, { domain, maxFiles: 5, changeId });
console.log(JSON.stringify(r, null, 2));
