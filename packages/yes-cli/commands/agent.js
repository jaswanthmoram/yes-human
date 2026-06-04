import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

function flagValue(args, flag, defaultValue = '') {
  const idx = args.indexOf(flag);
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) {
    return args[idx + 1];
  }
  return defaultValue;
}

export async function cmdAgent(args, repoRoot) {
  const sub = args[0];
  if (sub !== 'create') {
    console.error('Usage:');
    console.error(
      '  yes agent create <category>.<agent-name> --triggers "<t1>,<t2>" --aliases "<a1>" --summary "<summary>"'
    );
    console.error('  yes agent create --suggest "<task-description>"');
    return 1;
  }

  // Handle suggest subcommand
  if (args.includes('--suggest')) {
    const taskIdx = args.indexOf('--suggest');
    const task = args[taskIdx + 1];
    if (!task) {
      console.error('Error: --suggest requires a task description.');
      return 1;
    }

    console.log(`Analyzing task to suggest agent configuration: "${task}"`);
    const cleanTask = task
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
    const words = cleanTask.split(/\s+/).filter((w) => w.length > 3);

    let category = 'startup-ops'; // fallback category
    try {
      const categoriesPath = path.join(repoRoot, 'registry/categories.json');
      if (fs.existsSync(categoriesPath)) {
        const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
        let bestCategory = null;
        let bestScore = 0;

        for (const item of categoriesData.items || []) {
          let score = 0;
          const searchArea = [item.id, item.name, ...(item.keywords || [])].join(' ').toLowerCase();

          for (const word of words) {
            if (searchArea.includes(word)) {
              score += 1;
            }
          }
          if (score > bestScore) {
            bestScore = score;
            bestCategory = item.id;
          }
        }
        if (bestCategory) {
          category = bestCategory;
        }
      }
    } catch (err) {
      // ignore, use fallback
    }

    const agentName = words.slice(0, 3).join('-');
    const triggers = [words.slice(0, 4).join(' ')];
    const aliases = [words.slice(0, 2).join('-')];
    const summary = `Handles ${triggers[0]} tasks.`;

    console.log('\nSuggested agent structure:');
    console.log(`  ID       : ${category}.${agentName}`);
    console.log(`  Triggers : ${triggers.join(', ')}`);
    console.log(`  Aliases  : ${aliases.join(', ')}`);
    console.log(`  Summary  : ${summary}`);
    console.log('\nCreating agent...');

    return await createAgentFile(category, agentName, triggers, aliases, summary, repoRoot);
  }

  // Handle manual category.agent-name
  const agentId = args[1];
  if (!agentId || agentId.startsWith('--')) {
    console.error(
      'Usage: yes agent create <category>.<agent-name> --triggers "<t1>,<t2>" --aliases "<a1>" --summary "<summary>"'
    );
    return 1;
  }

  const parts = agentId.split('.');
  if (parts.length !== 2) {
    console.error('Error: Agent ID must be in format <category>.<agent-name> (e.g. data-ai.ethics-specialist)');
    return 1;
  }

  const [category, agentName] = parts;
  const triggersVal = flagValue(args, '--triggers', '');
  const aliasesVal = flagValue(args, '--aliases', '');
  const summaryVal = flagValue(args, '--summary', 'Self-generated specialist agent.');

  const triggers = triggersVal
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const aliases = aliasesVal
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);

  return await createAgentFile(category, agentName, triggers, aliases, summaryVal, repoRoot);
}

async function createAgentFile(category, agentName, triggers, aliases, summary, repoRoot) {
  const categoriesPath = path.join(repoRoot, 'registry/categories.json');
  let categories = { items: [] };
  if (fs.existsSync(categoriesPath)) {
    categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  }
  const validCategory = categories.items.some((c) => c.id === category || c.id.startsWith(category));
  if (!validCategory) {
    console.warn(`⚠ Warning: Category "${category}" is not in registry/categories.json.`);
  }

  const agentDir = path.join(repoRoot, 'content/agents', category);
  fs.mkdirSync(agentDir, { recursive: true });

  const agentFilePath = path.join(agentDir, `${agentName}.md`);
  if (fs.existsSync(agentFilePath)) {
    console.error(`Error: Agent already exists at ${agentFilePath}`);
    return 1;
  }

  const frontmatter = `---
id: ${category}.${agentName}
name: ${agentName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')}
version: 1.0.0
status: active
category: ${category}
kind: specialist
summary: ${summary}
triggers:
${triggers.map((t) => `  - ${t}`).join('\n')}
aliases:
${aliases.map((a) => `  - ${a}`).join('\n')}
quality_gate: production
---
## Mission
${summary}

## Scope
- In scope: tasks matching triggers and domain expectations for \`${category}.${agentName}\`.
- Out of scope: unrelated domains.
`;

  fs.writeFileSync(agentFilePath, frontmatter, 'utf8');
  console.log(`✓ Created agent file at content/agents/${category}/${agentName}.md`);

  // Compilation + 9-host bundle rebuild is expensive (multi-second) and rarely
  // wanted for a single agent edit. Default to print-only next-steps; require
  // an explicit --rebuild (or legacy --build) flag to opt in. --skip-build is
  // kept as a no-op alias so any existing scripts don't break.
  const rebuild = process.argv.includes('--rebuild') || process.argv.includes('--build');
  if (rebuild) {
    console.log('Running compilation and index rebuild...');
    const compileResult = spawnSync('node', [path.join(repoRoot, 'packages/yes-cli/commands/compile.js')], {
      cwd: repoRoot,
      stdio: 'inherit'
    });
    if (compileResult.status !== 0) {
      console.error('✗ Registry compilation failed.');
      return 1;
    }

    const buildResult = spawnSync('node', [path.join(repoRoot, 'packages/yes-cli/index.js'), 'build', 'all'], {
      cwd: repoRoot,
      stdio: 'inherit'
    });
    if (buildResult.status !== 0) {
      console.error('✗ Rebuilding host bundles failed.');
      return 1;
    }
    console.log('✓ Agent registered, indexed, and host bundles updated.');
  } else {
    console.log('✓ Agent file created. Next steps:');
    console.log('    yes compile        # rebuild registries + route table');
    console.log('    yes build all      # regenerate host bundles');
    console.log('  (or pass --rebuild to this command to run both automatically)');
  }
  return 0;
}
