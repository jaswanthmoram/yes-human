/**
 * Fetcher — get a source into `staging/incoming/<slug>/`.
 *
 * Supports:
 *   - GitHub URL                (shallow `git clone` via gh-CLI or git)
 *   - Local folder path         (copy)
 *
 * Records:
 *   - kind                ("github" | "local")
 *   - origin_url          (canonical source URL or absolute path)
 *   - commit_or_version   (short SHA for git; mtime fingerprint for local)
 *   - fetched_at
 *   - slug                (filesystem-safe identifier)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawnSync } from 'child_process';

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function isGithubUrl(s) {
  return /^https?:\/\/github\.com\/[^/]+\/[^/]+/.test(s);
}

/** Shallow clone a GitHub repo into staging/incoming/<slug>/. Returns metadata. */
function fetchGithub(url, stagingRoot) {
  // Normalize: strip trailing .git, /tree/<branch>, etc.
  const m = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^/]+))?(?:\/.*)?$/);
  if (!m) throw new Error(`Not a recognizable GitHub URL: ${url}`);
  const owner = m[1], repo = m[2], ref = m[3];
  const slug = slugify(`gh-${owner}-${repo}${ref ? '-' + ref : ''}`);
  const dest = path.join(stagingRoot, slug);

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(dest, { recursive: true });

  const cloneUrl = `https://github.com/${owner}/${repo}.git`;
  const args = ['clone', '--depth', '1'];
  if (ref) args.push('--branch', ref);
  args.push(cloneUrl, dest);

  const res = spawnSync('git', args, { encoding: 'utf8' });
  if (res.status !== 0) {
    throw new Error(`git clone failed (${res.status}): ${res.stderr || res.stdout}`);
  }

  // Capture commit SHA
  const sha = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: dest, encoding: 'utf8' });
  const commit = sha.status === 0 ? sha.stdout.trim().slice(0, 12) : 'unknown';

  // Remove .git so the staged tree is plain content (rollback is easier).
  fs.rmSync(path.join(dest, '.git'), { recursive: true, force: true });

  return {
    kind: 'github',
    slug,
    origin_url: `${cloneUrl}${ref ? `#${ref}` : ''}`,
    commit_or_version: commit,
    fetched_at: new Date().toISOString(),
    dest
  };
}

/** Copy a local folder into staging/incoming/<slug>/. */
function fetchLocal(srcPath, stagingRoot) {
  const abs = path.resolve(srcPath);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) {
    throw new Error(`Local source not found or not a directory: ${abs}`);
  }
  const slug = slugify(`local-${path.basename(abs)}`);
  const dest = path.join(stagingRoot, slug);

  // For local sources already inside staging/incoming we just point at them
  // (no copy — the staged plugins like ECC live here already).
  if (abs.startsWith(path.resolve(stagingRoot) + path.sep)) {
    return {
      kind: 'local',
      slug: path.basename(abs),
      origin_url: abs,
      commit_or_version: fingerprintDir(abs),
      fetched_at: new Date().toISOString(),
      dest: abs
    };
  }

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(abs, dest, { recursive: true, dereference: false, errorOnExist: false });

  return {
    kind: 'local',
    slug,
    origin_url: abs,
    commit_or_version: fingerprintDir(dest),
    fetched_at: new Date().toISOString(),
    dest
  };
}

/** Lightweight content fingerprint for local folders (mtime + path hash). */
function fingerprintDir(dir) {
  const h = crypto.createHash('sha256');
  function walk(d) {
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile()) {
        try {
          const st = fs.statSync(full);
          h.update(`${path.relative(dir, full)}:${st.size}:${st.mtimeMs}\n`);
        } catch { /* ignore */ }
      }
    }
  }
  walk(dir);
  return h.digest('hex').slice(0, 12);
}

/** Public entry: fetch any supported source kind. */
export function fetchSource(input, { stagingRoot }) {
  fs.mkdirSync(stagingRoot, { recursive: true });
  if (isGithubUrl(input)) return fetchGithub(input, stagingRoot);
  return fetchLocal(input, stagingRoot);
}
