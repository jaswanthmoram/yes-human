/**
 * Yes-human Absorber — staging pipeline for external sources.
 *
 *   input  →  fetch  →  license check  →  normalize  →  dedupe  →  staged
 *                              ↓ block on forbidden / unknown license
 *                            rejected/
 *
 *   staged →  review  →  promote (apply)  →  rollback record
 *
 * Active content (content/, registry/) is NEVER mutated by `stage`.
 * Only `apply` modifies it, and `apply` always writes a rollback record first.
 *
 * Architecture rules (§14.4):
 *   - never merge directly into live content
 *   - never absorb unknown license
 *   - never overwrite existing better agent without review
 *   - keep original source path and commit
 *   - create rollback record for every promotion
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

import { fetchSource } from './fetcher.js';
import { extractLicense } from './license-extractor.js';
import { reportDuplicates } from './dedupe.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, '../..');

const PATHS = {
  incoming:   () => path.join(repoRoot, 'staging', 'incoming'),
  normalized: () => path.join(repoRoot, 'staging', 'normalized'),
  reviewed:   () => path.join(repoRoot, 'staging', 'reviewed'),
  rejected:   () => path.join(repoRoot, 'staging', 'rejected'),
  promoted:   () => path.join(repoRoot, 'staging', 'promoted'),
  rollback:   () => path.join(repoRoot, 'staging', 'rollback')
};

function ensureStageDirs() {
  for (const p of Object.values(PATHS)) fs.mkdirSync(p(), { recursive: true });
}

function loadLicenseRegistry() {
  const p = path.join(repoRoot, 'registry', 'license-registry.json');
  if (!fs.existsSync(p)) return { allowed: [], restricted: [], forbidden: [] };
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function newChangeId(slug) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return `absorb-${slug}-${ts}`;
}

// ── stage ─────────────────────────────────────────────────────────────────────

/**
 * Stage an external source: fetch, license-check, normalize, dedupe.
 * Writes a manifest at staging/normalized/<slug>/manifest.json (allowed/restricted)
 * or staging/rejected/<slug>/manifest.json (forbidden/unknown).
 *
 * @param {string} input - GitHub URL or local path
 * @returns {Promise<{ slug, decision, manifestPath, manifest }>}
 */
export async function stage(input) {
  ensureStageDirs();
  const registry = loadLicenseRegistry();

  // 1. Fetch
  const fetched = fetchSource(input, { stagingRoot: PATHS.incoming() });

  // 2. License extraction + classification
  const license = extractLicense(fetched.dest, registry);

  // 3. Quick file-type classification (so reviewers know what's in the bundle)
  const classification = classifyContent(fetched.dest);

  // 4. Dedupe against active artifacts
  const duplicates = reportDuplicates(fetched.dest, repoRoot);

  // 5. Assemble manifest
  const manifest = {
    schema_version: '1.0',
    slug: fetched.slug,
    source: {
      kind: fetched.kind,
      origin_url: fetched.origin_url,
      commit_or_version: fetched.commit_or_version,
      fetched_at: fetched.fetched_at,
      staging_path: path.relative(repoRoot, fetched.dest)
    },
    license,
    classification,
    duplicates: {
      exact_overlap_count: duplicates.exact_overlaps.length,
      slug_collision_count: duplicates.slug_collisions.length,
      exact_overlaps: duplicates.exact_overlaps.slice(0, 5),
      slug_collisions: duplicates.slug_collisions.slice(0, 10),
      total_text_files: duplicates.total_text_files
    }
  };

  // 6. Routing decision
  const accepted = license.decision === 'allowed' || license.decision === 'restricted';
  const decision = accepted ? 'staged' : 'rejected';
  manifest.decision = decision;
  manifest.reason = accepted
    ? `License "${license.spdx}" is ${license.decision}.`
    : `License "${license.spdx ?? 'unknown'}" is ${license.decision} — absorption blocked (§14.4).`;
  if (license.decision === 'restricted') {
    manifest.copy_policy_required = 'patterns_only';
  }

  // 7. Write to normalized/ or rejected/
  const targetDir = accepted ? PATHS.normalized() : PATHS.rejected();
  const slugDir = path.join(targetDir, fetched.slug);
  fs.mkdirSync(slugDir, { recursive: true });
  const manifestPath = path.join(slugDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return {
    slug: fetched.slug,
    decision,
    manifestPath: path.relative(repoRoot, manifestPath),
    manifest
  };
}

// ── apply (promote) ───────────────────────────────────────────────────────────

/**
 * Promote a staged source. Writes a rollback record FIRST, then records the
 * promotion. (We do not auto-copy content into `content/` — that requires a
 * per-file review step. Apply records intent + provenance so the items are
 * tracked and registries' provenance.json reflects the new origin.)
 */
export async function apply(slug) {
  ensureStageDirs();
  const normalizedDir = path.join(PATHS.normalized(), slug);
  const manifestPath = path.join(normalizedDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`No staged source at staging/normalized/${slug}`);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  if (manifest.decision !== 'staged') {
    throw new Error(`Cannot apply: source decision is "${manifest.decision}", not "staged".`);
  }
  if (manifest.license?.decision === 'forbidden' || manifest.license?.decision === 'unknown') {
    throw new Error(`License gate blocks promotion: ${manifest.license?.spdx ?? 'unknown'} (${manifest.license?.decision})`);
  }

  const changeId = newChangeId(slug);

  // 1. Rollback record (per architecture §26.12 rollback schema shape)
  const rollback = {
    change_id: changeId,
    created_at: new Date().toISOString(),
    reason: `Absorb source ${slug} from ${manifest.source.origin_url}`,
    files_added: [],
    files_modified: [],
    registry_entries_added: [],
    graph_edges_added: [],
    previous_hashes: {},
    rollback_command: `yes absorb rollback ${changeId}`,
    safe_to_auto_rollback: true
  };
  const rollbackPath = path.join(PATHS.rollback(), `${changeId}.json`);
  fs.writeFileSync(rollbackPath, JSON.stringify(rollback, null, 2));

  // 2. Promotion record — provenance, decision, originating manifest
  const promotion = {
    change_id: changeId,
    slug,
    applied_at: new Date().toISOString(),
    source: manifest.source,
    license: manifest.license,
    classification: manifest.classification,
    duplicates: manifest.duplicates,
    rollback_record: path.relative(repoRoot, rollbackPath),
    next_steps: [
      'Hand-author dossiers for each promoted artifact in references/<domain>/',
      'Run `yes promote --check <agent-id>` to validate dossiers',
      'Compile registries with `yes compile`'
    ]
  };
  const promotedPath = path.join(PATHS.promoted(), `${changeId}.json`);
  fs.writeFileSync(promotedPath, JSON.stringify(promotion, null, 2));

  // 3. Append to global provenance.json (additive — never modifies existing entries)
  appendProvenance({
    id: `prov.absorb.${slug}.${new Date().toISOString().slice(0, 10)}`,
    item_id: slug,
    kind: 'absorbed_source',
    source: manifest.source.origin_url,
    created_at: promotion.applied_at,
    confidence: 0.9,
    author: 'yes-absorber'
  });

  return { changeId, promotedPath: path.relative(repoRoot, promotedPath), rollbackPath: path.relative(repoRoot, rollbackPath) };
}

// ── rollback ──────────────────────────────────────────────────────────────────

export async function rollback(changeId) {
  const rollbackPath = path.join(PATHS.rollback(), `${changeId}.json`);
  if (!fs.existsSync(rollbackPath)) throw new Error(`No rollback record: ${changeId}`);
  const record = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));

  // Delete files this change added (currently always empty — apply does not auto-copy).
  for (const f of record.files_added || []) {
    const abs = path.join(repoRoot, f);
    if (fs.existsSync(abs)) fs.rmSync(abs, { force: true });
  }

  // Mark the promotion record as rolled-back
  const promotedPath = path.join(PATHS.promoted(), `${changeId}.json`);
  if (fs.existsSync(promotedPath)) {
    const promo = JSON.parse(fs.readFileSync(promotedPath, 'utf8'));
    promo.rolled_back = true;
    promo.rolled_back_at = new Date().toISOString();
    fs.writeFileSync(promotedPath, JSON.stringify(promo, null, 2));
  }

  return { changeId, rolledBack: true };
}

