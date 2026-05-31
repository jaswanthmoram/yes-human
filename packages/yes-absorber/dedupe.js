/**
 * Dedupe — detect whether incoming content overlaps with already-active artifacts.
 *
 * Uses two cheap signals:
 *   1. SHA-256 content hash of relevant text files (exact-match detection)
 *   2. Slug/id similarity vs registry/agents.json + registry/skills.json
 *
 * Returns a report; the staging pipeline reads it to decide promote/flag/reject.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const TEXT_EXT = new Set(['.md', '.json', '.yaml', '.yml', '.toml', '.js', '.ts', '.py']);
const MAX_HASH_BYTES = 1_000_000;

function hashContent(p) {
  const stat = fs.statSync(p);
  if (stat.size > MAX_HASH_BYTES) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

/** Collect content hashes for all text files under a source root. */
export function hashSource(sourceRoot) {
  const hashes = new Map(); // hash → [relativePath]
  (function walk(d) {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && TEXT_EXT.has(path.extname(e.name))) {
        const h = hashContent(full);
        if (!h) continue;
        const rel = path.relative(sourceRoot, full);
        if (!hashes.has(h)) hashes.set(h, []);
        hashes.get(h).push(rel);
      }
    }
  })(sourceRoot);
  return hashes;
}

/** Build the lookup of currently active artifacts for slug-based comparison. */
export function loadActiveSlugs(repoRoot) {
  const slugs = new Set();
  for (const reg of ['agents', 'skills', 'workflows']) {
    const p = path.join(repoRoot, 'registry', `${reg}.json`);
    if (!fs.existsSync(p)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      for (const item of data.items || []) {
        if (item.id) slugs.add(item.id);
        if (item.name) slugs.add(String(item.name).toLowerCase());
      }
    } catch { /* ignore */ }
  }
  return slugs;
}

/**
 * Inspect a staged source for duplication signals.
 *
 * @returns {{ exact_overlaps, slug_collisions, total_text_files }}
 */
export function reportDuplicates(stagedRoot, repoRoot) {
  const incomingHashes = hashSource(stagedRoot);
  const activeSlugs = loadActiveSlugs(repoRoot);

  // Exact content overlaps with already-active markdown agents/skills.
  const exactOverlaps = [];
  for (const contentRoot of ['content/agents', 'content/skills', 'content/workflows']) {
    const root = path.join(repoRoot, contentRoot);
    if (!fs.existsSync(root)) continue;
    (function walk(d) {
      let entries;
      try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        const full = path.join(d, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.isFile() && TEXT_EXT.has(path.extname(e.name))) {
          const h = hashContent(full);
          if (h && incomingHashes.has(h)) {
            exactOverlaps.push({
              active: path.relative(repoRoot, full),
              incoming: incomingHashes.get(h)
            });
          }
        }
      }
    })(root);
  }

  // Slug collisions — incoming filenames that match an active id.
  const slugCollisions = [];
  for (const paths of incomingHashes.values()) {
    for (const p of paths) {
      const base = path.basename(p, path.extname(p)).toLowerCase();
      if (activeSlugs.has(base)) slugCollisions.push({ incoming: p, collides_with: base });
    }
  }

  return {
    exact_overlaps: exactOverlaps,
    slug_collisions: slugCollisions,
    total_text_files: [...incomingHashes.values()].reduce((n, arr) => n + arr.length, 0)
  };
}
