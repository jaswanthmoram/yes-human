import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { LearningEngine } from '../../packages/yes-runtime/learning-engine.js';
import { WorkflowMiner } from '../../packages/yes-runtime/workflow-miner.js';
import { OfflineRecovery } from '../../packages/yes-runtime/offline-recovery.js';
import { ToolStrategy } from '../../packages/yes-runtime/tool-strategy.js';

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'yh-phase9-'));
}

function teamMode(dir) {
  return {
    enabled: true,
    default_tenant: 'local',
    isolation: {
      base_dir: path.join(dir, 'tenants'),
      trace_file: 'traces.jsonl',
      hash_tenant_ids: true,
      deny_cross_tenant_reads: true
    },
    redaction: {
      enabled: true,
      hash_task_text: true,
      drop_raw_task: true,
      redact_fields: ['password', 'token'],
      redact_patterns: ['email', 'openai_key']
    }
  };
}

test('records tenant-scoped redacted traces without raw task text', () => {
  const dir = tempDir();
  try {
    const engine = new LearningEngine({
      repoRoot: dir,
      memoryDir: path.join(dir, 'memory'),
      learningDir: path.join(dir, 'learning'),
      feedbackDir: path.join(dir, 'feedback'),
      mistakeGraphFile: path.join(dir, 'learning/mistake-graph.json'),
      teamMode: teamMode(dir)
    });

    const result = engine.recordTrace({
      tenant_id: 'team-a',
      task: 'Email test@example.com using sk-12345678901234567890',
      route_id: 'route.engineering.code-reviewer',
      success: true
    });

    assert.equal(result.trace.task_redacted, null);
    assert.ok(result.trace.task_hash);
    assert.ok(result.trace.tenant_hash);
    assert.equal(result.trace.tenant_id, null);
    assert.ok(fs.existsSync(result.trace_path));
    const stored = fs.readFileSync(result.trace_path, 'utf8');
    assert.ok(!stored.includes('test@example.com'));
    assert.ok(!stored.includes('sk-12345678901234567890'));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('tracks outcomes with decay and updates mistake graph on failures', () => {
  const dir = tempDir();
  try {
    const engine = new LearningEngine({
      repoRoot: dir,
      memoryDir: path.join(dir, 'memory'),
      learningDir: path.join(dir, 'learning'),
      feedbackDir: path.join(dir, 'feedback'),
      mistakeGraphFile: path.join(dir, 'learning/mistake-graph.json'),
      teamMode: teamMode(dir),
      policy: {
        outcome_tracking: { decay: 0.9, min_events_for_signal: 2, state_dir: 'learning' },
        mistake_graph: { state_file: 'learning/mistake-graph.json', min_repeats_for_candidate: 1 }
      }
    });

    engine.trackOutcome({ route_id: 'route.sales.deal-desk', success: true, score: 1 });
    const failed = engine.trackOutcome({
      route_id: 'route.sales.deal-desk',
      success: false,
      score: 0,
      failure_class: 'wrong-agent',
      suggested_route: 'route.sales.pipeline-analyst'
    });

    assert.equal(failed.route_stats.events, 2);
    assert.equal(failed.route_stats.signal_ready, true);
    const graph = JSON.parse(fs.readFileSync(path.join(dir, 'learning/mistake-graph.json'), 'utf8'));
    assert.ok(graph.nodes['route.sales.deal-desk#wrong-agent']);
    assert.equal(graph.nodes['route.sales.deal-desk#wrong-agent'].candidate_ready, true);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('stages feedback without production mutation', () => {
  const dir = tempDir();
  try {
    const engine = new LearningEngine({
      repoRoot: dir,
      memoryDir: path.join(dir, 'memory'),
      learningDir: path.join(dir, 'learning'),
      feedbackDir: path.join(dir, 'feedback'),
      mistakeGraphFile: path.join(dir, 'learning/mistake-graph.json'),
      teamMode: teamMode(dir),
      policy: {
        feedback_gate: {
          forbidden_mutations: ['registry/routes.json', 'graph/indexes/ROUTE_TABLE.min.json']
        }
      }
    });

    const result = engine.stageFeedback({
      type: 'wrong-agent',
      trace_id: 'trace-1',
      route_id: 'route.a',
      suggested_route: 'route.b',
      note: 'pick the other route'
    });

    assert.equal(result.feedback.production_mutation, false);
    assert.equal(result.feedback.status, 'staged_eval_required');
    assert.ok(result.feedback.blocked_mutations.includes('registry/routes.json'));
    assert.ok(fs.existsSync(result.path));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('workflow miner stages suggestions from repeated successful traces', () => {
  const dir = tempDir();
  try {
    const memoryDir = path.join(dir, 'memory');
    const episodicDir = path.join(memoryDir, 'episodic');
    fs.mkdirSync(episodicDir, { recursive: true });
    const traces = [
      { trace_id: 'a', route_id: 'route.engineering.code-reviewer', task_hash: 'h1', success: true, agents: ['engineering.code-reviewer'], tools: ['shell'] },
      { trace_id: 'b', route_id: 'route.engineering.code-reviewer', task_hash: 'h2', success: true, agents: ['engineering.code-reviewer'], tools: ['shell'] },
      { trace_id: 'c', route_id: 'route.engineering.code-reviewer', task_hash: 'h3', success: true, agents: ['engineering.code-reviewer'], tools: ['shell'] }
    ];
    fs.writeFileSync(path.join(episodicDir, 'tasks.jsonl'), traces.map((t) => JSON.stringify(t)).join('\n') + '\n');

    const miner = new WorkflowMiner({
      repoRoot: dir,
      memoryDir,
      suggestionDir: path.join(dir, 'suggestions'),
      minSuccesses: 3,
      minDistinctTaskHashes: 2
    });
    const result = miner.suggest();
    assert.equal(result.candidates.length, 1);
    assert.equal(result.candidates[0].production_mutation, false);
    assert.ok(fs.existsSync(result.path));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('offline recovery checkpoints and resumes locally', () => {
  const dir = tempDir();
  try {
    const recovery = new OfflineRecovery({
      repoRoot: dir,
      env: { YES_OFFLINE: '1' },
      policy: {
        env_flag: 'YES_OFFLINE',
        state_dir: 'offline',
        journal_file: 'offline/journal.jsonl',
        checkpoint_file: 'offline/checkpoint.json'
      }
    });
    const checkpoint = recovery.checkpoint('tool', { token: 'secret-value' });
    assert.equal(checkpoint.offline, true);
    assert.equal(recovery.status().journal_entries, 1);
    assert.equal(recovery.resume().resumable, true);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('tool strategy denies network tools in offline mode', async () => {
  const strategy = new ToolStrategy({ offline: true });
  const result = await strategy.execute({ type: 'scrape', url: 'https://example.com' });
  assert.equal(result.success, false);
  assert.match(result.error, /offline mode|unavailable/);
});

test('feedback lifecycle: review, apply dry-run, promote after skip-gate review', () => {
  const dir = tempDir();
  try {
    const engine = new LearningEngine({
      repoRoot: dir,
      memoryDir: path.join(dir, 'memory'),
      learningDir: path.join(dir, 'learning'),
      feedbackDir: path.join(dir, 'feedback'),
      mistakeGraphFile: path.join(dir, 'learning/mistake-graph.json'),
      teamMode: teamMode(dir),
      policy: {
        feedback_gate: {
          forbidden_mutations: ['registry/routes.json', 'graph/indexes/ROUTE_TABLE.min.json'],
          checks: []
        }
      }
    });
    const staged = engine.stageFeedback({
      type: 'wrong-agent',
      trace_id: 't1',
      route_id: 'route.a',
      suggested_route: 'route.b',
      metadata: { phrase: 'fix routing' }
    });
    const reviewed = engine.reviewFeedback(staged.feedback.id, 'accept', { run_gate: false });
    assert.equal(reviewed.feedback.status, 'reviewed');
    const applied = engine.applyFeedback(staged.feedback.id, { dry_run: true, phrase: 'fix routing' });
    assert.equal(applied.proposal.dry_run, true);
    assert.ok(applied.proposal.changes.length > 0);
    assert.ok(!fs.existsSync(path.join(dir, 'registry/routes.json')));
    const promoted = engine.promoteFeedback(staged.feedback.id);
    assert.equal(promoted.feedback.status, 'promoted');
    assert.ok(fs.existsSync(promoted.promoted_path));
    assert.ok(fs.readFileSync(path.join(dir, 'registry/ledger.jsonl'), 'utf8').includes('feedback_promotion'));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('apply fails when eval gate not passed on reviewed feedback', () => {
  const dir = tempDir();
  try {
    const engine = new LearningEngine({
      repoRoot: dir,
      feedbackDir: path.join(dir, 'feedback'),
      policy: { feedback_gate: { forbidden_mutations: [] } }
    });
    const staged = engine.stageFeedback({ type: 'partial', trace_id: 't2' });
    const entry = JSON.parse(fs.readFileSync(staged.path, 'utf8'));
    entry.status = 'reviewed';
    entry.eval_gate = { passed: false };
    fs.writeFileSync(staged.path, JSON.stringify(entry));
    assert.throws(() => engine.applyFeedback(staged.feedback.id), /eval gate/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
