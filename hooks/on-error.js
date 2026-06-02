/**
 * On-error hook: Mistake Graph
 * 
 * Runs when an error occurs. Performs:
 * 1. Error logging to episodic memory
 * 2. Mistake graph update (for future avoidance)
 * 3. Error classification and pattern detection
 */

import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';
import { LearningEngine } from '../packages/yes-runtime/learning-engine.js';
import { hashValue, redactObject, redactString } from '../packages/yes-runtime/redaction.js';

const memory = new MemoryManager();
const learning = new LearningEngine({ memoryManager: memory });

export default async function onError(context) {
  const { error, task, agent, tool, args } = context;
  const errorMessage = redactString(error?.message || String(error));
  
  // 1. Log error to episodic memory
  const episodeId = memory.addEpisodicMemory('errors', {
    error_type: classifyError(error),
    error: errorMessage,
    error_message: errorMessage,
    error_stack: null,
    task_hash: task ? learning.createTrace({ task, route_id: context.route_id, success: false }).task_hash : null,
    agent,
    tool,
    args: sanitizeArgs(args),
    timestamp: new Date().toISOString()
  });
  
  // 2. Update mistake graph (semantic memory)
  const mistakePattern = extractMistakePattern(context);
  if (mistakePattern) {
    learning.updateMistakeGraph({
      trace_id: context.trace_id || null,
      route_id: context.route_id || context.route?.route_id || 'route.meta-system.supreme-router',
      workflow_id: context.workflow_id || null,
      failure_class: mistakePattern.error_type,
      task_hash: task ? learning.createTrace({ task, route_id: context.route_id, success: false }).task_hash : null,
      suggested_route: context.suggested_route || null
    });

    memory.addSemanticMemory({
      pattern: mistakePattern.pattern,
      lesson: mistakePattern.lesson,
      context: mistakePattern.context,
      source_episodes: [episodeId],
      error_type: mistakePattern.error_type
    });
  }
  
  // 3. Log to console
  console.error(`[error] task_hash=${task ? learning.createTrace({ task, route_id: context.route_id, success: false }).task_hash : 'empty'} agent=${agent} error=${errorMessage} episode=${episodeId}`);
  
  return { 
    handled: true,
    episode_id: episodeId,
    mistake_pattern: mistakePattern
  };
}

/**
 * Classify error type
 */
function classifyError(error) {
  if (!error) return 'unknown';
  
  const message = (error.message || String(error)).toLowerCase();
  
  if (message.includes('timeout')) return 'timeout';
  if (message.includes('network') || message.includes('connection')) return 'network';
  if (message.includes('permission') || message.includes('denied')) return 'permission';
  if (message.includes('not found') || message.includes('404')) return 'not_found';
  if (message.includes('invalid') || message.includes('validation')) return 'validation';
  if (message.includes('rate limit') || message.includes('429')) return 'rate_limit';
  if (message.includes('auth') || message.includes('unauthorized')) return 'authentication';
  
  return 'unknown';
}

/**
 * Extract mistake pattern for learning
 */
function extractMistakePattern(context) {
  const { error, task, agent, tool } = context;
  const errorType = classifyError(error);
  
  // Common mistake patterns
  const patterns = {
    'timeout': {
      pattern: `Timeout on ${tool || 'operation'}`,
      lesson: 'Consider increasing timeout or breaking into smaller operations',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    },
    'network': {
      pattern: `Network error on ${tool || 'operation'}`,
      lesson: 'Check network connectivity or use fallback tool',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    },
    'permission': {
      pattern: `Permission denied on ${tool || 'operation'}`,
      lesson: 'Verify permissions before attempting operation',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    },
    'not_found': {
      pattern: `Resource not found: ${tool || 'operation'}`,
      lesson: 'Verify resource exists before accessing',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    },
    'validation': {
      pattern: `Validation error on ${tool || 'operation'}`,
      lesson: 'Validate inputs before passing to tool',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    },
    'rate_limit': {
      pattern: `Rate limit exceeded on ${tool || 'operation'}`,
      lesson: 'Implement rate limiting or use alternative tool',
      context: task ? `task_hash:${hashValue(task, 24)}` : null
    }
  };
  
  const pattern = patterns[errorType];
  if (pattern) {
    return {
      ...pattern,
      error_type: errorType
    };
  }
  
  return null;
}

/**
 * Sanitize arguments to remove sensitive data
 */
function sanitizeArgs(args) {
  return redactObject(args);
}
