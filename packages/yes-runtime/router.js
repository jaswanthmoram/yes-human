import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTrieFromRouteMap } from '../yes-graph/index.js';
import { HookRunner } from '../../hooks/hook-runner.js';
import { getSharedPolicyEvaluator } from '../yes-core/policy-evaluator.js';
import { createLogger } from '../yes-core/logger.js';

const log = createLogger('router');
import { LearningEngine } from './learning-engine.js';
import {
  buildContextPack,
  isGraphStale,
  promptWantsGraphAssist,
  readGraphRoutingConfig
} from './lib/code-graph-assist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

export const MAX_ROUTE_DEPTH = 2;
const DEFAULT_FALLBACK = 'route.meta-system.supreme-router';

// Initialize hook runner and policy evaluator (shared singletons)
const policyEvaluator = getSharedPolicyEvaluator();
const hookRunner = new HookRunner('hooks', policyEvaluator);

const pathCache = new Map();

// Helper to resolve files relative to process.cwd() or fall back to repoRoot
function resolvePath(relativePath) {
  const key = `${process.cwd()}::${relativePath}`;
  let resolved = pathCache.get(key);
  if (resolved) return resolved;

  const cwdPath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(cwdPath)) {
    resolved = cwdPath;
  } else {
    resolved = path.join(repoRoot, relativePath);
  }
  pathCache.set(key, resolved);
  return resolved;
}

const jsonCache = new Map();
const STAT_THROTTLE_MS = process.env.NODE_ENV === 'test' ? 0 : 5000;

// Helper to safely read and parse JSON without throwing exceptions
function safeReadJSON(filePath, fallbackValue) {
  const absolutePath = resolvePath(filePath);
  const now = Date.now();
  const cached = jsonCache.get(absolutePath);

  if (cached && (now - cached.lastChecked < STAT_THROTTLE_MS)) {
    return cached.data;
  }

  if (!fs.existsSync(absolutePath)) {
    return fallbackValue;
  }
  try {
    const stats = fs.statSync(absolutePath);
    const mtime = stats.mtimeMs;
    if (cached && cached.mtime === mtime) {
      cached.lastChecked = now;
      return cached.data;
    }
    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    jsonCache.set(absolutePath, { data, mtime, lastChecked: now });
    return data;
  } catch (error) {
    // Write warnings to stderr to avoid stdout IPC stream pollution!
    log.warn('JSON parse error; falling back to cached or default', { filePath, error: error.message });
    if (cached) {
      cached.lastChecked = now;
      return cached.data;
    }
    return fallbackValue;
  }
}

function normalize(prompt) {
  return String(prompt || '')
    .toLowerCase()
    .trim()
    .replace(/[?!.,;]/g, '')
    .replace(/\s+/g, ' ');
}

const SEMANTIC_STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'help',
  'i',
  'in',
  'into',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'our',
  'please',
  'the',
  'this',
  'to',
  'with',
  'you',
  'execute',
  'task',
  'run',
  'runn',
  'use',
  'perform',
  'do',
  'can',
  'need',
  'should',
  'would',
  'will',
  'want',
  'trigger',
  'solution',
  'implement',
  'audit',
  'check',
  'detail',
  'about',
  'how'
]);

function stemToken(token) {
  if (token.length <= 3) return token;

  let stemmed = token;

  // Handle plural mappings
  if (stemmed.endsWith('ies')) {
    stemmed = stemmed.slice(0, -3) + 'y'; // studies -> study
  } else if (stemmed.endsWith('sses')) {
    stemmed = stemmed.slice(0, -2); // classes -> class
  } else if (stemmed.endsWith('es')) {
    const base = stemmed.slice(0, -2);
    // check if it ends with typical sibilant plural suffix
    if (/(s|x|z|ch|sh)$/.test(base)) {
      stemmed = base; // boxes -> box
    } else {
      stemmed = stemmed.slice(0, -1); // ages -> age, routes -> route (strip s only)
    }
  } else if (stemmed.endsWith('s') && !stemmed.endsWith('ss') && stemmed !== 'news' && stemmed !== 'status') {
    stemmed = stemmed.slice(0, -1); // general plural strip
  }

  // Handle past tense and continuous tense
  if (stemmed.endsWith('ed') && !stemmed.endsWith('eed')) {
    const base = stemmed.slice(0, -2);
    if (/(at|iz|us|re|v|c)$/.test(base)) {
      stemmed = base + 'e'; // created -> create, implemented -> implement
    } else {
      stemmed = base;
    }
  } else if (stemmed.endsWith('ing')) {
    stemmed = stemmed.slice(0, -3); // routing -> rout
  }

  return stemmed;
}

