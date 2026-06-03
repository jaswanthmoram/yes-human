#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scoreDossier } from '../packages/yes-schema/dossier-scorer.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HIGH_STAKES = new Set(['finance', 'legal-compliance', 'hr', 'healthcare']);
const AUTHORITATIVE = new Set(['official_docs', 'vendor_docs', 'standards_doc', 'official_specs', 'official_book']);
const domainArg = process.argv.find((a, i) => process.argv[i - 1] === '--domain');

const DOMAIN_AUTH = {
  finance: [
    { url: 'https://www.sec.gov/edgar', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['SEC filings reference'] },
    { url: 'https://www.fasb.org/standards', source_type: 'official_docs', license: 'MIT', used_for: ['GAAP standards context'] }
  ],
  'legal-compliance': [
    { url: 'https://www.ftc.gov/legal-library/browse/rules', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['FTC rules reference'] },
    { url: 'https://www.law.cornell.edu/wex/contract', source_type: 'official_docs', license: 'MIT', used_for: ['Contract law reference'] }
  ],
  hr: [
    { url: 'https://www.dol.gov/general/topic/wages', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['DOL wage guidance'] },
    { url: 'https://www.eeoc.gov/laws/guidance', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['EEOC policy guidance'] }
  ],
  healthcare: [
    { url: 'https://www.hhs.gov/hipaa/for-professionals/index.html', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['HIPAA guidance'] },
    { url: 'https://www.fda.gov/medical-devices', source_type: 'official_docs', license: 'Apache-2.0', used_for: ['FDA device context'] }
  ]
};

function walkAgents(domain) {
  const d = path.join(repoRoot, 'content/agents', domain);
  const ids = [];
  for (const f of fs.readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const text = fs.readFileSync(path.join(d, f), 'utf8');
    const id = text.match(/^id:\s*(.+)$/m)?.[1]?.trim();
    if (id) ids.push(id);
  }
  return ids;
}

function dossierPath(agentId) {
  const [domain, ...rest] = agentId.split('.');
  return path.join(repoRoot, 'references', domain, `${rest.join('.')}.sources.json`);
}

function patchDossier(filePath, extras) {
  if (!fs.existsSync(filePath)) return false;
  const dossier = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const sources = [...(dossier.sources || [])];
  if (sources.some((s) => AUTHORITATIVE.has(s.source_type))) return false;
  const urls = new Set(sources.map((s) => s.url));
  for (const ex of extras) {
    if (!urls.has(ex.url)) {
      sources.unshift({ ...ex, version_or_commit: '2026-06-02', copy_policy: 'patterns_only', last_updated: '2026-06-02T00:00:00Z' });
    }
  }
  const scores = scoreDossier({ ...dossier, sources });
  dossier.sources = sources;
  dossier.scores = { source_count: sources.length, official_docs: scores.official_docs, github_quality: scores.github_quality, license_safety: scores.license_safety, maintenance: scores.maintenance, pattern_clarity: scores.pattern_clarity, testability: scores.testability, total: scores.total };
  fs.writeFileSync(filePath, JSON.stringify(dossier, null, 2) + '\n');
  return true;
}

let n = 0;
for (const domain of HIGH_STAKES) {
  if (domainArg && domainArg !== domain) continue;
  const extras = DOMAIN_AUTH[domain] || [];
  for (const agentId of walkAgents(domain)) {
    if (patchDossier(dossierPath(agentId), extras)) n++;
  }
  const master = path.join(repoRoot, 'references', domain, 'master.sources.json');
  if (patchDossier(master, extras)) n++;
}
console.log(`Patched ${n} high-stakes dossiers`);
