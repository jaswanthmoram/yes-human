import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { hasPermission, assertPermission, defaultRbacPolicy } from '../../packages/yes-core/rbac.js';
import { retentionForTrace, pruneJsonlFile } from '../../packages/yes-runtime/retention.js';

test('rbac roles inherit permissions and deny forbidden mutations', () => {
  const policy = defaultRbacPolicy();
  assert.equal(hasPermission('operator', 'workflow:execute', policy), true);
  assert.equal(hasPermission('viewer', 'workflow:execute', policy), false);
  assert.throws(() => assertPermission('maintainer', 'production:mutate:feedback', policy), /RBAC denied/);
});

test('retention metadata distinguishes private traces and prunes expired jsonl rows', () => {
  const policy = {
    id: 'test.retention',
    default_mode: 'local',
    policies: { local: { trace_days: 30, private_trace_days: 1, redact_before_write: true, delete_private_raw: true } }
  };
  const retention = retentionForTrace(policy, { private_trace: true });
  assert.equal(retention.private_trace, true);
  assert.equal(retention.delete_after_days, 1);

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-retention-'));
  try {
    const file = path.join(dir, 'traces.jsonl');
    fs.writeFileSync(file, [
      JSON.stringify({ trace_id: 'old', retention: { expires_at: '2000-01-01T00:00:00.000Z' } }),
      JSON.stringify({ trace_id: 'new', retention: { expires_at: '2999-01-01T00:00:00.000Z' } })
    ].join('\n') + '\n');
    const result = pruneJsonlFile(file, new Date('2026-01-01T00:00:00.000Z'));
    assert.equal(result.removed, 1);
    const stored = fs.readFileSync(file, 'utf8');
    assert.match(stored, /new/);
    assert.doesNotMatch(stored, /old/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
