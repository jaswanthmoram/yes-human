import fs from 'fs';
import path from 'path';
import { resolveEnv } from '../yes-core/secrets.js';

/**
 * @typedef {Object} Connector
 * @property {string} id - Unique identifier for the connector
 * @property {string} provider - Provider name (e.g. google, openai)
 * @property {string} kind - Kind of connector (e.g. mcp, shell, http)
 * @property {string} purpose - Short description of purpose
 * @property {string} policy - Associated security policy
 * @property {boolean} [enabled] - If the connector is enabled
 * @property {boolean} [required_auth] - If authentication is required
 * @property {string} [env_var] - Env var name holding credentials
 * @property {Array<string>} [allowed_agents] - Agents allowed to call this
 * @property {Array<string>} [allowed_workflows] - Workflows allowed to call this
 * @property {string} [fallback] - Fallback message or route if offline
 * @property {string} [trust_level] - Trust level (e.g. high, medium)
 */

/**
 * @typedef {Object} ConnectorRegistry
 * @property {Array<Connector>} connectors
 * @property {Object} profiles
 */

// Module-level mtime-keyed cache. Entries: { mtime, data }.
const fileCache = new Map();

function readJsonCached(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const stats = fs.statSync(filePath);
    const cached = fileCache.get(filePath);
    if (cached && cached.mtime === stats.mtimeMs) return cached.data;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fileCache.set(filePath, { mtime: stats.mtimeMs, data });
    return data;
  } catch {
    const cached = fileCache.get(filePath);
    return cached ? cached.data : fallback;
  }
}

function normalize(value) {
  return String(value || '').toLowerCase();
}

// Pre-tokenized haystack cache, keyed by connector id + content fingerprint.
const haystackCache = new WeakMap();
function getHaystack(connector) {
  const cached = haystackCache.get(connector);
  if (cached) return cached;
  const haystack = normalize([connector.id, connector.provider, connector.purpose, connector.policy].join(' '));
  haystackCache.set(connector, haystack);
  return haystack;
}

export function loadConnectorRegistry(repoRoot = process.cwd()) {
  const registry = readJsonCached(path.join(repoRoot, 'registry/mcps.json'), { items: [] });
  const profiles = readJsonCached(path.join(repoRoot, 'registry/connector-profiles.json'), {
    default_profile: 'minimal',
    profiles: {}
  });
  return { connectors: registry.items || [], profiles };
}

export function activeConnectorIds(
  profiles,
  profileName = process.env.YES_CONNECTOR_PROFILE || profiles.default_profile || 'minimal'
) {
  const profile = profiles.profiles?.[profileName] || profiles.profiles?.[profiles.default_profile] || { enable: [] };
  return new Set(profile.enable || []);
}

export function selectConnectorsForTask(task, options = {}) {
  const repoRoot = options.repoRoot || process.cwd();
  const { connectors, profiles } = loadConnectorRegistry(repoRoot);
  const enabled = activeConnectorIds(profiles, options.profileName);
  const query = normalize(task);
  const queryTokens = query.split(/\s+/).filter(Boolean);
  return connectors
    .filter((connector) => connector.enabled !== false && enabled.has(connector.id))
    .map((connector) => {
      const haystack = getHaystack(connector);
      const allowedByAgent = options.agentId ? connector.allowed_agents?.includes(options.agentId) : true;
      const allowedByWorkflow = options.workflowId ? connector.allowed_workflows?.includes(options.workflowId) : true;
      const score = queryTokens.reduce((acc, token) => acc + (haystack.includes(token) ? 1 : 0), 0);
      return { connector, score, allowedByAgent, allowedByWorkflow };
    })
    .filter((entry) => entry.allowedByAgent && entry.allowedByWorkflow && entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ connector, score }) => ({ ...connector, match_score: score }));
}

export function validateConnectorCall(connector, context = {}) {
  if (!connector) return { allowed: false, reason: 'connector missing' };
  if (connector.enabled === false) return { allowed: false, reason: 'connector disabled' };

  let hasEnv = false;
  if (connector.env_var) {
    const envVarName =
      connector.env_var.startsWith('{env:') && connector.env_var.endsWith('}')
        ? connector.env_var.slice(5, -1)
        : connector.env_var;
    const val = resolveEnv(process.env[envVarName]);
    hasEnv = !!val;
  }

  if (connector.required_auth && connector.env_var && !hasEnv && context.requireEnv !== false) {
    return { allowed: false, reason: `missing env var ${connector.env_var}` };
  }
  if (context.agentId && connector.allowed_agents?.length && !connector.allowed_agents.includes(context.agentId)) {
    return { allowed: false, reason: `agent ${context.agentId} is not allowed for ${connector.id}` };
  }
  if (
    context.workflowId &&
    connector.allowed_workflows?.length &&
    !connector.allowed_workflows.includes(context.workflowId)
  ) {
    return { allowed: false, reason: `workflow ${context.workflowId} is not allowed for ${connector.id}` };
  }
  if (context.offline && connector.kind !== 'shell') {
    return { allowed: false, reason: connector.fallback || 'offline mode denies network connectors' };
  }
  return { allowed: true, reason: 'allowed by connector protocol' };
}

export function connectorManifest(connector) {
  return {
    id: connector.id,
    provider: connector.provider,
    kind: connector.kind,
    trust_level: connector.trust_level,
    required_auth: connector.required_auth,
    env_var: connector.env_var || null,
    env_value: connector.env_var ? '{env:' + connector.env_var + '}' : null,
    policy: connector.policy,
    fallback: connector.fallback
  };
}
