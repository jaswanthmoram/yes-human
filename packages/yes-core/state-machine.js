import fs from 'fs';
import path from 'path';

/**
 * Lifecycle state machine runtime.
 *
 * Loads a state-machine definition (lifecycle/*.json) and provides deterministic
 * transitions plus an integrity check (all transitions reference declared states,
 * initial is declared, terminal states have no outgoing transitions).
 */
export class StateMachine {
  constructor(definition) {
    this.def = definition;
    this.stateNames = new Set((definition.states || []).map((s) => s.name));
    this.stateByName = new Map((definition.states || []).map((s) => [s.name, s]));
    this.current = definition.initial;
  }

  static fromFile(filePath) {
    return new StateMachine(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  }

  /** Events available from a given state. */
  eventsFrom(state) {
    return (this.def.transitions || []).filter((t) => t.from === state).map((t) => t.on);
  }

  /** Resolve the target state for (from, event), or null if no such transition. */
  target(from, event) {
    const t = (this.def.transitions || []).find((x) => x.from === from && x.on === event);
    return t ? t.to : null;
  }

  /** Advance the machine; throws on an invalid transition. */
  send(event) {
    const to = this.target(this.current, event);
    if (to === null) {
      throw new Error(`Invalid transition: '${event}' from state '${this.current}' in ${this.def.id}`);
    }
    this.current = to;
    return to;
  }

  isTerminal(state = this.current) {
    return this.stateByName.get(state)?.type === 'terminal';
  }

  /** Structural integrity check. Returns { ok, errors[] }. */
  validate() {
    const errors = [];
    if (!this.stateNames.has(this.def.initial)) {
      errors.push(`initial state '${this.def.initial}' is not declared`);
    }
    for (const t of this.def.transitions || []) {
      if (!this.stateNames.has(t.from)) errors.push(`transition from unknown state '${t.from}'`);
      if (!this.stateNames.has(t.to)) errors.push(`transition to unknown state '${t.to}'`);
      if (this.isTerminal(t.from)) errors.push(`terminal state '${t.from}' has an outgoing transition '${t.on}'`);
    }
    return { ok: errors.length === 0, errors };
  }
}

/** Load all lifecycle state machines from a directory. */
export function loadStateMachines(dir = 'lifecycle') {
  const out = {};
  const abs = path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
  if (!fs.existsSync(abs)) return out;
  for (const file of fs.readdirSync(abs).filter((f) => f.endsWith('.json'))) {
    const sm = StateMachine.fromFile(path.join(abs, file));
    out[sm.def.id] = sm;
  }
  return out;
}
