import fs from 'fs';
import path from 'path';
export function proposeRouteProposal(repoRoot, { phrase, route_id, source = 'cli' }) {
  if (!phrase || !route_id) throw new Error('phrase and route_id required');
  const dir = path.join(repoRoot, 'staging/learning');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'route-proposals.jsonl');
  const entry = { proposed_at: new Date().toISOString(), phrase, route_id, source, status: 'pending_human_apply' };
  fs.appendFileSync(file, JSON.stringify(entry) + '\n');
  return { path: path.relative(repoRoot, file), entry };
}
