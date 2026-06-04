import { MemoryManager } from '../../yes-runtime/memory-manager.js';
import { DreamCycle } from '../../yes-runtime/dream-cycle.js';

export async function cmdDream(args) {
  const memory = new MemoryManager();
  const dream = new DreamCycle({ memoryManager: memory });

  console.log('Starting dream cycle...\n');

  try {
    const result = await dream.run();

    console.log(`\n✓ Dream cycle complete`);
    console.log(`  Candidates staged: ${result.candidates.length}`);
    console.log(`  Report: ${result.report}`);

    // Show summary by type
    const byType = {};
    for (const candidate of result.candidates) {
      byType[candidate.type] = (byType[candidate.type] || 0) + 1;
    }

    console.log('\n  Summary:');
    for (const [type, count] of Object.entries(byType)) {
      console.log(`    ${type}: ${count}`);
    }

    return 0;
  } catch (error) {
    console.error(`✗ Dream cycle failed: ${error.message}`);
    return 1;
  }
}
