import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MemoryManager } from '../../packages/yes-runtime/memory-manager.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

test('creates memory directories', () => {
  const memory = new MemoryManager();

  assert.ok(fs.existsSync('graph/memory/working'));
  assert.ok(fs.existsSync('graph/memory/episodic'));
  assert.ok(fs.existsSync('graph/memory/semantic'));
  assert.ok(fs.existsSync('graph/memory/personal'));
});

test('sets and gets working memory', () => {
  const memory = new MemoryManager();

  memory.setWorkingMemory('test-key', { value: 'test-value' });
  const result = memory.getWorkingMemory('test-key');

  assert.deepEqual(result, { value: 'test-value' });

  // Cleanup
  memory.clearWorkingMemory();
});

test('returns null for missing working memory', () => {
  const memory = new MemoryManager();
  const result = memory.getWorkingMemory('nonexistent-key');

  assert.equal(result, null);
});

test('adds and retrieves episodic memory', () => {
  // Isolate in a temp dir: the default store persists across tests and is salience-ranked.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-mem-'));
  try {
    const memory = new MemoryManager({ memoryDir: dir });

    const id = memory.addEpisodicMemory('tasks', {
      task: 'test task',
      success: true,
      duration: 1000
    });

    assert.ok(id);

    const entries = memory.getEpisodicMemory('tasks', 10);
    assert.ok(entries.length > 0);
    assert.equal(entries[0].task, 'test task');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('calculates salience for failures', () => {
  const memory = new MemoryManager();

  const salience = memory.calculateSalience({
    success: false,
    error: 'test error'
  });

  assert.ok(salience >= 10); // Failures get +10
});

test('calculates salience for long tasks', () => {
  const memory = new MemoryManager();

  const salience = memory.calculateSalience({
    success: true,
    duration: 120000 // 2 minutes
  });

  assert.ok(salience >= 5); // Long tasks get +5
});

test('adds and retrieves semantic memory', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-mem-semantic-'));
  try {
    const memory = new MemoryManager({ memoryDir: dir });

    const id = memory.addSemanticMemory({
      pattern: 'test pattern',
      lesson: 'test lesson',
      source_episodes: []
    });

    assert.ok(id);

    const lessons = memory.getSemanticMemory(10);
    assert.ok(lessons.length > 0);
    assert.equal(lessons[lessons.length - 1].pattern, 'test pattern');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('sets and gets personal preferences', () => {
  const memory = new MemoryManager();

  memory.setPersonalPreference('theme', 'dark');
  const result = memory.getPersonalPreference('theme');

  assert.equal(result, 'dark');
});

test('returns null for missing personal preference', () => {
  const memory = new MemoryManager();
  const result = memory.getPersonalPreference('nonexistent');

  assert.equal(result, null);
});

test('searches episodic memory', () => {
  const memory = new MemoryManager();

  memory.addEpisodicMemory('tasks', {
    task: 'build React app',
    success: true
  });

  const results = memory.searchEpisodicMemory('tasks', 'React', 10);
  assert.ok(results.length > 0);
  assert.ok(results[0].task.includes('React'));
});

test('gets memory statistics', () => {
  const memory = new MemoryManager();
  const stats = memory.getStats();

  assert.ok(typeof stats.working.count === 'number');
  assert.ok(typeof stats.episodic.count === 'number');
  assert.ok(typeof stats.semantic.count === 'number');
  assert.ok(typeof stats.personal.count === 'number');
});

test('clears working memory', () => {
  const memory = new MemoryManager();

  memory.setWorkingMemory('key1', 'value1');
  memory.setWorkingMemory('key2', 'value2');

  memory.clearWorkingMemory();

  assert.equal(memory.getWorkingMemory('key1'), null);
  assert.equal(memory.getWorkingMemory('key2'), null);
});
