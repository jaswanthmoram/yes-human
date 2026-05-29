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
import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';

const memory = new MemoryManager();

export default async function onTaskComplete(context) {
  const { task, route, agents, tools, duration, success } = context;
  
  // 1. Generate trace ID and hash
  const traceId = generateTraceId();
  const taskHash = hashTask(task);
  
  // 2. Create trace entry
  const trace = {
    trace_id: traceId,
    task_hash: taskHash,
    task: task ? task.substring(0, 500) : null,
    route_id: route,
    agents: agents || [],
    tools: tools || [],
    duration_ms: duration,
    success,
    timestamp: new Date().toISOString()
  };
  
  // 3. Write to episodic memory
  const episodeId = memory.addEpisodicMemory('tasks', trace);
  
  // 4. Write to immutable ledger (from iso pattern)
  const ledgerEntry = {
    ...trace,
    previous_hash: getLastLedgerHash(),
    hash: null // Will be calculated
  };
  ledgerEntry.hash = hashLedgerEntry(ledgerEntry);
  
  appendToJSONL('registry/ledger.jsonl', ledgerEntry);
  
  // 5. Log to console
  console.log(`[trace] task="${task}" route=${route} success=${success} duration=${duration}ms trace=${traceId}`);
  
  return { 
    recorded: true,
    trace_id: traceId,
    episode_id: episodeId,
    ledger_hash: ledgerEntry.hash
  };
}

/**
 * Generate unique trace ID
 */
function generateTraceId() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Hash task for deduplication
 */
function hashTask(task) {
  if (!task) return 'empty';
  return crypto.createHash('sha256').update(task).digest('hex').substring(0, 16);
}

/**
 * Append entry to JSONL file
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
