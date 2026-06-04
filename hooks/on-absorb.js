/**
 * On-absorb hook: Provenance + License
 *
 * Runs when content is absorbed from external source. Checks:
 * 1. License compliance (from licensing.policy.json)
 * 2. Source mining rules (from source-mining.rules.json)
 * 3. Provenance capture (for audit trail)
 */

import { PolicyEvaluator } from '../packages/yes-core/policy-evaluator.js';
import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';

const memory = new MemoryManager();

export default async function onAbsorb(context, policyEvaluator = null) {
  try {
    const { source, content, agent } = context;

    // Initialize policy evaluator if not provided
    const evaluator = policyEvaluator || new PolicyEvaluator();

    // 1. License policy check
    const licenseCheck = evaluator.evaluate({
      action: 'absorb',
      source,
      license: source?.license,
      content
    });

    if (!licenseCheck.allowed) {
      return {
        block_reason: licenseCheck.reason,
        policy: licenseCheck.policy
      };
    }

    // 2. Source mining rules check
    const sourceCheck = evaluator.evaluate({
      action: 'absorb',
      source,
      license: source?.license,
      stars: source?.stars,
      last_updated: source?.last_updated
    });

    if (!sourceCheck.allowed) {
      return {
        block_reason: sourceCheck.reason,
        rule: sourceCheck.rule
      };
    }

    // 3. Capture provenance
    const provenanceEntry = {
      source_url: source?.url || 'unknown',
      source_license: source?.license || 'unknown',
      source_stars: source?.stars || 0,
      source_last_updated: source?.last_updated || null,
      absorbed_by: agent,
      content_hash: await hashContent(content),
      content_size: content ? content.length : 0,
      timestamp: new Date().toISOString()
    };

    // 4. Log to episodic memory
    const episodeId = memory.addEpisodicMemory('absorptions', provenanceEntry);

    // 5. Log to console
    console.log(
      `[absorb] source=${source?.url || 'unknown'} license=${source?.license || 'unknown'} episode=${episodeId}`
    );

    return {
      absorbed: true,
      episode_id: episodeId,
      provenance: provenanceEntry
    };
  } catch (err) {
    return { absorbed: false, error: err.message };
  }
}

/**
 * Hash content for deduplication
 */
async function hashContent(content) {
  if (!content) return 'empty';
  const crypto = await import('crypto');
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}
