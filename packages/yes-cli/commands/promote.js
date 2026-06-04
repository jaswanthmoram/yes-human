import { checkAgentPromotion } from '../../validators/promotion.validator.js';
import { repoRoot } from './helpers.js';

export function cmdPromote(args) {
  if (args[0] !== '--check' || !args[1]) {
    console.error('Usage: yes promote --check <agent-id> [--gate production|staging]');
    return 1;
  }
  const agentId = args[1];
  const gateIdx = args.indexOf('--gate');
  const targetGate = gateIdx >= 0 ? args[gateIdx + 1] : 'production';
  let result;
  try {
    result = checkAgentPromotion(repoRoot, agentId, { targetGate });
  } catch (err) {
    console.error(`✗ Promotion check failed: ${err.message}`);
    return 1;
  }
  console.log(`promotion check: ${agentId} (gate: ${targetGate})\n`);
  for (const w of result.warnings) console.log(`⚠ ${w}`);
  if (result.allowed) {
    console.log(`✓ eligible for ${targetGate}`);
    return 0;
  }
  for (const b of result.blockers) console.log(`✗ ${b}`);
  console.log(`\n✗ blocked from ${targetGate}`);
  return 1;
}
