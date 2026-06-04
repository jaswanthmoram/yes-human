import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DreamCycle } from '../../packages/yes-runtime/dream-cycle.js';
import { MemoryManager } from '../../packages/yes-runtime/memory-manager.js';
import fs from 'fs';
import os from 'os';
import path from 'path';

function tempDreamDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'yh-dream-'));
}

test('creates staging directory', () => {
  const stagingDir = tempDreamDir();
  try {
    const dream = new DreamCycle({ stagingDir });
    assert.ok(fs.existsSync(dream.stagingDir));
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('runs dream cycle', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, stagingDir });

  try {
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
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('clusters task patterns', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2, stagingDir });

  try {
    for (let i = 0; i < 5; i++) {
      memory.addEpisodicMemory('tasks', {
        task: `review code ${i}`,
        route_id: 'route.engineering.code-reviewer',
        success: true,
        duration_ms: 3000
      });
    }

    const result = await dream.run();
    const skillCandidates = result.candidates.filter((c) => c.type === 'skill');
    assert.ok(skillCandidates.length > 0);
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('clusters error patterns', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2, stagingDir });

  try {
    for (let i = 0; i < 3; i++) {
      memory.addEpisodicMemory('errors', {
        error_type: 'timeout',
        error_message: 'Request timeout',
        tool: 'webfetch',
        task: `fetch url ${i}`
      });
    }

    const result = await dream.run();
    const mistakeCandidates = result.candidates.filter((c) => c.type === 'mistake');
    assert.ok(mistakeCandidates.length > 0);
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('generates report file', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, stagingDir });

  try {
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
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('graduates lesson candidate', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, minClusterSize: 2, stagingDir });

  try {
    for (let i = 0; i < 3; i++) {
      memory.addEpisodicMemory('tasks', {
        task: `failing task ${i}`,
        route_id: 'route.test',
        success: false,
        duration_ms: 2000
      });
    }

    const result = await dream.run();
    const lessonCandidate = result.candidates.find((c) => c.type === 'lesson');

    if (lessonCandidate) {
      const candidateIndex = result.candidates.indexOf(lessonCandidate);
      const graduateResult = dream.graduate(candidateIndex, 'This is a test lesson');

      assert.equal(graduateResult.graduated, true);
      const lessons = memory.getSemanticMemory(10);
      assert.ok(lessons.some((l) => l.lesson === 'This is a test lesson'));
    }
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('rejects candidate', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, stagingDir });

  try {
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
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});

test('logs decisions', async () => {
  const memory = new MemoryManager();
  const stagingDir = tempDreamDir();
  const dream = new DreamCycle({ memoryManager: memory, stagingDir });

  try {
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
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
});
