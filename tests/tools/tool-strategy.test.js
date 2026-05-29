import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ToolStrategy } from '../../packages/yes-runtime/tool-strategy.js';

test('detects available tools', () => {
  const strategy = new ToolStrategy();
  const summary = strategy.getAvailabilitySummary();
  
  assert.ok(summary.available.includes('webfetch'));
  assert.ok(summary.available.includes('playwright'));
  assert.ok(typeof summary.total === 'number');
});

test('selects firecrawl when available', () => {
  process.env.FIRECRAWL_API_KEY = 'test-key';
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'search', query: 'test' });
  
  assert.equal(result.tool, 'firecrawl_search');
  assert.ok(result.fallback.includes('web_search_exa'));
  assert.ok(result.fallback.includes('webfetch'));
  
  delete process.env.FIRECRAWL_API_KEY;
});

test('selects exa when firecrawl unavailable', () => {
  process.env.EXA_API_KEY = 'test-key';
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'search', query: 'test' });
  
  assert.equal(result.tool, 'web_search_exa');
  assert.ok(result.fallback.includes('webfetch'));
  
  delete process.env.EXA_API_KEY;
});

test('falls back to webfetch when no paid tools', () => {
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'search', query: 'test' });
  
  assert.equal(result.tool, 'webfetch');
  assert.ok(result.fallback.includes('curl'));
});

test('uses gh api for GitHub tasks', () => {
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'github', endpoint: 'repos/test/test' });
  
  assert.equal(result.tool, 'gh');
  assert.ok(result.fallback.includes('webfetch'));
});

test('uses playwright for JS-heavy sites', () => {
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'js-site', url: 'https://example.com' });
  
  assert.equal(result.tool, 'playwright');
  assert.ok(result.fallback.includes('webfetch'));
});

test('uses curl for downloads when available', () => {
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'download', url: 'https://example.com/file.zip' });
  
  assert.equal(result.tool, 'curl');
  assert.ok(result.fallback.includes('wget'));
});

test('uses firecrawl_crawl for multi-page when available', () => {
  process.env.FIRECRAWL_API_KEY = 'test-key';
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'crawl', url: 'https://example.com' });
  
  assert.equal(result.tool, 'firecrawl_crawl');
  assert.ok(result.fallback.includes('webfetch'));
  
  delete process.env.FIRECRAWL_API_KEY;
});

test('uses exa_web_fetch_exa for batch when available', () => {
  process.env.EXA_API_KEY = 'test-key';
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'batch-fetch', urls: ['https://example.com'] });
  
  assert.equal(result.tool, 'exa_web_fetch_exa');
  assert.ok(result.fallback.includes('webfetch'));
  
  delete process.env.EXA_API_KEY;
});

test('returns default for unknown type', () => {
  const strategy = new ToolStrategy();
  const result = strategy.selectTool({ type: 'unknown' });
  
  assert.equal(result.tool, 'webfetch');
  assert.ok(result.fallback.includes('curl'));
});
