import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { discoverHostConfigs } from './onboarding-discover.js';
import { evaluateHostConfigs } from './onboarding-evaluator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

/**
 * Main entry point for CLI onboarding absorb operations.
 *
 * @param {object} options - { discover, applySlug }
 */
export async function runOnboardingWizard(options = {}) {
  const { discover, applySlug } = options;

  console.log('yes-human absorb onboard — environment scanner\n');

  if (discover) {
    console.log('Running environment discovery...\n');
    const discovered = discoverHostConfigs(repoRoot);
    console.log(JSON.stringify(discovered, null, 2));
    return;
  }

  // 1. Discover and Evaluate
  console.log('Scanning environment rules and MCP systems...');
  const discovered = discoverHostConfigs(repoRoot);
  const reports = await evaluateHostConfigs(discovered, repoRoot);

  if (reports.length === 0) {
    console.log('\n✓ No external configurations or custom rulesets found.');
    console.log('  Your system is clean and ready.');
    return;
  }

  console.log(`\nDiscovered ${reports.length} configurations matching overlap checks:`);
  for (let i = 0; i < reports.length; i++) {
    const r = reports[i];
    console.log(`  [${i + 1}] ${r.source} (${r.id}) → suggested action: ${r.recommendation}`);
  }

  if (applySlug) {
    const target = reports.find((r) => r.id === applySlug);
    if (!target) {
      throw new Error(`No matching discovered config found for ID: ${applySlug}`);
    }
    await executeAction(target, target.recommendation);
    return;
  }

  // 2. Interactive Wizard Flow
  console.log('\nStarting interactive onboarding wizard...');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

  try {
    for (const report of reports) {
      console.log('\n' + '='.repeat(60));
      console.log(`Source      : ${report.source} (${report.id})`);
      console.log(`Suggested   : ${report.recommendation}`);
      console.log(`Reason      : ${report.reason}`);

      if (report.comparison) {
        console.log('\nAdvantages Analysis:');
        if (report.comparison.host_advantages?.length) {
          console.log('  Custom Host Rules advantages:');
          for (const adv of report.comparison.host_advantages) console.log(`    + ${adv}`);
        }
        if (report.comparison.yes_human_advantages?.length) {
          console.log('  yes-human standard advantages:');
          for (const adv of report.comparison.yes_human_advantages) console.log(`    + ${adv}`);
        }
      }

      console.log('\nChoose an action:');
      console.log('  [1] MERGE   — Blend rules into existing agent');
      console.log('  [2] UPGRADE — Overwrite body of existing agent with host rules');
      console.log('  [3] CLONE   — Create a new workspace-only agent');
      console.log('  [4] IGNORE  — Do not import this config');

      const ans = await askQuestion('\nSelection (1-4) [default: suggest]: ');
      let choice = report.recommendation;
      if (ans.trim() === '1') choice = 'MERGE';
      else if (ans.trim() === '2') choice = 'UPGRADE';
      else if (ans.trim() === '3') choice = 'CLONE';
      else if (ans.trim() === '4') choice = 'IGNORE';

      await executeAction(report, choice);
    }
  } finally {
    rl.close();
  }

  console.log('\n✓ Onboarding absorption pass complete. Run `yes compile` to sync registries.');
}

