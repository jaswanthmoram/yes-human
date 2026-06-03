import fs from 'fs';
import path from 'path';
import { COMBINED_SECRET_REGEX } from './secrets.js';

export {
  evaluatePromotion,
  checkAgentPromotion,
  dossierPathForAgent,
  MIN_PRODUCTION_SCORE
} from '../../validators/promotion.validator.js';

/**
 * Enhanced PolicyEvaluator with rules, policies, and contract checking.
 * 
 * Loads rules from rules/*.json and policies from policies/*.json.
 * Evaluates actions against rules (conditional logic) and policies (access control).
 * Supports contract checking for formal verification (from iso pattern).
 * 
 * Evaluation order:
 * 1. Check rules (action-specific conditional logic)
 * 2. Check policies (access control and security)
 * 3. Check contracts (formal verification if applicable)
 * 4. Return { allowed, reason, rule?, policy?, contract? }
 */
export class PolicyEvaluator {
  constructor(config = {}) {
    const isString = typeof config === 'string';
    this.rulesDir = (!isString && config.rulesDir) || 'rules';
    this.policiesDir = (!isString && config.policiesDir) || 'policies';
    this.contractsDir = (!isString && config.contractsDir) || 'contracts';
    this.costPolicyPath = (isString ? config : config.costPolicyPath) || 'registry/cost-policy.json';
    
    this._rules = null;
    this._policies = null;
    this._contracts = null;
    this._costPolicy = null;
  }

  get rules() {
    if (!this._rules) this._rules = this.loadRules();
    return this._rules;
  }

  set rules(val) {
    this._rules = val;
    this._rulesByAction = null;
  }

  get policies() {
    if (!this._policies) this._policies = this.loadPolicies();
    return this._policies;
  }

  set policies(val) {
    this._policies = val;
    this._policiesByAction = null;
  }

  get contracts() {
    if (!this._contracts) this._contracts = this.loadContracts();
    return this._contracts;
  }

  set contracts(val) {
    this._contracts = val;
  }

  get costPolicy() {
    if (!this._costPolicy) this._costPolicy = this.loadCostPolicy();
    return this._costPolicy;
  }

  set costPolicy(val) {
    this._costPolicy = val;
  }

  /**
   * Load all rule files from rules/ directory
   */
  loadRules() {
    const rules = {};
    const rulesPath = path.join(process.cwd(), this.rulesDir);
    
    if (!fs.existsSync(rulesPath)) {
      console.warn(`[PolicyEvaluator] Rules directory not found: ${rulesPath}`);
      return rules;
    }
    
    const files = fs.readdirSync(rulesPath).filter(f => f.endsWith('.rules.json'));
    for (const file of files) {
      try {
        const id = file.replace('.rules.json', '');
        const content = fs.readFileSync(path.join(rulesPath, file), 'utf8');
        rules[id] = JSON.parse(content);
      } catch (error) {
        console.error(`[PolicyEvaluator] Failed to load rule ${file}:`, error.message);
      }
    }
    
    return rules;
  }

  /**
   * Load all policy files from policies/ directory
   */
  loadPolicies() {
    const policies = {};
    const policiesPath = path.join(process.cwd(), this.policiesDir);
    
    if (!fs.existsSync(policiesPath)) {
      console.warn(`[PolicyEvaluator] Policies directory not found: ${policiesPath}`);
      return policies;
    }
    
    const files = fs.readdirSync(policiesPath).filter(f => f.endsWith('.policy.json'));
    for (const file of files) {
      try {
        const id = file.replace('.policy.json', '');
        const content = fs.readFileSync(path.join(policiesPath, file), 'utf8');
        policies[id] = JSON.parse(content);
      } catch (error) {
        console.error(`[PolicyEvaluator] Failed to load policy ${file}:`, error.message);
      }
    }
    
    return policies;
  }

  /**
   * Load contract files from contracts/ directory (optional)
   */
  loadContracts() {
    const contracts = {};
    const contractsPath = path.join(process.cwd(), this.contractsDir);
    
    if (!fs.existsSync(contractsPath)) {
      return contracts; // Contracts are optional
    }
    
    const files = fs.readdirSync(contractsPath).filter(f => f.endsWith('.contract.json'));
    for (const file of files) {
      try {
        const id = file.replace('.contract.json', '');
        const content = fs.readFileSync(path.join(contractsPath, file), 'utf8');
        contracts[id] = JSON.parse(content);
      } catch (error) {
        console.error(`[PolicyEvaluator] Failed to load contract ${file}:`, error.message);
      }
    }
    
    return contracts;
  }

