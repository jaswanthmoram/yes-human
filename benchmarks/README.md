# yes-human Benchmarking Suite

This directory contains benchmarking code and fixtures to measure the startup time, memory footprints, and routing latency of the `yes-human` control plane.

## File Structure

* `fixtures/route-prompts.json`: Prompts with expected workflow IDs matching standard pack configurations.
* `results/sample-local-result.json`: Sample metrics from a local reference run on Apple Silicon hardware.
* `routing.bench.js`: Script to run baseline benchmark iterations.
* `assert-baseline.js`: Baseline performance regression assertion gates.

## Running Benchmarks

### Using the CLI (Recommended)
You can trigger the benchmark suite using:
```bash
npx yes bench
```

### Using npm scripts
```bash
npm run bench
```
This triggers the CLI `yes bench` command and logs the results to the standard output.
