import fs from 'fs';
import path from 'path';

const DEFAULT_RETENTION = {
  id: 'yes-human.retention',
  version: '1.0.0',
  default_mode: 'local',
  policies: {
    local: { trace_days: 30, private_trace_days: 7, redact_before_write: true, delete_private_raw: true },
    'self-hosted': { trace_days: 90, private_trace_days: 14, redact_before_write: true, delete_private_raw: true }
  }
};

export function loadRetentionPolicy(repoRoot = process.cwd()) {
  const filePath = path.join(repoRoot, 'registry/retention-policy.json');
  if (!fs.existsSync(filePath)) return DEFAULT_RETENTION;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function retentionMode(policy = DEFAULT_RETENTION) {
  return process.env.YES_RETENTION_MODE || process.env.YES_MODE || policy.default_mode || 'local';
}

export function retentionForTrace(policy = DEFAULT_RETENTION, context = {}) {
  const mode = context.retention_mode || retentionMode(policy);
  const modePolicy = policy.policies?.[mode] || policy.policies?.local || DEFAULT_RETENTION.policies.local;
  const privateTrace = Boolean(context.private_trace || context.privateTrace || context.sensitive);
  const days = privateTrace ? modePolicy.private_trace_days : modePolicy.trace_days;
  return {
    policy_id: policy.id || 'yes-human.retention',
    mode,
    private_trace: privateTrace,
    delete_after_days: days,
    redact_before_write: modePolicy.redact_before_write !== false,
    delete_private_raw: modePolicy.delete_private_raw !== false,
    expires_at: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
  };
}

export function isExpired(entry, now = new Date()) {
  if (!entry?.retention?.expires_at) return false;
  return new Date(entry.retention.expires_at).getTime() <= now.getTime();
}

export function withFileLockSync(filePath, action) {
  const lockDir = `${filePath}.lock`;
  const maxRetries = 50;
  const retryDelay = 10; // ms
  let acquired = false;

  for (let i = 0; i < maxRetries; i++) {
    try {
      fs.mkdirSync(lockDir);
      acquired = true;
      break;
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
      // Sleep/wait synchronously
      const start = Date.now();
      while (Date.now() - start < retryDelay) {
        // busy wait
      }
    }
  }

  if (!acquired) {
    try {
      const stats = fs.statSync(lockDir);
      if (Date.now() - stats.mtimeMs > 10000) {
        fs.rmdirSync(lockDir);
        fs.mkdirSync(lockDir);
        acquired = true;
      }
    } catch {
      // ignore
    }
    if (!acquired) {
      throw new Error(`Failed to acquire lock for file: ${filePath}`);
    }
  }

  try {
    return action();
  } finally {
    try {
      fs.rmdirSync(lockDir);
    } catch {
      // ignore
    }
  }
}

export function pruneJsonlFile(filePath, now = new Date()) {
  if (!fs.existsSync(filePath)) return { file: filePath, kept: 0, removed: 0 };

  return withFileLockSync(filePath, () => {
    const lines = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    const kept = [];
    let removed = 0;
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (isExpired(entry, now)) removed += 1;
        else kept.push(JSON.stringify(entry));
      } catch {
        kept.push(line);
      }
    }
    fs.writeFileSync(filePath, kept.length ? `${kept.join('\n')}\n` : '');
    return { file: filePath, kept: kept.length, removed };
  });
}

export function pruneTenantTraces(repoRoot = process.cwd(), policy = loadRetentionPolicy(repoRoot), now = new Date()) {
  const baseDir = path.join(repoRoot, 'graph/memory/tenants');
  const results = [];
  if (!fs.existsSync(baseDir)) return results;
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
        try {
          results.push(pruneJsonlFile(full, now));
        } catch (e) {
          results.push({ file: full, kept: 0, removed: 0, error: e.message });
        }
      }
    }
  };
  walk(baseDir);
  return results;
}
