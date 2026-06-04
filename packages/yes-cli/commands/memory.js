import { MemoryManager } from '../../yes-runtime/memory-manager.js';
import { formatBytes } from './helpers.js';

export function cmdMemory(args) {
  const subcommand = args[0];
  const memory = new MemoryManager();

  if (subcommand === 'status') {
    let stats;
    try {
      stats = memory.getStats();
    } catch (err) {
      console.error(`✗ Memory stats failed: ${err.message}`);
      return 1;
    }

    console.log('Memory Status\n');
    console.log(`  Working memory:`);
    console.log(`    Files: ${stats.working.count}`);
    console.log(`    Size: ${formatBytes(stats.working.size)}`);

    console.log(`\n  Episodic memory:`);
    console.log(`    Entries: ${stats.episodic.count}`);
    console.log(`    Size: ${formatBytes(stats.episodic.size)}`);

    console.log(`\n  Semantic memory:`);
    console.log(`    Lessons: ${stats.semantic.count}`);
    console.log(`    Size: ${formatBytes(stats.semantic.size)}`);

    console.log(`\n  Personal memory:`);
    console.log(`    Preferences: ${stats.personal.count}`);
    console.log(`    Size: ${formatBytes(stats.personal.size)}`);

    const totalSize = stats.working.size + stats.episodic.size + stats.semantic.size + stats.personal.size;
    console.log(`\n  Total: ${formatBytes(totalSize)}`);

    return 0;
  }

  if (subcommand === 'clear') {
    const confirm = args.includes('--confirm');

    if (!confirm) {
      console.error('Usage: yes memory clear --confirm');
      console.error('Warning: This will delete all memory files!');
      return 1;
    }

    try {
      memory.clearAll();
    } catch (err) {
      console.error(`✗ Memory clear failed: ${err.message}`);
      return 1;
    }
    console.log('✓ All memory cleared');
    return 0;
  }

  if (subcommand === 'archive') {
    let archived;
    try {
      archived = memory.archiveWorkingMemory();
    } catch (err) {
      console.error(`✗ Memory archive failed: ${err.message}`);
      return 1;
    }
    console.log(`✓ Archived ${archived} working memory entries to episodic`);
    return 0;
  }

  console.error('Usage: yes memory <status|clear|archive>');
  return 1;
}
