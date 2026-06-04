import { YesEvaluator } from '../../yes-runtime/yes-evaluator.js';
import { repoRoot, readJSON, flagValue } from './helpers.js';

export function cmdTeam(args) {
  const sub = args[0] || 'status';
  if (sub !== 'status') {
    console.error('Usage: yes team status');
    return 1;
  }
  let config;
  try {
    config = readJSON('registry/team-mode.json');
  } catch (err) {
    console.error(`✗ Failed to load team config: ${err.message}`);
    return 1;
  }
  const tenant = flagValue(args, '--tenant', process.env.YES_TENANT_ID || config.default_tenant);
  const project = flagValue(args, '--project', process.env.YES_PROJECT_ID || config.default_project || 'default');
  const evaluator = new YesEvaluator({ repoRoot });
  const trace = evaluator.engine.createTrace({
    task: 'tenant status probe',
    tenant_id: tenant,
    project_id: project,
    route_id: 'route.meta-system.supreme-router',
    success: true
  });
  console.log(
    JSON.stringify(
      {
        enabled: config.enabled,
        tenant_hash: trace.tenant_hash,
        project_hash: trace.project_hash,
        raw_tenant_stored: config.isolation?.hash_tenant_ids === false,
        raw_project_stored: config.isolation?.hash_project_ids === false,
        trace_base_dir: config.isolation?.base_dir,
        redaction: config.redaction
      },
      null,
      2
    )
  );
  return 0;
}