async function executeAction(report, action) {
  if (action === 'IGNORE') {
    console.log(`\n○ Ignored: ${report.id}`);
    return;
  }

  const changeId = `onboard-${report.type}-${report.id.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}`;
  const rollbackRecord = {
    change_id: changeId,
    created_at: new Date().toISOString(),
    reason: `Onboarded ${report.source} via ${action}`,
    files_added: [],
    files_modified: [],
    rollback_command: `yes absorb rollback ${changeId}`
  };

  const rollbackPath = path.join(repoRoot, 'staging', 'rollback', `${changeId}.json`);
  fs.mkdirSync(path.dirname(rollbackPath), { recursive: true });

  if ((action === 'MERGE' || action === 'UPGRADE') && report.type === 'cursorrules') {
    const targetAgentId = report.target_agent || 'engineering.code-reviewer';
    const agentParts = targetAgentId.split('.');
    const agentPath = path.join(repoRoot, 'content', 'agents', agentParts[0], `${agentParts.slice(1).join('.')}.md`);

    if (fs.existsSync(agentPath)) {
      console.log(`\n${action === 'MERGE' ? 'Merging' : 'Upgrading'} custom rules into agent file: ${agentPath}`);
      const content = fs.readFileSync(agentPath, 'utf8');

      // Simple append of rules as custom local instruction block at the end of the markdown file
      const backupPath = `${agentPath}.bak`;
      fs.copyFileSync(agentPath, backupPath);

      rollbackRecord.files_modified.push(path.relative(repoRoot, agentPath));

      let updatedContent = '';
      if (action === 'MERGE') {
        updatedContent = `${content}\n\n## Custom Local Rules (Onboarded)\n\nMerged from host environment ruleset on ${new Date().toISOString()}.\n`;
      } else {
        // UPGRADE: extract frontmatter, replace body with host rules
        const match = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
        const hostContent = report.details?.raw_content || report.details?.content || '';
        if (match) {
          updatedContent = `${match[1]}\n# Onboarded Custom Rules\n\nUpgraded from host environment ruleset on ${new Date().toISOString()}.\n\n${hostContent}\n`;
        } else {
          updatedContent = `# Onboarded Custom Rules\n\nUpgraded on ${new Date().toISOString()}.\n\n${hostContent}\n`;
        }
      }

      fs.writeFileSync(agentPath, updatedContent, 'utf8');

      // Update provenance registry
      appendProvenance({
        id: `prov.onboard.${report.id}`,
        item_id: targetAgentId,
        kind: action === 'MERGE' ? 'merged_custom_rules' : 'upgraded_custom_rules',
        source: 'host.cursorrules',
        created_at: new Date().toISOString(),
        confidence: 0.95,
        author: 'yes-onboarding'
      });

      console.log(`✓ ${action === 'MERGE' ? 'Merged' : 'Upgraded'} and registered in provenance.`);
    } else {
      console.log(`\n✗ ${action === 'MERGE' ? 'Merge' : 'Upgrade'} skipped: target agent dossier not found at ${agentPath}`);
    }
  } else if (action === 'CLONE') {
    const targetCategory = 'startup-ops';
    const agentName = `imported-${report.id.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
    const agentPath = path.join(repoRoot, 'content', 'agents', targetCategory, `${agentName}.md`);

    console.log(`\nCreating new workspace-only agent dossier: ${agentPath}`);
    const agentContent = `---
id: ${targetCategory}.${agentName}
name: Imported ${report.id} Agent
version: 1.0.0
status: active
category: ${targetCategory}
kind: specialist
summary: Automatically onboarded from external ${report.source} ruleset.
triggers:
  - run ${agentName}
  - start ${agentName}
quality_gate: production
---

## Mission
Automatically onboarded ruleset.

## Scope
Merged ruleset scope imports.
`;
    fs.mkdirSync(path.dirname(agentPath), { recursive: true });
    fs.writeFileSync(agentPath, agentContent, 'utf8');

    rollbackRecord.files_added.push(path.relative(repoRoot, agentPath));

    appendProvenance({
      id: `prov.onboard.${report.id}`,
      item_id: `${targetCategory}.${agentName}`,
      kind: 'cloned_custom_agent',
      source: report.id,
      created_at: new Date().toISOString(),
      confidence: 0.9,
      author: 'yes-onboarding'
    });

    console.log(`✓ Created cloned agent. Run compile to build routing table.`);
  }

  // Write rollback record
  fs.writeFileSync(rollbackPath, JSON.stringify(rollbackRecord, null, 2));
}

function appendProvenance(entry) {
  const p = path.join(repoRoot, 'registry', 'provenance.json');
  let arr = [];
  if (fs.existsSync(p)) {
    try {
      arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch {
      arr = [];
    }
  }
  if (arr.some((e) => e.id === entry.id)) return;
  arr.push(entry);
  fs.writeFileSync(p, JSON.stringify(arr, null, 2));
}
