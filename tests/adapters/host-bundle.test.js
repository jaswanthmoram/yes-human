import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

import { loadBuildContext, buildHost, buildAll, repoRoot } from '../../packages/yes-adapters/index.js';
import { validateHostBundle } from '../../validators/host-bundle.validator.js';

const generatedRoot = path.join(repoRoot, 'generated');

// Build all bundles once before tests run
before(async () => {
  const ctx = loadBuildContext();
  await buildAll(ctx);
});

test('loadBuildContext loads all required fields', () => {
  const ctx = loadBuildContext();
  assert.ok(ctx.bootText.length > 0, 'bootText non-empty');
  assert.ok(Array.isArray(ctx.agents) && ctx.agents.length > 0, 'agents loaded');
  assert.ok(Array.isArray(ctx.workflows) && ctx.workflows.length > 0, 'workflows loaded');
  assert.ok(Array.isArray(ctx.mcps) && ctx.mcps.length > 0, 'mcps loaded');
  assert.ok(ctx.routeTable?.routes, 'routeTable loaded');
});

for (const host of ['claude', 'codex', 'opencode', 'mcp']) {
  test(`${host} bundle passes validation`, () => {
    const dir = path.join(generatedRoot, host);
    const { ok, checks } = validateHostBundle(host, dir);
    const failures = checks.filter(c => !c.passed).map(c => `${c.label}: ${c.detail}`);
    assert.ok(ok, `${host} bundle failed: ${failures.join('; ')}`);
  });

  test(`${host} boot file is under 300 token cap`, () => {
    const bootFiles = { claude: 'CLAUDE.md', codex: 'AGENTS.md', opencode: 'AGENTS.md', mcp: null };
    const bootFile = bootFiles[host];
    if (!bootFile) return; // MCP skips prose token check
    const p = path.join(generatedRoot, host, bootFile);
    const tokens = Math.ceil(fs.readFileSync(p, 'utf8').length / 4);
    assert.ok(tokens <= 300, `${host} boot is ${tokens} tokens (cap 300)`);
  });
}

test('claude bundle has settings.json with hook config', () => {
  const p = path.join(generatedRoot, 'claude', 'settings.json');
  const s = JSON.parse(fs.readFileSync(p, 'utf8'));
  assert.ok(s.hooks?.PreToolUse?.length > 0, 'PreToolUse hooks present');
  assert.ok(s.hooks?.PostToolUse?.length > 0, 'PostToolUse hooks present');
});

test('claude bundle has at least one agent file', () => {
  const dir = path.join(generatedRoot, 'claude', 'agents');
  const files = [];
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(d, e.name));
      else if (e.name.endsWith('.md')) files.push(e.name);
    }
  }
  walk(dir);
  assert.ok(files.length >= 5, `expected ≥5 agents, got ${files.length}`);
});

test('codex config.toml contains mcp_servers entries', () => {
  const toml = fs.readFileSync(path.join(generatedRoot, 'codex', 'config.toml'), 'utf8');
  assert.match(toml, /\[mcp_servers\./);
});

test('opencode opencode.json references YES_BOOT.md', () => {
  const oc = JSON.parse(fs.readFileSync(path.join(generatedRoot, 'opencode', 'opencode.json'), 'utf8'));
  assert.ok(oc.instructions?.includes('YES_BOOT.md'), 'YES_BOOT.md in instructions');
});

test('mcp manifest has yes_route tool', () => {
  const mf = JSON.parse(fs.readFileSync(path.join(generatedRoot, 'mcp', 'mcp-manifest.json'), 'utf8'));
  assert.ok(mf.tools?.some(t => t.name === 'yes_route'), 'yes_route tool present');
});

test('no bundle contains a literal API key', () => {
  const keyPatterns = [/fc-[a-zA-Z0-9]{20,}/, /f922[a-zA-Z0-9-]{20,}/];
  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(full);
      else {
        const content = fs.readFileSync(full, 'utf8');
        for (const p of keyPatterns) assert.ok(!p.test(content), `literal key found in ${full}`);
      }
    }
  }
  scanDir(generatedRoot);
});
