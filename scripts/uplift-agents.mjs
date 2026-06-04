#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HIGH_STAKES = new Set(['finance', 'legal-compliance', 'hr', 'healthcare']);

function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n/);
  if (!m) return { fm: {}, body: content };
  const fm = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (line.startsWith('  - ') || line.startsWith('- ')) {
      const v = line
        .replace(/^(\s*-?\s*)/, '')
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (key && Array.isArray(fm[key])) fm[key].push(v);
      continue;
    }
    const cm = line.match(/^([^:]+):\s*(.*)$/);
    if (!cm) continue;
    key = cm[1].trim();
    const val = cm[2].trim();
    if (val === '') fm[key] = [];
    else if (val === 'true') fm[key] = true;
    else if (val === 'false') fm[key] = false;
    else fm[key] = val.replace(/^['"]|['"]$/g, '');
  }
  return { fm, body: content.slice(m[0].length) };
}

function yamlLine(key, val) {
  if (Array.isArray(val)) {
    if (!val.length) return `${key}: []\n`;
    return `${key}:\n` + val.map((v) => `  - ${v}`).join('\n') + '\n';
  }
  if (typeof val === 'boolean') return `${key}: ${val}\n`;
  return `${key}: ${val}\n`;
}

function loadDossier(agentId) {
  const [d, ...rest] = agentId.split('.');
  const p = path.join(repoRoot, 'references', d, `${rest.join('.')}.sources.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function buildBody(fm, dossier) {
  const name = fm.name || fm.id;
  const patterns = (dossier?.sources || [])
    .slice(0, 6)
    .flatMap((s) => s.used_for || [])
    .slice(0, 6);
  const proc = patterns.length
    ? patterns.map((p, i) => `${i + 1}. Apply guidance from: ${p}.`)
    : [
        '1. Clarify task scope and constraints.',
        '2. Gather evidence from allowed tools.',
        '3. Produce structured output with verification steps.'
      ];
  const examples = [
    `Example A: User asks for ${name} help on a bounded task → deliver checklist, risks, and next actions.`,
    `Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.`
  ];
  return `## Mission
${fm.summary || `Deliver ${name} outcomes with evidence-backed, source-aligned guidance.`}

## Scope
- In scope: tasks matching triggers and domain expectations for \`${fm.id}\`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
${proc.join('\n')}
${fm.quality_gate === 'staging' ? '\n4. Cite patterns from source dossier; do not invent policies.\n5. Run verification checklist before completion.' : ''}

## Verification
${(fm.verification || ['output_matches_request']).map((v) => `- ${v}`).join('\n')}

## Failure modes
${(fm.failure_modes || ['scope drift']).map((v) => `- ${v}`).join('\n')}

## Examples
${examples.map((e) => `- ${e}`).join('\n')}

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
`;
}

function upliftAgent(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { fm } = parseFrontmatter(raw);
  if (!fm.id || fm.quality_gate !== 'staging') return false;
  const dossier = loadDossier(fm.id);
  const domain = fm.id.split('.')[0];
  if (HIGH_STAKES.has(domain)) {
    fm.requires_disclaimer = true;
    fm.human_review_gate = true;
  }
  if (!fm.triggers?.length) fm.triggers = [`${fm.id.split('.').slice(1).join(' ')} task`];
  if (!fm.aliases?.length) fm.aliases = [fm.id.split('.').slice(1).join('-')];
  if (!fm.negative_keywords) fm.negative_keywords = [];
  if (!fm.failure_modes?.length) fm.failure_modes = ['scope drift', 'missing verification'];
  if (!fm.verification?.length) fm.verification = ['output_matches_request', 'policy_safe'];
  if (!fm.source_references?.length && dossier) {
    fm.source_references = dossier.sources.slice(0, 3).map((s, i) => `ref.${fm.id}.${i}`);
  }
  const keys = [
    'id',
    'name',
    'version',
    'status',
    'category',
    'kind',
    'summary',
    'triggers',
    'aliases',
    'negative_keywords',
    'inputs',
    'outputs',
    'allowed_tools',
    'budget_band',
    'max_context_tokens',
    'failure_modes',
    'verification',
    'source_references',
    'quality_gate'
  ];
  if (fm.requires_disclaimer) keys.push('requires_disclaimer', 'human_review_gate');
  let yaml = '---\n';
  for (const k of keys) if (fm[k] !== undefined) yaml += yamlLine(k, fm[k]);
  yaml += '---\n';
  const body = buildBody(fm, dossier);
  fs.writeFileSync(filePath, yaml + body);
  return true;
}

let n = 0;
const agentsDir = path.join(repoRoot, 'content/agents');
for (const domain of fs.readdirSync(agentsDir)) {
  const dir = path.join(agentsDir, domain);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    if (upliftAgent(path.join(dir, f))) n++;
  }
}
console.log(`Uplifted ${n} agent files`);