function semanticTokenize(text) {
  return normalize(text)
    .split(/[^a-z0-9+#]+/)
    .map(stemToken)
    .filter((token) => token.length >= 2 && !SEMANTIC_STOP_WORDS.has(token));
}

function semanticScore(queryTokens, routeTokens) {
  if (!queryTokens.length || !routeTokens.length) return { score: 0, overlap: [] };
  const routeSet = new Set(routeTokens);
  const overlap = Array.from(new Set(queryTokens.filter((token) => routeSet.has(token))));
  const precision = overlap.length / new Set(queryTokens).size;
  const recall = overlap.length / new Set(routeTokens).size;
  const score = overlap.length === 0 ? 0 : 0.8 * precision + 0.2 * recall;
  return { score, overlap };
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

const aliasRegexCache = new Map(); // absolutePath -> { mtime, lastChecked, regexes: [{ alias, regex, routeId }] }

function getCompiledAliases(filePath) {
  const absolutePath = resolvePath(filePath);
  const now = Date.now();
  const cached = aliasRegexCache.get(absolutePath);

  if (cached && (now - cached.lastChecked < STAT_THROTTLE_MS)) {
    return cached.regexes;
  }

  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  try {
    const stats = fs.statSync(absolutePath);
    const mtime = stats.mtimeMs;
    if (cached && cached.mtime === mtime) {
      cached.lastChecked = now;
      return cached.regexes;
    }
    const data = safeReadJSON(filePath, { aliases: {} });
    const aliases = data.aliases || {};
    const sortedAliases = Object.keys(aliases).sort((a, b) => b.length - a.length);
    const regexes = sortedAliases.map((alias) => {
      const escapedAlias = alias.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?<=^|[^a-z0-9#+])${escapedAlias}(?=$|[^a-z0-9#+])`, 'i');
      return {
        alias,
        regex,
        routeId: aliases[alias]
      };
    });
    aliasRegexCache.set(absolutePath, { mtime, lastChecked: now, regexes });
    return regexes;
  } catch (error) {
    log.warn('Alias compile error', { filePath, error: error.message });
    return [];
  }
}

const routesMapCache = new WeakMap();
function getRoutesMap(routes) {
  let map = routesMapCache.get(routes);
  if (!map) {
    map = new Map(routes.map((r) => [r.route_id, r]));
    routesMapCache.set(routes, map);
  }
  return map;
}

const trieCache = new WeakMap();
function getTrie(routes) {
  let trie = trieCache.get(routes);
  if (!trie) {
    trie = buildTrieFromRouteMap(routes);
    trieCache.set(routes, trie);
  }
  return trie;
}

function attachRoutingHints(matchedRoute) {
  try {
    const learningPolicy = safeReadJSON('registry/learning-policy.json', {});
    if (learningPolicy.routing_hints?.enabled === true) {
      const engine = new LearningEngine({ repoRoot: process.cwd() });
      const hints = engine.getMistakeRoutingHints(matchedRoute.route_id);
      if (hints.length) matchedRoute.routing_hints = hints;
    }
  } catch (err) {
    log.warn('Routing hints unavailable', { error: err.message });
  }
  return matchedRoute;
}

/**
 * Common core routing logic shared between resolveRoute and resolveRouteSync
 */
function resolveRouteCore(query, context, options = {}) {
  const { visited = [] } = context;
  const {
    routeTable,
    routes,
    routesMap,
    fallbackId,
    routingHint = null,
    enableGraphAssist = false,
    repoRoot = null
  } = options;

  const getRoute = (routeId) => {
    if (visited.includes(routeId)) {
      log.warn('Loop prevention: route already visited; falling back', { routeId });
      return null;
    }
    const route = routesMap.get(routeId);
    if (!route) {
      log.warn('Stale route index: not in registry; falling back', { routeId });
      return null;
    }
    return route;
  };

  let matchedRoute = null;
  let negativeVeto = false;

  // 1. Exact phrase match (whole query is a hot keyword)
  if (routeTable.routes[query]) {
    const route = getRoute(routeTable.routes[query]);
    if (route && !hasNegativeKeyword(route, query)) {
      matchedRoute = annotate(route, {
        stage: 'exact',
        confidence: route.confidence?.exact ?? 1,
        reason: `exact match "${query}"`
      });
    } else if (route) {
      negativeVeto = true;
    }
  }

  // 2. Alias match
  if (!matchedRoute) {
    const aliasTable = safeReadJSON('graph/indexes/ALIAS_TABLE.min.json', { aliases: {} });
    const aliases = aliasTable.aliases || {};
    if (aliases[query]) {
      const route = getRoute(aliases[query]);
      if (route && !hasNegativeKeyword(route, query)) {
        matchedRoute = annotate(route, {
          stage: 'alias',
          confidence: route.confidence?.alias ?? 0.95,
          reason: `alias match "${query}"`
        });
      } else if (route) {
        negativeVeto = true;
      }
    }
  }

  // 3. Keyword containment via phrase trie (longest phrase wins)
  if (!matchedRoute) {
    const trie = getTrie(routeTable.routes);
    const hit = trie.search(query);
    if (hit) {
      const route = getRoute(hit.routeId);
      if (route && !hasNegativeKeyword(route, query)) {
        matchedRoute = annotate(route, {
          stage: 'keyword',
          confidence: route.confidence?.exact ?? 0.9,
          reason: `keyword "${hit.phrase}"`
        });
      } else if (route) {
        negativeVeto = true;
      }
    }
  }

  // 3b. Embedded alias match
  if (!matchedRoute && !negativeVeto) {
    const compiledAliases = getCompiledAliases('graph/indexes/ALIAS_TABLE.min.json');
    for (const { alias, regex, routeId } of compiledAliases) {
      if (regex.test(query)) {
        const route = getRoute(routeId);
        if (route && !hasNegativeKeyword(route, query)) {
          matchedRoute = annotate(route, {
            stage: 'embedded_alias',
            confidence: route.confidence?.alias ?? 0.85,
            reason: `embedded alias match "${alias}"`
          });
          break;
        }
      }
    }
  }

  // 4. Code-graph assist boost (only when enabled)
  if (!matchedRoute && enableGraphAssist && repoRoot) {
    const graphBoost = tryGraphAssistRoute(query, getRoute, repoRoot);
    if (graphBoost) matchedRoute = graphBoost;
  }

  // 5. Use routing hint if no match found (still subject to negative-keyword veto)
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

  // 6. Semantic fallback. Deterministic local scoring over public route keywords/aliases.
  if (!matchedRoute && !negativeVeto) {
    const semCfg = readSemanticGraphConfig();
    const sem = trySemanticFallback(query, getRoute, semCfg, routes);
    if (sem) matchedRoute = sem;
  }

  // 7. Fallback
  if (!matchedRoute) {
    matchedRoute = annotate(getFallbackRoute(fallbackId), {
      stage: 'fallback',
      confidence: 0,
      reason: negativeVeto ? 'negative keyword veto' : 'no route matched'
    });
  }

  // Auto-reroute logic based on mistake graph suggestions
  if (matchedRoute && matchedRoute.route_id !== fallbackId) {
    const learningPolicy = safeReadJSON('registry/learning-policy.json', {});
    if (learningPolicy.routing_hints?.enabled === true && learningPolicy.routing_hints?.read_only === false) {
      const engine = new LearningEngine({ repoRoot: process.cwd() });
      const hints = engine.getMistakeRoutingHints(matchedRoute.route_id);
      const hint = hints[0];
      if (hint && hint.suggested_route) {
        const suggested = getRoute(hint.suggested_route);
        if (suggested) {
          log.info('Auto-rerouting based on mistake graph feedback', {
            from: matchedRoute.route_id,
            to: hint.suggested_route,
            failure_class: hint.failure_class
          });
          matchedRoute = annotate(suggested, {
            stage: 'mistake_reroute',
            confidence: 0.8,
            reason: `auto-reroute from ${matchedRoute.route_id} due to failure class: ${hint.failure_class}`,
            original_route: matchedRoute.route_id
          });
        }
      }
    }
  }

  return matchedRoute;
}

/**
 * Resolve a natural-language task to a route.
 * @param {string} task - The task description to route.
 * @param {object} [context] - Routing options.
 * @param {number} [context.depth=0] - Current routing depth for loop prevention.
 * @param {string[]} [context.visited=[]] - Previously visited route IDs.
 * @returns {Promise<object>} The resolved route object with target, budget_band, and match metadata.
 */
export async function resolveRoute(prompt, context = {}) {
  const { depth = 0, visited = [], estimatedTokens } = context;

  const confidenceQuery = normalize(prompt);
  let fastConfidence = 0;

  try {
    const routeTable = safeReadJSON('graph/indexes/ROUTE_TABLE.min.json', null);
    if (routeTable && routeTable.routes) {
      if (routeTable.routes[confidenceQuery]) {
        fastConfidence = 1.0;
      } else {
        const aliasTable = safeReadJSON('graph/indexes/ALIAS_TABLE.min.json', { aliases: {} });
        const aliases = aliasTable?.aliases || {};
        if (aliases[confidenceQuery]) {
          fastConfidence = 0.95;
        } else {
          const trie = buildTrieFromRouteMap(routeTable.routes);
          const hit = trie.search(confidenceQuery);
          if (hit) {
            fastConfidence = 0.9;
          }
        }
      }
    }
  } catch (err) {
    // Ignore, fallback to 0
  }

  // Run pre-route hooks (budget, safety, signal-word routing, loop prevention)
  const preRouteResult = await hookRunner.run('pre-route', {
    task: prompt,
    estimatedTokens,
    depth,
    visited,
    routerConfidence: fastConfidence
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
  const taskToRoute = preRouteResult.results.map((r) => r.result?.modified_task).filter(Boolean)[0] || prompt;

  // Use routing hint from pre-route hooks if available
  const routingHint = preRouteResult.results.map((r) => r.result?.routing_hint).filter(Boolean)[0];

  if (!taskToRoute || typeof taskToRoute !== 'string') {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'empty or invalid prompt' });
  }
  if (depth > MAX_ROUTE_DEPTH) {
    return annotate(getFallbackRoute(), {
      stage: 'fallback',
      confidence: 0,
      reason: `max route depth ${MAX_ROUTE_DEPTH} exceeded`
    });
  }

  const query = normalize(taskToRoute);

  const routeTable = safeReadJSON('graph/indexes/ROUTE_TABLE.min.json', null);
  if (!routeTable || !routeTable.routes) {
    return annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'route table unavailable' });
  }
  const routes = safeReadJSON('registry/routes.json', []);
  const routesMap = getRoutesMap(routes);
  const fallbackId = routeTable.fallback || DEFAULT_FALLBACK;

  const matchedRoute = resolveRouteCore(query, context, {
    routeTable,
    routes,
    routesMap,
    fallbackId,
    routingHint,
    enableGraphAssist: true,
    repoRoot
  });

  // Run post-route hooks (audit, logging)
  const postRouteResult = await hookRunner.run('post-route', {
    task: taskToRoute,
    route: matchedRoute,
    context
  });

  // Attach hook results to route
  attachRoutingHints(matchedRoute);

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
    return attachRoutingHints(
      annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'empty or invalid prompt' })
    );
  }
  if (depth > MAX_ROUTE_DEPTH) {
    return attachRoutingHints(
      annotate(getFallbackRoute(), {
        stage: 'fallback',
        confidence: 0,
        reason: `max route depth ${MAX_ROUTE_DEPTH} exceeded`
      })
    );
  }

  const query = normalize(prompt);

  const routeTable = safeReadJSON('graph/indexes/ROUTE_TABLE.min.json', null);
  if (!routeTable || !routeTable.routes) {
    return attachRoutingHints(
      annotate(getFallbackRoute(), { stage: 'fallback', confidence: 0, reason: 'route table unavailable' })
    );
  }
  const routes = safeReadJSON('registry/routes.json', []);
  const routesMap = getRoutesMap(routes);
  const fallbackId = routeTable.fallback || DEFAULT_FALLBACK;

  const matchedRoute = resolveRouteCore(query, context, {
    routeTable,
    routes,
    routesMap,
    fallbackId,
    routingHint: null,
    enableGraphAssist: false,
    repoRoot: null
  });

  return attachRoutingHints(matchedRoute);
}

