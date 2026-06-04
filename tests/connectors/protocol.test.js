import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  connectorManifest,
  selectConnectorsForTask,
  validateConnectorCall
} from '../../packages/yes-connectors/index.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

test('connector protocol selects profile-enabled connectors for matching tasks', () => {
  const connectors = selectConnectorsForTask('inspect github pull request', {
    repoRoot,
    profileName: 'minimal',
    agentId: 'engineering.code-reviewer'
  });
  assert.ok(connectors.some((connector) => connector.id === 'github'));
});

test('connector validation enforces auth env vars without exposing secret values', () => {
  const connector = {
    id: 'github',
    enabled: true,
    required_auth: true,
    env_var: 'YES_TEST_MISSING',
    allowed_agents: ['engineering.code-reviewer']
  };
  const denied = validateConnectorCall(connector, { agentId: 'engineering.code-reviewer' });
  assert.equal(denied.allowed, false);
  assert.match(denied.reason, /YES_TEST_MISSING/);

  const manifest = connectorManifest(connector);
  assert.equal(manifest.env_value, '{env:YES_TEST_MISSING}');
});
