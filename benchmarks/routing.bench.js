import { resolveRoute } from '../packages/yes-runtime/router.js';

const TASKS = [
  'review code',
  'deploy to staging',
  'write unit tests',
  'fix build error',
  'design a dashboard',
  'analyze expenses',
  'security audit',
  'refactor the auth module',
  'create a marketing plan',
  'unknown task that should fallback'
];

const ITERATIONS = 100;

console.log(`Routing benchmark: ${ITERATIONS} iterations x ${TASKS.length} tasks\n`);

const t0 = performance.now();
let totalResolved = 0;

for (let i = 0; i < ITERATIONS; i++) {
  for (const task of TASKS) {
    await resolveRoute(task);
    totalResolved++;
  }
}

const elapsed = performance.now() - t0;
const avgMs = elapsed / totalResolved;
const opsPerSec = Math.round(totalResolved / (elapsed / 1000));

console.log(`Total resolved: ${totalResolved}`);
console.log(`Elapsed: ${elapsed.toFixed(2)}ms`);
console.log(`Avg per route: ${avgMs.toFixed(3)}ms`);
console.log(`Throughput: ${opsPerSec.toLocaleString()} routes/sec`);
