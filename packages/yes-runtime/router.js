import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTrieFromRouteMap } from '../yes-graph/index.js';
import { HookRunner } from '../../hooks/hook-runner.js';
import { PolicyEvaluator } from '../yes-core/policy-evaluator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

export const MAX_ROUTE_DEPTH = 2;
const DEFAULT_FALLBACK = 'route.meta-system.supreme-router';

// Initialize hook runner and policy evaluator
const policyEvaluator = new PolicyEvaluator();
const hookRunner = new HookRunner('hooks', policyEvaluator);

// Helper to resolve files relative to process.cwd() or fall back to repoRoot
function resolvePath(relativePath) {
  const cwdPath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(cwdPath)) {
    return cwdPath;
  }
  return path.join(repoRoot, relativePath);
}

// Helper to safely read and parse JSON without throwing exceptions
function safeReadJSON(filePath, fallbackValue) {
  const absolutePath = resolvePath(filePath);
  if (!fs.existsSync(absolutePath)) {
    return fallbackValue;
  }
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    // Write warnings to stderr to avoid stdout IPC stream pollution!
    console.error(`⚠ JSON Parse Error for ${filePath}: ${error.message}`);
    return fallbackValue;
  }
}

function normalize(prompt) {
  return prompt
    .toLowerCase()
    .trim()
    .replace(/[?!.,;]/g, '')
    .replace(/\s+/g, ' ');
}

/** True if the query trips any of the route's negative keywords. */
function hasNegativeKeyword(route, query) {
  const negatives = route?.match?.negative_keywords || [];
  return negatives.some((neg) => query.includes(normalize(neg)));
}

/**
 * Resolves the best route for a prompt through ordered stages:
 *   pre-route hooks → exact → alias → keyword (phrase trie) → workflow cache → post-route hooks → fallback.
 * Negative keywords veto a match. Loop prevention caps depth and blocks revisits.
 *
 * @param {string} prompt
 * @param {object} [context] - { depth, visited } for multi-hop loop prevention
 * @returns {Promise<object>} route object, annotated with `_match` metadata
 */
export async function resolveRoute(prompt, context = {}) {
  const { depth = 0, visited = [], estimatedTokens } = context;

  // Run pre-route hooks (budget, safety, signal-word routing, loop prevention)
  const preRouteResult = await hookRunner.run('pre-route', {
    task: prompt,
    estimatedTokens,
    depth,
    visited
  });

  if (preRouteResult.blocked) {
    return annotate(getFallbackRoute(), {
      stage: 'blocked',
      confidence: 0,
      reason: preRouteResult.reason,
      blocked_by: preRouteResult.blocked_by
    });
  }

  // Use modified task from pre-route hooks if available
  const taskToRoute = preRouteResult.results
    .map(r => r.result?.modified_task)
    .filter(Boolean)[0] || prompt;

  // Use routing hint from pre-route hooks if available
  const routingHint = preRouteResult.results
    .map(r => r.result?.routing_hint)
    .filter(Boolean)[0];

  if (!taskToRoute || typeof taskToRoute !== 'string') {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'empty or invalid prompt' });
  }
  if (depth > MAX_ROUTE_DEPTH) {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: `max route depth ${MAX_ROUTE_DEPTH} exceeded` });
  }

  const query = normalize(taskToRoute);

  const routeTable = safeReadJSON('graph/indexes/ROUTE_TABLE.min.json', null);
  if (!routeTable || !routeTable.routes) {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'route table unavailable' });
  }
  const routes = safeReadJSON('registry/routes.json', []);
  const fallbackId = routeTable.fallback || DEFAULT_FALLBACK;

  const getRoute = (routeId) => {
    if (visited.includes(routeId)) {
      console.error(`⚠ Loop prevention: route '${routeId}' already visited; falling back.`);
      return null;
    }
    const route = routes.find((r) => r.route_id === routeId);
    if (!route) {
      console.error(`⚠ Stale route index warning: '${routeId}' not in registry. Falling back.`);
      return null;
    }
    return route;
  };

  let matchedRoute = null;

  // 1. Exact phrase match (whole query is a hot keyword)
  if (routeTable.routes[query]) {
    const route = getRoute(routeTable.routes[query]);
    if (route && !hasNegativeKeyword(route, query)) {
      matchedRoute = annotate(route, { stage: 'exact', confidence: route.confidence?.exact ?? 1, reason: `exact match "${query}"` });
    }
  }

  // 2. Alias match
  if (!matchedRoute) {
    const aliasTable = safeReadJSON('graph/indexes/ALIAS_TABLE.min.json', { aliases: {} });
    const aliases = aliasTable.aliases || {};
    if (aliases[query]) {
      const route = getRoute(aliases[query]);
      if (route && !hasNegativeKeyword(route, query)) {
        matchedRoute = annotate(route, { stage: 'alias', confidence: route.confidence?.alias ?? 0.95, reason: `alias match "${query}"` });
      }
    }
  }

  // 3. Keyword containment via phrase trie (longest phrase wins)
  if (!matchedRoute) {
    const trie = buildTrieFromRouteMap(routeTable.routes);
    const hit = trie.search(query);
    if (hit) {
      const route = getRoute(hit.routeId);
      if (route && !hasNegativeKeyword(route, query)) {
        matchedRoute = annotate(route, { stage: 'keyword', confidence: route.confidence?.exact ?? 0.9, reason: `keyword "${hit.phrase}"` });
      }
    }
  }

  // 4. Use routing hint if no match found (still subject to negative-keyword veto)
  if (!matchedRoute && routingHint) {
    const route = getRoute(routingHint.routeId);
    if (route && !hasNegativeKeyword(route, query)) {
      matchedRoute = annotate(route, {
        stage: 'hint',
        confidence: 0.7,
        reason: `signal-word hint: ${routingHint.routeId}`
      });
    }
  }

  // 5. Fallback
  if (!matchedRoute) {
    matchedRoute = annotate(getFallbackRoute(fallbackId), { stage: 'fallback', confidence: 0, reason: 'no route matched' });
  }

  // Run post-route hooks (audit, logging)
  const postRouteResult = await hookRunner.run('post-route', {
    task: taskToRoute,
    route: matchedRoute,
    context
  });

  // Attach hook results to route
  matchedRoute._hooks = {
    pre_route: preRouteResult.results,
    post_route: postRouteResult.results
  };

  return matchedRoute;
}

