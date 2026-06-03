import { resolveRoute } from '../packages/yes-runtime/router.js';

const tasks = [
  'review my pull request',
  'deploy to production',
  'write unit tests for auth module',
  'analyze expense report',
  'design a landing page'
];

for (const task of tasks) {
  const route = await resolveRoute(task);
  console.log(`Task: "${task}"`);
  console.log(`  Route: ${route.route_id}`);
  console.log(`  Agent: ${route.target?.agent || '(none)'}`);
  console.log(`  Match: ${route._match?.stage} (${route._match?.confidence})`);
  console.log();
}
