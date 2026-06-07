import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PolicyEvaluator } from '../packages/yes-policy/dist/policy-evaluator.js';

// Read stdin fully
async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
    // Set a timeout of 1.5s in case stdin is not closed
    setTimeout(() => resolve(data), 1500);
  });
}

async function main() {
  try {
    const rawInput = await readStdin();
    if (!rawInput.trim()) {
      console.log(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const payload = JSON.parse(rawInput);
    const toolCall = payload.toolCall || {};
    const toolName = toolCall.name || '';
    const args = toolCall.args || {};

    let action = 'tool.use';
    let context = {
      action,
      tool: toolName,
      args
    };

    if (toolName === 'run_command') {
      context.action = 'tool.execute';
      context.tool = 'bash';
      context.args = { command: args.CommandLine || '' };
    } else if (toolName === 'write_to_file') {
      context.action = 'file.write';
      context.filePath = args.TargetFile || '';
      context.content = args.CodeContent || '';
    } else if (toolName === 'replace_file_content') {
      context.action = 'file.write';
      context.filePath = args.TargetFile || '';
      context.content = args.ReplacementContent || '';
    } else if (toolName === 'multi_replace_file_content') {
      context.action = 'file.write';
      context.filePath = args.TargetFile || '';
      context.content = (args.ReplacementChunks || [])
        .map(chunk => chunk.ReplacementContent)
        .join('\n');
    }

    // Change working directory to repo root so relative paths in PolicyEvaluator resolve correctly
    const repoRoot = '/Users/moramvenkatasatyajaswanth/yes-human';
    process.chdir(repoRoot);

    const evaluator = new PolicyEvaluator({
      rulesDir: 'rules',
      policiesDir: 'policies',
      contractsDir: 'contracts',
      costPolicyPath: 'registry/cost-policy.json'
    });

    const result = evaluator.evaluate(context);

    if (result.allowed) {
      console.log(JSON.stringify({ decision: 'allow' }));
    } else {
      console.log(JSON.stringify({
        decision: 'deny',
        message: result.reason || 'Operation blocked by yes-human policy.'
      }));
    }
  } catch (err) {
    // Fail-safe to allow so we do not block IDE in case of code error
    console.error('[yes-human-hook] Error in policy hook:', err);
    console.log(JSON.stringify({ decision: 'allow' }));
  }
}

main();
