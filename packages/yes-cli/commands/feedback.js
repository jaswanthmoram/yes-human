import { YesEvaluator } from '../../yes-runtime/yes-evaluator.js';
import { repoRoot, flagValue, boolFlag } from './helpers.js';

export function cmdFeedback(args) {
  const sub = args[0];
  const evaluator = new YesEvaluator({ repoRoot });
  const engine = evaluator.engine;

  if (sub === 'list') {
    try {
      console.log(JSON.stringify(engine.listFeedback(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Feedback list failed: ${err.message}`);
      return 1;
    }
  }

  if (sub === 'review') {
    const id = flagValue(args, '--id', null);
    const decision = flagValue(args, '--accept', null) ? 'accept' : flagValue(args, '--reject', null) ? 'reject' : null;
    if (!id || !decision) {
      console.error('Usage: yes feedback review --id <id> --accept|--reject [--skip-gate]');
      return 1;
    }
    try {
      const result = engine.reviewFeedback(id, decision, { run_gate: !args.includes('--skip-gate') });
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  if (sub === 'apply') {
    const id = flagValue(args, '--id', null);
    if (!id) {
      console.error('Usage: yes feedback apply --id <id> [--phrase "..."] [--write]');
      return 1;
    }
    try {
      const result = engine.applyFeedback(id, {
        dry_run: !args.includes('--write'),
        phrase: flagValue(args, '--phrase', null)
      });
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  if (sub === 'promote') {
    const id = flagValue(args, '--id', null);
    if (!id) {
      console.error('Usage: yes feedback promote --id <id>');
      return 1;
    }
    try {
      const result = engine.promoteFeedback(id);
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(err.message);
      return 1;
    }
  }

  const type = sub;
  if (!['accept', 'reject', 'partial', 'wrong-agent'].includes(type)) {
    console.error('Usage: yes feedback <list|review|apply|promote|accept|reject|partial|wrong-agent> ...');
    return 1;
  }
  let result;
  try {
    result = engine.stageFeedback({
      type,
      trace_id: flagValue(args, '--trace', null),
      route_id: flagValue(args, '--route', null),
      suggested_route: flagValue(args, '--suggested-route', null),
      note: flagValue(args, '--note', null),
      metadata: { source: 'cli', phrase: flagValue(args, '--phrase', null) }
    });
  } catch (err) {
    console.error(`✗ Feedback staging failed: ${err.message}`);
    return 1;
  }
  console.log(JSON.stringify(result, null, 2));
  return 0;
}
