import fs from 'fs';
import path from 'path';

/**
 * 4-Layer Memory Manager (from agentic-harness pattern)
 * 
 * Memory layers:
 * 1. working/ - Live task state, volatile, archived after 2 days
 * 2. episodic/ - What happened in prior runs, JSONL, scored by salience
 * 3. semantic/ - Distilled patterns that outlive episodes (lessons.jsonl → LESSONS.md)
 * 4. personal/ - User preferences, never merged into semantic
 * 
 * Features:
 * - Salience scoring for episodic memory
 * - Automatic archival of working memory
 * - Pattern clustering for dream cycles
 * - FTS5 search fallback chain
 */
export class MemoryManager {
  constructor(config = {}) {
    this.memoryDir = config.memoryDir || 'graph/memory';
    this.workingDir = path.join(this.memoryDir, 'working');
    this.episodicDir = path.join(this.memoryDir, 'episodic');
    this.semanticDir = path.join(this.memoryDir, 'semantic');
    this.personalDir = path.join(this.memoryDir, 'personal');
    
    this.ensureDirectories();
  }

  /**
   * Ensure all memory directories exist
   */
  ensureDirectories() {
    const dirs = [this.workingDir, this.episodicDir, this.semanticDir, this.personalDir];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  // ==================== WORKING MEMORY ====================

  /**
   * Set working memory value (session-scoped, volatile)
   */
  setWorkingMemory(key, value) {
    const filePath = path.join(this.workingDir, `${key}.json`);
    const data = {
      key,
      value,
      timestamp: new Date().toISOString(),
      expires_at: this.getExpirationDate(2) // 2 days
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Get working memory value
   */
  getWorkingMemory(key) {
    const filePath = path.join(this.workingDir, `${key}.json`);
    if (!fs.existsSync(filePath)) return null;
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Check expiration
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        fs.unlinkSync(filePath);
        return null;
      }
      
      return data.value;
    } catch {
      return null;
    }
  }

  /**
   * Clear all working memory
   */
  clearWorkingMemory() {
    const files = fs.readdirSync(this.workingDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      fs.unlinkSync(path.join(this.workingDir, file));
    }
  }

  /**
   * Archive expired working memory to episodic
   */
  archiveWorkingMemory() {
    const files = fs.readdirSync(this.workingDir).filter(f => f.endsWith('.json'));
    let archived = 0;
    
    for (const file of files) {
      const filePath = path.join(this.workingDir, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          // Archive to episodic
          this.addEpisodicMemory('tasks', {
            key: data.key,
            value: data.value,
            archived_from: 'working',
            original_timestamp: data.timestamp
          });
          
          fs.unlinkSync(filePath);
          archived++;
        }
      } catch {
        // Skip invalid files
      }
    }
    
    return archived;
  }

  // ==================== EPISODIC MEMORY ====================

  /**
   * Add episodic memory entry (task logs, scored by salience)
   */
  addEpisodicMemory(category, entry) {
    const filePath = path.join(this.episodicDir, `${category}.jsonl`);
    const enriched = {
      ...entry,
      timestamp: new Date().toISOString(),
      salience: this.calculateSalience(entry),
      id: this.generateId()
    };
    
    fs.appendFileSync(filePath, JSON.stringify(enriched) + '\n');
    return enriched.id;
  }

  /**
   * Get episodic memory entries (sorted by salience)
   */
  getEpisodicMemory(category, limit = 100) {
    const filePath = path.join(this.episodicDir, `${category}.jsonl`);
    if (!fs.existsSync(filePath)) return [];
    
    try {
      const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
      return lines
        .map(line => JSON.parse(line))
        .sort((a, b) => (b.salience || 0) - (a.salience || 0))
        .slice(0, limit);
    } catch {
      return [];
    }
  }

  /**
   * Search episodic memory using simple text matching
   */
  searchEpisodicMemory(category, query, limit = 10) {
    const entries = this.getEpisodicMemory(category, 1000);
    const queryLower = query.toLowerCase();
    
    return entries
      .filter(entry => {
        const text = JSON.stringify(entry).toLowerCase();
        return text.includes(queryLower);
      })
      .slice(0, limit);
  }

  /**
   * Calculate salience score for episodic memory
   */
  calculateSalience(entry) {
    let score = 0;
    
    // Failures are more salient
    if (entry.success === false || entry.error) score += 10;
    
    // Long tasks are more salient
    if (entry.duration && entry.duration > 60000) score += 5;
    
    // Multi-agent tasks are more salient
    if (entry.agents && entry.agents.length > 2) score += 3;
    
    // Errors are highly salient
    if (entry.error) score += 8;
    
    // User feedback
    if (entry.user_feedback === 'negative') score += 15;
    if (entry.user_feedback === 'positive') score += 2;
    
    // Complexity
    if (entry.tools && entry.tools.length > 3) score += 2;
    
    return score;
  }

  // ==================== SEMANTIC MEMORY ====================

  /**
   * Add semantic memory (distilled lessons that outlive episodes)
   */
  addSemanticMemory(lesson) {
    const filePath = path.join(this.semanticDir, 'lessons.jsonl');
    const enriched = {
      ...lesson,
      timestamp: new Date().toISOString(),
      id: this.generateId(),
      source_episodes: lesson.source_episodes || []
    };
    
    fs.appendFileSync(filePath, JSON.stringify(enriched) + '\n');
    
    // Also update LESSONS.md for human readability
    this.updateLessonsMarkdown();
    
    return enriched.id;
  }

