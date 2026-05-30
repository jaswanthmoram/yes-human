/**
 * OpenCode adapter
 *
 * Outputs:
 *   generated/opencode/
 *     AGENTS.md          — shared dispatch instructions (same as Codex)
 *     opencode.json      — OpenCode config: model, instructions, MCP servers
 */

import { writeGenerated } from '../index.js';

// ── AGENTS.md — shared with Codex ────────────────────────────────────────────

function buildAgentsMd(ctx) {
  // Boot-pointer only — under the 300-token startup hard cap.
  return `# AGENTS.md — Yes-human v${ctx.version} for OpenCode

${ctx.bootText.trim()}

Route table: \`graph/indexes/ROUTE_TABLE.min.json\`
Agent registry: \`registry/agents.json\` (lazy-loaded after route match)
Run \`yes route "<task>" --dry-run\` to inspect routing.

_Generated ${ctx.generatedAt}_
`;
}

// ── opencode.json ─────────────────────────────────────────────────────────────

function buildOpencodeJson(ctx) {
  const mcpServers = {};

  for (const mcp of ctx.mcps) {
    if (!mcp.name) continue;
    const entry = {
      type: 'local',
      command: ['npx', '-y', mcp.package || mcp.name],
      enabled: mcp.enabled !== false
    };
    if (mcp.env_var) {
      entry.env = { [mcp.env_var]: `{env:${mcp.env_var}}` };
    }
    mcpServers[mcp.name] = entry;
  }

  return {
    $schema: 'https://opencode.ai/config.json',
    instructions: ['AGENTS.md', 'YES_BOOT.md'],
    mcp: mcpServers
  };
}

// ── generate ──────────────────────────────────────────────────────────────────

export async function generate(ctx) {
  writeGenerated('opencode', 'AGENTS.md', buildAgentsMd(ctx));
  writeGenerated('opencode', 'opencode.json', buildOpencodeJson(ctx));
  console.log('  ✓ opencode bundle generated');
}
