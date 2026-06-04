// Issue #37 + #45: hook-registry priorities are honored, and YES_HOOK_VALIDATION
// can be set to 'strict' so a hook returning undeclared outputs throws.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { HookRunner } from '../../hooks/hook-runner.js';

function makeHooksDir() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yes-hookprio-'));
  const hooksDir = path.join(root, 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });

  fs.writeFileSync(
    path.join(hooksDir, 'high.js'),
    "export default async function() { return { allowed: true, modified_task: 'from-high' }; }\n"
  );
  fs.writeFileSync(
    path.join(hooksDir, 'low.js'),
    "export default async function() { return { allowed: true, modified_task: 'from-low' }; }\n"
  );
  fs.writeFileSync(
    path.join(hooksDir, 'undeclared.js'),
    "export default async function() { return { allowed: true, mystery_output: 'oops' }; }\n"
  );

  fs.writeFileSync(
    path.join(hooksDir, 'hook-registry.json'),
    JSON.stringify({
      hooks: [
        // Intentionally insert low-priority first to prove the sort works.
        { id: 'low', event: 'test', priority: 10, entry: 'hooks/low.js', inputs: ['task'], outputs: ['modified_task', 'allowed'] },
        { id: 'high', event: 'test', priority: 100, entry: 'hooks/high.js', inputs: ['task'], outputs: ['modified_task', 'allowed'] },
        { id: 'undeclared', event: 'test2', priority: 50, entry: 'hooks/undeclared.js', inputs: ['task'], outputs: ['allowed'] }
      ]
    })
  );

  return root;
}

test('hook-runner sorts hooks by priority (high first)', async () => {
  const root = makeHooksDir();
  const cwd = process.cwd();
  try {
    process.chdir(root);
    const runner = new HookRunner('hooks');
    const eventHooks = runner.getEventHooks('test');
    assert.equal(eventHooks[0].id, 'high', 'high-priority hook should be first');
    assert.equal(eventHooks[1].id, 'low', 'low-priority hook should be second');
  } finally {
    process.chdir(cwd);
  }
});

test('hook-runner: YES_HOOK_VALIDATION=strict throws on undeclared output', async () => {
  const root = makeHooksDir();
  const cwd = process.cwd();
  const prev = process.env.YES_HOOK_VALIDATION;
  try {
    process.chdir(root);
    process.env.YES_HOOK_VALIDATION = 'strict';
    const runner = new HookRunner('hooks');
    await assert.rejects(
      () => runner.run('test2', { task: 'x' }),
      /undeclared output property "mystery_output"/
    );
  } finally {
    process.chdir(cwd);
    if (prev !== undefined) process.env.YES_HOOK_VALIDATION = prev;
    else delete process.env.YES_HOOK_VALIDATION;
  }
});
