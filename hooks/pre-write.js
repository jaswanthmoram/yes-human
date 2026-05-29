/**
 * Pre-write hook: Policy + Contract Check
 * 
 * Runs before file write. Checks:
 * 1. Filesystem policy (protected paths)
 * 2. Privacy policy (secrets/PII detection)
 * 3. Contract compliance (if agent has contracts)
 */

import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';

export default async function preWrite(context, policyEvaluator = null) {
  const { filePath, content, agent } = context;
  
  // Initialize policy evaluator if not provided
  const evaluator = policyEvaluator || new PolicyEvaluator();
  
  // 1. Filesystem policy check (protected paths)
  const fsCheck = evaluator.evaluate({
    action: 'file.write',
    filePath,
    agent
  });
  
  if (!fsCheck.allowed) {
    return { 
      block_reason: fsCheck.reason,
      policy: fsCheck.policy
    };
  }
  
  // 2. Privacy policy check (secrets/PII detection)
  if (content && typeof content === 'string') {
    const privacyCheck = evaluator.evaluate({
      action: 'file.write',
      filePath,
      content,
      agent
    });
    
    if (!privacyCheck.allowed) {
      return { 
        block_reason: privacyCheck.reason,
        policy: privacyCheck.policy
      };
    }
  }
  
  // 3. Contract check (if agent has contracts)
  if (agent) {
    const contractCheck = evaluator.evaluate({
      action: 'file.write',
      agent,
      filePath,
      content
    });
    
    if (!contractCheck.allowed) {
      return { 
        block_reason: contractCheck.reason,
        contract: contractCheck.contract
      };
    }
  }
  
  // Success: write is allowed
  return { 
    allowed: true,
    filePath,
    agent
  };
}
