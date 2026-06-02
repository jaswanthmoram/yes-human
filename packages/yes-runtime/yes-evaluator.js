import { LearningEngine, runEvalGate } from './learning-engine.js';

export class YesEvaluator {
  constructor(config = {}) {
    this.engine = config.engine || new LearningEngine(config);
    this.repoRoot = config.repoRoot || process.cwd();
  }

  status() {
    return this.engine.status();
  }

  trace(context) {
    return this.engine.recordTrace(context);
  }

  outcome(outcome) {
    return this.engine.trackOutcome(outcome);
  }

  gate(checks) {
    return runEvalGate(this.repoRoot, checks);
  }
}
