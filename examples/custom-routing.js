import { resolveRoute } from '../packages/yes-runtime/router.js';

const task = process.argv.slice(2).join(' ') || 'help me debug a build error';

console.log(`Resolving: "${task}"\n`);

const route = await resolveRoute(task);

console.log('Full route object:');
console.log(JSON.stringify({
  route_id: route.route_id,
  target: route.target,
  budget_band: route.budget_band,
  match: {
    stage: route._match?.stage,
    confidence: route._match?.confidence,
    reason: route._match?.reason
  }
}, null, 2));
