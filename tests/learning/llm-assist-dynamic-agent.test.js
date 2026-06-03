import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../../packages/yes-runtime/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

test('pre-route LLM routing assist hook', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-llm-assist-'));
  const prev = process.cwd();
  try {
    fs.mkdirSync(path.join(dir, 'graph/indexes'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'registry'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'hooks'), { recursive: true });

    // Copy hook registry and hook files into tmp dir
    fs.writeFileSync(
      path.join(dir, 'hooks/hook-registry.json'),
      JSON.stringify({
        version: '1.0.0',
        hooks: [
          {
            id: 'hook.pre-route.llm-assist',
            event: 'pre-route',
            runtime: 'node',
            entry: 'hooks/pre-route-llm-assist.js',
            inputs: ["task", "routerConfidence"],
            outputs: ["routing_hint"],
            policy_dependencies: [],
            host_support: { cli: 'native' }
          }
        ]
      })
    );

    // Copy pre-route-llm-assist hook implementation
    const hookSource = fs.readFileSync(path.join(repoRoot, 'hooks/pre-route-llm-assist.js'), 'utf8');
    fs.writeFileSync(path.join(dir, 'hooks/pre-route-llm-assist.js'), hookSource);

    // Copy packages/yes-runtime/lib/llm-client.js into tmp dir to satisfy relative import
    fs.mkdirSync(path.join(dir, 'packages/yes-runtime/lib'), { recursive: true });
    const llmClientSource = fs.readFileSync(path.join(repoRoot, 'packages/yes-runtime/lib/llm-client.js'), 'utf8');
    fs.writeFileSync(path.join(dir, 'packages/yes-runtime/lib/llm-client.js'), llmClientSource);

    // Setup dummy route tables
    fs.writeFileSync(
      path.join(dir, 'graph/indexes/ROUTE_TABLE.min.json'),
      JSON.stringify({
        version: '1',
        fallback: 'route.meta-system.supreme-router',
        routes: {}
      })
    );
    fs.writeFileSync(path.join(dir, 'graph/indexes/ALIAS_TABLE.min.json'), JSON.stringify({ aliases: {} }));

    fs.writeFileSync(
      path.join(dir, 'registry/routes.json'),
      JSON.stringify([
        { route_id: 'route.data-ai.ai-ethics-specialist', target: { agent: 'data-ai.ai-ethics-specialist' }, match: { negative_keywords: [] } },
        { route_id: 'route.meta-system.supreme-router', target: { agent: 'meta-system.supreme-router' }, match: { negative_keywords: [] } }
      ])
    );

    process.chdir(dir);

    // Test offline mock mode
    process.env.YES_MOCK_LLM = 'true';
    
    // Resolve route: this should trigger LLM pre-route hook because local confidence is 0
    const route = await resolveRoute('run the ethical guidelines bias audit');
    assert.equal(route.route_id, 'route.data-ai.ai-ethics-specialist');
    assert.equal(route._match.stage, 'hint');
    assert.match(route._match.reason, /signal-word hint/);

  } finally {
    process.chdir(prev);
    fs.rmSync(dir, { recursive: true, force: true });
    delete process.env.YES_MOCK_LLM;
  }
});

test('yes agent create command and compile', async () => {
  const agentFile = path.join(repoRoot, 'content/agents/data-ai/test-generated-agent.md');
  try {
    if (fs.existsSync(agentFile)) {
      fs.unlinkSync(agentFile);
    }

    const cliPath = path.join(repoRoot, 'packages/yes-cli/index.js');
    const { spawnSync } = await import('child_process');
    const result = spawnSync('node', [
      cliPath,
      'agent',
      'create',
      'data-ai.test-generated-agent',
      '--triggers',
      'test generated trigger',
      '--aliases',
      'test-gen-alias',
      '--summary',
      'Test Agent'
    ], { cwd: repoRoot, encoding: 'utf8' });

    assert.equal(result.status, 0);
    assert.ok(fs.existsSync(agentFile), 'Agent markdown file should be created');

    const fileContent = fs.readFileSync(agentFile, 'utf8');
    assert.ok(fileContent.includes('id: data-ai.test-generated-agent'));
    assert.ok(fileContent.includes('- test generated trigger'));
    assert.ok(fileContent.includes('- test-gen-alias'));

    // Re-resolve route to verify the new route works end-to-end!
    const route = await resolveRoute('test-gen-alias');
    assert.equal(route.route_id, 'route.data-ai.test-generated-agent');

  } finally {
    // Clean up created file
    if (fs.existsSync(agentFile)) {
      fs.unlinkSync(agentFile);
    }
    // Re-run compilation to restore index state
    const compilePath = path.join(repoRoot, 'packages/yes-cli/commands/compile.js');
    const buildPath = path.join(repoRoot, 'packages/yes-cli/index.js');
    const { spawnSync } = await import('child_process');
    spawnSync('node', [compilePath], { cwd: repoRoot });
    spawnSync('node', [buildPath, 'build', 'all'], { cwd: repoRoot });
  }
});
