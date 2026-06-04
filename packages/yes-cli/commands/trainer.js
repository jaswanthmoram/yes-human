import { YesTrainer } from '../../yes-runtime/yes-trainer.js';
import { repoRoot } from './helpers.js';

export function cmdTrainer(args) {
  const trainer = new YesTrainer({ repoRoot });
  const sub = args[0] || 'report';

  if (sub === 'report') {
    try {
      const result = trainer.report();
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Trainer report failed: ${err.message}`);
      return 1;
    }
  }

  if (sub === 'suggest' || sub === 'suggest-workflows') {
    try {
      const result = trainer.suggestWorkflows();
      console.log(JSON.stringify(result, null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Trainer suggest failed: ${err.message}`);
      return 1;
    }
  }

  console.error('Usage: yes trainer <report|suggest>');
  return 1;
}