/**
 * Synchronous version of resolveRoute for backward compatibility
 * Note: This skips hooks and uses only the core routing logic
 */
export function resolveRouteSync(prompt, context = {}) {
  const { depth = 0, visited = [] } = context;

  if (!prompt || typeof prompt !== 'string') {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'empty or invalid prompt' });
  }
  if (depth > MAX_ROUTE_DEPTH) {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: `max route depth ${MAX_ROUTE_DEPTH} exceeded` });
  }

  const query = normalize(prompt);

  const routeTable = safeReadJSON('graph/indexes/ROUTE_TABLE.min.json', null);
  if (!routeTable || !routeTable.routes) {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'route table unavailable' });
  }
  const routes = safeReadJSON('registry/routes.json', []);
  const fallbackId = routeTable.fallback || DEFAULT_FALLBACK;

  const getRoute = (routeId) => {
    if (visited.includes(routeId)) {
      console.error(`⚠ Loop prevention: route '${routeId}' already visited; falling back.`);
      return null;
    }
    const route = routes.find((r) => r.route_id === routeId);
    if (!route) {
      console.error(`⚠ Stale route index warning: '${routeId}' not in registry. Falling back.`);
      return null;
    }
    return route;
  };

  // 1. Exact phrase match
  if (routeTable.routes[query]) {
    const route = getRoute(routeTable.routes[query]);
    if (route && !hasNegativeKeyword(route, query)) {
      return annotate(route, { stage: 'exact', confidence: route.confidence?.exact ?? 1, reason: `exact match "${query}"` });
    }
  }

  // 2. Alias match
  const aliasTable = safeReadJSON('graph/indexes/ALIAS_TABLE.min.json', { aliases: {} });
  const aliases = aliasTable.aliases || {};
  if (aliases[query]) {
    const route = getRoute(aliases[query]);
    if (route && !hasNegativeKeyword(route, query)) {
      return annotate(route, { stage: 'alias', confidence: route.confidence?.alias ?? 0.95, reason: `alias match "${query}"` });
    }
  }

  // 3. Keyword containment via phrase trie
  const trie = buildTrieFromRouteMap(routeTable.routes);
  const hit = trie.search(query);
  if (hit) {
    const route = getRoute(hit.routeId);
    if (route && !hasNegativeKeyword(route, query)) {
      return annotate(route, { stage: 'keyword', confidence: route.confidence?.exact ?? 0.9, reason: `keyword "${hit.phrase}"` });
    }
  }

  // 4. Fallback
  return annotate(getFallbackRoute(fallbackId), { stage: 'fallback', confidence: 0, reason: 'no route matched' });
}

/** Attach non-enumerable-ish match metadata without breaking schema shape. */
function annotate(route, meta) {
  return { ...route, _match: meta };
}

function getFallbackRoute(fallbackId = DEFAULT_FALLBACK) {
  const routes = safeReadJSON('registry/routes.json', []);
  const route = routes.find((r) => r.route_id === fallbackId);
  if (route) return route;

  return {
    route_id: DEFAULT_FALLBACK,
    target: {
      domain_master: 'meta-system.master',
      agent: 'meta-system.supreme-router',
      skills: [],
      workflow: 'workflow.meta-system.route-task'
    },
    budget_band: 'micro'
  };
}
