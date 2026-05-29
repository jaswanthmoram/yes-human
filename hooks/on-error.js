/**
 * On-error hook: Mistake Graph
 * 
 * Runs when an error occurs. Performs:
 * 1. Error logging to episodic memory
 * 2. Mistake graph update (for future avoidance)
 * 3. Error classification and pattern detection
 */

import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';

const memory = new MemoryManager();

export default async function onError(context) {
  const { error, task, agent, tool, args } = context;
  
  // 1. Log error to episodic memory
  const episodeId = memory.addEpisodicMemory('errors', {
    error_type: classifyError(error),
    error_message: error?.message || String(error),
    error_stack: error?.stack || null,
    task: task ? task.substring(0, 200) : null,
    agent,
    tool,
    args: sanitizeArgs(args),
    timestamp: new Date().toISOString()
  });
  
  // 2. Update mistake graph (semantic memory)
  const mistakePattern = extractMistakePattern(context);
  if (mistakePattern) {
    memory.addSemanticMemory({
      pattern: mistakePattern.pattern,
      lesson: mistakePattern.lesson,
      context: mistakePattern.context,
      source_episodes: [episodeId],
      error_type: mistakePattern.error_type
    });
  }
  
  // 3. Log to console
  console.error(`[error] task="${task}" agent=${agent} error=${error?.message || error} episode=${episodeId}`);
  
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
      context: task
    },
    'network': {
      pattern: `Network error on ${tool || 'operation'}`,
      lesson: 'Check network connectivity or use fallback tool',
      context: task
    },
    'permission': {
      pattern: `Permission denied on ${tool || 'operation'}`,
      lesson: 'Verify permissions before attempting operation',
      context: task
    },
    'not_found': {
      pattern: `Resource not found: ${tool || 'operation'}`,
      lesson: 'Verify resource exists before accessing',
      context: task
    },
    'validation': {
      pattern: `Validation error on ${tool || 'operation'}`,
      lesson: 'Validate inputs before passing to tool',
      context: task
    },
    'rate_limit': {
      pattern: `Rate limit exceeded on ${tool || 'operation'}`,
      lesson: 'Implement rate limiting or use alternative tool',
      context: task
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
  if (!args || typeof args !== 'object') return args;
  
  const sanitized = { ...args };
  
  // Remove sensitive fields
  const sensitiveFields = ['password', 'secret', 'token', 'api_key', 'private_key'];
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized;
}
