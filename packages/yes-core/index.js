import fs from 'fs';
import path from 'path';

export {
  evaluatePromotion,
  checkAgentPromotion,
  dossierPathForAgent,
  MIN_PRODUCTION_SCORE
} from '../../validators/promotion.validator.js';

export { StateMachine, loadStateMachines } from './state-machine.js';

/**
 * Validates whether an agent query respects system policies and budgets.
 */
export class PolicyEvaluator {
  constructor(registryPath = 'registry/cost-policy.json') {
    this.registryPath = registryPath;
    this.policy = this.loadPolicy();
  }

  loadPolicy() {
    try {
      const data = fs.readFileSync(path.resolve(process.cwd(), this.registryPath), 'utf8');
      return JSON.parse(data);
    } catch (e) {
      // Fallback cost policy parameters
      return {
        default_budget_band: 'micro',
        bands: {
          micro: { max_context_tokens: 4000 },
          standard: { max_context_tokens: 16000 },
          expanded: { max_context_tokens: 64000 },
          deep: { max_context_tokens: 128000 }
        }
      };
    }
  }

  /**
   * Asserts whether a request stays within the token budget.
   * @param {string} band - The budget band (e.g. 'micro', 'standard').
   * @param {number} estimatedTokens - Requested context tokens.
   * @returns {boolean} True if within policy bounds.
   */
  isWithinBudget(band, estimatedTokens) {
    const limits = this.policy.bands[band] || this.policy.bands[this.policy.default_budget_band];
    return estimatedTokens <= limits.max_context_tokens;
  }
}
