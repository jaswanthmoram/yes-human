import fs from 'fs';
import path from 'path';
import { getSharedPolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';
import { createLogger } from '../packages/yes-core/logger.js';

const log = createLogger('hook-runner');

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
    this.policyEvaluator = policyEvaluator || getSharedPolicyEvaluator();
    this.hooks = this.loadHooks();
    this.hookCache = new Map();
  }

  /**
   * Load hooks from registry
   */
  loadHooks() {
    const registryPath = path.join(process.cwd(), this.hooksDir, 'hook-registry.json');

    if (!fs.existsSync(registryPath)) {
      log.warn('Hook registry not found', { registryPath });
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
      log.error('Failed to load hook registry', { error: error.message });
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
    for (const event of Object.keys(hooks)) {
      hooks[event].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
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
          log.warn('Hook file not found', { hookPath });
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
          log.warn('Hook is not a function', { hookId: hook.id });
          results.push({ hook: hook.id, error: 'Hook is not a function' });
          continue;
        }

        // Validate inputs against registry declaration.
        // Default: validation is ON. Set YES_HOOK_VALIDATION=off (or =silent) to
        // suppress warnings; set YES_HOOK_VALIDATION=strict to throw on missing inputs.
        const validationMode = (process.env.YES_HOOK_VALIDATION || 'warn').toLowerCase();
        if (hook.inputs && validationMode !== 'off' && validationMode !== 'silent') {
          for (const input of hook.inputs) {
            const hasInput = input in context || context[input] !== undefined;
            if (!hasInput) {
              const msg = `Hook ${hook.id} expects input "${input}", but it was missing from context.`;
              if (validationMode === 'strict') {
                // Tagged error: the per-hook catch below re-throws if it sees this flag.
                throw Object.assign(new Error(msg), { __strictValidation: true });
              }
              log.warn(msg, { hookId: hook.id, missingInput: input });
            }
          }
        }

        // Execute hook
        const result = await hookFn(context, this.policyEvaluator);
        results.push({ hook: hook.id, result });

        // Validate outputs against registry declaration (same mode logic).
        if (hook.outputs && result && validationMode !== 'off' && validationMode !== 'silent') {
          for (const key of Object.keys(result)) {
            if (key === 'allowed') continue;
            if (!hook.outputs.includes(key)) {
              const msg = `Hook ${hook.id} returned undeclared output property "${key}".`;
              if (validationMode === 'strict') {
                throw Object.assign(new Error(msg), { __strictValidation: true });
              }
              log.warn(msg, { hookId: hook.id, undeclaredOutput: key });
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
        log.error('Hook execution failed', { hookId: hook.id, error: error.message });
        results.push({ hook: hook.id, error: error.message });

        // Strict-validation errors propagate so CI/tests can fail loudly.
        // Hook business-logic errors are swallowed (continue with other hooks).
        if (error?.__strictValidation) throw error;
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
