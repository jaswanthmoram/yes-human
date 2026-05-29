/**
 * Pre-route hook: Budget + Safety + Signal-Word Routing
 * 
 * Runs before routing decision. Checks:
 * 1. Token budget (from budget.rules.json)
 * 2. Safety keywords (from safety.rules.json)
 * 3. Signal-word routing hints (from AgentMaster pattern)
 * 4. Loop prevention (from loop-prevention.rules.json)
 */

import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';

export default async function preRoute(context, policyEvaluator = null) {
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
  if (depth > 2) {
    return { 
      block_reason: 'Max routing depth (2) exceeded',
      rule: 'loop-prevention'
    };
  }
  
  if (routingHint && visited.includes(routingHint.routeId)) {
    return { 
      block_reason: `Circular route detected: ${routingHint.routeId}`,
      rule: 'loop-prevention'
    };
  }
  
  // Success: return modified context with routing hints
  return {
    modified_task: task,
    routing_hint: routingHint,
    signal_words: signalWords,
    allowed: true
  };
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
  
  // Return highest priority match
  return signalWords
    .map(w => routingMap[w])
    .filter(Boolean)
    .sort((a, b) => b.priority - a.priority)[0];
}