  /**
   * Get semantic memory (lessons)
   */
  getSemanticMemory(limit = 50) {
    const filePath = path.join(this.semanticDir, 'lessons.jsonl');
    if (!fs.existsSync(filePath)) return [];
    
    try {
      const lines = fs.readFileSync(filePath, 'utf8').trim().split('\n');
      return lines
        .map(line => JSON.parse(line))
        .slice(-limit); // Most recent lessons
    } catch {
      return [];
    }
  }

  /**
   * Update LESSONS.md from lessons.jsonl
   */
  updateLessonsMarkdown() {
    const lessons = this.getSemanticMemory(100);
    const mdPath = path.join(this.semanticDir, 'LESSONS.md');
    
    let md = '# Lessons Learned\n\n';
    md += `*Auto-generated from ${lessons.length} lessons*\n\n`;
    
    // Group by pattern
    const byPattern = {};
    for (const lesson of lessons) {
      const pattern = lesson.pattern || 'Uncategorized';
      if (!byPattern[pattern]) byPattern[pattern] = [];
      byPattern[pattern].push(lesson);
    }
    
    for (const [pattern, patternLessons] of Object.entries(byPattern)) {
      md += `## ${pattern}\n\n`;
      for (const lesson of patternLessons.slice(0, 5)) {
        md += `- **${lesson.lesson}** (${lesson.timestamp.split('T')[0]})\n`;
        if (lesson.context) {
          md += `  - Context: ${lesson.context}\n`;
        }
      }
      md += '\n';
    }
    
    fs.writeFileSync(mdPath, md);
  }

  // ==================== PERSONAL MEMORY ====================

  /**
   * Set personal preference (never merged into semantic)
   */
  setPersonalPreference(key, value) {
    const filePath = path.join(this.personalDir, 'preferences.json');
    let prefs = {};
    
    if (fs.existsSync(filePath)) {
      try {
        prefs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch {
        prefs = {};
      }
    }
    
    prefs[key] = {
      value,
      updated_at: new Date().toISOString()
    };
    
    fs.writeFileSync(filePath, JSON.stringify(prefs, null, 2));
  }

  /**
   * Get personal preference
   */
  getPersonalPreference(key) {
    const filePath = path.join(this.personalDir, 'preferences.json');
    if (!fs.existsSync(filePath)) return null;
    
    try {
      const prefs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return prefs[key]?.value ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Get all personal preferences
   */
  getAllPersonalPreferences() {
    const filePath = path.join(this.personalDir, 'preferences.json');
    if (!fs.existsSync(filePath)) return {};
    
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      return {};
    }
  }

  // ==================== UTILITIES ====================

  /**
   * Generate unique ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get expiration date (days from now)
   */
  getExpirationDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  }

  /**
   * Get memory statistics
   */
  getStats() {
    const stats = {
      working: { count: 0, size: 0 },
      episodic: { count: 0, size: 0 },
      semantic: { count: 0, size: 0 },
      personal: { count: 0, size: 0 }
    };
    
    // Working
    const workingFiles = fs.readdirSync(this.workingDir).filter(f => f.endsWith('.json'));
    stats.working.count = workingFiles.length;
    stats.working.size = workingFiles.reduce((sum, f) => {
      return sum + fs.statSync(path.join(this.workingDir, f)).size;
    }, 0);
    
    // Episodic
    const episodicFiles = fs.readdirSync(this.episodicDir).filter(f => f.endsWith('.jsonl'));
    for (const file of episodicFiles) {
      const content = fs.readFileSync(path.join(this.episodicDir, file), 'utf8');
      const lines = content.trim().split('\n').filter(l => l.trim());
      stats.episodic.count += lines.length;
      stats.episodic.size += content.length;
    }
    
    // Semantic
    const lessonsPath = path.join(this.semanticDir, 'lessons.jsonl');
    if (fs.existsSync(lessonsPath)) {
      const content = fs.readFileSync(lessonsPath, 'utf8');
      const lines = content.trim().split('\n').filter(l => l.trim());
      stats.semantic.count = lines.length;
      stats.semantic.size = content.length;
    }
    
    // Personal
    const prefsPath = path.join(this.personalDir, 'preferences.json');
    if (fs.existsSync(prefsPath)) {
      const content = fs.readFileSync(prefsPath, 'utf8');
      const prefs = JSON.parse(content);
      stats.personal.count = Object.keys(prefs).length;
      stats.personal.size = content.length;
    }
    
    return stats;
  }

  /**
   * Clear all memory (use with caution)
   */
  clearAll() {
    this.clearWorkingMemory();
    
    // Clear episodic
    const episodicFiles = fs.readdirSync(this.episodicDir).filter(f => f.endsWith('.jsonl'));
    for (const file of episodicFiles) {
      fs.unlinkSync(path.join(this.episodicDir, file));
    }
    
    // Clear semantic
    const lessonsPath = path.join(this.semanticDir, 'lessons.jsonl');
    if (fs.existsSync(lessonsPath)) {
      fs.unlinkSync(lessonsPath);
    }
    const mdPath = path.join(this.semanticDir, 'LESSONS.md');
    if (fs.existsSync(mdPath)) {
      fs.unlinkSync(mdPath);
    }
    
    // Clear personal
    const prefsPath = path.join(this.personalDir, 'preferences.json');
    if (fs.existsSync(prefsPath)) {
      fs.unlinkSync(prefsPath);
    }
  }
}
