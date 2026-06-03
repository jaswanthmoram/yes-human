/**
 * Pre-route hook: Budget + Safety + Signal-Word Routing
 * 
 * Runs before routing decision. Checks:
 * 1. Token budget (from budget.rules.json)
 * 2. Safety keywords (from safety.rules.json)
 * 3. Signal-word routing hints (from AgentMaster pattern)
 * 4. Loop prevention (from loop-prevention.rules.json)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PolicyEvaluator } from '@yes-human/core';
import { MAX_ROUTE_DEPTH } from '../packages/yes-runtime/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const PERSONA_FILE = path.join(process.cwd(), '.yes-human-persona');
const PERSONAS_REGISTRY = path.join(repoRoot, 'registry', 'personas.json');

/** Load the active persona if one is set. Returns null if none set. */
function loadActivePersona() {
  try {
    if (!fs.existsSync(PERSONA_FILE)) return null;
    const personaId = fs.readFileSync(PERSONA_FILE, 'utf8').trim();
    if (!personaId) return null;
    if (!fs.existsSync(PERSONAS_REGISTRY)) return null;
    const registry = JSON.parse(fs.readFileSync(PERSONAS_REGISTRY, 'utf8'));
    return (registry.items || []).find(p => p.persona_id === personaId) || null;
  } catch { return null; }
}

export default async function preRoute(context, policyEvaluator = null) {
  try {
    const { task, estimatedTokens, depth = 0, visited = [] } = context;
    
    // Initialize policy evaluator if not provided
    const evaluator = policyEvaluator || new PolicyEvaluator();
    
    // 1. Budget check
    if (estimatedTokens !== undefined) {
      const budgetCheck = evaluator.evaluate({
        action: 'route',
        estimatedTokens,
        task
      });
      
      if (!budgetCheck.allowed) {
        return { 
          block_reason: budgetCheck.reason,
          rule: budgetCheck.rule,
          policy: budgetCheck.policy
        };
      }
    }
    
    // 2. Safety check (destructive keywords)
    const safetyCheck = evaluator.evaluate({
      action: 'route',
      task
    });
    
    if (!safetyCheck.allowed) {
      return { 
        block_reason: safetyCheck.reason,
        rule: safetyCheck.rule
      };
    }
    
    // 3. Signal-word routing (from AgentMaster pattern)
    const signalWords = extractSignalWords(task);
    const routingHint = matchSignalWords(signalWords);
    
    // 4. Loop prevention (from loop-prevention.rules.json)
    if (depth > MAX_ROUTE_DEPTH) {
      return { 
        block_reason: `Max routing depth (${MAX_ROUTE_DEPTH}) exceeded`,
        rule: 'loop-prevention'
      };
    }
    
    if (routingHint && visited.includes(routingHint.routeId)) {
      return { 
        block_reason: `Circular route detected: ${routingHint.routeId}`,
        rule: 'loop-prevention'
      };
    }
    
    // 5. Persona bias — inject preferred domain hint if a persona is active
    const persona = loadActivePersona();
    let personaHint = null;
    if (persona && !routingHint) {
      // Only use persona hint when no stronger signal-word hint was found
      const preferredAgent = persona.preferred_agents?.[0];
      if (preferredAgent) {
        personaHint = { routeId: `route.${preferredAgent}`, priority: 0.5 };
      }
    }

    // Success: return modified context with routing hints
    return {
      modified_task: task,
      routing_hint: routingHint || personaHint,
      signal_words: signalWords,
      active_persona: persona?.persona_id || null,
      allowed: true
    };
  } catch (err) {
    console.error(`⚠ Graceful degradation: pre-route hook encountered an infrastructure error: ${err.message}`);
    return {
      allowed: true,
      modified_task: context.task || task
    };
  }
}

/**
 * Extract signal words from task description
 * Based on AgentMaster's signal-word routing table
 */
function extractSignalWords(task) {
  if (!task || typeof task !== 'string') return [];
  
  const words = task.toLowerCase().split(/\s+/);
  const signalPatterns = {
    'build': ['build', 'create', 'implement', 'develop', 'make'],
    'bug': ['bug', 'crash', 'error', 'fix', 'debug', 'issue'],
    'review': ['review', 'audit', 'check', 'analyze', 'inspect'],
    'deploy': ['deploy', 'ship', 'release', 'publish', 'push'],
    'test': ['test', 'verify', 'validate', 'qa', 'check'],
    'security': ['security', 'vulnerability', 'exploit', 'audit'],
    'refactor': ['refactor', 'cleanup', 'improve', 'optimize'],
    'docs': ['docs', 'documentation', 'readme', 'guide', 'tutorial']
  };
  
  const matched = [];
  for (const [category, patterns] of Object.entries(signalPatterns)) {
    if (patterns.some(p => words.includes(p))) {
      matched.push(category);
    }
  }
  
  return matched;
}

/**
 * Match signal words to routing hints
 * Returns highest priority route hint
 */
function matchSignalWords(signalWords) {
  if (signalWords.length === 0) return null;
  
  // Routing map with priorities (higher = more specific)
  const routingMap = {
    'build': { routeId: 'route.engineering.master', priority: 1 },
    'bug': { routeId: 'route.engineering.build-resolver', priority: 3 },
    'review': { routeId: 'route.engineering.code-reviewer', priority: 2 },
    'deploy': { routeId: 'route.platform.master', priority: 1 },
    'test': { routeId: 'route.engineering.tdd-guide', priority: 2 },
    'security': { routeId: 'route.security.master', priority: 4 },
    'refactor': { routeId: 'route.engineering.refactor-cleaner', priority: 2 },
    'docs': { routeId: 'route.engineering.docs-updater', priority: 1 }
  };
  
  // Validate routes against registry/routes.json
  const routesPath = path.join(repoRoot, 'registry/routes.json');
  let validRoutes = new Set();
  if (fs.existsSync(routesPath)) {
    try {
      const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
      for (const r of routes) {
        if (r.route_id) {
          validRoutes.add(r.route_id);
        }
      }
    } catch (err) {
      console.error(`⚠ [pre-route] Failed to parse registry/routes.json: ${err.message}`);
    }
  }

  const matchedHints = signalWords
    .map(w => {
      const hint = routingMap[w];
      if (hint && validRoutes.size > 0 && !validRoutes.has(hint.routeId)) {
        console.error(`⚠ [pre-route] Hook routed signal-word to invalid/unregistered routeId: ${hint.routeId}`);
        return null;
      }
      return hint;
    })
    .filter(Boolean);

  if (matchedHints.length === 0) return null;
  return matchedHints.sort((a, b) => b.priority - a.priority)[0];
}