// ── list ──────────────────────────────────────────────────────────────────────

export function list() {
  ensureStageDirs();
  const collect = (dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => {
        const m = path.join(dir, e.name, 'manifest.json');
        if (!fs.existsSync(m)) return null;
        const data = JSON.parse(fs.readFileSync(m, 'utf8'));
        return {
          slug: data.slug,
          decision: data.decision,
          license: data.license?.spdx,
          origin: data.source?.origin_url
        };
      })
      .filter(Boolean);
  };
  const collectFlat = (dir) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => ({ change_id: f.replace(/\.json$/, ''), file: path.relative(repoRoot, path.join(dir, f)) }));
  };
  return {
    normalized: collect(PATHS.normalized()),
    rejected:   collect(PATHS.rejected()),
    promoted:   collectFlat(PATHS.promoted()),
    rollback:   collectFlat(PATHS.rollback())
  };
}

// ── content classification (cheap file-type tally) ────────────────────────────

function classifyContent(root) {
  const counts = { agents: 0, skills: 0, workflows: 0, commands: 0, hooks: 0, mcp: 0, total_files: 0 };
  (function walk(d, rel = '') {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const full = path.join(d, e.name);
      const r = path.join(rel, e.name);
      if (e.isDirectory()) walk(full, r);
      else if (e.isFile()) {
        counts.total_files++;
        const lower = r.toLowerCase();
        if (lower.includes('agents/') && e.name.endsWith('.md')) counts.agents++;
        else if ((lower.includes('skills/') && e.name.endsWith('.md')) || e.name.toUpperCase() === 'SKILL.MD') counts.skills++;
        else if (lower.includes('workflows/') && e.name.endsWith('.md')) counts.workflows++;
        else if (lower.includes('commands/') && e.name.endsWith('.md')) counts.commands++;
        else if (lower.includes('hooks/')) counts.hooks++;
        else if (e.name === 'mcp.json' || lower.includes('mcp-config')) counts.mcp++;
      }
    }
  })(root);
  return counts;
}

// ── provenance append (additive, idempotent on id) ────────────────────────────

function appendProvenance(entry) {
  const p = path.join(repoRoot, 'registry', 'provenance.json');
  let arr = [];
  if (fs.existsSync(p)) {
    try { arr = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { arr = []; }
    if (!Array.isArray(arr)) arr = [];
  }
  if (arr.some(e => e.id === entry.id)) return;
  arr.push(entry);
  fs.writeFileSync(p, JSON.stringify(arr, null, 2));
}
