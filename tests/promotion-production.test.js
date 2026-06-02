import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkAgentPromotion } from '../validators/promotion.validator.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('production masters pass promotion gate', () => {
  const agentsDir = path.join(repoRoot, 'content/agents');
  for (const domain of fs.readdirSync(agentsDir)) {
    const master = path.join(agentsDir, domain, 'master.md');
    if (!fs.existsSync(master)) continue;
    const text = fs.readFileSync(master, 'utf8');
    if (!/quality_gate:\s*production/.test(text)) continue;
    const agentId = domain + '.master';
    const result = checkAgentPromotion(repoRoot, agentId, { targetGate: 'production' });
    assert.equal(result.allowed, true, agentId + ': ' + result.blockers.join(', '));
  }
});
