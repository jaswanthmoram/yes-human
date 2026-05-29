import fs from 'fs';
import path from 'path';

export const MIN_PRODUCTION_SCORE = 80;

/**
 * Pure promotion check: decides whether a dossier qualifies for a target quality gate.
 * Production is the strict gate; staging only requires a valid dossier with sources.
 *
 * @param {object} dossier - parsed dossier (references/<domain>/<id>.sources.json)
 * @param {object} opts
 * @param {object} opts.licenseRegistry - registry/license-registry.json contents
 * @param {Date}   [opts.now]
 * @param {number} [opts.minScore]
 * @param {string} [opts.targetGate] - "production" | "staging"
 * @returns {{ allowed: boolean, blockers: string[], warnings: string[] }}
 */
export function evaluatePromotion(dossier, opts = {}) {
  const {
    licenseRegistry = { allowed: [], forbidden: [], restricted: [] },
    now = new Date(),
    minScore = MIN_PRODUCTION_SCORE,
    targetGate = 'production'
  } = opts;

  const blockers = [];
  const warnings = [];
  const allowed = new Set(licenseRegistry.allowed || []);
  const forbidden = new Set(licenseRegistry.forbidden || []);
  const restricted = new Set(licenseRegistry.restricted || []);

  const sources = Array.isArray(dossier.sources) ? dossier.sources : [];
  if (sources.length === 0) {
    blockers.push('no source references');
  }

  for (const src of sources) {
    const lic = src.license;
    if (!lic || forbidden.has(lic)) {
      blockers.push(`forbidden/unclear license "${lic ?? 'none'}" for ${src.url}`);
    } else if (!allowed.has(lic)) {
      if (restricted.has(lic)) {
        if (src.copy_policy === 'exact_copy') {
          blockers.push(`restricted license "${lic}" with exact_copy for ${src.url}`);
        } else {
          warnings.push(`restricted license "${lic}" (patterns only) for ${src.url}`);
        }
      } else {
        blockers.push(`unrecognized license "${lic}" for ${src.url}`);
      }
    }
    // Too-generic guard
    if (!Array.isArray(src.used_for) || src.used_for.length === 0) {
      blockers.push(`source ${src.url} has no "used_for" (too generic)`);
    }
    if (!src.version_or_commit || src.version_or_commit === 'required-before-promotion') {
      blockers.push(`source ${src.url} missing pinned version_or_commit`);
    }
  }

  // Staleness
  if (dossier.expires_at) {
    const expires = new Date(dossier.expires_at);
    if (!Number.isNaN(expires.getTime()) && expires.getTime() < now.getTime()) {
      blockers.push(`dossier expired on ${dossier.expires_at}`);
    }
  } else {
    blockers.push('dossier missing expires_at');
  }

  // Score gate (production only)
  if (targetGate === 'production') {
    const total = dossier.scores?.total ?? 0;
    if (total < minScore) {
      blockers.push(`score ${total} below production threshold ${minScore}`);
    }
  }

  return { allowed: blockers.length === 0, blockers, warnings };
}

/** Resolve a dossier path from an agent id, e.g. engineering.code-reviewer. */
export function dossierPathForAgent(repoRoot, agentId) {
  const domain = agentId.split('.')[0];
  const sub = agentId.split('.').slice(1).join('.');
  return path.join(repoRoot, 'references', domain, `${sub}.sources.json`);
}

/** Load registry + dossier from disk and evaluate. */
export function checkAgentPromotion(repoRoot, agentId, opts = {}) {
  const dossierPath = dossierPathForAgent(repoRoot, agentId);
  if (!fs.existsSync(dossierPath)) {
    return { allowed: false, blockers: [`missing dossier at references/${agentId.split('.')[0]}/${agentId.split('.').slice(1).join('.')}.sources.json`], warnings: [] };
  }
  let licenseRegistry = { allowed: [], forbidden: [], restricted: [] };
  const licPath = path.join(repoRoot, 'registry', 'license-registry.json');
  if (fs.existsSync(licPath)) {
    licenseRegistry = JSON.parse(fs.readFileSync(licPath, 'utf8'));
  }
  const dossier = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
  return evaluatePromotion(dossier, { ...opts, licenseRegistry });
}
