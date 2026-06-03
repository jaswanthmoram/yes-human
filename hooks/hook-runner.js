import fs from 'fs';
import path from 'path';
import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';

/**
 * Hook Runner - Executes lifecycle hooks in order
 * 
 * Loads hooks from hook-registry.json and executes them for each event.
 * Supports blocking hooks (return block_reason to stop execution).
 * Passes PolicyEvaluator to hooks for policy checking.
 */
const registryCache = {
  data: null,
  mtime: 0
};

export class HookRunner {
  constructor(hooksDir = 'hooks', policyEvaluator = null) {
    this.hooksDir = hooksDir;
    this.policyEvaluator = policyEvaluator || new PolicyEvaluator();
    this.hooks = this.loadHooks();
    this.hookCache = new Map();
  }

  /**
   * Load hooks from registry
   */
  loadHooks() {
    const registryPath = path.join(process.cwd(), this.hooksDir, 'hook-registry.json');
    
    if (!fs.existsSync(registryPath)) {
      console.warn(`[HookRunner] Hook registry not found: ${registryPath}`);
      return {};
    }
    
    try {
      const stats = fs.statSync(registryPath);
      const mtime = stats.mtimeMs;
      
      if (registryCache.data && registryCache.mtime === mtime) {
        return this.parseRegistry(registryCache.data);
      }
      
      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      registryCache.data = registry;
      registryCache.mtime = mtime;
      
      return this.parseRegistry(registry);
    } catch (error) {
      console.error(`[HookRunner] Failed to load hook registry:`, error.message);
      if (registryCache.data) {
        return this.parseRegistry(registryCache.data);
      }
      return {};
    }
  }

  parseRegistry(registry) {
    const hooks = {};
    for (const hook of registry.hooks || []) {
      if (!hooks[hook.event]) {
        hooks[hook.event] = [];
      }
      hooks[hook.event].push(hook);
    }
    return hooks;
  }

  /**
   * Run all hooks for an event
   * 
   * @param {string} event - Event name (e.g., 'pre-route', 'pre-tool')
   * @param {Object} context - Hook context
   * @returns {Promise<Object>} - { blocked: boolean, reason?: string, results: Array }
   */
  async run(event, context) {
    const eventHooks = this.hooks[event] || [];
    const results = [];
    
    for (const hook of eventHooks) {
      try {
        // Load hook module
        const hookPath = path.join(process.cwd(), hook.entry);
        
        if (!fs.existsSync(hookPath)) {
          console.warn(`[HookRunner] Hook file not found: ${hookPath}`);
          results.push({ hook: hook.id, error: 'Hook file not found' });
          continue;
        }
        
        // Import hook module with caching
        let hookFn = this.hookCache.get(hookPath);
        if (!hookFn) {
          const hookModule = await import(hookPath);
          hookFn = hookModule.default || hookModule;
          this.hookCache.set(hookPath, hookFn);
        }
        
        if (typeof hookFn !== 'function') {
          console.warn(`[HookRunner] Hook ${hook.id} is not a function`);
          results.push({ hook: hook.id, error: 'Hook is not a function' });
          continue;
        }
        
        // Validate inputs against registry declaration
        if (hook.inputs && process.env.YES_DEBUG_HOOKS === 'true') {
          for (const input of hook.inputs) {
            const hasInput = (input in context) || 
                             (input === 'task' && context.task !== undefined) ||
                             (input === 'estimatedTokens' && context.estimatedTokens !== undefined) ||
                             (input === 'routerConfidence' && context.routerConfidence !== undefined);
            if (!hasInput) {
              console.warn(`⚠ [HookRunner] Hook ${hook.id} expects input "${input}", but it was missing from context.`);
            }
          }
        }

        // Execute hook
        const result = await hookFn(context, this.policyEvaluator);
        results.push({ hook: hook.id, result });
        
        // Validate outputs against registry declaration
        if (hook.outputs && result && process.env.YES_DEBUG_HOOKS === 'true') {
          for (const key of Object.keys(result)) {
            if (key === 'allowed') continue;
            if (!hook.outputs.includes(key)) {
              console.warn(`⚠ [HookRunner] Hook ${hook.id} returned undeclared output property "${key}".`);
            }
          }
        }

        // Check if hook blocked execution
        if (result?.block_reason) {
          return { 
            blocked: true, 
            reason: result.block_reason, 
            results,
            blocked_by: hook.id
          };
        }
        
        // Merge modified context from hook
        if (result?.modified_task) {
          context.task = result.modified_task;
        }
        if (result?.modified_tool) {
          context.tool = result.modified_tool;
        }
        
      } catch (error) {
        console.error(`[HookRunner] Hook ${hook.id} failed:`, error.message);
        results.push({ hook: hook.id, error: error.message });
        
        // Continue with other hooks even if one fails
      }
    }
    
    return { blocked: false, results };
  }

  /**
   * Get all registered hooks
   */
  getHooks() {
    return this.hooks;
  }

  /**
   * Get hooks for a specific event
   */
  getEventHooks(event) {
    return this.hooks[event] || [];
  }

  /**
   * Check if an event has any hooks
   */
  hasHooks(event) {
    return (this.hooks[event] || []).length > 0;
  }
}
