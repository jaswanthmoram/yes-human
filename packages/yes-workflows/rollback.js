export function describeRollback(workflow) {
  return workflow?.rollback || { mode: 'no_write', summary: 'No rollback metadata' };
}