/** Attach non-enumerable-ish match metadata without breaking schema shape. */
function annotate(route, meta) {
  return { ...route, _match: meta };
}

function tryGraphAssistRoute(query, getRoute, root) {
  const cfg = readGraphRoutingConfig(root);
  if (!cfg.code_graph_assist) return null;
  if (isGraphStale(root, cfg).stale) return null;
  if (!promptWantsGraphAssist(query)) return null;
  const pack = buildContextPack(root, query, cfg);
  if (!pack.length) return null;
  const boostMap = cfg.route_boost || {};
  for (const item of pack) {
    for (const [prefix, routeId] of Object.entries(boostMap)) {
      if (item.file.startsWith(prefix)) {
        const route = getRoute(routeId);
        if (route && !hasNegativeKeyword(route, query)) {
          return annotate(route, {
            stage: 'graph_assist',
            confidence: 0.75,
            reason: `graph assist ${prefix}`,
            context_pack: pack.slice(0, 3)
          });
        }
      }
    }
  }
  return null;
}

// Inverted index: token → Set<route_id>. Lets us look up only routes that share
// at least one token with the query, instead of walking all 445 routes every call.
// Keyed by the routes array identity so cache invalidates when the array is replaced.
const semanticIndexCache = new WeakMap();

function buildSemanticIndex(routes) {
  const cached = semanticIndexCache.get(routes);
  if (cached) return cached;
  const tokenToRoutes = new Map();
  const routeTokens = new Map(); // route_id → tokens (avoid recomputing per query)
  for (const route of routes) {
    if (!route?.route_id) continue;
    const routeText = [
      route.route_id,
      route.target?.agent,
      route.target?.workflow,
      ...(route.match?.keywords || []),
      ...(route.match?.aliases || [])
    ]
      .filter(Boolean)
      .join(' ');
    const tokens = semanticTokenize(routeText);
    routeTokens.set(route.route_id, tokens);
    for (const token of tokens) {
      let set = tokenToRoutes.get(token);
      if (!set) {
        set = new Set();
        tokenToRoutes.set(token, set);
      }
      set.add(route.route_id);
    }
  }
  const index = { tokenToRoutes, routeTokens };
  semanticIndexCache.set(routes, index);
  return index;
}

