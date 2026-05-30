/**
 * Codex (OpenAI Codex CLI) adapter
 *
 * Outputs:
 *   generated/codex/
 *     AGENTS.md          — dispatch instructions + lazy agent surface
 *     config.toml        — Codex MCP server config in TOML format
 *     agents/            — agent instruction files (codex skill format)
 */

import fs from 'fs';
import path from 'path';
import { repoRoot, writeGenerated } from '../index.js';

// ── AGENTS.md ─────────────────────────────────────────────────────────────────

function buildAgentsMd(ctx) {
  // AGENTS.md must stay under the 300-token startup hard cap.
  // It is a boot pointer only — agent details are lazy-loaded after routing.
  return `# AGENTS.md — Yes-human v${ctx.version} for Codex

${ctx.bootText.trim()}

Route table: \`graph/indexes/ROUTE_TABLE.min.json\`
Agent registry: \`registry/agents.json\` (lazy-loaded after route match)
Run \`yes route "<task>" --dry-run\` to inspect routing.

_Generated ${ctx.generatedAt}_
`;
}

// ── config.toml — Codex MCP servers ──────────────────────────────────────────

function buildConfigToml(ctx) {
  const lines = ['# Yes-human Codex MCP configuration', '# Generated — do not hand-edit; run: yes build codex', ''];

  for (const mcp of ctx.mcps) {
    if (!mcp.name) continue;
    lines.push(`[mcp_servers.${mcp.name}]`);
    lines.push(`command = "npx"`);
    const pkg = mcp.package || mcp.name;
    lines.push(`args = ["-y", "${pkg}"]`);
    if (mcp.env_var) {
      lines.push(`# Set ${mcp.env_var} in your environment (not here)`);
    }
    if (mcp.description) {
      lines.push(`# ${mcp.description}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ── agents/ — one file per agent in Codex skill format ───────────────────────

function buildAgentFiles(ctx) {
  const agentContentDir = path.join(repoRoot, 'content', 'agents');
  const out = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
      else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(path.join(dir, entry.name), 'utf8');
        const rel = path.relative(agentContentDir, path.join(dir, entry.name));
        out.push({ rel, content });
      }
    }
  }
  walk(agentContentDir);
  return out;
}

// ── generate ──────────────────────────────────────────────────────────────────

export async function generate(ctx) {
  writeGenerated('codex', 'AGENTS.md', buildAgentsMd(ctx));
  writeGenerated('codex', 'config.toml', buildConfigToml(ctx));

  for (const { rel, content } of buildAgentFiles(ctx)) {
    writeGenerated('codex', path.join('agents', rel), content);
  }

  console.log('  ✓ codex bundle generated');
}
