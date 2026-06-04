import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Scans the current workspace and host system paths to discover active tools, custom rules, and configs.
 *
 * @param {string} [workspaceRoot=process.cwd()]
 * @returns {object} Discovered config data
 */
export function discoverHostConfigs(workspaceRoot = process.cwd()) {
  const discovered = {
    cursor: {
      has_cursorrules: false,
      rules_files: [],
      raw_cursorrules: null
    },
    claude_desktop: {
      config_path: null,
      mcp_servers: {}
    },
    workspace: {
      has_package_json: false,
      custom_commands: [],
      dependencies: {}
    }
  };

  // 1. Scan Cursor Rules
  const cursorRulesPath = path.join(workspaceRoot, '.cursorrules');
  if (fs.existsSync(cursorRulesPath)) {
    discovered.cursor.has_cursorrules = true;
    try {
      discovered.cursor.raw_cursorrules = fs.readFileSync(cursorRulesPath, 'utf8').slice(0, 1000); // sample
    } catch {
      /* ignore */
    }
  }

  const cursorRulesDir = path.join(workspaceRoot, '.cursor', 'rules');
  if (fs.existsSync(cursorRulesDir)) {
    try {
      const files = fs.readdirSync(cursorRulesDir).filter((f) => f.endsWith('.md'));
      discovered.cursor.rules_files = files.map((f) => path.join('.cursor', 'rules', f));
    } catch {
      /* ignore */
    }
  }

  // 2. Scan Claude Desktop configuration (macOS paths supported)
  const homeDir = os.homedir();
  const claudePaths = [
    path.join(homeDir, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'),
    path.join(homeDir, '.config', 'Claude', 'claude_desktop_config.json') // linux fallback
  ];

  for (const p of claudePaths) {
    if (fs.existsSync(p)) {
      discovered.claude_desktop.config_path = p;
      try {
        const config = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (config.mcpServers) {
          discovered.claude_desktop.mcp_servers = {
            ...discovered.claude_desktop.mcp_servers,
            ...config.mcpServers
          };
        }
      } catch {
        /* ignore */
      }
      break;
    }
  }

  // Scan local Antigravity configs as well
  const antigravityPaths = [
    path.join(homeDir, '.gemini', 'config', 'mcp_config.json'),
    path.join(homeDir, '.gemini', 'settings.json')
  ];

  for (const p of antigravityPaths) {
    if (fs.existsSync(p)) {
      try {
        const config = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (config.mcpServers) {
          discovered.claude_desktop.mcp_servers = {
            ...discovered.claude_desktop.mcp_servers,
            ...config.mcpServers
          };
        }
      } catch {
        /* ignore */
      }
    }
  }

  // 3. Scan Workspace Package properties
  const pkgPath = path.join(workspaceRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    discovered.workspace.has_package_json = true;
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.scripts) {
        discovered.workspace.custom_commands = Object.keys(pkg.scripts);
      }
      discovered.workspace.dependencies = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {})
      };
    } catch {
      /* ignore */
    }
  }

  return discovered;
}
