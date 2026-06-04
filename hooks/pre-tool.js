/**
 * Pre-tool hook: Permission + Tool Strategy
 *
 * Runs before tool execution. Checks:
 * 1. Tool availability (from ToolStrategy)
 * 2. Tool permissions (from tool-use.rules.json)
 * 3. MCP trust level (from mcp-trust.policy.json)
 * 4. Provides fallback chain if tool unavailable
 */

import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';
import { ToolStrategy } from '../packages/yes-runtime/tool-strategy.js';

const toolStrategy = new ToolStrategy();

export default async function preTool(context, policyEvaluator = null) {
  try {
    const { tool, args, agent } = context;

    // Initialize policy evaluator if not provided
    const evaluator = policyEvaluator || new PolicyEvaluator();

    // 1. Check if tool is available
    if (!toolStrategy.availableTools[tool]) {
      // Try to find alternative
      const strategy = toolStrategy.selectTool({ type: tool, ...args });

      return {
        modified_tool: strategy.tool,
        fallback_chain: strategy.fallback,
        reason: `Original tool ${tool} not available, using ${strategy.tool}`,
        allowed: true
      };
    }

    // 2. Policy check (tool permissions)
    const toolCheck = evaluator.evaluate({
      action: 'tool.execute',
      tool,
      args,
      agent
    });

    if (!toolCheck.allowed) {
      return {
        block_reason: toolCheck.reason,
        rule: toolCheck.rule,
        policy: toolCheck.policy
      };
    }

    // 3. MCP trust check (if applicable)
    if (tool === 'mcp' && args?.server) {
      const mcpCheck = evaluator.evaluate({
        action: 'tool.execute',
        tool: 'mcp',
        server: args.server,
        agent
      });

      if (!mcpCheck.allowed) {
        return {
          block_reason: mcpCheck.reason,
          policy: mcpCheck.policy
        };
      }
    }

    // 4. Network policy check (if tool involves network)
    if (args?.url) {
      const networkCheck = evaluator.evaluate({
        action: 'tool.execute',
        tool,
        url: args.url,
        agent
      });

      if (!networkCheck.allowed) {
        return {
          block_reason: networkCheck.reason,
          policy: networkCheck.policy
        };
      }
    }

    // Success: tool is allowed
    return {
      allowed: true,
      tool,
      args
    };
  } catch (err) {
    return { block_reason: 'pre-tool hook error: ' + err.message, allowed: false };
  }
}
