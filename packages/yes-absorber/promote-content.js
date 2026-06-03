/**
 * Promote classified artifacts from staging/normalized/<slug> into content/.
 * Populates rollback.files_added before writes; seeds minimal dossiers.
 */

import fs from 'fs';
import path from 'path';
import { repoRoot as defaultRepoRoot } from './index.js';
import { reportDuplicates } from './dedupe.js';

function getRepoRoot(cwd) {
  if (cwd && fs.existsSync(path.join(cwd, 'package.json')) && fs.existsSync(path.join(cwd, 'staging'))) {
    return cwd;
  }
  return defaultRepoRoot;
}

function parseYamlId(text) {
  const m = text.match(/^id:\s*(.+)$/m);
  return m ? m[1].trim() : null;
}

function inferDomainFromId(id, fallback = 'meta-system') {
  if (!id || !id.includes('.')) return fallback;
  return id.split('.')[0];
}

function walkFiles(root, predicate, acc = []) {
  if (!fs.existsSync(root)) return acc;
  for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
    if (ent.name === '.git' || ent.name === 'node_modules') continue;
    const p = path.join(root, ent.name);
    if (ent.isDirectory()) walkFiles(p, predicate, acc);
    else if (predicate(p, ent.name)) acc.push(p);
  }
  return acc;
}

function seedAgentDossier(repoRoot, agentId, manifest) {
  const domain = agentId.split('.')[0];
  const sub = agentId.split('.').slice(1).join('.');
  const dossierPath = path.join(repoRoot, 'references', domain, `${sub}.sources.json`);
  if (fs.existsSync(dossierPath)) return null;
  fs.mkdirSync(path.dirname(dossierPath), { recursive: true });
  const origin = manifest?.source?.origin_url || 'absorbed';
  const dossier = {
    dossier_id: `dossier.${agentId}.${new Date().toISOString().slice(0, 10)}`,
    agent_id: agentId,
    domain,
    sources: [{
      url: origin,
      source_type: 'absorbed_bundle',
      license: manifest?.license?.spdx || 'MIT',
      version_or_commit: manifest?.source?.commit_or_version || 'unknown',
      used_for: ['absorber promotion seed'],
      copy_policy: manifest?.copy_policy_required || 'patterns_only',
      last_updated: new Date().toISOString()
    }],
    scores: { source_count: 1, official_docs: 10, github_quality: 10, license_safety: 15, maintenance: 10, pattern_clarity: 10, testability: 10, total: 65 },
    promotion_decision: 'staging',
    expires_at: new Date(Date.now() + 90 * 86400000).toISOString()
  };
  fs.writeFileSync(dossierPath, JSON.stringify(dossier, null, 2) + '\\n');
  return path.relative(repoRoot, dossierPath);
}

function seedSkillDossier(repoRoot, skillId, manifest) {
  const domain = skillId.split('.')[0];
  const sub = skillId.split('.').slice(1).join('.');
  const dossierPath = path.join(repoRoot, 'references', 'skills', domain, `${sub}.sources.json`);
  if (fs.existsSync(dossierPath)) return null;
  fs.mkdirSync(path.dirname(dossierPath), { recursive: true });
  const origin = manifest?.source?.origin_url || 'absorbed';
  const dossier = {
    dossier_id: `dossier.${skillId}.${new Date().toISOString().slice(0, 10)}`,
    skill_id: skillId,
    domain,
    sources: [{
      url: origin,
      source_type: 'absorbed_bundle',
      license: manifest?.license?.spdx || 'MIT',
      version_or_commit: manifest?.source?.commit_or_version || 'unknown',
      used_for: ['absorber promotion seed'],
      copy_policy: manifest?.copy_policy_required || 'patterns_only',
      last_updated: new Date().toISOString()
    }],
    scores: { source_count: 1, official_docs: 10, github_quality: 10, license_safety: 15, maintenance: 10, pattern_clarity: 10, testability: 10, total: 65 },
    promotion_decision: 'staging',
    expires_at: new Date(Date.now() + 90 * 86400000).toISOString()
  };
  fs.writeFileSync(dossierPath, JSON.stringify(dossier, null, 2) + '\\n');
  return path.relative(repoRoot, dossierPath);
}

