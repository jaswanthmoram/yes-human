import fs from 'fs';
import path from 'path';
import { MemoryManager } from './memory-manager.js';

/**
 * Dream Cycle - Nightly pattern extraction and staging
 * 
 * Implements auto-dream staging from agentic-harness:
 * - Clusters recurring patterns from episodic memory
 * - Stages candidate lessons/skills
 * - Generates review report
 * - Supports graduate/reject protocol
 * 
 * This runs nightly (via cron) to extract learnings from
 * task executions without requiring AI reasoning.
 */
export class DreamCycle {
  constructor(config = {}) {
    this.memory = config.memoryManager || new MemoryManager();
    this.stagingDir = config.stagingDir || 'staging/dream';
    this.minClusterSize = config.minClusterSize || 3; // Minimum occurrences to stage
    
    this.ensureStagingDir();
  }

  /**
   * Ensure staging directory exists
   */
  ensureStagingDir() {
    if (!fs.existsSync(this.stagingDir)) {
      fs.mkdirSync(this.stagingDir, { recursive: true });
    }
  }

  /**
   * Run nightly dream cycle
   * 
   * @returns {Promise<Object>} - { candidates: Array, report: string }
   */
  async run() {
    console.log('[dream] Starting nightly dream cycle...');
    const startTime = Date.now();

    // 1. Load episodic memories
    const tasks = this.memory.getEpisodicMemory('tasks', 1000);
    const errors = this.memory.getEpisodicMemory('errors', 100);
    const toolExecutions = this.memory.getEpisodicMemory('tool-executions', 500);

    console.log(`[dream] Loaded ${tasks.length} tasks, ${errors.length} errors, ${toolExecutions.length} tool executions`);

    // 2. Cluster patterns
    const taskClusters = this.clusterTaskPatterns(tasks);
    const errorClusters = this.clusterErrors(errors);
    const toolClusters = this.clusterToolPatterns(toolExecutions);

    console.log(`[dream] Found ${taskClusters.length} task clusters, ${errorClusters.length} error clusters, ${toolClusters.length} tool clusters`);

    // 3. Stage candidates
    const candidates = this.stageCandidates(taskClusters, errorClusters, toolClusters);

    console.log(`[dream] Staged ${candidates.length} candidates for review`);

    // 4. Generate review report
    const report = this.generateReport(candidates, {
      tasks: tasks.length,
      errors: errors.length,
      toolExecutions: toolExecutions.length,
      duration: Date.now() - startTime
    });

    console.log(`[dream] Report: ${report}`);

    return { candidates, report };
  }

  /**
   * Cluster task patterns by route + success
   */
  clusterTaskPatterns(tasks) {
    const clusters = {};
    
    for (const task of tasks) {
      const key = `${task.route_id || 'unknown'}|${task.success}`;
      
      if (!clusters[key]) {
        clusters[key] = {
          route: task.route_id,
          success: task.success,
          count: 0,
          examples: [],
          avg_duration: 0
        };
      }
      
      clusters[key].count++;
      
      if (clusters[key].examples.length < 5) {
        clusters[key].examples.push({
          task: task.task,
          duration: task.duration_ms,
          timestamp: task.timestamp
        });
      }
      
      // Update average duration
      const total = clusters[key].avg_duration * (clusters[key].count - 1) + (task.duration_ms || 0);
      clusters[key].avg_duration = total / clusters[key].count;
    }
    
    // Filter to recurring patterns (minClusterSize+ occurrences)
    return Object.values(clusters).filter(c => c.count >= this.minClusterSize);
  }

  /**
   * Cluster errors by type
   */
  clusterErrors(errors) {
    const clusters = {};
    
    for (const error of errors) {
      const key = error.error_type || 'unknown';
      
      if (!clusters[key]) {
        clusters[key] = {
          type: key,
          count: 0,
          examples: [],
          common_tools: {}
        };
      }
      
      clusters[key].count++;
      
      if (clusters[key].examples.length < 3) {
        clusters[key].examples.push({
          error_message: error.error_message,
          task: error.task,
          tool: error.tool,
          timestamp: error.timestamp
        });
      }
      
      // Track common tools that cause this error
      if (error.tool) {
        clusters[key].common_tools[error.tool] = (clusters[key].common_tools[error.tool] || 0) + 1;
      }
    }
    
    return Object.values(clusters).filter(c => c.count >= 2);
  }

