import fs from 'fs';
import path from 'path';
import { LearningEngine } from './learning-engine.js';
import { WorkflowMiner } from './workflow-miner.js';

function readJsonIfExists(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

export class YesTrainer {
  constructor(config = {}) {
    this.repoRoot = config.repoRoot || process.cwd();
    this.engine = config.engine || new LearningEngine(config);
    this.workflowMiner = config.workflowMiner || new WorkflowMiner(config);
  }

  suggestWorkflows() {
    return this.workflowMiner.suggest();
  }

  report() {
    const status = this.engine.status();
    const routeOutcomes = readJsonIfExists(path.join(this.repoRoot, 'graph/memory/learning/route-outcomes.json'), { routes: {} });
    const weakRoutes = Object.values(routeOutcomes.routes || {})
      .filter((route) => route.signal_ready && route.success_rate !== null && route.success_rate < 0.65)
      .sort((a, b) => a.success_rate - b.success_rate)
      .slice(0, 20);

    const report = {
      generated_at: new Date().toISOString(),
      status,
      weak_routes: weakRoutes,
      production_mutation: false,
      next_action: 'Review staged feedback/workflow suggestions, then run yes evaluator gate before any registry promotion.'
    };

    const reportPath = path.join(this.repoRoot, 'reports/phase9-trainer-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    return { report, path: reportPath };
  }
}
