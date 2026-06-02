import fs from 'fs';
import path from 'path';

function uniqueStrings(values) {
  const seen = new Set();
  const out = [];
  for (const value of values || []) {
    const normalized = String(value || '').trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function listFieldNames(entries) {
  return uniqueStrings((entries || []).map((entry) => {
    if (typeof entry === 'string') return entry;
    return entry?.name || entry?.summary || entry?.id || entry?.dossier_path || entry?.method || entry?.rule || '';
  }));
}

function normalizeWorkflow(workflow) {
  const route = workflow.route || {};
  const primaryAgent = workflow.primary_agent || route.primary || null;
  return {
    ...workflow,
    inputs: listFieldNames(workflow.inputs),
    outputs: listFieldNames(workflow.outputs),
    gates: listFieldNames(workflow.gates),
    steps: listFieldNames(workflow.steps),
    tools: listFieldNames(workflow.tools),
    verification: listFieldNames(workflow.verification),
    route: {
      domain_master: route.domain_master || (primaryAgent ? `${primaryAgent.split('.')[0]}.master` : null),
      agents: uniqueStrings([
        ...(route.agents || []),
        route.primary || primaryAgent,
        ...(route.participants || [])
      ]),
      parallel: route.parallel === true,
      max_parallel_agents: route.max_parallel_agents || 1
    },
    rollback: typeof workflow.rollback === 'string' ? workflow.rollback : workflow.rollback?.mode || 'trace_based',
    source_references: listFieldNames(workflow.source_references)
  };
}

/**
 * Progressive Loader - Lazy-loads agents/skills/workflows on demand
 * 
 * Implements progressive disclosure pattern from agentic-harness:
 * - Load manifest only at startup (ROUTE_TABLE.min.json)
 * - Load full agent/skill/workflow only when matched
 * - Track token budget and enforce limits
 * 
 * This keeps startup tokens low (69 tokens) while allowing
 * access to full content when needed.
 */
export class ProgressiveLoader {
  constructor(config = {}) {
    this.contentDir = config.contentDir || 'content';
    this.registryDir = config.registryDir || 'registry';
    this.graphDir = config.graphDir || 'graph/indexes';
    
    this.loaded = new Map(); // Cache of loaded content
    this.tokenBudget = config.tokenBudget || 180; // Startup budget
    this.currentTokens = 0;
    
    // Load manifest at startup
    this.manifest = this.loadManifest();
  }

  /**
   * Load manifest (tiny startup data)
   */
  loadManifest() {
    const manifest = {
      routeTable: this.loadJSON(path.join(this.graphDir, 'ROUTE_TABLE.min.json')),
      aliasTable: this.loadJSON(path.join(this.graphDir, 'ALIAS_TABLE.min.json')),
      workflowCache: this.loadJSON(path.join(this.graphDir, 'WORKFLOW_CACHE.min.json'))
    };
    
    this.currentTokens = this.estimateTokens(manifest);
    return manifest;
  }

  /**
   * Load full agent/skill/workflow on demand
   * 
   * @param {string} routeId - Route ID (e.g., 'route.engineering.code-reviewer')
   * @returns {Object|null} - Loaded content or null if not found
   */
  loadOnMatch(routeId) {
    // Check cache first
    if (this.loaded.has(routeId)) {
      return this.loaded.get(routeId);
    }

    const route = this.getRoute(routeId);
    if (!route) {
      return null;
    }

    const content = {
      route,
      agent: route.target?.agent ? this.loadAgentById(route.target.agent) : null,
      skills: (route.target?.skills || [])
        .map((skillId) => this.loadSkillById(skillId))
        .filter(Boolean),
      workflow: route.target?.workflow ? this.loadWorkflowById(route.target.workflow) : null
    };

    if (content) {
      this.loaded.set(routeId, content);
      this.currentTokens += this.estimateTokens(content);
    }

    return content;
  }

  getRoute(routeId) {
    const routes = this.loadJSON(path.join(this.registryDir, 'routes.json')) || [];
    return routes.find((route) => route.route_id === routeId) || null;
  }

  loadAgentById(agentId) {
    const [domain, ...rest] = String(agentId || '').split('.');
    if (!domain || rest.length === 0) {
      return null;
    }
    return this.loadAgent(domain, rest.join('.'));
  }

  /**
   * Load agent from content/agents/{domain}/{id}.md
   */
  loadAgent(domain, id) {
    const filePath = path.join(process.cwd(), this.contentDir, 'agents', domain, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`[ProgressiveLoader] Agent not found: ${filePath}`);
      return null;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return this.parseMarkdown(content);
    } catch (error) {
      console.error(`[ProgressiveLoader] Failed to load agent ${domain}.${id}:`, error.message);
      return null;
    }
  }

  /**
   * Load skill from content/skills/{domain}/{id}.md
   */
  loadSkill(domain, id) {
    const filePath = path.join(process.cwd(), this.contentDir, 'skills', domain, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`[ProgressiveLoader] Skill not found: ${filePath}`);
      return null;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return this.parseMarkdown(content);
    } catch (error) {
      console.error(`[ProgressiveLoader] Failed to load skill ${domain}.${id}:`, error.message);
      return null;
    }
  }

  loadSkillById(skillId) {
    const [domain, ...rest] = String(skillId || '').split('.');
    if (!domain || rest.length === 0) {
      return null;
    }
    return this.loadSkill(domain, rest.join('.'));
  }

  /**
   * Load workflow from content/workflows/{domain}/{id}.json
   */
  loadWorkflow(domain, id) {
    const filePath = path.join(process.cwd(), this.contentDir, 'workflows', domain, `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`[ProgressiveLoader] Workflow not found: ${filePath}`);
      return null;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return normalizeWorkflow(JSON.parse(content));
    } catch (error) {
      console.error(`[ProgressiveLoader] Failed to load workflow ${domain}.${id}:`, error.message);
      return null;
    }
  }

  loadWorkflowById(workflowId) {
    const [domain, ...rest] = String(workflowId || '').split('.');
    if (!domain || rest.length === 0) {
      return null;
    }
    return this.loadWorkflow(domain, rest.join('.'));
  }

  /**
   * Parse markdown with frontmatter
   */
  parseMarkdown(content) {
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)$/);
    
    if (!match) {
      return { body: content };
    }
    
    const frontmatter = match[1];
    const body = match[2];
    
    // Simple YAML parser for frontmatter
    const metadata = {};
    const lines = frontmatter.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        metadata[key] = value;
      }
    }
    
    return { metadata, body };
  }

  /**
   * Load JSON file
   */
  loadJSON(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /**
   * Estimate token count (rough approximation)
   */
  estimateTokens(content) {
    if (typeof content === 'string') {
      return Math.ceil(content.length / 4); // ~4 chars per token
    }
    return Math.ceil(JSON.stringify(content).length / 4);
  }

  /**
   * Get loaded content from cache
   */
  getFromCache(routeId) {
    return this.loaded.get(routeId) || null;
  }

  /**
   * Check token budget
   */
  checkBudget() {
    return {
      current: this.currentTokens,
      budget: this.tokenBudget,
      within: this.currentTokens <= this.tokenBudget,
      remaining: Math.max(0, this.tokenBudget - this.currentTokens)
    };
  }

  /**
   * Clear cache (for testing or memory management)
   */
  clearCache() {
    this.loaded.clear();
    this.currentTokens = this.estimateTokens(this.manifest);
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      loaded_count: this.loaded.size,
      current_tokens: this.currentTokens,
      token_budget: this.tokenBudget,
      cache_keys: Array.from(this.loaded.keys())
    };
  }
}
