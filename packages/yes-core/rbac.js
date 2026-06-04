import fs from 'fs';
import path from 'path';

const DEFAULT_POLICY = {
  id: 'yes-human.rbac',
  version: '1.0.0',
  default_role: 'maintainer',
  roles: {
    viewer: {
      description: 'Read routes, plans, and generated public artifacts.',
      permissions: ['route:read', 'workflow:read', 'trace:read:own']
    },
    contributor: {
      description: 'Create local traces and staged proposals without mutating production registries.',
      extends: ['viewer'],
      permissions: ['trace:create', 'feedback:stage', 'workflow:dry-run', 'connector:read']
    },
    operator: {
      description: 'Run local/self-hosted workflows and connector reads under policy.',
      extends: ['contributor'],
      permissions: ['workflow:execute', 'connector:execute', 'graph:build', 'graph:query']
    },
    maintainer: {
      description: 'Promote validated public content and build host bundles.',
      extends: ['operator'],
      permissions: ['content:promote', 'content:rollback', 'adapter:build', 'manifest:verify']
    }
  },
  deny: [
    {
      permission: 'production:mutate:feedback',
      reason: 'Feedback promotion is staging-only and never mutates production directly.'
    },
    { permission: 'secret:read', reason: 'Secrets must be referenced by environment variable names only.' }
  ]
};

export function loadRbacPolicy(repoRoot = process.cwd()) {
  const filePath = path.join(repoRoot, 'registry/rbac.json');
  if (!fs.existsSync(filePath)) return DEFAULT_POLICY;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function resolveRole(role, policy = DEFAULT_POLICY, seen = new Set()) {
  const roleName = role || policy.default_role || 'viewer';
  if (seen.has(roleName)) return new Set();
  seen.add(roleName);
  const entry = policy.roles?.[roleName];
  if (!entry) return new Set();
  const permissions = new Set(entry.permissions || []);
  for (const parent of entry.extends || []) {
    for (const permission of resolveRole(parent, policy, seen)) permissions.add(permission);
  }
  return permissions;
}

/**
 * Check whether a role has a permission.
 *
 * Permission matching rules (in order):
 *   1. **Explicit deny** — if `policy.deny[].permission === permission`, return false.
 *      Deny entries are exact-match only; no wildcards. To deny a namespace,
 *      list each permission explicitly.
 *   2. **Universal grant** — if the role's resolved set contains `'*'`, return true.
 *      Use sparingly; this is "root".
 *   3. **Exact match** — if the resolved set contains `permission` literally, return true.
 *   4. **Namespace wildcard** — if any granted permission ends in `:*` and the
 *      requested permission starts with the prefix before `:*`, return true.
 *      Example: granted `route:*` matches requested `route:read` and `route:write`.
 *      NOTE: only the trailing `:*` is special — `*:read` or `route:*:meta` are
 *      treated as literal strings and will only match themselves exactly.
 *
 * Inheritance: role A `extends: ['B']` gets all of B's permissions transitively.
 * Cycle-safe via the `seen` set in `resolveRole`.
 *
 * @param {string|null} role - Role name; falls back to policy.default_role.
 * @param {string} permission - Dotted permission string, e.g. `workflow:execute`.
 * @param {object} policy - RBAC policy object (default: DEFAULT_POLICY).
 * @returns {boolean}
 */
export function hasPermission(role, permission, policy = DEFAULT_POLICY) {
  const deny = policy.deny || [];
  if (deny.some((rule) => rule.permission === permission)) return false;
  const permissions = resolveRole(role, policy);
  return (
    permissions.has('*') ||
    permissions.has(permission) ||
    Array.from(permissions).some((p) => p.endsWith(':*') && permission.startsWith(p.slice(0, -1)))
  );
}

export function assertPermission(role, permission, policy = DEFAULT_POLICY) {
  if (!hasPermission(role, permission, policy)) {
    throw new Error(`RBAC denied permission "${permission}" for role "${role || policy.default_role || 'viewer'}"`);
  }
  return true;
}

export function defaultRbacPolicy() {
  return JSON.parse(JSON.stringify(DEFAULT_POLICY));
}
