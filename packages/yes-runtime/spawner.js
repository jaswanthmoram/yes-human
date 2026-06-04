import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { buildPlanCard } from './lib/plan-card.js';
import { ToolExecutor } from './tool-executor.js';
import { OfflineRecovery } from './offline-recovery.js';
import { WorkflowOrchestrator } from '../yes-workflows/index.js';

const LOCAL_TOOL_ALLOWLIST = new Set(['readFile', 'grep', 'convertToMarkdown']);
const WRITE_TOOL_DENY = new Set(['writeFile', 'filesystem.write', 'shell.write', 'apply_patch']);

function executeLocalTool(tool, args, repoRoot) {
  if (WRITE_TOOL_DENY.has(tool)) {
    return { success: false, error: 'write tools denied in local-tools mode' };
  }
  if (!LOCAL_TOOL_ALLOWLIST.has(tool)) {
    return { success: false, error: `tool not allowlisted: ${tool}` };
  }
  if (tool === 'readFile') {
    const rel = args?.path || args?.file;
    if (!rel) return { success: false, error: 'readFile requires path' };
    const abs = path.isAbsolute(rel) ? rel : path.join(repoRoot, rel);
    if (!abs.startsWith(path.resolve(repoRoot))) return { success: false, error: 'path outside repo' };
    if (!fs.existsSync(abs)) return { success: false, error: 'file not found' };
    const text = fs.readFileSync(abs, 'utf8');
    return { success: true, result: { bytes: text.length, preview: text.slice(0, 200) } };
  }
  if (tool === 'grep') {
    const pattern = args?.pattern;
    const rel = args?.path || '.';
    if (!pattern) return { success: false, error: 'grep requires pattern' };
    const r = spawnSync('rg', ['-n', '--max-count', '20', pattern, rel], { cwd: repoRoot, encoding: 'utf8' });
    if (r.error) {
      if (r.error.code === 'ENOENT') {
        return {
          success: false,
          error: 'ripgrep (rg) is not installed on this system. Please install it or configure PATH.'
        };
      }
      return { success: false, error: `ripgrep execution failed: ${r.error.message}` };
    }
    return {
      success: r.status === 0 || r.status === 1,
      result: { lines: (r.stdout || '').split('\n').filter(Boolean).slice(0, 20) }
    };
  }
  if (tool === 'convertToMarkdown') {
    const rel = args?.path;
    if (!rel) return { success: false, error: 'convertToMarkdown requires path' };
    const abs = path.join(repoRoot, rel);
    const text = fs.readFileSync(abs, 'utf8');
    return { success: true, result: { markdown: text.slice(0, 4000) } };
  }
  return { success: false, error: 'unknown tool' };
}

export async function runPlan({ task, route, mode = 'dry-run', repoRoot = process.cwd() }) {
  const plan = buildPlanCard(repoRoot, route);
  const base = {
    task,
    route_id: route.route_id,
    agent_id: route.target?.agent ?? null,
    workflow_id: route.target?.workflow ?? null,
    execution_mode: mode,
    plan
  };

  if (mode === 'dry-run') {
    return { ...base, executed: false, message: 'Dry-run: no tools or writes invoked.' };
  }

  if (mode === 'local') {
    const agentId = route.target?.agent;
    if (!agentId) {
      return { ...base, executed: false, blocked: true, reason: 'no agent on route' };
    }
    if (agentId.includes('..') || agentId.split('.').includes('')) {
      return { ...base, executed: false, blocked: true, reason: 'malformed agent id' };
    }
    const [domain, ...rest] = agentId.split('.');
    const agentsDir = path.resolve(repoRoot, 'content/agents');
    const agentFile = path.resolve(agentsDir, domain, `${rest.join('.')}.md`);
    if (!agentFile.startsWith(agentsDir)) {
      return { ...base, executed: false, blocked: true, reason: 'path traversal attempt' };
    }
    if (!fs.existsSync(agentFile)) {
      return { ...base, executed: false, blocked: true, reason: 'agent file missing' };
    }
    const body = fs.readFileSync(agentFile, 'utf8');
    return {
      ...base,
      executed: true,
      blocked: false,
      local_actions: ['read_agent_markdown'],
      agent_bytes: body.length,
      network: 'denied',
      writes: 'denied'
    };
  }

  if (mode === 'local-tools') {
    const recovery = new OfflineRecovery({ repoRoot });
    recovery.checkpoint('run-start', { task, route_id: route.route_id });
    const executor = new ToolExecutor();
    const toolResults = [];
    const agentId = route.target?.agent || 'meta-system.supreme-router';

    if (route.target?.workflow) {
      try {
        const orchestrator = new WorkflowOrchestrator({ repoRoot, role: process.env.YES_ROLE || null });
        const wfPlan = await orchestrator.run(route.target.workflow, { dryRun: true });
        toolResults.push({ tool: 'workflow_plan', success: true, result: { steps: wfPlan.steps?.length ?? 0 } });
      } catch (err) {
        toolResults.push({ tool: 'workflow_plan', success: false, error: err.message });
      }
    }

    let readFileTarget = 'README.md';
    let grepPattern = 'route';
    let grepPath = 'packages/yes-runtime';

    // Heuristically extract filename from task
    const fileMatch = task.match(/\b([\w-]+\.[a-z0-9]{2,4})\b/i);
    if (fileMatch) {
      const candidatePath = fileMatch[1];
      if (fs.existsSync(path.join(repoRoot, candidatePath))) {
        readFileTarget = candidatePath;
      } else {
        // Try searching for the file in the repo recursively (limit depth for speed)
        const findFile = (dir, name, depth = 0) => {
          if (depth > 2) return null;
          try {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                const res = findFile(path.join(dir, entry.name), name, depth + 1);
                if (res) return res;
              } else if (entry.isFile() && entry.name === name) {
                return path.relative(repoRoot, path.join(dir, entry.name));
              }
            }
          } catch (e) {
            // ignore
          }
          return null;
        };
        const found = findFile(repoRoot, candidatePath);
        if (found) {
          readFileTarget = found;
        }
      }
    }

    // Heuristically extract query pattern
    const patternMatch = task.match(/(?:"([^"]+)"|'([^']+)')/);
    if (patternMatch) {
      grepPattern = patternMatch[1] || patternMatch[2];
    } else {
      // Use the last non-stop-word word or key action
      const words = task.split(/\s+/).filter((w) => w.length > 3 && !LOCAL_TOOL_ALLOWLIST.has(w));
      if (words.length > 0) {
        grepPattern = words[words.length - 1].replace(/[^\w-]/g, '');
      }
    }

    // Match path for grep
    if (readFileTarget !== 'README.md') {
      grepPath = path.dirname(readFileTarget) || '.';
    }

    for (const tool of ['readFile', 'grep']) {
      const args = tool === 'readFile' ? { path: readFileTarget } : { pattern: grepPattern, path: grepPath };
      const direct = executeLocalTool(tool, args, repoRoot);
      if (direct.success) {
        toolResults.push({ tool, success: true, result: direct.result });
        continue;
      }
      const hooked = await executor.execute(tool, args, agentId, task);
      toolResults.push({ tool, success: hooked.success, error: hooked.error || null });
    }

    recovery.checkpoint('run-end', { task, route_id: route.route_id });
    return {
      ...base,
      executed: true,
      blocked: false,
      network: 'denied',
      writes: 'denied',
      tool_results: toolResults
    };
  }

  return { ...base, executed: false, blocked: true, reason: `unsupported mode: ${mode}` };
}
