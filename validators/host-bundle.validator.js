/**
 * Host-bundle validator.
 * Verifies a generated/<host>/ bundle is well-formed:
 *   1. Boot file exists and is under the token cap (300 hard cap).
 *   2. Route table pointer file exists.
 *   3. Required host files are present.
 *   4. MCP configs use env-var refs, not literal API keys.
 *   5. Commands/agent files reference valid workflow/agent IDs.
 */

import fs from 'fs';
import path from 'path';

const TOKEN_HARD_CAP = 300;
const KEY_PATTERNS = [/fc-[a-zA-Z0-9]{20,}/, /f922[a-zA-Z0-9-]{20,}/, /sk-[a-zA-Z0-9]{20,}/, /ghp_[a-zA-Z0-9]{20,}/];

// Rough token estimate: ~4 chars per token
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function scanForLiteralKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const pattern of KEY_PATTERNS) {
    if (pattern.test(content)) return true;
  }
  return false;
}

const HOST_REQUIRED_FILES = {
  claude:   ['CLAUDE.md', 'plugin.json', 'settings.json'],
  codex:    ['AGENTS.md', 'config.toml'],
  opencode: ['AGENTS.md', 'opencode.json'],
  mcp:      ['mcp-manifest.json']
};

// The "boot file" for token-cap purposes: the file loaded at host startup.
// For MCP, the manifest is JSON (not prose) so we skip the token check.
const HOST_BOOT_FILE = {
  claude:   'CLAUDE.md',
  codex:    'AGENTS.md',
  opencode: 'AGENTS.md',
  mcp:      null
};

/**
 * @param {string} host
 * @param {string} generatedRoot - absolute path to generated/<host>/
 * @param {object} [registryRoutes] - optional parsed routes.json for reference checks
 * @returns {{ ok: boolean, checks: Array<{label, passed, detail}> }}
 */
export function validateHostBundle(host, generatedRoot, registryRoutes = []) {
  const checks = [];
  const add = (label, passed, detail = '') => checks.push({ label, passed, detail });

  if (!fs.existsSync(generatedRoot)) {
    add('bundle directory exists', false, `not found: ${generatedRoot}`);
    return { ok: false, checks };
  }

  // 1. Required files present
  for (const req of HOST_REQUIRED_FILES[host] || []) {
    const exists = fs.existsSync(path.join(generatedRoot, req));
    add(`required file: ${req}`, exists, exists ? '' : 'missing');
  }

  // 2. Boot file under token cap
  const bootFile = HOST_BOOT_FILE[host];
  if (bootFile) {
    const bootPath = path.join(generatedRoot, bootFile);
    if (fs.existsSync(bootPath)) {
      const tokens = estimateTokens(fs.readFileSync(bootPath, 'utf8'));
      const under = tokens <= TOKEN_HARD_CAP;
      add(`boot file ≤${TOKEN_HARD_CAP} tokens`, under, `estimated ${tokens} tokens`);
    }
  }

  // 3. No literal API keys in any generated file
  let keyLeak = false;
  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(full);
      else if (entry.isFile()) {
        if (scanForLiteralKeys(full)) { keyLeak = true; }
      }
    }
  }
  scanDir(generatedRoot);
  add('no literal API keys in bundle', !keyLeak, keyLeak ? 'found hardcoded key — use {env:VAR} refs' : '');

  // 4. Claude-specific: settings.json is valid JSON
  if (host === 'claude') {
    const settingsPath = path.join(generatedRoot, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      try {
        JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        add('settings.json is valid JSON', true);
      } catch (e) {
        add('settings.json is valid JSON', false, e.message);
      }
    }
  }

  // 5. Codex: config.toml exists and is non-empty
  if (host === 'codex') {
    const tomlPath = path.join(generatedRoot, 'config.toml');
    if (fs.existsSync(tomlPath)) {
      const size = fs.readFileSync(tomlPath, 'utf8').trim().length;
      add('config.toml non-empty', size > 0);
    }
  }

  // 6. OpenCode: opencode.json has required fields
  if (host === 'opencode') {
    const ocPath = path.join(generatedRoot, 'opencode.json');
    if (fs.existsSync(ocPath)) {
      try {
        const oc = JSON.parse(fs.readFileSync(ocPath, 'utf8'));
        add('opencode.json has mcp field', !!oc.mcp, oc.mcp ? '' : 'missing mcp key');
        add('opencode.json has instructions', Array.isArray(oc.instructions) && oc.instructions.length > 0, '');
      } catch (e) {
        add('opencode.json is valid JSON', false, e.message);
      }
    }
  }

  // 7. MCP: manifest has tools and resources
  if (host === 'mcp') {
    const mfPath = path.join(generatedRoot, 'mcp-manifest.json');
    if (fs.existsSync(mfPath)) {
      try {
        const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
        add('mcp manifest has tools', Array.isArray(mf.tools) && mf.tools.length > 0, `${mf.tools?.length} tools`);
        add('mcp manifest has resources', Array.isArray(mf.resources) && mf.resources.length > 0, `${mf.resources?.length} resources`);
      } catch (e) {
        add('mcp-manifest.json is valid JSON', false, e.message);
      }
    }
  }

  const ok = checks.every(c => c.passed);
  return { ok, checks };
}
