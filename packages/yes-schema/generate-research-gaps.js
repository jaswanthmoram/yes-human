#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const audit = JSON.parse(fs.readFileSync(path.join(repoRoot, 'reports/dossier-scores.json'), 'utf8'));
const byDomain = {};
for (const r of audit.results) {
  const d = r.entity_id.split('.')[0];
  if (!byDomain[d]) byDomain[d] = { count: 0, total: 0, failures: 0 };
  byDomain[d].count++;
  byDomain[d].total += r.computed_total;
  if (!r.staging_allowed) byDomain[d].failures++;
}
const lines = [
  '# Research Gaps Analysis',
  '',
  'Generated: ' + new Date().toISOString(),
  'Total dossiers: ' + audit.total_dossiers,
  'Self-ref only: ' + audit.self_ref_only,
  'Required failures: ' + audit.required_failures,
  '',
  '## Domain averages',
  ''
];
for (const [d, v] of Object.entries(byDomain).sort()) {
  lines.push('- **' + d + '**: avg ' + (v.total / v.count).toFixed(1) + '/100 (' + v.count + ' dossiers)');
}
lines.push('', '## Notes', '- Seeded from YES-HUMAN_SOURCE_MAP.md', '- audit:dossiers:strict must pass before release');
fs.writeFileSync(path.join(repoRoot, 'reports/research-gaps.md'), lines.join('\n') + '\n');
console.log('Wrote reports/research-gaps.md');
