import fs from 'fs';
import path from 'path';
import { CodeGraph } from '../../yes-graph/code-graph.js';

const PATH_LIKE = /(?:[\w.-]+\/)+[\w.-]+\.[\w]+|\b[A-Z][a-zA-Z]+(?:Service|Engine|Router|Graph)\b/g;

export function readGraphRoutingConfig(repoRoot) {
  try {
    return JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry/graph-routing.json'), 'utf8'));
  } catch {
    return { code_graph_assist: false };
  }
}

export function promptWantsGraphAssist(prompt) {
  if (!prompt || typeof prompt !== 'string') return false;
  if (PATH_LIKE.test(prompt)) {
    PATH_LIKE.lastIndex = 0;
    return true;
  }
  return /\b(?:refactor|symbol|function|class|module|import|packages\/yes-)\b/i.test(prompt);
}

export function graphDbPath(repoRoot, config) {
  return path.join(repoRoot, config.db_path || 'graph/indexes/yes.sqlite');
}

export function isGraphStale(repoRoot, config) {
  const dbPath = graphDbPath(repoRoot, config);
  if (!fs.existsSync(dbPath)) return { stale: true, reason: 'missing' };
  try {
    const g = new CodeGraph(dbPath);
    const stats = g.stats();
    g.close();
    const built = stats.built_at ? Date.parse(stats.built_at) : 0;
    const days = (config.stale_after_days ?? 14) * 86400000;
    if (!built || Date.now() - built > days) return { stale: true, reason: 'age', built_at: stats.built_at };
    return { stale: false, built_at: stats.built_at, file_count: stats.file_count };
  } catch (e) {
    return { stale: true, reason: e.message };
  }
}

export function buildContextPack(repoRoot, prompt, config = readGraphRoutingConfig(repoRoot)) {
  if (!config.code_graph_assist || !promptWantsGraphAssist(prompt)) return [];
  const dbPath = graphDbPath(repoRoot, config);
  if (!fs.existsSync(dbPath)) return [];
  const terms = [];
  const pathMatches = prompt.match(/(?:[\w.-]+\/)+[\w.-]+/g) || [];
  terms.push(...pathMatches.slice(0, 3));
  const fileMatches = prompt.match(/\b[\w.-]+\.[a-z]{1,4}\b/gi) || [];
  terms.push(...fileMatches.slice(0, 2));
  const symMatches = prompt.match(/\b[A-Za-z_][\w$]*[A-Z][\w$]*\b|\b[A-Z][a-zA-Z]{2,}\b/g) || [];
  terms.push(...symMatches.slice(0, 3));
  const fnMatches = prompt.match(/\b(?:function|class|def)\s+([A-Za-z_][\w$]*)/g) || [];
  for (const m of fnMatches) {
    const name = m.split(/\s+/).pop();
    if (name) terms.push(name);
  }
  if (!terms.length)
    terms.push(
      ...prompt
        .split(/\s+/)
        .filter((w) => w.length > 3)
        .slice(0, 4)
    );
  const limit = config.max_context_items ?? 8;
  const graph = new CodeGraph(dbPath);
  const seen = new Set();
  const pack = [];
  for (const term of terms) {
    for (const row of graph.search(term, { limit: Math.ceil(limit / terms.length) })) {
      const key = row.file + ':' + row.line + ':' + row.name;
      if (seen.has(key)) continue;
      seen.add(key);
      pack.push({ file: row.file, kind: row.kind, name: row.name, line: row.line, source: row.source || 'symbol' });
      if (pack.length >= limit) break;
    }
    if (pack.length >= limit) break;
  }
  graph.close();
  return pack;
}
