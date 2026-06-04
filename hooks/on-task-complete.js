/**
 * On-task-complete hook: Trace + Ledger
 *
 * Runs when a task completes. Performs:
 * 1. Trace recording (to episodic memory)
 * 2. Ledger entry (immutable record with hash chain)
 * 3. Salience scoring for future retrieval
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { LearningEngine } from '../packages/yes-runtime/learning-engine.js';
import { redactString } from '../packages/yes-runtime/redaction.js';

const learning = new LearningEngine();

export default async function onTaskComplete(context) {
  try {
    const { task, route, agents, tools, duration, success } = context;

    // 1. Create tenant-scoped redacted trace and episodic record.
    const { trace } = learning.recordTrace({
      ...context,
      task,
      route_id: typeof route === 'string' ? route : route?.route_id,
      route,
      agents: agents || [],
      tools: tools || [],
      duration_ms: duration,
      success
    });

    // 2. Write to immutable ledger (from iso pattern). The ledger stores the
    // redacted trace only, never raw task text.
    const ledgerEntry = {
      ...trace,
      previous_hash: getLastLedgerHash(),
      hash: null // Will be calculated
    };
    ledgerEntry.hash = hashLedgerEntry(ledgerEntry);

    appendToJSONL('registry/ledger.jsonl', ledgerEntry);

    // 3. Log redacted summary to console.
    const taskPreview = task ? redactString(String(task).slice(0, 120)) : '';
    console.log(
      `[trace] task="${taskPreview}" route=${trace.route_id} success=${success} duration=${duration}ms trace=${trace.trace_id}`
    );

    return {
      recorded: true,
      trace_id: trace.trace_id,
      ledger_hash: ledgerEntry.hash
    };
  } catch (err) {
    return { recorded: false, error: err.message };
  }
}

/**
 * Generate unique trace ID
 */
function appendToJSONL(filePath, entry) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.appendFileSync(filePath, JSON.stringify(entry) + '\n');
}

/**
 * Get last ledger hash for chain
 */
function getLastLedgerHash() {
  try {
    const ledgerPath = 'registry/ledger.jsonl';
    if (!fs.existsSync(ledgerPath)) return 'genesis';

    const lines = fs.readFileSync(ledgerPath, 'utf8').trim().split('\n');
    if (lines.length === 0) return 'genesis';

    const last = JSON.parse(lines[lines.length - 1]);
    return last.hash || 'genesis';
  } catch {
    return 'genesis';
  }
}

/**
 * Hash ledger entry for integrity
 */
function hashLedgerEntry(entry) {
  const data = JSON.stringify({ ...entry, hash: null });
  return crypto.createHash('sha256').update(data).digest('hex');
}
