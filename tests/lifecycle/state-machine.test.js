import { test } from 'node:test';
import assert from 'node:assert/strict';
import { StateMachine, loadStateMachines } from '../../packages/yes-core/state-machine.js';

test('loads all lifecycle state machines', () => {
  const machines = loadStateMachines('lifecycle');
  assert.ok(machines['route-state-machine']);
  assert.ok(machines['absorb-state-machine']);
  assert.ok(machines['graph-build-state-machine']);
  assert.ok(machines['workflow-create-state-machine']);
});

test('every lifecycle machine passes structural integrity', () => {
  const machines = loadStateMachines('lifecycle');
  for (const [id, sm] of Object.entries(machines)) {
    const { ok, errors } = sm.validate();
    assert.ok(ok, `${id} integrity errors: ${errors.join('; ')}`);
  }
});

test('route machine drives a happy-path transition sequence', () => {
  const machines = loadStateMachines('lifecycle');
  const sm = machines['route-state-machine'];
  assert.equal(sm.current, 'received');
  sm.send('start');
  assert.equal(sm.current, 'pre_route');
  sm.send('allowed');
  assert.equal(sm.current, 'routed');
  sm.send('agent_selected');
  assert.equal(sm.current, 'agent_loaded');
  sm.send('no_tool');
  sm.send('passed');
  assert.equal(sm.current, 'complete');
  assert.ok(sm.isTerminal());
});

test('invalid transition throws', () => {
  const machines = loadStateMachines('lifecycle');
  const sm = machines['route-state-machine'];
  assert.throws(() => sm.send('nonexistent-event'), /Invalid transition/);
});

test('a denied pre-route routes to a terminal blocked state', () => {
  const sm = new StateMachine(loadStateMachines('lifecycle')['route-state-machine'].def);
  sm.send('start');
  sm.send('denied');
  assert.equal(sm.current, 'blocked');
  assert.ok(sm.isTerminal());
});
