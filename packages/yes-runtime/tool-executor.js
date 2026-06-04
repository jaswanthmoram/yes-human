import { HookRunner } from '../../hooks/hook-runner.js';
import { PolicyEvaluator } from '../yes-core/policy-evaluator.js';
import { ToolStrategy } from './tool-strategy.js';
import { MemoryManager } from './memory-manager.js';
import { hashValue } from './redaction.js';

/**
 * Tool Executor - Executes tools with hooks, policies, and fallback chains
 *
 * Integrates:
 * - Pre-tool hooks (permission + tool strategy)
 * - Policy evaluation (tool-use rules, MCP trust, network policies)
 * - Tool strategy (fallback chains for unavailable tools)
 * - Post-tool hooks (audit + learning)
 * - Error handling (on-error hooks)
 * - Memory recording (episodic memory)
 */
export class ToolExecutor {
  constructor(config = {}) {
    this.policyEvaluator = config.policyEvaluator || new PolicyEvaluator();
    this.hookRunner = config.hookRunner || new HookRunner('hooks', this.policyEvaluator);
    this.toolStrategy = config.toolStrategy || new ToolStrategy();
    this.memory = config.memoryManager || new MemoryManager();
  }

  /**
   * Execute a tool with full lifecycle hooks
   *
   * @param {string} tool - Tool name
   * @param {Object} args - Tool arguments
   * @param {string} agent - Agent ID
   * @param {string} task - Task description
   * @returns {Promise<Object>} - Execution result
   */
  async execute(tool, args, agent, task) {
    const startTime = Date.now();

    try {
      // 1. Run pre-tool hooks (permission + tool strategy)
      const preToolResult = await this.hookRunner.run('pre-tool', {
        tool,
        args,
        agent,
        task
      });

      if (preToolResult.blocked) {
        return {
          success: false,
          error: preToolResult.reason,
          blocked_by: preToolResult.blocked_by,
          duration: Date.now() - startTime
        };
      }

      // Use modified tool from pre-tool hooks if available
      const toolToExecute = preToolResult.results.map((r) => r.result?.modified_tool).filter(Boolean)[0] || tool;

      // Use fallback chain from pre-tool hooks if available
      const fallbackChain = preToolResult.results.map((r) => r.result?.fallback_chain).filter(Boolean)[0] || [];

      // 2. Execute tool with fallback chain
      const result = await this.executeWithFallback(toolToExecute, args, fallbackChain);

      const duration = Date.now() - startTime;

      // 3. Run post-tool hooks (audit + learning)
      await this.hookRunner.run('post-tool', {
        tool: toolToExecute,
        args,
        result,
        duration,
        agent,
        task
      });

      // 4. Record to episodic memory
      this.memory.addEpisodicMemory('tool-executions', {
        tool: toolToExecute,
        original_tool: tool !== toolToExecute ? tool : null,
        args: this.sanitizeArgs(args),
        success: !result?.error,
        error: result?.error || null,
        duration,
        agent,
        task_hash: task ? hashValue(task, 24) : null
      });

      return {
        success: !result?.error,
        result,
        tool: toolToExecute,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      // Run on-error hooks
      await this.hookRunner.run('on-error', {
        error,
        tool,
        args,
        agent,
        task
      });

      return {
        success: false,
        error: error.message,
        duration
      };
    }
  }

  /**
   * Execute tool with fallback chain
   */
  async executeWithFallback(tool, args, fallbackChain) {
    let lastError = null;

    // Try primary tool
    try {
      return await this.executeTool(tool, args);
    } catch (error) {
      lastError = error;
      console.warn(`[ToolExecutor] Tool ${tool} failed: ${error.message}, trying fallback...`);
    }

    // Try fallback chain
    for (const fallbackTool of fallbackChain) {
      try {
        console.log(`[ToolExecutor] Trying fallback: ${fallbackTool}`);
        return await this.executeTool(fallbackTool, args);
      } catch (error) {
        lastError = error;
        console.warn(`[ToolExecutor] Fallback ${fallbackTool} failed: ${error.message}`);
      }
    }

    // All tools failed
    throw lastError || new Error('All tools failed');
  }

  /**
   * Execute a specific tool
   */
  async executeTool(tool, args) {
    // Use tool strategy to execute
    const result = await this.toolStrategy.execute({
      type: tool,
      ...args
    });

    if (!result.success) {
      throw new Error(result.error || 'Tool execution failed');
    }

    return result.result;
  }

  /**
   * Sanitize arguments to remove sensitive data
   */
  sanitizeArgs(args) {
    if (!args || typeof args !== 'object') return args;

    const sanitized = { ...args };

    // Remove sensitive fields
    const sensitiveFields = ['password', 'secret', 'token', 'api_key', 'private_key', 'authorization'];
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    // Truncate long values
    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'string' && value.length > 500) {
        sanitized[key] = value.substring(0, 500) + '...[truncated]';
      }
    }

    return sanitized;
  }

  /**
   * Get tool availability summary
   */
  getToolAvailability() {
    return this.toolStrategy.getAvailabilitySummary();
  }

  /**
   * Check if a tool is available
   */
  isToolAvailable(tool) {
    return this.toolStrategy.availableTools[tool] || false;
  }

  /**
   * Get fallback chain for a tool
   */
  getFallbackChain(tool, args) {
    const strategy = this.toolStrategy.selectTool({ type: tool, ...args });
    return [strategy.tool, ...strategy.fallback];
  }
}
