import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { SECRET_PATTERNS } from '../yes-core/secrets.js';

const DEFAULT_REDACT_FIELDS = new Set([
  'password',
  'secret',
  'token',
  'api_key',
  'private_key',
  'authorization',
  'cookie'
]);

const PATTERNS = SECRET_PATTERNS;

export function hashValue(value, length = 16) {
  return crypto
    .createHash('sha256')
    .update(String(value ?? ''))
    .digest('hex')
    .slice(0, length);
}

export function readJsonIfExists(filePath, fallback = null) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

export function loadTeamMode(repoRoot = process.cwd()) {
  return readJsonIfExists(path.join(repoRoot, 'registry/team-mode.json'), {
    enabled: true,
    default_tenant: 'local',
    default_project: 'default',
    isolation: {
      base_dir: 'graph/memory/tenants',
      trace_file: 'traces.jsonl',
      hash_tenant_ids: true,
      hash_project_ids: true,
      deny_cross_tenant_reads: true,
      project_scoped_traces: true
    },
    redaction: {
      enabled: true,
      hash_task_text: true,
      drop_raw_task: true,
      redact_fields: Array.from(DEFAULT_REDACT_FIELDS),
      redact_patterns: Object.keys(PATTERNS)
    }
  });
}

export function resolveTenant(context = {}, teamMode = loadTeamMode()) {
  return context.tenant_id || process.env.YES_TENANT_ID || teamMode.default_tenant || 'local';
}

export function resolveProject(context = {}, teamMode = loadTeamMode()) {
  return context.project_id || process.env.YES_PROJECT_ID || teamMode.default_project || 'default';
}

export function tenantHash(tenantId, teamMode = loadTeamMode()) {
  return teamMode.isolation?.hash_tenant_ids === false
    ? String(tenantId || 'local')
    : hashValue(`tenant:${tenantId || 'local'}`, 24);
}

export function projectHash(projectId, teamMode = loadTeamMode()) {
  return teamMode.isolation?.hash_project_ids === false
    ? String(projectId || 'default')
    : hashValue(`project:${projectId || 'default'}`, 24);
}

export function redactString(value, teamMode = loadTeamMode()) {
  if (typeof value !== 'string') return value;
  if (teamMode.redaction?.enabled === false) return value;

  let redacted = value;
  const enabledPatterns = new Set(teamMode.redaction?.redact_patterns || Object.keys(PATTERNS));
  for (const [name, pattern] of Object.entries(PATTERNS)) {
    if (enabledPatterns.has(name)) {
      redacted = redacted.replace(pattern, `[REDACTED:${name}]`);
    }
  }
  return redacted;
}

export function redactObject(value, teamMode = loadTeamMode()) {
  if (!value || typeof value !== 'object') {
    return typeof value === 'string' ? redactString(value, teamMode) : value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => redactObject(entry, teamMode));
  }

  const fields = new Set([...(teamMode.redaction?.redact_fields || []), ...DEFAULT_REDACT_FIELDS]);
  const out = {};
  for (const [key, entry] of Object.entries(value)) {
    if (fields.has(key.toLowerCase())) {
      out[key] = '[REDACTED]';
      continue;
    }
    out[key] = redactObject(entry, teamMode);
  }
  return out;
}

export function redactedTask(task, teamMode = loadTeamMode()) {
  if (!task) return null;
  if (teamMode.redaction?.drop_raw_task !== false) return null;
  return redactString(String(task).slice(0, 500), teamMode);
}

export function tenantTracePath(repoRoot, tenantId, teamMode = loadTeamMode(repoRoot), projectId = 'default') {
  const hash = tenantHash(tenantId, teamMode);
  const project = projectHash(projectId, teamMode);
  if (teamMode.isolation?.project_scoped_traces === false) {
    return path.join(
      repoRoot,
      teamMode.isolation?.base_dir || 'graph/memory/tenants',
      hash,
      teamMode.isolation?.trace_file || 'traces.jsonl'
    );
  }
  return path.join(
    repoRoot,
    teamMode.isolation?.base_dir || 'graph/memory/tenants',
    hash,
    'projects',
    project,
    teamMode.isolation?.trace_file || 'traces.jsonl'
  );
}
