import { resolveRouteSync } from '../packages/yes-runtime/router.js';

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

const ITERATIONS = 1000; // Increase iterations to get a more accurate reading of sub-millisecond speeds
const MAX_ALLOWED_AVG_MS = 0.5; // 0.5ms threshold

async function main() {
  console.log(`Running core routing baseline validation (${ITERATIONS} iterations)...`);
  const t0 = performance.now();
  let totalResolved = 0;

  for (let i = 0; i < ITERATIONS; i++) {
    for (const task of TASKS) {
      resolveRouteSync(task);
      totalResolved++;
    }
  }

  const elapsed = performance.now() - t0;
  const avgMs = elapsed / totalResolved;
  const opsPerSec = Math.round(totalResolved / (elapsed / 1000));

  console.log(`Resolved ${totalResolved} queries.`);
  console.log(`Average latency: ${avgMs.toFixed(4)} ms`);
  console.log(`Throughput: ${opsPerSec.toLocaleString()} routes/sec`);

  if (avgMs > MAX_ALLOWED_AVG_MS) {
    console.error(`✗ Regression detected! Average routing latency is ${avgMs.toFixed(4)} ms (threshold: ${MAX_ALLOWED_AVG_MS} ms).`);
    process.exit(1);
  }

  console.log(`✓ Performance check passed (average latency ${avgMs.toFixed(4)} ms <= baseline ${MAX_ALLOWED_AVG_MS} ms).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(`Error running baseline benchmark: ${err.message}`);
  process.exit(1);
});
