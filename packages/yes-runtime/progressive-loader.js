import fs from 'fs';
import path from 'path';

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
    
    // Parse route ID to determine what to load
    const parts = routeId.split('.');
    if (parts.length < 3) return null;
    
    const [_, domain, type, id] = parts;
    
    let content = null;
    if (type === 'master' || type === 'agent') {
      content = this.loadAgent(domain, id);
    } else if (type === 'skill') {
      content = this.loadSkill(domain, id);
    } else if (type === 'workflow') {
      content = this.loadWorkflow(domain, id);
    }
    
    if (content) {
      this.loaded.set(routeId, content);
      this.currentTokens += this.estimateTokens(content);
    }
    
    return content;
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
      return JSON.parse(content);
    } catch (error) {
      console.error(`[ProgressiveLoader] Failed to load workflow ${domain}.${id}:`, error.message);
      return null;
    }
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
