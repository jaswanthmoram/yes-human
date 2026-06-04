import fs from 'fs';
import path from 'path';
import { hashValue, readJsonIfExists, redactObject } from './redaction.js';

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function appendJsonl(filePath, entry) {
  ensureDirFor(filePath);
  fs.appendFileSync(filePath, `${JSON.stringify(entry)}\n`);
}

export class OfflineRecovery {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
    this.policy = config.policy || readJsonIfExists(path.join(this.repoRoot, 'registry/offline-mode.json'), {});
    this.env = config.env || process.env;
    this.stateDir = path.join(this.repoRoot, this.policy.state_dir || 'graph/memory/offline');
    this.journalFile = path.join(this.repoRoot, this.policy.journal_file || 'graph/memory/offline/journal.jsonl');
    this.checkpointFile = path.join(
      this.repoRoot,
      this.policy.checkpoint_file || 'graph/memory/offline/checkpoint.json'
    );
  }

  isOffline() {
    const flag = this.policy.env_flag || 'YES_OFFLINE';
    return ['1', 'true', 'yes'].includes(String(this.env[flag] || '').toLowerCase());
  }

  checkpoint(stage, payload = {}) {
    const entry = {
      id: hashValue(`${Date.now()}:${stage}:${JSON.stringify(payload)}`, 20),
      stage,
      offline: this.isOffline(),
      payload: redactObject(payload),
      created_at: new Date().toISOString()
    };

    fs.mkdirSync(this.stateDir, { recursive: true });
    ensureDirFor(this.checkpointFile);
    fs.writeFileSync(this.checkpointFile, JSON.stringify(entry, null, 2));
    appendJsonl(this.journalFile, { type: 'checkpoint', ...entry });
    return entry;
  }

  status() {
    const checkpoint = readJsonIfExists(this.checkpointFile, null);
    let journal_entries = 0;
    if (fs.existsSync(this.journalFile)) {
      journal_entries = fs.readFileSync(this.journalFile, 'utf8').split('\n').filter(Boolean).length;
    }
    return {
      offline: this.isOffline(),
      state_dir: this.policy.state_dir || 'graph/memory/offline',
      journal_entries,
      last_checkpoint: checkpoint
    };
  }

  resume() {
    const checkpoint = readJsonIfExists(this.checkpointFile, null);
    if (!checkpoint) {
      return { resumable: false, reason: 'no checkpoint found' };
    }
    const entry = {
      type: 'resume',
      checkpoint_id: checkpoint.id,
      stage: checkpoint.stage,
      created_at: new Date().toISOString()
    };
    appendJsonl(this.journalFile, entry);
    return { resumable: true, checkpoint };
  }

  clear() {
    fs.rmSync(this.stateDir, { recursive: true, force: true });
    return { cleared: true, state_dir: this.policy.state_dir || 'graph/memory/offline' };
  }
}
