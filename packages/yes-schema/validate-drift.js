import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function runDriftCheck(root = repoRoot) {
  const issues = [];
  const routeTable = JSON.parse(fs.readFileSync(path.join(root, 'graph/indexes/ROUTE_TABLE.min.json'), 'utf8'));
  const routes = JSON.parse(fs.readFileSync(path.join(root, 'registry/routes.json'), 'utf8'));
  const routeIds = new Set(routes.map((r) => r.route_id));

  for (const [phrase, rid] of Object.entries(routeTable.routes || {})) {
    if (!routeIds.has(rid)) {
      issues.push({ kind: 'stale_route_target', phrase, route_id: rid });
    }
  }

  const registryRouteIds = new Set(routes.map((r) => r.route_id));
  const hotTargets = new Set(Object.values(routeTable.routes || {}));
  for (const rid of registryRouteIds) {
    if (rid.startsWith('route.') && !hotTargets.has(rid) && rid !== routeTable.fallback) {
      issues.push({ kind: 'registry_route_not_in_hot_table', route_id: rid, severity: 'info' });
    }
  }

  const blocking = issues.filter((i) => i.kind === 'stale_route_target');
  const report = {
    generated_at: new Date().toISOString(),
    ok: blocking.length === 0,
    hot_phrases: Object.keys(routeTable.routes || {}).length,
    registry_routes: routes.length,
    issues,
    blocking_count: blocking.length
  };
  report.generated_at = new Date().toISOString();
  fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
  fs.writeFileSync(path.join(root, 'reports/route-drift.json'), JSON.stringify(report, null, 2) + '\n');
  if (blocking.length) {
    console.error('✗ Route drift:', blocking.length, 'stale hot-route target(s)');
    return false;
  }
  console.log('✓ Route drift check passed');
  return true;
}

if (import.meta.url === `file://${process.argv[1]}`) process.exit(runDriftCheck() ? 0 : 1);
