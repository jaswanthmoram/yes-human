import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const homedir = os.homedir();
const pluginDestDir = path.join(homedir, '.gemini', 'config', 'plugins', 'yes-human');

// 1. Core plugin.json definition
const pluginJson = {
  "name": "yes-human",
  "version": "2.3.0",
  "description": "Portable low-token agentic control plane",
  "author": {
    "name": "moramvenkatasatyajaswanth"
  },
  "license": "MIT",
  "keywords": [
    "yes-human",
    "control-plane",
    "router",
    "agentic"
  ]
};

// 2. Skill definitions
const skills = {
  yes_human_routing: `---
name: yes-human-routing
description: "Resolve user tasks to their best agentic route (agent, workflow, budget band) using yes-human's semantic route table and routing rules."
---

# Yes-Human Semantic Routing

Use this skill to determine the best specialist agent, workflow, and budget band for a given user task using yes-human's deterministic route table.

## Commands

- **Check Route**: To check the route for a task without executing, run:
  \`\`\`bash
  node packages/yes-cli/index.js route "<task>" --dry-run
  \`\`\`
  This will print a PlanCard showing the matched route, category, agent, and target budget.

- **Run Route**: To actually run/execute a task through the resolved route:
  \`\`\`bash
  node packages/yes-cli/index.js run "<task>"
  \`\`\`

## Route Table & Registries

If you need to manually inspect the routing database:
- **Hot Route Index**: [ROUTE_TABLE.min.json](file://${repoRoot}/graph/indexes/ROUTE_TABLE.min.json) maps keywords/hashes directly to route IDs.
- **Detailed Routes Registry**: [routes.json](file://${repoRoot}/registry/routes.json) contains all route definitions, including their target agents, workflows, fallback actions, and constraints.
- **Agents Registry**: [agents.json](file://${repoRoot}/registry/agents.json) lists the 325 specialist agents across the 18 domains.
- **Workflows Registry**: [workflows.json](file://${repoRoot}/registry/workflows.json) lists the multi-stage workflows with their step checklists and gate checks.

## Guidelines

1. **Deterministic Matching**: yes-human prioritizes high-confidence keyword/intent matches from \`ROUTE_TABLE.min.json\`.
2. **Budget Bands**: Make sure you respect the budget_bias and token cost constraints defined in the route.
3. **Redaction**: Tenant-scoped traces should remain isolated and redacted according to tenant policies.
`,
  yes_human_cli: `---
name: yes-human-cli
description: "Run yes-human control plane CLI commands to check health, validate schemas, recompile registries, build host bundles, or manage memory."
---

# Yes-Human CLI & Diagnostics

Use this skill to run and manage the yes-human command line interface (CLI) for project compilation, validation, host bundle generation, and memory management.

## Core Commands

- **Environment & Health Check (Doctor)**:
  \`\`\`bash
  node packages/yes-cli/index.js doctor
  \`\`\`
  Checks Node version, Python/MarkItDown status, schema validity, routes resolution, and registry integrity.

- **Validate Schemas & Registries**:
  \`\`\`bash
  node packages/yes-cli/index.js validate
  \`\`\`
  Runs validation suite for schemas, registries, routes, hooks, rules, and policies.

- **Recompile Registries & Route Table**:
  \`\`\`bash
  node packages/yes-cli/index.js compile
  \`\`\`
  Rebuilds all index files (\`ROUTE_TABLE.min.json\`, etc.) from updated agent dossiers, skills, and workflows in \`content/\`.

- **Check Token Cost Budget**:
  \`\`\`bash
  node packages/yes-cli/index.js eval cost
  \`\`\`
  Evaluates startup token cost (ensures boot size ≤ 180 tokens).

- **Build Host Bundles**:
  \`\`\`bash
  node packages/yes-cli/index.js build <host>
  \`\`\`
  Generates host bundles (e.g., \`claude\`, \`codex\`, \`opencode\`, \`mcp\`, \`cursor\`, \`windsurf\`, \`generic\`, or \`all\`).
  Output will be saved under \`generated/<host>/\`.

- **Code Graph Build & Query**:
  \`\`\`bash
  # Build graph for current directory (runs SQLite indexer)
  node packages/yes-cli/index.js graph build .
  
  # Search symbols and files
  node packages/yes-cli/index.js graph query "search_term"
  \`\`\`

- **Memory Management**:
  \`\`\`bash
  node packages/yes-cli/index.js memory status
  \`\`\`
  Shows memory statistics.

## Guidelines

- **Always compile after edits**: After adding or modifying agent dossiers, skills, or workflows in the codebase, you MUST run \`node packages/yes-cli/index.js compile\` to update the active registries and route tables.
- **Run doctor for validation**: Use \`node packages/yes-cli/index.js doctor\` to verify setup before running tests.
`,
  yes_human_absorber: `---
name: yes-human-absorber
description: "Scan, stage, license-check, and absorb external configurations, custom rulesets, and MCP servers from the host environment into the yes-human registry."
---

# Yes-Human Absorber & Environmental Scan

Use this skill to scan the local machine, Claude Desktop, and Antigravity configs to import (absorb) custom rules (.cursorrules), MCP servers, and new plugins into yes-human.

## Core Commands

- **Scan & Discover (Dry-Run)**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb onboard --discover
  \`\`\`
  Scans the system for custom \`.cursorrules\`, Claude Desktop settings, and Antigravity MCP configs (\`mcp_config.json\`, \`settings.json\`), and outputs the discovered JSON payload.

- **Interactive Onboarding Wizard**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb onboard
  \`\`\`
  Interactively steps through discovered configurations, evaluates overlap against existing yes-human specialist agents/skills, and merges, clones, or upgrades them.

- **Stage a Specific Source (by Path or URL)**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb stage <url-or-local-path>
  \`\`\`
  Runs the incoming staging pipeline: fetches, validates license compatibility, tallies contents, checks for duplicate agents, and writes a staging manifest under \`staging/normalized/<slug>/manifest.json\`.

- **Promote Staged Source**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb apply <slug> --promote
  \`\`\`
  Promotes the staged source into active files under \`content/\` and creates a rollback log.

- **Rollback Promotion**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb rollback <change-id>
  \`\`\`
  Reverts files added or modified by a previous promotion.

- **List Absorbed Records**:
  \`\`\`bash
  node packages/yes-cli/index.js absorb list
  \`\`\`
  Lists staged, rejected, promoted, and rollback records.

## Onboarding evaluation policies (§14.4)

1. **License Gate**: Any source with a restricted or forbidden license will be blocked from absorption. Only permissive open-source licenses (MIT, Apache-2.0, BSD) are allowed.
2. **Deduplication Check**: If an MCP server or rule set overlaps significantly with existing registered skills or agents, the recommender will output \`IGNORE\` or suggest \`MERGE\` rather than \`CLONE\` to prevent registry bloat.
3. **No Direct Mutation**: Staging operations never modify the live registry or \`content/\` folder directly. Changes are only committed via \`apply\`, which writes a rollback record first to prevent data loss.
`
};