function trySemanticFallback(query, getRoute, graphCfg, routes = []) {
  if (!graphCfg?.semantic_fallback) return null;
  const queryTokens = semanticTokenize(query);
  if (queryTokens.length < (graphCfg.semantic_min_query_tokens ?? 2)) return null;

  const { tokenToRoutes, routeTokens } = buildSemanticIndex(routes);

  // Candidate set: union of route_ids that share at least one token with the query.
  // For a 3-token query in a 445-route registry this typically yields ~30-80 candidates
  // instead of all 445.
  const candidateIds = new Set();
  for (const token of queryTokens) {
    const set = tokenToRoutes.get(token);
    if (set) for (const id of set) candidateIds.add(id);
  }
  if (candidateIds.size === 0) return null;

  let best = null;
  for (const routeId of candidateIds) {
    const route = getRoute(routeId);
    if (!route || hasNegativeKeyword(route, query)) continue;
    const tokens = routeTokens.get(routeId) || [];
    const { score, overlap } = semanticScore(queryTokens, tokens);
    if (overlap.length < (graphCfg.semantic_min_overlap ?? 2)) continue;
    if (!best || score > best.score) best = { route, score, overlap };
  }

  if (!best || best.score < (graphCfg.semantic_min_score ?? 0.42)) return null;
  return annotate(best.route, {
    stage: 'semantic',
    confidence: Math.min(best.route.confidence?.semantic ?? 0.7, Number(best.score.toFixed(3))),
    reason: `semantic overlap: ${best.overlap.join(', ')}`,
    semantic_score: Number(best.score.toFixed(3))
  });
}

function readSemanticGraphConfig() {
  try {
    const cfg = safeReadJSON('registry/graph-routing.json', {});
    return {
      semantic_fallback: Boolean(cfg.semantic_fallback),
      semantic_min_score: Number(cfg.semantic_min_score ?? 0.42),
      semantic_min_overlap: Number(cfg.semantic_min_overlap ?? 2),
      semantic_min_query_tokens: Number(cfg.semantic_min_query_tokens ?? 2)
    };
  } catch {
    return { semantic_fallback: false };
  }
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
