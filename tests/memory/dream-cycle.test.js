import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DreamCycle } from '../../packages/yes-runtime/dream-cycle.js';
import { MemoryManager } from '../../packages/yes-runtime/memory-manager.js';
import fs from 'fs';

test('creates staging directory', () => {
  const dream = new DreamCycle();
  assert.ok(fs.existsSync('staging/dream'));
});

test('runs dream cycle', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });
  
  // Add some test data
  memory.addEpisodicMemory('tasks', {
    task: 'build feature',
    route_id: 'route.engineering.master',
    success: true,
    duration_ms: 5000
  });
  
  memory.addEpisodicMemory('tasks', {
    task: 'build another feature',
    route_id: 'route.engineering.master',
    success: true,
    duration_ms: 6000
  });
  
  memory.addEpisodicMemory('tasks', {
    task: 'build third feature',
    route_id: 'route.engineering.master',
    success: true,
    duration_ms: 5500
  });
  
  const result = await dream.run();
  
  assert.ok(result.candidates);
  assert.ok(result.report);
  assert.ok(Array.isArray(result.candidates));
});

test('clusters task patterns', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2 });
  
  // Add recurring pattern
  for (let i = 0; i < 5; i++) {
    memory.addEpisodicMemory('tasks', {
      task: `review code ${i}`,
      route_id: 'route.engineering.code-reviewer',
      success: true,
      duration_ms: 3000
    });
  }
  
  const result = await dream.run();
  
  // Should find the recurring pattern
  const skillCandidates = result.candidates.filter(c => c.type === 'skill');
  assert.ok(skillCandidates.length > 0);
});

test('clusters error patterns', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2 });
  
  // Add recurring errors
  for (let i = 0; i < 3; i++) {
    memory.addEpisodicMemory('errors', {
      error_type: 'timeout',
      error_message: 'Request timeout',
      tool: 'webfetch',
      task: `fetch url ${i}`
    });
  }
  
  const result = await dream.run();
  
  // Should find the error pattern
  const mistakeCandidates = result.candidates.filter(c => c.type === 'mistake');
  assert.ok(mistakeCandidates.length > 0);
});

test('generates report file', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });
  
  memory.addEpisodicMemory('tasks', {
    task: 'test task',
    route_id: 'route.test',
    success: true,
    duration_ms: 1000
  });
  
  const result = await dream.run();
  
  assert.ok(fs.existsSync(result.report));
  
  const reportContent = fs.readFileSync(result.report, 'utf8');
  assert.ok(reportContent.includes('Dream Cycle Report'));
});

test('graduates lesson candidate', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2 });
  
  // Add failing tasks
  for (let i = 0; i < 3; i++) {
    memory.addEpisodicMemory('tasks', {
      task: `failing task ${i}`,
      route_id: 'route.test',
      success: false,
      duration_ms: 2000
    });
  }
  
  const result = await dream.run();
  
  // Find a lesson candidate
  const lessonCandidate = result.candidates.find(c => c.type === 'lesson');
  
  if (lessonCandidate) {
    const candidateIndex = result.candidates.indexOf(lessonCandidate);
    const graduateResult = dream.graduate(candidateIndex, 'This is a test lesson');
    
    assert.equal(graduateResult.graduated, true);
    
    // Check it was added to semantic memory
    const lessons = memory.getSemanticMemory(10);
    assert.ok(lessons.some(l => l.lesson === 'This is a test lesson'));
  }
});

test('rejects candidate', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });
  
  memory.addEpisodicMemory('tasks', {
    task: 'test task',
    route_id: 'route.test',
    success: true,
    duration_ms: 1000
  });
  
  const result = await dream.run();
  
  if (result.candidates.length > 0) {
    const rejectResult = dream.reject(0, 'Not relevant');
    assert.equal(rejectResult.rejected, true);
  }
});

test('logs decisions', async () => {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });
  
  memory.addEpisodicMemory('tasks', {
    task: 'test task',
    route_id: 'route.test',
    success: true,
    duration_ms: 1000
  });
  
  await dream.run();
  
  if (dream.getDecisions) {
    const decisions = dream.getDecisions(10);
    assert.ok(Array.isArray(decisions));
  }
});
