import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { validateHostBundle } from '../../../validators/host-bundle.validator.js';
import { readGraphRoutingConfig, isGraphStale } from '../../yes-runtime/lib/code-graph-assist.js';
import { repoRoot, readJSONSafe } from './helpers.js';

export function cmdDoctor() {
  const checks = [];
  const add = (ok, label, detail = '') => checks.push({ ok, label, detail });

  // Node version
  const major = Number(process.versions.node.split('.')[0]);
  add(major >= 20, `Node >= 20`, `found ${process.versions.node}`);

  // Python + MarkItDown
  const venvPython = path.join(repoRoot, '.venv', 'bin', 'python');
  const python =
    process.env.YES_PYTHON && fs.existsSync(process.env.YES_PYTHON)
      ? process.env.YES_PYTHON
      : fs.existsSync(venvPython)
        ? venvPython
        : 'python3';
  const mk = spawnSync(python, ['-c', 'import markitdown'], { encoding: 'utf8' });
  add(mk.status === 0, 'MarkItDown installed', mk.status === 0 ? python : `not importable for ${python}`);

  // Schemas load
  let schemaCount = 0;
  try {
    schemaCount = fs
      .readdirSync(path.join(repoRoot, 'packages/yes-schema/schemas'))
      .filter((f) => f.endsWith('.json')).length;
  } catch {
    /* ignore */
  }
  add(schemaCount > 0, 'Schemas present', `${schemaCount} schema files`);

  // Route table resolves to routes.json
  let routesOk = false;
  let routeDetail;
  try {
    const table = readJSONSafe('graph/indexes/ROUTE_TABLE.min.json');
    const routes = readJSONSafe('registry/routes.json', []);
    const ids = new Set(routes.map((r) => r.route_id));
    const missing = Object.values(table.routes).filter((id) => !ids.has(id));
    routesOk = missing.length === 0 && ids.has(table.fallback);
    routeDetail = routesOk
      ? `${Object.keys(table.routes).length} hot routes resolve`
      : `unresolved: ${missing.join(', ') || table.fallback}`;
  } catch (e) {
    routeDetail = e.message;
  }
  add(routesOk, 'Route table resolves', routeDetail);

  // Registry counts
  let countsOk = true;
  const countDetail = [];
  for (const name of ['agents', 'skills', 'workflows', 'categories', 'category-packs']) {
    try {
      const reg = readJSONSafe(`registry/${name}.json`);
      const match = reg.count === reg.items.length;
      countsOk = countsOk && match;
      countDetail.push(`${name}:${reg.items.length}${match ? '' : '!'}`);
    } catch {
      countsOk = false;
      countDetail.push(`${name}:err`);
    }
  }
  add(countsOk, 'Registry counts match', countDetail.join(' '));

  // Code graph staleness
  try {
    const grCfg = readGraphRoutingConfig(repoRoot);
    const stale = isGraphStale(repoRoot, grCfg);
    add(!stale.stale, 'Code graph fresh', stale.stale ? stale.reason || 'stale' : `built ${stale.built_at || 'ok'}`);
  } catch (e) {
    add(false, 'Code graph check', e.message);
  }

  // Connector env vars (profile-scoped enabled MCPs only)
  try {
    const mcps = readJSONSafe('registry/mcps.json', { items: [] });
    const profiles = readJSONSafe('registry/connector-profiles.json', {});
    const profileName = process.env.YES_CONNECTOR_PROFILE || profiles.default_profile || 'minimal';
    const enableSet = new Set(profiles.profiles?.[profileName]?.enable || []);
    const missing = [];
    for (const item of mcps.items || []) {
      if (!item.enabled || !item.env_var) continue;
      if (enableSet.size && !enableSet.has(item.id)) continue;
      if (!process.env[item.env_var]) missing.push(item.env_var);
    }
    add(
      missing.length === 0,
      `MCP env vars (profile: ${profileName})`,
      missing.length ? `missing: ${missing.join(', ')}` : 'all set for profile'
    );
  } catch (e) {
    add(false, 'MCP env check', e.message);
  }

  // RBAC policy
  try {
    const rbac = readJSONSafe('registry/rbac.json', {});
    add(Boolean(rbac.default_role && rbac.roles), 'RBAC policy', `default_role: ${rbac.default_role || 'none'}`);
  } catch (e) {
    add(false, 'RBAC policy', e.message);
  }

  // Retention policy
  try {
    const retention = readJSONSafe('registry/retention-policy.json', {});
    add(
      Boolean(retention.default_mode && retention.policies),
      'Retention policy',
      `mode: ${retention.default_mode || 'none'}`
    );
  } catch (e) {
    add(false, 'Retention policy', e.message);
  }

  try {
    const profiles = readJSONSafe('registry/connector-profiles.json', {});
    add(Boolean(profiles.default_profile), 'Connector profiles', profiles.default_profile || 'none');
  } catch (e) {
    add(false, 'Connector profiles', e.message);
  }

  console.log('yes doctor\n');
  for (const c of checks) {
    console.log(`${c.ok ? '✓' : '✗'} ${c.label}${c.detail ? ` — ${c.detail}` : ''}`);
  }
  const allOk = checks.every((c) => c.ok);
  console.log(`\n${allOk ? '✓ All checks passed.' : '✗ Some checks failed.'}`);
  return allOk ? 0 : 1;
}
