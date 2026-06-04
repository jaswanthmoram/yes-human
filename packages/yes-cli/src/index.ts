#!/usr/bin/env node

import { cmdRoute } from "./commands/route.js";
import { cmdRun } from "./commands/run.js";
import { cmdPack } from "./commands/pack.js";
import { cmdExport } from "./commands/export.js";
import { cmdBench } from "./commands/bench.js";

function help(): void {
  console.log(`yes — Yes-human Command Line Interface SDK

Usage:
  yes route "<task>" [--trace]    Route prompt to matching workflow
  yes run <workflow-id> [input]   Execute workflow and trace steps
  yes pack list                   List available packs
  yes pack inspect <pack-name>    Inspect detailed workflow/skills in a pack
  yes export <codex|antigravity>  Export active workflows to tool config files
  yes bench                       Run route resolution performance benchmarks
  yes help                        Show this help text
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  const commandArgs = args.slice(1);

  let exitCode = 0;

  switch (command) {
    case "route":
      exitCode = await cmdRoute(commandArgs);
      break;
    case "run":
      exitCode = await cmdRun(commandArgs);
      break;
    case "pack":
      exitCode = await cmdPack(commandArgs);
      break;
    case "export":
      exitCode = await cmdExport(commandArgs);
      break;
    case "bench":
      exitCode = await cmdBench();
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      help();
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      help();
      exitCode = 1;
      break;
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error("Fatal CLI error:", err);
  process.exit(1);
});
