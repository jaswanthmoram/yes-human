export * from "./types/index.js";
export * from "./trace/tracker.js";
export * from "./router/router.js";

// Legacy exports to preserve backward compatibility across the monorepo workspace
export {
  evaluatePromotion,
  checkAgentPromotion,
  dossierPathForAgent,
  MIN_PRODUCTION_SCORE
} from "../../../validators/promotion.validator.js";

export { StateMachine, loadStateMachines } from "./state-machine.js";
export { loadRbacPolicy, resolveRole, hasPermission, assertPermission, defaultRbacPolicy } from "./rbac.js";
export { PolicyEvaluator, getSharedPolicyEvaluator } from "./policy-evaluator.js";
export { SECRET_PATTERNS, COMBINED_SECRET_REGEX } from "./secrets.js";
export { createLogger, logger } from "./logger.js";