function main() {
  console.log(`Syncing yes-human plugin to Antigravity directory: ${pluginDestDir}`);

  // Create directories
  fs.mkdirSync(pluginDestDir, { recursive: true });
  fs.mkdirSync(path.join(pluginDestDir, 'skills'), { recursive: true });
  fs.mkdirSync(path.join(pluginDestDir, 'scripts'), { recursive: true });

  // Write plugin.json
  fs.writeFileSync(
    path.join(pluginDestDir, 'plugin.json'),
    JSON.stringify(pluginJson, null, 2),
    'utf8'
  );
  console.log('✓ Synchronized plugin.json');

  // Copy hooks.json from repo
  const repoHooksPath = path.join(repoRoot, 'hooks.json');
  if (fs.existsSync(repoHooksPath)) {
    fs.copyFileSync(repoHooksPath, path.join(pluginDestDir, 'hooks.json'));
    console.log('✓ Synchronized hooks.json');
  }

  // Copy antigravity-hook.mjs from repo
  const repoHookScriptPath = path.join(repoRoot, 'scripts', 'antigravity-hook.mjs');
  if (fs.existsSync(repoHookScriptPath)) {
    fs.copyFileSync(repoHookScriptPath, path.join(pluginDestDir, 'scripts', 'antigravity-hook.mjs'));
    console.log('✓ Synchronized scripts/antigravity-hook.mjs');
  }

  // Write skill files
  for (const [name, content] of Object.entries(skills)) {
    const skillDir = path.join(pluginDestDir, 'skills', name);
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), content, 'utf8');
    console.log(`✓ Synchronized skill: ${name}`);
  }

  console.log('\n✓ Sync complete! The latest yes-human plugin with hooks is active in Antigravity.');
}

main();
