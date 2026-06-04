import fs from 'fs';
import path from 'path';
import { callLLM } from '../packages/yes-runtime/lib/llm-client.js';
import { createLogger } from '../packages/yes-core/logger.js';

const log = createLogger('hook:pre-route-llm-assist');

function getRouteCandidates(task, routes, limit = 20) {
  const queryTokens = String(task || '')
    .toLowerCase()
    .split(/[^a-z0-9+#]+/)
    .filter((t) => t.length > 2);

  // If no query tokens, return first N routes
  if (queryTokens.length === 0) {
    return routes.slice(0, limit);
  }

  const scored = routes.map((route) => {
    let score = 0;
    const searchArea = [
      route.route_id,
      route.target?.agent || '',
      ...(route.match?.keywords || []),
      ...(route.match?.aliases || [])
    ]
      .join(' ')
      .toLowerCase();

    for (const token of queryTokens) {
      if (searchArea.includes(token)) {
        score += 1;
      }
    }
    return { route, score };
  });

  // Filter scored candidates, fallback to first N if none match
  const filtered = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.route);
  if (filtered.length === 0) {
    return routes.slice(0, limit);
  }
  return filtered.slice(0, limit);
}

/**
 * Pre-route hook for LLM-assisted routing fallback.
 * If the deterministic router has low confidence or is heading to fallback,
 * this hook runs to ask the LLM for a routing mapping suggestion.
 *
 * @param {Object} context - { task, estimatedTokens, depth, visited, routerConfidence }
 * @returns {Promise<Object>} Hook result containing modified_task or routing_hint
 */
export default async function preRouteLLMAssist(context) {
  try {
    const { task, routerConfidence = 0 } = context;

    // Operator escape hatch: opt out of LLM-assisted routing entirely (useful
    // for tests, airgapped environments, or when callers want pure-deterministic
    // routing). Accepts the usual truthy strings.
    if (['1', 'true', 'yes', 'on'].includes(String(process.env.YES_DISABLE_LLM_ASSIST || '').toLowerCase())) {
      return { allowed: true };
    }

    // Only invoke LLM routing assist when deterministic routing has low confidence
    if (routerConfidence > 0.8) {
      return { allowed: true };
    }

    const routesPath = path.join(process.cwd(), 'registry/routes.json');
    let routes = [];
    if (fs.existsSync(routesPath)) {
      try {
        routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
      } catch (err) {
        log.error('Failed to parse routes.json', { error: err.message });
      }
    }

    const candidates = getRouteCandidates(task, routes, 25);
    const candidateListStr = candidates.map((c) => `- ${c.route_id}`).join('\n');

    const systemPrompt = `
You are the semantic routing assistant for the yes-human control plane.
Map the user task description to the most appropriate route ID from the available candidates.
If no agent matches, respond with "NONE".

Available specialist routes:
${candidateListStr}
`;

    const response = await callLLM({
      system: systemPrompt,
      prompt: task,
      max_tokens: 50
    });

    const routeId = response.trim();
    if (routeId && routeId !== 'NONE' && routeId.startsWith('route.')) {
      log.info('LLM mapped task to routing hint', { routeId });
      return {
        allowed: true,
        routing_hint: { routeId, priority: 0.95 }
      };
    }

    return { allowed: true };
  } catch (err) {
    // Gracefully handle LLM routing hook errors to prevent breaking the local router
    log.warn('LLM-assist hook error (degrading gracefully)', { error: err.message });
    return { allowed: true };
  }
}
