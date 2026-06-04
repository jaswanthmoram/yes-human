#!/usr/bin/env node
process.on('unhandledRejection', (reason) => {
  console.error(`[yes-human] Unhandled rejection: ${reason?.message || reason}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(`[yes-human] Uncaught exception: ${err.message}`);
  process.exit(1);
});

import { runScript, repoRoot } from './commands/helpers.js';


function help() {
  console.log(`yes — Yes-human control plane CLI

Usage:
  yes route <task> [--dry-run]   Resolve a task to a route (--dry-run prints a PlanCard)
  yes eval cost                  Check startup token budget
  yes eval route                 Score routing fixtures against eval thresholds
  yes eval workflow              Score workflow fixtures against eval thresholds
  yes eval skill                 Score skill fixtures against eval thresholds
  yes evaluator status           Show Phase 9 learning/outcome status
  yes evaluator trace            Record a redacted tenant-scoped trace
  yes evaluator outcome          Record a lightweight route outcome
  yes evaluator gate             Run eval-gated feedback checks
  yes trainer report             Summarize learning signals without mutating prod
  yes trainer suggest            Stage workflow suggestions from repeated traces
  yes feedback <type>            Stage feedback; never mutates production routing
  yes workflow suggest           Stage workflow-miner suggestions
  yes team status                Show tenant isolation/redaction status
  yes offline status             Show offline/crash-recovery state
  yes recover <status|resume>    Alias for offline recovery
  yes validate                   Validate schemas, registries, routes, hooks, rules, policies
  yes compile                    Recompile registries and route table from content
  yes promote --check <agent>    Check if an agent's dossier qualifies for promotion
  yes dossier validate <agent>   Validate an agent's source dossier and score
  yes build <host|all>           Generate host bundle (claude|codex|opencode|mcp|all)
  yes graph build [<path>]       Build local code graph (SQLite); --yes for large repos
  yes graph stats                Show indexed graph statistics
  yes graph query "<term>"       Search symbols and file paths
  yes absorb stage <url|path>    Stage external source through license + dedupe gates
  yes absorb apply <slug>        Promote staged source (writes rollback record)
  yes absorb list                Show staged / promoted / rejected / rollback records
  yes absorb rollback <id>       Revert a promotion
  yes absorb onboard             Scan environment and onboard rules and custom tools
  yes doctor                     Environment + project health check
  yes dream                      Run nightly dream cycle (pattern extraction)
  yes memory <status|clear|archive>  Memory management
  yes help                       Show this help

Phase 3 Commands:
  yes dream                      Extract patterns from episodic memory, stage candidates
  yes memory status              Show memory statistics (working/episodic/semantic/personal)
  yes memory clear --confirm     Clear all memory (requires confirmation)
  yes memory archive             Archive expired working memory to episodic
`);
}

const [, , command, ...rest] = process.argv;

async function main() {
  switch (command) {
    case 'route': {
      const { cmdRoute } = await import('./commands/route.js');
      return await cmdRoute(rest);
    }
    case 'run': {
      const { cmdRun } = await import('./commands/route.js');
      return await cmdRun(rest);
    }
    case 'eval':
      if (rest[0] === 'cost') return runScript('packages/yes-schema/eval-cost.js');
      if (rest[0] === 'route') return runScript('packages/yes-schema/eval-route.js');
      if (rest[0] === 'workflow') return runScript('packages/yes-schema/eval-workflow.js');
      if (rest[0] === 'skill') return runScript('packages/yes-schema/eval-skill.js');
      console.error(
        `Unknown eval subcommand: ${rest[0] ?? ''}. Try: yes eval cost | yes eval route | yes eval workflow | yes eval skill`
      );
      return 1;
    case 'evaluator': {
      const { cmdEvaluator } = await import('./commands/evaluator.js');
      return cmdEvaluator(rest);
    }
    case 'trainer': {
      const { cmdTrainer } = await import('./commands/trainer.js');
      return cmdTrainer(rest);
    }
    case 'feedback': {
      const { cmdFeedback } = await import('./commands/feedback.js');
      return cmdFeedback(rest);
    }
    case 'workflow': {
      const { cmdWorkflow } = await import('./commands/workflow.js');
      return await cmdWorkflow(rest);
    }
    case 'team': {
      const { cmdTeam } = await import('./commands/team.js');
      return cmdTeam(rest);
    }
    case 'offline': {
      const { cmdOffline } = await import('./commands/offline.js');
      return cmdOffline(rest);
    }
    case 'recover': {
      const { cmdOffline } = await import('./commands/offline.js');
      return cmdOffline(rest.length ? rest : ['status']);
    }
    case 'validate':
      return runScript('packages/yes-schema/validate.js', rest);
    case 'compile':
      return runScript('packages/yes-cli/commands/compile.js');
    case 'promote': {
      const { cmdPromote } = await import('./commands/promote.js');
      return cmdPromote(rest);
    }
    case 'dossier': {
      const { cmdDossier } = await import('./commands/misc.js');
      return cmdDossier(rest);
    }
    case 'build': {
      const { cmdBuild } = await import('./commands/build.js');
      return await cmdBuild(rest);
    }
    case 'graph': {
      const { cmdGraph } = await import('./commands/misc.js');
      return await cmdGraph(rest);
    }
    case 'absorb': {
      const { cmdAbsorb } = await import('./commands/absorb.js');
      return await cmdAbsorb(rest);
    }
    case 'status': {
      const { cmdStatus } = await import('./commands/misc.js');
      return cmdStatus();
    }
    case 'agent': {
      const { cmdAgent } = await import('./commands/agent.js');
      return await cmdAgent(rest, repoRoot); // fallback parameter handling
    }
    case 'persona': {
      const { cmdPersona } = await import('./commands/misc.js');
      return cmdPersona(rest);
    }
    case 'version': {
      const { cmdVersion } = await import('./commands/misc.js');
      return cmdVersion(rest);
    }
    case 'learning': {
      const { cmdLearning } = await import('./commands/misc.js');
      return cmdLearning(rest);
    }
    case 'contribute': {
      const { cmdContribute } = await import('./commands/misc.js');
      return cmdContribute(rest);
    }
    case 'export': {
      const { cmdBuild } = await import('./commands/build.js');
      return await cmdBuild(rest);
    }
    case 'doctor': {
      const { cmdDoctor } = await import('./commands/doctor.js');
      return cmdDoctor();
    }
    case 'dream': {
      const { cmdDream } = await import('./commands/dream.js');
      return await cmdDream(rest);
    }
    case 'memory': {
      const { cmdMemory } = await import('./commands/memory.js');
      return cmdMemory(rest);
    }
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      help();
      return 0;
    default:
      console.error(`Unknown command: ${command}\n`);
      help();
      return 1;
  }
}

main()
  .then((code) => process.exit(code ?? 0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