export function promoteContentFromStaging(slug, opts = {}) {
  const repoRoot = getRepoRoot(opts.repoRoot || process.cwd());
  const srcRoot = path.join(repoRoot, 'staging', 'normalized', slug);
  if (!fs.existsSync(srcRoot)) {
    throw new Error(`No staged source at staging/normalized/${slug}`);
  }

  const manifestPath = path.join(srcRoot, 'manifest.json');
  const manifest = opts.manifest || (fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {});

  if (manifest.license?.decision === 'forbidden' || manifest.license?.decision === 'unknown') {
    throw new Error(`License gate blocks promotion: ${manifest.license?.spdx ?? 'unknown'}`);
  }

  const defaultDomain = opts.domain || 'meta-system';
  const maxPerKind = opts.maxPerKind ?? 50;
  const duplicates = reportDuplicates(srcRoot, repoRoot);
  const blockedExact = new Set(
    (duplicates.exact_overlaps || []).flatMap((o) => (o.incoming || []).map((p) => path.join(srcRoot, p)))
  );

  const planned = [];
  const promoted = { agents: [], skills: [], workflows: [] };

  const agentFiles = walkFiles(srcRoot, (p, name) =>
    name.endsWith('.md') && (p.includes(path.sep + 'agents' + path.sep))
  ).slice(0, maxPerKind);

  for (const src of agentFiles) {
    if (blockedExact.has(src)) continue;
    const text = fs.readFileSync(src, 'utf8');
    const id = parseYamlId(text);
    const domain = inferDomainFromId(id, defaultDomain);
    const baseName = id ? id.split('.').slice(1).join('.') : path.basename(src, '.md');
    const agentId = id || `${domain}.${baseName}`;
    const dest = path.join(repoRoot, 'content', 'agents', domain, `${baseName}.md`);
    if (fs.existsSync(dest)) continue;
    planned.push({ kind: 'agent', src, dest, relDest: path.relative(repoRoot, dest), agentId });
  }

  const skillFiles = walkFiles(srcRoot, (p, name) => name === 'SKILL.md').slice(0, maxPerKind);
  for (const src of skillFiles) {
    if (blockedExact.has(src)) continue;
    const text = fs.readFileSync(src, 'utf8');
    const id = parseYamlId(text);
    const rel = path.relative(srcRoot, src);
    const skillSub = rel.replace(/\/SKILL\.md$/, '').replace(/\//g, '.');
    const domain = inferDomainFromId(id, defaultDomain);
    const skillId = id || `${domain}.${skillSub}`;
    const folder = skillId.split('.').slice(1).join('.') || skillSub;
    const dest = path.join(repoRoot, 'content', 'skills', domain, folder, 'SKILL.md');
    if (fs.existsSync(dest)) continue;
    planned.push({ kind: 'skill', src, dest, relDest: path.relative(repoRoot, dest), skillId });
  }

  const workflowFiles = walkFiles(srcRoot, (p, name) =>
    name.endsWith('.json') && p.includes(path.sep + 'workflows' + path.sep)
  ).slice(0, maxPerKind);

  for (const src of workflowFiles) {
    if (blockedExact.has(src)) continue;
    let wf;
    try { wf = JSON.parse(fs.readFileSync(src, 'utf8')); } catch { continue; }
    const id = wf.id;
    const domain = inferDomainFromId(id, defaultDomain);
    const baseName = id ? id.split('.').slice(1).join('.') : path.basename(src, '.json');
    const dest = path.join(repoRoot, 'content', 'workflows', domain, `${baseName}.json`);
    if (fs.existsSync(dest)) continue;
    planned.push({ kind: 'workflow', src, dest, relDest: path.relative(repoRoot, dest), workflowId: id || `${domain}.${baseName}` });
  }

  const filesAdded = planned.map((p) => p.relDest);
  const dossiersAdded = [];

  if (opts.changeId) {
    const rollbackPath = opts.rollbackPath || path.join(repoRoot, 'staging', 'rollback', `${opts.changeId}.json`);
    if (fs.existsSync(rollbackPath)) {
      const rb = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
      rb.files_added = [...new Set([...(rb.files_added || []), ...filesAdded])];
      fs.writeFileSync(rollbackPath, JSON.stringify(rb, null, 2) + '\\n');
    }
  }

  for (const item of planned) {
    fs.mkdirSync(path.dirname(item.dest), { recursive: true });
    fs.copyFileSync(item.src, item.dest);
    if (item.kind === 'agent') {
      promoted.agents.push(item.agentId);
      const d = seedAgentDossier(repoRoot, item.agentId, manifest);
      if (d) dossiersAdded.push(d);
    } else if (item.kind === 'skill') {
      promoted.skills.push(item.skillId);
      const d = seedSkillDossier(repoRoot, item.skillId, manifest);
      if (d) dossiersAdded.push(d);
    } else {
      promoted.workflows.push(item.workflowId);
    }
  }

  const ledgerPath = path.join(repoRoot, 'registry', 'ledger.jsonl');
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  fs.appendFileSync(ledgerPath, JSON.stringify({
    type: 'absorb_promote_content',
    slug,
    change_id: opts.changeId || null,
    files_added: filesAdded,
    dossiers_added: dossiersAdded,
    promoted,
    at: new Date().toISOString()
  }) + '\\n');

  return { slug, files_added: filesAdded, dossiers_added: dossiersAdded, promoted };
}