  /**
   * Cluster tool execution patterns
   */
  clusterToolPatterns(toolExecutions) {
    const clusters = {};
    
    for (const exec of toolExecutions) {
      const key = `${exec.tool}|${exec.success}`;
      
      if (!clusters[key]) {
        clusters[key] = {
          tool: exec.tool,
          success: exec.success,
          count: 0,
          avg_duration: 0,
          examples: []
        };
      }
      
      clusters[key].count++;
      
      if (clusters[key].examples.length < 3) {
        clusters[key].examples.push({
          duration: exec.duration,
          task: exec.task,
          timestamp: exec.timestamp
        });
      }
      
      // Update average duration
      const total = clusters[key].avg_duration * (clusters[key].count - 1) + (exec.duration || 0);
      clusters[key].avg_duration = total / clusters[key].count;
    }
    
    return Object.values(clusters).filter(c => c.count >= this.minClusterSize);
  }

  /**
   * Stage candidates from clusters
   */
  stageCandidates(taskClusters, errorClusters, toolClusters) {
    const candidates = [];

    // Success patterns → skill candidates
    for (const cluster of taskClusters.filter(c => c.success)) {
      candidates.push({
        type: 'skill',
        pattern: `Successful ${cluster.route} tasks`,
        count: cluster.count,
        avg_duration: Math.round(cluster.avg_duration),
        examples: cluster.examples,
        recommendation: 'Consider promoting to skill registry',
        priority: cluster.count >= 10 ? 'high' : 'medium'
      });
    }

    // Failure patterns → lesson candidates
    for (const cluster of taskClusters.filter(c => !c.success)) {
      candidates.push({
        type: 'lesson',
        pattern: `Failed ${cluster.route} tasks`,
        count: cluster.count,
        examples: cluster.examples,
        recommendation: 'Extract lesson and add to semantic memory',
        priority: cluster.count >= 5 ? 'high' : 'medium'
      });
    }

    // Error patterns → mistake graph candidates
    for (const cluster of errorClusters) {
      const topTools = Object.entries(cluster.common_tools)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([tool, count]) => `${tool}(${count})`)
        .join(', ');
      
      candidates.push({
        type: 'mistake',
        pattern: `${cluster.type} errors`,
        count: cluster.count,
        common_tools: topTools,
        examples: cluster.examples,
        recommendation: 'Add to mistake graph for future avoidance',
        priority: cluster.count >= 5 ? 'high' : 'medium'
      });
    }

    // Tool patterns → optimization candidates
    for (const cluster of toolClusters) {
      if (cluster.avg_duration > 30000) { // Slow tools
        candidates.push({
          type: 'optimization',
          pattern: `Slow ${cluster.tool} executions`,
          count: cluster.count,
          avg_duration: Math.round(cluster.avg_duration),
          examples: cluster.examples,
          recommendation: 'Consider caching or optimizing this tool',
          priority: cluster.count >= 10 ? 'high' : 'low'
        });
      }
    }

    // Write to staging
    const timestamp = new Date().toISOString().split('T')[0];
    const stagingFile = path.join(this.stagingDir, `candidates-${timestamp}.json`);
    fs.writeFileSync(stagingFile, JSON.stringify(candidates, null, 2));

