import { OfflineRecovery } from '../../yes-runtime/offline-recovery.js';
import { repoRoot } from './helpers.js';

export function cmdOffline(args) {
  const recovery = new OfflineRecovery({ repoRoot });
  const sub = args[0] || 'status';
  if (sub === 'status') {
    try {
      console.log(JSON.stringify(recovery.status(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline status failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'checkpoint') {
    try {
      console.log(JSON.stringify(recovery.checkpoint(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline checkpoint failed: ${err.message}`);
      return 1;
    }
  }
  if (sub === 'recover' || sub === 'resume') {
    try {
      console.log(JSON.stringify(recovery.recover(), null, 2));
      return 0;
    } catch (err) {
      console.error(`✗ Offline recovery failed: ${err.message}`);
      return 1;
    }
  }
  console.error('Usage: yes offline <status|checkpoint|recover>');
  return 1;
}
