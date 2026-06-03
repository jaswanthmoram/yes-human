import { loadBuildContext, buildHost } from '../packages/yes-adapters/index.js';

const host = process.argv[2] || 'cursor';
console.log(`Building ${host} bundle...\n`);

const ctx = loadBuildContext();
await buildHost(host, ctx);

console.log(`\nBundle written to generated/${host}/`);
