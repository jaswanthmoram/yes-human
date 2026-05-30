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
  const categories = readJSON('registry/categories.json');
  const costPolicy = readJSON('registry/cost-policy.json');
  const bootText   = readFile('YES_BOOT.md');

  return {
    plugin,
    agents: agents.items,
    routes,
    routeTable,
    workflows: workflows.items,
    mcps: mcps.items,
    categories: categories.items,
    costPolicy,
    bootText,
    version: plugin.version,
    generatedAt: new Date().toISOString()
  };
}

// ── adapter registry ──────────────────────────────────────────────────────────

const CORE_HOSTS = ['claude', 'codex', 'opencode', 'mcp'];

export async function buildHost(host, ctx) {
  if (!CORE_HOSTS.includes(host)) {
    throw new Error(`Unknown host "${host}". Core hosts: ${CORE_HOSTS.join(', ')}`);
  }
  const adapter = await import(`./adapters/${host}.js`);
  ensureDir(`generated/${host}`);
  await adapter.generate(ctx);
  return path.join(repoRoot, 'generated', host);
}

export async function buildAll(ctx) {
  const results = {};
  for (const host of CORE_HOSTS) {
    results[host] = await buildHost(host, ctx);
  }
  return results;
}
