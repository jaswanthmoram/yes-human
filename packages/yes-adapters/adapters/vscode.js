import { writeGenerated } from '../index.js';

function boot(ctx) {
  return `# AGENTS.md - Yes-human for VS Code

${ctx.bootText.trim()}

Use \`yes route "<task>" --dry-run\`. Optional MCP servers use env vars only.
`;
}

function mcpConfig(ctx) {
  const servers = {};
  for (const mcp of ctx.mcps) {
    if (mcp.enabled === false) continue;
    const name = String(mcp.id || mcp.provider).replace(/[^a-zA-Z0-9_-]/g, '-');
    servers[name] = {
      command: 'npx',
      args: ['-y', mcp.package || mcp.provider || name]
    };
    if (mcp.env_var) {
      servers[name].env = { [mcp.env_var]: `{env:${mcp.env_var}}` };
    }
  }
  return { servers };
}

export async function generate(ctx) {
  writeGenerated('vscode', 'AGENTS.md', boot(ctx));
  writeGenerated('vscode', '.vscode/settings.json', {
    'yesHuman.routeTable': 'graph/indexes/ROUTE_TABLE.min.json',
    'yesHuman.registry': 'registry/routes.json',
    'yesHuman.feedbackMode': 'staging-only'
  });
  writeGenerated('vscode', '.vscode/mcp.json', mcpConfig(ctx));
  console.log('  ✓ vscode bundle generated');
}
