import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '../..');
const cli = path.join(repoRoot, 'packages/yes-cli/index.js');

test('yes run --trace keeps stdout readable and writes structured JSONL trace', () => {
  const traceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yes-run-trace-'));
  const result = spawnSync(process.execPath, [cli, 'run', 'expense audit', '--trace'], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env, YES_TRACE_DIR: traceDir }
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /yes run/);
  assert.match(result.stdout, /Route\s+: route\.finance\.expense-auditor/);

  const stderrLines = result.stderr.trim().split(/\n+/).filter(Boolean);
  assert.equal(stderrLines.length, 1);
  const trace = JSON.parse(stderrLines[0]);

  assert.equal(trace.event, 'yes.run.trace');
  assert.equal(trace.input, 'expense audit');
  assert.equal(trace.matched_route.route_id, 'route.finance.expense-auditor');
  assert.equal(trace.selected_agent, 'finance.expense-auditor');
  assert.equal(trace.disclaimer_gate_fired, true);
  assert.equal(trace.human_review_gate, true);
  assert.equal(trace.budget_band, 'standard');
  assert.ok(trace.estimated_tokens.agent > 0);
  assert.ok(trace.estimated_tokens.max_context > 0);
  assert.equal(trace.hook_chain.pre_route.budget.status, 'allowed');
  assert.ok('signal_words' in trace.hook_chain.pre_route);

  const files = fs.readdirSync(traceDir).filter((file) => file.endsWith('.jsonl'));
  assert.equal(files.length, 1);
  const persisted = fs.readFileSync(path.join(traceDir, files[0]), 'utf8').trim();
  assert.deepEqual(JSON.parse(persisted), trace);
});
