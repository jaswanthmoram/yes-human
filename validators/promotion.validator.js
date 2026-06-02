import fs from 'fs';
import path from 'path';
import { scoreDossier } from '../packages/yes-schema/dossier-scorer.js';

export const MIN_PRODUCTION_SCORE = 80;
export const MIN_STAGING_SOURCES = 5;
export const STAGING_SCORE_TOLERANCE = 5;
export const SELF_REF_URL_FRAGMENT = 'github.com/yes-human/yes-human';

const AUTHORITATIVE_SOURCE_TYPES = new Set([
  'official_docs',
  'vendor_docs',
  'standards_doc',
  'official_specs',
  'official_book',
  'official_course'
]);

const HIGH_STAKES_DOMAINS = new Set(['finance', 'legal-compliance', 'hr', 'healthcare']);

function isSelfRefUrl(url) {
  return String(url || '').includes(SELF_REF_URL_FRAGMENT);
}

function dossierDomain(dossier) {
  if (dossier.domain) return dossier.domain;
  const id = dossier.agent_id || dossier.workflow_id || dossier.skill_id || '';
  return String(id).split('.')[0] || '';
}

/**
 * Pure promotion check: decides whether a dossier qualifies for a target quality gate.
 * Production is the strict gate; staging only requires a valid dossier with sources.
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
    if (!Array.isArray(src.used_for) || src.used_for.length === 0) {
      blockers.push(`source ${src.url} has no "used_for" (too generic)`);
    }
    if (!src.version_or_commit || src.version_or_commit === 'required-before-promotion') {
      blockers.push(`source ${src.url} missing pinned version_or_commit`);
    }
  }

  if (dossier.expires_at) {
    const expires = new Date(dossier.expires_at);
    if (!Number.isNaN(expires.getTime()) && expires.getTime() < now.getTime()) {
      blockers.push(`dossier expired on ${dossier.expires_at}`);
    }
  } else {
    blockers.push('dossier missing expires_at');
  }

  if (targetGate === 'production') {
    const total = dossier.scores?.total ?? 0;
    if (total < minScore) {
      blockers.push(`score ${total} below production threshold ${minScore}`);
    }
  }

  return { allowed: blockers.length === 0, blockers, warnings };
}

/**
 * Stricter gate for staging/production dossiers tied to active agents and workflows.
 */
export function evaluateStagingDossier(dossier, opts = {}) {
  const {
    licenseRegistry = { allowed: [], forbidden: [], restricted: [] },
    now = new Date(),
    minSources = MIN_STAGING_SOURCES,
    scoreTolerance = STAGING_SCORE_TOLERANCE,
    minStagingScore = MIN_PRODUCTION_SCORE
  } = opts;

  const base = evaluatePromotion(dossier, { licenseRegistry, now, targetGate: 'staging' });
  const blockers = [...base.blockers];
  const warnings = [...base.warnings];
  const sources = Array.isArray(dossier.sources) ? dossier.sources : [];

  if (sources.length < minSources) {
    blockers.push(`staging requires at least ${minSources} sources (has ${sources.length})`);
  }

  if (sources.length > 0 && sources.every((src) => isSelfRefUrl(src.url))) {
    blockers.push('circular dossier: all sources point at yes-human/yes-human');
  }

  const domain = dossierDomain(dossier);
  if (HIGH_STAKES_DOMAINS.has(domain)) {
    const hasAuthoritative = sources.some((src) => AUTHORITATIVE_SOURCE_TYPES.has(src.source_type));
    if (!hasAuthoritative) {
      blockers.push(`high-stakes domain '${domain}' requires official_docs, vendor_docs, or standards_doc source`);
    }
  }

  const computed = scoreDossier(dossier);
  const storedTotal = dossier.scores?.total ?? 0;
  if (Math.abs(storedTotal - computed.total) > scoreTolerance) {
    blockers.push(`score mismatch: stored ${storedTotal} vs computed ${computed.total} (tolerance ${scoreTolerance})`);
  }

  if (computed.total < minStagingScore) {
    blockers.push(`computed score ${computed.total} below staging minimum ${minStagingScore}`);
  }

  return { allowed: blockers.length === 0, blockers, warnings, computed_scores: computed };
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
    return {
      allowed: false,
      blockers: [`missing dossier at references/${agentId.split('.')[0]}/${agentId.split('.').slice(1).join('.')}.sources.json`],
      warnings: []
    };
  }
  let licenseRegistry = { allowed: [], forbidden: [], restricted: [] };
  const licPath = path.join(repoRoot, 'registry', 'license-registry.json');
  if (fs.existsSync(licPath)) {
    licenseRegistry = JSON.parse(fs.readFileSync(licPath, 'utf8'));
  }
  const dossier = JSON.parse(fs.readFileSync(dossierPath, 'utf8'));
  return evaluatePromotion(dossier, { ...opts, licenseRegistry });
}
