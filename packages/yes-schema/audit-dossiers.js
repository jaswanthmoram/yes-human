#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scoreDossier } from './dossier-scorer.js';
import { evaluateStagingDossier } from '../../validators/promotion.validator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
}

function walkDossiers(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDossiers(full, acc);
    else if (entry.name.endsWith('.sources.json')) acc.push(full);
  }
  return acc;
}

function entityIdFromDossier(dossier) {
  return dossier.agent_id || dossier.workflow_id || dossier.skill_id || 'unknown';
}

function isSelfRefOnly(dossier) {
  const sources = dossier.sources || [];
  return sources.length > 0 && sources.every((s) => String(s.url).includes('github.com/yes-human/yes-human'));
}

async function main() {
  const strict = process.argv.includes('--strict');
  const licenseRegistry = readJson('registry/license-registry.json');
  const agents = readJson('registry/agents.json').items || [];
  const workflows = readJson('registry/workflows.json').items || [];

  const requiredAgentIds = new Set(
    agents.filter((a) => a.quality_gate === 'staging' || a.quality_gate === 'production').map((a) => a.id)
  );
  const requiredWorkflowIds = new Set(workflows.filter((w) => w.status !== 'draft').map((w) => w.id));

  const results = [];
  let failures = 0;
  let selfRefCount = 0;

  for (const filePath of walkDossiers(path.join(repoRoot, 'references'))) {
    const rel = path.relative(repoRoot, filePath);
    const dossier = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const computed = scoreDossier(dossier);
    const staging = evaluateStagingDossier(dossier, { licenseRegistry });
    const entityId = entityIdFromDossier(dossier);
    const required =
      (dossier.agent_id && requiredAgentIds.has(entityId)) ||
      (dossier.workflow_id && requiredWorkflowIds.has(entityId));
    const selfRef = isSelfRefOnly(dossier);
    if (selfRef) selfRefCount++;
    results.push({
      path: rel,
      entity_id: entityId,
      required,
      self_ref_only: selfRef,
      source_count: dossier.sources?.length || 0,
      stored_total: dossier.scores?.total ?? 0,
      computed_total: computed.total,
      staging_allowed: staging.allowed,
      blockers: staging.blockers
    });
    if (required && !staging.allowed) {
      failures++;
      if (strict) {
        console.error(`✗ ${rel} (${entityId})`);
        for (const b of staging.blockers) console.error(`  - ${b}`);
      }
    }
  }

  const report = {
    generated_at: new Date().toISOString(),
    total_dossiers: results.length,
    self_ref_only: selfRefCount,
    required_failures: failures,
    results
  };
  fs.mkdirSync(path.join(repoRoot, 'reports'), { recursive: true });
  fs.writeFileSync(path.join(repoRoot, 'reports', 'dossier-scores.json'), JSON.stringify(report, null, 2));
  console.log(`Dossiers scanned: ${results.length}`);
  console.log(`Self-ref only: ${selfRefCount}`);
  console.log(`Required entity failures: ${failures}`);
  console.log('Wrote reports/dossier-scores.json');
  if (strict && failures > 0) process.exit(1);
}

main();
