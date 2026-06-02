/**
 * Post-tool hook: Audit + Learning
 * 
 * Runs after tool execution. Performs:
 * 1. Audit logging (to episodic memory)
 * 2. Learning candidate detection
 * 3. Telemetry policy compliance
 */

import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';
import { hashValue, redactObject } from '../packages/yes-runtime/redaction.js';

const memory = new MemoryManager();

export default async function postTool(context) {
  const { tool, args, result, duration, agent, task } = context;
  
  // 1. Log to episodic memory
  const episodeId = memory.addEpisodicMemory('tool-executions', {
    tool,
    args: sanitizeArgs(args),
    success: !result?.error,
    error: result?.error || null,
    duration,
    agent,
    task_hash: task ? hashValue(task, 24) : null,
    timestamp: new Date().toISOString()
  });
  
  // 2. Detect learning candidates
  const learningCandidate = detectLearningCandidate(context);
  
  // 3. Log to audit (console for now, could be file/ledger)
  console.log(`[audit] tool=${tool} duration=${duration}ms success=${!result?.error} episode=${episodeId}`);
  
  if (learningCandidate) {
    console.log(`[learning] Candidate detected: ${learningCandidate.type}`);
  }
  
  return { 
    logged: true,
    episode_id: episodeId,
    learning_candidate: learningCandidate
  };
}

/**
 * Sanitize arguments to remove sensitive data
 */
function sanitizeArgs(args) {
  const sanitized = redactObject(args);
  if (!sanitized || typeof sanitized !== 'object') return sanitized;
  
  // Truncate long values
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string' && value.length > 500) {
      sanitized[key] = value.substring(0, 500) + '...[truncated]';
    }
  }
  
  return sanitized;
}

/**
 * Detect learning candidates from tool execution
 */
function detectLearningCandidate(context) {
  const { tool, args, result, duration } = context;
  
  // Long-running tool (might be optimizable)
  if (duration > 30000) {
    return {
      type: 'slow-tool',
      tool,
      duration,
      suggestion: 'Consider caching or optimizing this tool'
    };
  }
  
  // Repeated tool calls with same args (might be cacheable)
  // This would require checking recent episodes, simplified here
  
  // Tool that failed but succeeded on retry (might need better error handling)
  if (result?.error && result?.retried) {
    return {
      type: 'retry-success',
      tool,
      suggestion: 'Tool failed initially but succeeded on retry'
    };
  }
  
  return null;
}
