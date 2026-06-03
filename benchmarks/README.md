# Benchmarks

Performance benchmarks for yes-human. Run from the project root after `npm ci`.

## Routing throughput

```bash
node benchmarks/routing.bench.js
```

Measures route resolution speed across 10 representative tasks over 100 iterations.

## Host bundle build time

```bash
node benchmarks/build.bench.js
```

Measures the time to build all 9 host bundles.
