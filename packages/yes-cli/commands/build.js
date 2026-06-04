import path from 'path';
import { loadBuildContext, buildHost, buildAll } from '../../yes-adapters/index.js';
import { validateHostBundle } from '../../../validators/host-bundle.validator.js';
import { repoRoot } from './helpers.js';

export async function cmdBuild(args) {
  const HOSTS = ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'vscode', 'sourcegraph', 'generic', 'all'];
  const host = args[0];
  if (!host || !HOSTS.includes(host)) {
    console.error(`Usage: yes build <host>  (hosts: ${HOSTS.join(', ')})`);
    return 1;
  }
  console.log(`Building yes-human bundle: ${host}\n`);
  let ctx;
  try {
    ctx = loadBuildContext();
  } catch (e) {
    console.error(`✗ Failed to load build context: ${e.message}`);
    return 1;
  }

  try {
    if (host === 'all') {
      await buildAll(ctx);
    } else {
      await buildHost(host, ctx);
    }
  } catch (e) {
    console.error(`✗ Build failed: ${e.message}`);
    return 1;
  }

  let allOk = true;
  try {
    const hostsBuilt =
      host === 'all'
        ? ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'vscode', 'sourcegraph', 'generic']
        : [host];
    for (const h of hostsBuilt) {
      const dir = path.join(repoRoot, 'generated', h);
      const { ok, checks } = validateHostBundle(h, dir);
      const icon = ok ? '✓' : '✗';
      console.log(`\n${icon} ${h} bundle validation:`);
      for (const c of checks) {
        console.log(`  ${c.passed ? '✓' : '✗'} ${c.label}${c.detail ? ' — ' + c.detail : ''}`);
      }
      if (!ok) allOk = false;
    }
  } catch (err) {
    console.error(`✗ Bundle validation failed: ${err.message}`);
    return 1;
  }

  console.log(allOk ? '\n✓ All bundles valid.' : '\n✗ Some bundles failed validation.');
  return allOk ? 0 : 1;
}
