import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import { ProgressiveLoader } from '../../packages/yes-runtime/progressive-loader.js';
import { loadBuildContext, repoRoot } from '../../packages/yes-adapters/index.js';

before(() => {
  const result = spawnSync('node', ['packages/yes-cli/commands/compile.js'], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr || result.stdout || 'compile failed');
});

test('canonical workflows compile into registry/workflows.json', () => {
  const workflowRoot = path.join(repoRoot, 'content', 'workflows');
  const workflowFiles = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.json')) workflowFiles.push(full);
    }
  }

  walk(workflowRoot);

  const workflowRegistry = JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'workflows.json'), 'utf8'));
  assert.equal(workflowRegistry.count, workflowFiles.length);
  assert.equal(workflowRegistry.items.length, workflowFiles.length);
});

test('progressive loader resolves workflow routes from registry/routes.json', () => {
  const loader = new ProgressiveLoader();
  const loaded = loader.loadOnMatch('route.workflow.security.repo-risk-scan');

  assert.ok(loaded, 'workflow route loaded');
  assert.equal(loaded.route.target.workflow, 'security.repo-risk-scan');
  assert.equal(loaded.workflow.id, 'security.repo-risk-scan');
  assert.equal(loaded.agent.metadata.id, 'security.security-reviewer');
  assert.deepEqual(loaded.workflow.route.agents, ['security.security-reviewer', 'security.secret-scan-agent']);
});

test('workflow routes target real workflow ids', () => {
  const routes = JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'routes.json'), 'utf8'));
  const workflowRoutes = routes.filter((route) => route.route_id.startsWith('route.workflow.'));

  assert.ok(workflowRoutes.length >= 18, `expected workflow routes, got ${workflowRoutes.length}`);
  for (const route of workflowRoutes) {
    assert.ok(route.target.workflow, `missing target.workflow for ${route.route_id}`);
    assert.ok(!route.target.workflow.startsWith('workflow.'), `unexpected legacy workflow id in ${route.route_id}`);
  }
});

test('build context exposes normalized connector registry and category packs', () => {
  const ctx = loadBuildContext();
  const financePack = ctx.categoryPacks.find((pack) => pack.id === 'finance');

  assert.ok(Array.isArray(ctx.mcps) && ctx.mcps.length >= 16, 'normalized MCP registry loaded');
  assert.ok(ctx.mcps.every((mcp) => mcp.id && mcp.provider && Array.isArray(mcp.allowed_workflows)));
  assert.ok(Array.isArray(ctx.categoryPacks) && ctx.categoryPacks.length >= 19, 'category packs loaded');
  assert.ok(financePack, 'finance pack present');
  assert.ok(financePack.workflows.includes('finance.monthly-forecast'));
  assert.ok(financePack.connectors.includes('accounting.erpnext'));
});
