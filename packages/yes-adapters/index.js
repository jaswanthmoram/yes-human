/**
 * Yes-human Adapter Factory
 *
 * Single canonical source → host-specific generated bundles.
 * Principle: portable core first, host bundle second, manual host-specific behavior last.
 *
 * Supported hosts (core): claude, codex, opencode, mcp
 * Optional adapter packs (Phase 9): cursor, windsurf, vscode, sourcegraph, generic
 *
 * Each adapter receives a BuildContext (loaded registries + content) and writes
 * its output into generated/<host>/.  Never maintains duplicate source trees.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, '../..');

// ── helpers ──────────────────────────────────────────────────────────────────

export function readJSON(rel) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
}

export function readFile(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), 'utf8');
}

export function writeGenerated(host, rel, content) {
  const out = path.join(repoRoot, 'generated', host, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
}

export function ensureDir(rel) {
  fs.mkdirSync(path.join(repoRoot, rel), { recursive: true });
}

// ── context loader ────────────────────────────────────────────────────────────

/**
 * Loads all canonical data once and shares it across adapters.
 */
export function loadBuildContext() {
  const plugin     = readJSON('yes-human.plugin.json');
  const agents     = readJSON('registry/agents.json');
  const routes     = readJSON('registry/routes.json');
  const routeTable = readJSON('graph/indexes/ROUTE_TABLE.min.json');
  const workflows  = readJSON('registry/workflows.json');
  const mcps       = readJSON('registry/mcps.json');
  const adapterPacks = readJSON('registry/adapter-packs.json');
  const categoryPacks = readJSON('registry/category-packs.json');
  const categories = readJSON('registry/categories.json');
  const costPolicy = readJSON('registry/cost-policy.json');
  const learningPolicy = readJSON('registry/learning-policy.json');
  const teamMode = readJSON('registry/team-mode.json');
  const offlineMode = readJSON('registry/offline-mode.json');
  const bootText   = readFile('YES_BOOT.md');

  const resolveEnv = (val) => {
    if (val && val.startsWith('{env:') && val.endsWith('}')) {
      return process.env[val.slice(5, -1)];
    }
    return val;
  };
  let privateKey = resolveEnv(process.env.YES_PRIVATE_KEY) || null;
  let publicKey = resolveEnv(process.env.YES_PUBLIC_KEY) || null;

  if (!privateKey) {
    try {
      const { privateKey: ephemPriv, publicKey: ephemPub } = crypto.generateKeyPairSync('ed25519', {
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        publicKeyEncoding: { type: 'spki', format: 'pem' }
      });
      privateKey = ephemPriv;
      publicKey = ephemPub;
    } catch (err) {
      console.error(`⚠ Failed to generate ephemeral keypair: ${err.message}`);
    }
  }

  return {
    plugin,
    agents: agents.items,
    routes,
    routeTable,
    workflows: workflows.items,
    mcps: mcps.items,
    adapterPacks: adapterPacks.items,
    categoryPacks: categoryPacks.items,
    categories: categories.items,
    costPolicy,
    learningPolicy,
    teamMode,
    offlineMode,
    bootText,
    version: plugin.version,
    generatedAt: new Date().toISOString(),
    privateKey,
    publicKey
  };
}

// ── adapter registry ──────────────────────────────────────────────────────────

const CORE_HOSTS = ['claude', 'codex', 'opencode', 'mcp'];
const OPTIONAL_HOSTS = ['cursor', 'windsurf', 'vscode', 'sourcegraph', 'generic'];
const ALL_HOSTS = [...CORE_HOSTS, ...OPTIONAL_HOSTS];

export async function buildHost(host, ctx) {
  if (!ALL_HOSTS.includes(host)) {
    throw new Error(`Unknown host "${host}". Hosts: ${ALL_HOSTS.join(', ')}`);
  }
  const adapter = await import(`./adapters/${host}.js`);
  ensureDir(`generated/${host}`);
  await adapter.generate(ctx);
  return path.join(repoRoot, 'generated', host);
}

export async function buildAll(ctx) {
  const results = {};
  for (const host of ALL_HOSTS) {
    results[host] = await buildHost(host, ctx);
  }
  return results;
}