  /**
   * Load cost policy from registry
   */
  loadCostPolicy() {
    try {
      const content = fs.readFileSync(path.join(process.cwd(), this.costPolicyPath), 'utf8');
      return JSON.parse(content);
    } catch {
      // Fallback cost policy
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
   * Evaluate a context object against all loaded rules and policies.
   * @param {object} context - The context to evaluate.
   * @param {string} context.action - The action being performed.
   * @returns {{ allowed: boolean, reason?: string, rule?: string, policy?: string }} Evaluation result.
   */
  evaluate(rawContext) {
    // Normalize path/filePath aliases so rules and callers can use either key.
    const context = { ...rawContext };
    if (context.filePath !== undefined && context.path === undefined) context.path = context.filePath;
    if (context.path !== undefined && context.filePath === undefined) context.filePath = context.path;
    const { action } = context;

    // Index rules by action on demand
    if (!this._rulesByAction) {
      this._rulesByAction = new Map();
      for (const [ruleId, rule] of Object.entries(this.rules)) {
        for (const act of rule.applies_to || []) {
          if (!this._rulesByAction.has(act)) {
            this._rulesByAction.set(act, []);
          }
          this._rulesByAction.get(act).push({ ruleId, rule });
        }
      }
    }

    // Index policies by action on demand
    if (!this._policiesByAction) {
      this._policiesByAction = new Map();
      for (const [policyId, policy] of Object.entries(this.policies)) {
        const applies = policy.applies_to || [];
        for (const act of applies) {
          if (!this._policiesByAction.has(act)) {
            this._policiesByAction.set(act, []);
          }
          this._policiesByAction.get(act).push({ policyId, policy });
        }
      }
    }

    // 1. Check rules (action-specific conditional logic)
    const applicableRules = this._rulesByAction.get(action) || [];
    for (const { ruleId, rule } of applicableRules) {
      for (const r of rule.rules) {
        if (this.matchCondition(r.when, context)) {
          const allowed = r.then !== 'deny';
          return {
            allowed,
            reason: r.reason,
            rule: ruleId,
            decision: r.then
          };
        }
      }
    }

    // 2. Check policies (access control and security)
    const applicablePolicies = this._policiesByAction.get(action) || [];
    for (const { policyId, policy } of applicablePolicies) {
      for (const r of policy.rules) {
        if (this.matchCondition(r.match, context)) {
          const allowed = r.decision === 'allow';
          return {
            allowed,
            reason: r.reason,
            policy: policyId,
            decision: r.decision
          };
        }
      }
    }

    // 3. Check contracts (formal verification if applicable)
    if (context.agent) {
      const contract = this.contracts[context.agent];
      if (contract) {
        const contractCheck = this.checkContract(contract, context);
        if (!contractCheck.valid) {
          return {
            allowed: false,
            reason: contractCheck.reason,
            contract: context.agent
          };
        }
      }
    }
    
    // 4. Default allow (no rules or policies matched)
    return {
      allowed: true,
      reason: 'No rules or policies matched'
    };
  }

  /**
   * Check if a condition matches the context.
   * Supports operators: $eq, $ne, $gt, $gte, $lt, $lte, $in, $not_in, $contains, $matches, $starts_with
   */
  matchCondition(condition, context) {
    for (const [key, operator] of Object.entries(condition)) {
      const value = this.getNestedValue(context, key);
      if (!this.matchOne(value, operator, context)) return false;
    }
    return true;
  }

  /**
   * Match a single field value against an operator spec.
   * A literal (string/number/boolean/null) means strict equality.
   * An object means one or more $-operators, ALL of which must hold.
   * Missing values never spuriously satisfy a positive operator.
   */
  matchOne(value, operator, context) {
    // Literal operator → strict equality (undefined value never equals a literal)
    if (operator === null || typeof operator !== 'object') {
      return value === operator;
    }

    let sawKnownOperator = false;
    const known = (k) => operator[k] !== undefined && (sawKnownOperator = true);

    if (known('$eq') && value !== operator.$eq) return false;
    if (known('$ne') && value === operator.$ne) return false;

    if (known('$gt') && !(typeof value === 'number' && value > operator.$gt)) return false;
    if (known('$gte') && !(typeof value === 'number' && value >= operator.$gte)) return false;
    if (known('$lt') && !(typeof value === 'number' && value < operator.$lt)) return false;
    if (known('$lte') && !(typeof value === 'number' && value <= operator.$lte)) return false;

    if (known('$in') && !operator.$in.includes(value)) return false;
    if (known('$not_in')) {
      // Negative test: only fails when value is present AND in the list.
      if (value !== undefined && operator.$not_in.includes(value)) return false;
    }

    if (known('$contains')) {
      const searchValue = this.stringifyForSearch(value);
      const terms = Array.isArray(operator.$contains) ? operator.$contains : [operator.$contains];
      if (!terms.some((term) => searchValue.toLowerCase().includes(String(term).toLowerCase()))) {
        return false;
      }
    }

    if (known('$matches')) {
      if (value === undefined || value === null) return false;
      try {
        if (!new RegExp(operator.$matches, 'i').test(String(value))) return false;
      } catch { return false; }
    }

    if (known('$not_matches')) {
      try {
        if (value !== undefined && new RegExp(operator.$not_matches, 'i').test(String(value))) return false;
      } catch { return false; }
    }

    if (known('$starts_with')) {
      if (value === undefined || !String(value).startsWith(operator.$starts_with)) return false;
    }

    if (known('$contains_current_route')) {
      const wants = operator.$contains_current_route === true;
      const present = Array.isArray(value) && context.current_route && value.includes(context.current_route);
      if (wants !== Boolean(present)) return false;
    }

    if (known('$older_than_days')) {
      if (!value) return false;
      const daysAgo = (Date.now() - new Date(value).getTime()) / 86400000;
      if (!(daysAgo > operator.$older_than_days)) return false;
    }

    // An object with no recognized operator never matches (avoids spurious true).
    return sawKnownOperator;
  }

  /** Stringify a value so $contains can search nested objects/arrays. */
  stringifyForSearch(value) {
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) return value.join(' ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  /**
   * Get nested value from object using dot notation
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  /**
   * Check contract compliance (from iso pattern)
   */
  checkContract(contract, context) {
    // Check preconditions
    if (contract.preconditions) {
      for (const precondition of contract.preconditions) {
        if (!this.evaluatePrecondition(precondition, context)) {
          return {
            valid: false,
            reason: `Precondition failed: ${precondition}`
          };
        }
      }
    }
    
    // Check invariants
    if (contract.invariants) {
      for (const invariant of contract.invariants) {
        if (!this.evaluateInvariant(invariant, context)) {
          return {
            valid: false,
            reason: `Invariant violated: ${invariant}`
          };
        }
      }
    }
    
    return { valid: true };
  }

  /**
   * Evaluate a precondition
   */
  evaluatePrecondition(precondition, context) {
    // Simple precondition checking (can be extended)
    if (precondition.startsWith('has_tool:')) {
      const tool = precondition.split(':')[1];
      return !!context.tools?.includes(tool);
    }
    if (precondition.startsWith('has_permission:')) {
      const permission = precondition.split(':')[1];
      return !!context.permissions?.includes(permission);
    }
    return true;
  }

  /**
   * Evaluate an invariant
   */
  evaluateInvariant(invariant, context) {
    // Simple invariant checking (can be extended)
    if (invariant.startsWith('max_tokens:')) {
      const maxTokens = parseInt(invariant.split(':')[1]);
      return (context.estimatedTokens || 0) <= maxTokens;
    }
    if (invariant.startsWith('no_secrets')) {
      const content = context.content || '';
      return !COMBINED_SECRET_REGEX.test(content);
    }
    return true;
  }

  /**
   * Check if a request is within token budget (legacy method)
   */
  isWithinBudget(band, estimatedTokens) {
    const limits = this.costPolicy.bands[band] || this.costPolicy.bands[this.costPolicy.default_budget_band];
    return estimatedTokens <= limits.max_context_tokens;
  }

  /**
   * Get all loaded rules
   */
  getRules() {
    return this.rules;
  }

  /**
   * Get all loaded policies
   */
  getPolicies() {
    return this.policies;
  }

  /**
   * Get all loaded contracts
   */
  getContracts() {
    return this.contracts;
  }

  /**
   * Get cost policy
   */
  getCostPolicy() {
    return this.costPolicy;
  }
}
