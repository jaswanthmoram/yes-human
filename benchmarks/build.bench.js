import { loadBuildContext, buildAll } from '../packages/yes-adapters/index.js';

const ITERATIONS = 3;

console.log(`Build benchmark: ${ITERATIONS} full builds\n`);

const times = [];

for (let i = 0; i < ITERATIONS; i++) {
  const t0 = performance.now();
  const ctx = loadBuildContext();
  await buildAll(ctx);
  const elapsed = performance.now() - t0;
  times.push(elapsed);
  console.log(`Build ${i + 1}: ${elapsed.toFixed(2)}ms`);
}

const avg = times.reduce((a, b) => a + b, 0) / times.length;
console.log(`\nAverage: ${avg.toFixed(2)}ms`);
console.log(`Min: ${Math.min(...times).toFixed(2)}ms`);
console.log(`Max: ${Math.max(...times).toFixed(2)}ms`);