    return candidates;
  }

  /**
   * Generate review report
   */
  generateReport(candidates, stats) {
    const report = [
      '# Dream Cycle Report',
      '',
      `**Generated:** ${new Date().toISOString()}`,
      `**Duration:** ${stats.duration}ms`,
      '',
      '## Statistics',
      '',
      `- Tasks analyzed: ${stats.tasks}`,
      `- Errors analyzed: ${stats.errors}`,
      `- Tool executions analyzed: ${stats.toolExecutions}`,
      `- Candidates staged: ${candidates.length}`,
      '',
      '## Summary',
      '',
      `- **Skills:** ${candidates.filter(c => c.type === 'skill').length}`,
      `- **Lessons:** ${candidates.filter(c => c.type === 'lesson').length}`,
      `- **Mistakes:** ${candidates.filter(c => c.type === 'mistake').length}`,
      `- **Optimizations:** ${candidates.filter(c => c.type === 'optimization').length}`,
      '',
      '## High Priority Candidates',
      ''
    ];

    // High priority candidates first
    const highPriority = candidates.filter(c => c.priority === 'high');
    for (const candidate of highPriority) {
      report.push(`### ${candidate.type.toUpperCase()}: ${candidate.pattern}`);
      report.push(`- **Count:** ${candidate.count}`);
      if (candidate.avg_duration) {
        report.push(`- **Avg Duration:** ${candidate.avg_duration}ms`);
      }
      if (candidate.common_tools) {
        report.push(`- **Common Tools:** ${candidate.common_tools}`);
      }
      report.push(`- **Recommendation:** ${candidate.recommendation}`);
      report.push('');
    }

    // Medium priority candidates
    const mediumPriority = candidates.filter(c => c.priority === 'medium');
    if (mediumPriority.length > 0) {
      report.push('## Medium Priority Candidates');
      report.push('');
      
      for (const candidate of mediumPriority.slice(0, 10)) { // Limit to 10
        report.push(`### ${candidate.type.toUpperCase()}: ${candidate.pattern}`);
        report.push(`- **Count:** ${candidate.count}`);
        report.push(`- **Recommendation:** ${candidate.recommendation}`);
        report.push('');
      }
    }

    const reportPath = path.join(this.stagingDir, 'report.md');
    fs.writeFileSync(reportPath, report.join('\n'));

    return reportPath;
  }

  /**
   * Graduate a candidate to semantic memory or skill registry
   * 
   * @param {number} candidateId - Candidate index
   * @param {string} rationale - Why this candidate is being graduated
   * @returns {Object} - { graduated: boolean, candidate: Object }
   */
  graduate(candidateId, rationale) {
    // Load latest candidates
    const stagingFiles = fs.readdirSync(this.stagingDir)
      .filter(f => f.startsWith('candidates-'))
      .sort()
      .reverse();
    
    if (stagingFiles.length === 0) {
      throw new Error('No candidates found');
    }
    
    const latestFile = stagingFiles[0];
    const candidates = JSON.parse(fs.readFileSync(path.join(this.stagingDir, latestFile), 'utf8'));
    const candidate = candidates[candidateId];

    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`);
    }

    // Graduate based on type
    if (candidate.type === 'lesson') {
      this.memory.addSemanticMemory({
        pattern: candidate.pattern,
        lesson: rationale,
        source_episodes: candidate.examples.map(e => e.trace_id || e.timestamp),
        context: `Count: ${candidate.count}`
      });
    } else if (candidate.type === 'mistake') {
      this.memory.addSemanticMemory({
        pattern: candidate.pattern,
        lesson: `Avoid: ${rationale}`,
        source_episodes: candidate.examples.map(e => e.trace_id || e.timestamp),
        context: `Common tools: ${candidate.common_tools || 'unknown'}`,
        error_type: candidate.pattern.split(' ')[0]
      });
    }

    // Log decision
    this.logDecision(candidateId, 'graduate', rationale);

    return { graduated: true, candidate };
  }

  /**
   * Reject a candidate with rationale
   * 
   * @param {number} candidateId - Candidate index
   * @param {string} rationale - Why this candidate is being rejected
   * @returns {Object} - { rejected: boolean, candidateId: number }
   */
  reject(candidateId, rationale) {
    this.logDecision(candidateId, 'reject', rationale);
    return { rejected: true, candidateId };
  }

  /**
   * Log decision to decision log
   */
  logDecision(candidateId, decision, rationale) {
    const decisionLog = path.join(this.stagingDir, 'decisions.jsonl');
    const entry = {
      candidate_id: candidateId,
      decision,
      rationale,
      timestamp: new Date().toISOString()
    };
    fs.appendFileSync(decisionLog, JSON.stringify(entry) + '\n');
  }

  /**
   * Get decision history
   */
  getDecisions(limit = 50) {
    const decisionLog = path.join(this.stagingDir, 'decisions.jsonl');
    
    if (!fs.existsSync(decisionLog)) {
      return [];
    }
    
    const lines = fs.readFileSync(decisionLog, 'utf8').trim().split('\n');
    return lines
      .map(line => JSON.parse(line))
      .slice(-limit);
  }
}
