import { YesEvaluator } from '../../yes-runtime/yes-evaluator.js';
import { repoRoot, flagValue, boolFlag } from './helpers.js';

export function cmdEvaluator(args) {
  const evaluator = new YesEvaluator({ repoRoot });
  const sub = args[0] || 'status';

  if (sub === 'status') {
    try {
      console.log(JSON.stringify(evaluator.status(), null, 2));
    } catch (err) {
      console.error(`✗ Evaluator status failed: ${err.message}`);
      return 1;
    }
    return 0;
  }

  if (sub === 'trace') {
    const task = flagValue(
      args,
      '--task',
      args
        .slice(1)
        .filter((a) => !a.startsWith('--'))
        .join(' ')
        .trim()
    );
    const routeId = flagValue(args, '--route', 'route.meta-system.supreme-router');
    const success = boolFlag(args, '--success', true);
    let result;
    try {
      result = evaluator.trace({
        task,
        route_id: routeId,
        workflow_id: flagValue(args, '--workflow', null),
        tenant_id: flagValue(args, '--tenant', null),
        host: flagValue(args, '--host', 'cli'),
        success,
        failure_class: flagValue(args, '--failure-class', null),
        duration_ms: Number(flagValue(args, '--duration-ms', 0))
      });
    } catch (err) {
      console.error(`✗ Evaluator trace failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return 0;
  }

  if (sub === 'outcome') {
    const routeId = flagValue(args, '--route', null);
    if (!routeId) {
      console.error('Usage: yes evaluator outcome --route <route-id> --success <true|false> [--trace <trace-id>]');
      return 1;
    }
    let result;
    try {
      result = evaluator.outcome({
        trace_id: flagValue(args, '--trace', null),
        route_id: routeId,
        workflow_id: flagValue(args, '--workflow', null),
        success: boolFlag(args, '--success', true),
        score: Number(flagValue(args, '--score', boolFlag(args, '--success', true) ? 1 : 0)),
        source: flagValue(args, '--source', 'manual'),
        feedback: flagValue(args, '--feedback', null),
        failure_class: flagValue(args, '--failure-class', null),
        suggested_route: flagValue(args, '--suggested-route', null),
        tenant_id: flagValue(args, '--tenant', null)
      });
    } catch (err) {
      console.error(`✗ Evaluator outcome failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return 0;
  }

  if (sub === 'gate') {
    const checks = flagValue(args, '--checks', 'route,workflow,skill,cost')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    let result;
    try {
      result = evaluator.gate(checks);
    } catch (err) {
      console.error(`✗ Evaluator gate failed: ${err.message}`);
      return 1;
    }
    console.log(JSON.stringify(result, null, 2));
    return result.passed ? 0 : 1;
  }

  console.error('Usage: yes evaluator <status|trace|outcome|gate>');
  return 1;
}
