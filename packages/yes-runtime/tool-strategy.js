/**
 * Tool Strategy Layer
 * 
 * Detects available tools and selects the best tool for a task with fallback chains.
 * Supports both paid tools (firecrawl, exa) and free fallbacks (webfetch, playwright, gh api).
 * 
 * Top 10 Tools (ranked by use case):
 * 1. webfetch - Quick URL fetch, markdown (Free, Built-in)
 * 2. firecrawl_search - Structured web search (Paid, API key)
 * 3. firecrawl_scrape - Deep page extraction (Paid, API key)
 * 4. web_search_exa - Neural/academic search (Paid, API key)
 * 5. playwright - JS-heavy sites, login (Free, Built-in)
 * 6. gh api - GitHub research (Free, Built-in)
 * 7. firecrawl_crawl - Multi-page extraction (Paid, API key)
 * 8. crawling_exa - Token-controlled fetch (Paid, API key)
 * 9. curl/wget - Raw HTTP, downloads (Free, Built-in)
 * 10. exa_web_fetch_exa - Batch URL fetching (Paid, API key)
 */

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export class ToolStrategy {
  constructor(config = {}) {
    this.config = config;
    this.availableTools = this.detectAvailableTools();
  }

  /**
   * Detect which tools are available in the environment
   */
  detectAvailableTools() {
    const tools = {
      webfetch: true,  // Always available (built-in)
      playwright: true, // Always available (built-in)
      gh: this.checkCommand('gh'),
      curl: this.checkCommand('curl'),
      wget: this.checkCommand('wget'),
      firecrawl: this.checkEnv('FIRECRAWL_API_KEY'),
      exa: this.checkEnv('EXA_API_KEY')
    };
    return tools;
  }

  /**
   * Check if a command exists in PATH
   */
  checkCommand(cmd) {
    try {
      const result = spawnSync('which', [cmd], { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      return result.status === 0;
    } catch {
      return false;
    }
  }

  /**
   * Check if an environment variable is set
   */
  checkEnv(key) {
    return !!process.env[key];
  }

  /**
   * Select the best tool for a task with fallback chain
   * 
   * @param {Object} task - Task description
   * @param {string} task.type - Task type: 'search', 'scrape', 'github', 'js-site', 'download'
   * @param {string} [task.url] - URL to fetch
   * @param {string} [task.query] - Search query
   * @param {string} [task.endpoint] - GitHub API endpoint
   * @returns {Object} - { tool: string, fallback: string[], reason: string }
   */
  selectTool(task) {
    const { type, url, query, endpoint } = task;

    // Web search
    if (type === 'search') {
      if (this.availableTools.firecrawl) {
        return { 
          tool: 'firecrawl_search', 
          fallback: ['web_search_exa', 'webfetch'],
          reason: 'Firecrawl available for structured search'
        };
      }
      if (this.availableTools.exa) {
        return { 
          tool: 'web_search_exa', 
          fallback: ['webfetch'],
          reason: 'Exa available for neural search'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: ['curl'],
        reason: 'Using free webfetch fallback'
      };
    }

    // Page scraping
    if (type === 'scrape') {
      if (this.availableTools.firecrawl) {
        return { 
          tool: 'firecrawl_scrape', 
          fallback: ['webfetch', 'playwright'],
          reason: 'Firecrawl available for deep extraction'
        };
      }
      if (this.availableTools.exa) {
        return { 
          tool: 'crawling_exa', 
          fallback: ['webfetch', 'playwright'],
          reason: 'Exa available for token-controlled fetch'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: ['playwright', 'curl'],
        reason: 'Using free webfetch fallback'
      };
    }

    // GitHub research
    if (type === 'github') {
      if (this.availableTools.gh) {
        return { 
          tool: 'gh', 
          fallback: ['webfetch'],
          reason: 'GitHub CLI available for API access'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: ['curl'],
        reason: 'Using webfetch for GitHub (gh CLI not available)'
      };
    }

    // JS-heavy sites (SPAs, dynamic content)
    if (type === 'js-site') {
      return { 
        tool: 'playwright', 
        fallback: ['webfetch'],
        reason: 'Using Playwright for JS-heavy site'
      };
    }

    // File download
    if (type === 'download') {
      if (this.availableTools.curl) {
        return { 
          tool: 'curl', 
          fallback: ['wget'],
          reason: 'Using curl for download'
        };
      }
      if (this.availableTools.wget) {
        return { 
          tool: 'wget', 
          fallback: [],
          reason: 'Using wget for download'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: [],
        reason: 'Using webfetch for download'
      };
    }

    // Multi-page crawl
    if (type === 'crawl') {
      if (this.availableTools.firecrawl) {
        return { 
          tool: 'firecrawl_crawl', 
          fallback: ['webfetch'],
          reason: 'Firecrawl available for multi-page crawl'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: [],
        reason: 'Using webfetch (firecrawl not available for crawl)'
      };
    }

    // Batch URL fetching
    if (type === 'batch-fetch') {
      if (this.availableTools.exa) {
        return { 
          tool: 'exa_web_fetch_exa', 
          fallback: ['webfetch'],
          reason: 'Exa available for batch fetching'
        };
      }
      return { 
        tool: 'webfetch', 
        fallback: [],
        reason: 'Using webfetch for batch (exa not available)'
      };
    }

    // Default
    return { 
      tool: 'webfetch', 
      fallback: ['curl', 'wget'],
      reason: 'Default tool selection'
    };
  }

  /**
   * Execute a task with automatic fallback chain
   * 
   * @param {Object} task - Task description
   * @returns {Promise<Object>} - Execution result
   */
  async execute(task) {
    const strategy = this.selectTool(task);
    let lastError = null;

    for (const tool of [strategy.tool, ...strategy.fallback]) {
      try {
        const result = await this.executeTool(tool, task);
        return {
          success: true,
          tool,
          result,
          strategy
        };
      } catch (error) {
        lastError = error;
        console.warn(`[tool-strategy] Tool ${tool} failed: ${error.message}, trying fallback...`);
      }
    }

    return {
      success: false,
      error: lastError?.message || 'All tools failed',
      strategy
    };
  }

  /**
   * Execute a specific tool
   */
  async executeTool(tool, task) {
    switch (tool) {
      case 'firecrawl_search':
        return this.firecrawlSearch(task.query, task.limit);
      case 'firecrawl_scrape':
        return this.firecrawlScrape(task.url);
      case 'firecrawl_crawl':
        return this.firecrawlCrawl(task.url, task.depth);
      case 'web_search_exa':
        return this.exaSearch(task.query, task.limit);
      case 'crawling_exa':
        return this.exaCrawl(task.url, task.tokens);
      case 'exa_web_fetch_exa':
        return this.exaBatchFetch(task.urls);
      case 'webfetch':
        return this.webfetch(task.url);
      case 'playwright':
        return this.playwrightNavigate(task.url);
      case 'gh':
        return this.ghApi(task.endpoint);
      case 'curl':
        return this.curl(task.url, task.output);
      case 'wget':
        return this.wget(task.url, task.output);
      default:
        throw new Error(`Unknown tool: ${tool}`);
    }
  }

  // Tool implementations (simplified - actual implementations would call MCP or external APIs)

  async firecrawlSearch(query, limit = 10) {
    // Placeholder - would call firecrawl MCP
    throw new Error('firecrawl_search not implemented (requires MCP)');
  }

  async firecrawlScrape(url) {
    // Placeholder - would call firecrawl MCP
    throw new Error('firecrawl_scrape not implemented (requires MCP)');
  }

  async firecrawlCrawl(url, depth = 2) {
    // Placeholder - would call firecrawl MCP
    throw new Error('firecrawl_crawl not implemented (requires MCP)');
  }

  async exaSearch(query, limit = 10) {
    // Placeholder - would call exa MCP
    throw new Error('web_search_exa not implemented (requires MCP)');
  }

  async exaCrawl(url, tokens = 5000) {
    // Placeholder - would call exa MCP
    throw new Error('crawling_exa not implemented (requires MCP)');
  }

  async exaBatchFetch(urls) {
    // Placeholder - would call exa MCP
    throw new Error('exa_web_fetch_exa not implemented (requires MCP)');
  }

  async webfetch(url) {
    // Placeholder - would use built-in webfetch tool
    return { url, content: '[webfetch placeholder]', status: 'ok' };
  }

  async playwrightNavigate(url) {
    // Placeholder - would use Playwright MCP
    return { url, content: '[playwright placeholder]', status: 'ok' };
  }

  async ghApi(endpoint) {
    // Placeholder - would call gh CLI
    const result = spawnSync('gh', ['api', endpoint], { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    if (result.status !== 0) {
      throw new Error(`gh api failed: ${result.stderr}`);
    }
    return JSON.parse(result.stdout);
  }

  async curl(url, output) {
    const args = ['-L', url];
    if (output) {
      args.push('-o', output);
    }
    const result = spawnSync('curl', args, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    if (result.status !== 0) {
      throw new Error(`curl failed: ${result.stderr}`);
    }
    return { url, output, status: 'ok' };
  }

  async wget(url, output) {
    const args = [url];
    if (output) {
      args.push('-O', output);
    }
    const result = spawnSync('wget', args, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    if (result.status !== 0) {
      throw new Error(`wget failed: ${result.stderr}`);
    }
    return { url, output, status: 'ok' };
  }

  /**
   * Get tool availability summary
   */
  getAvailabilitySummary() {
    const available = Object.entries(this.availableTools)
      .filter(([_, v]) => v)
      .map(([k]) => k);
    const unavailable = Object.entries(this.availableTools)
      .filter(([_, v]) => !v)
      .map(([k]) => k);
    
    return {
      available,
      unavailable,
      total: Object.keys(this.availableTools).length
    };
  }
}
