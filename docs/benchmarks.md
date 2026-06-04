# Routing & Loading Benchmarks

This document details the benchmarking system built into `yes-human`. Benchmarking measures routing latency, startup speeds, and memory allocations locally on the developer machine.

---

## How Benchmarks Are Run

Benchmarks are triggered using the `yes` CLI:

```bash
# Run route resolution benchmarks
npx yes bench

# Or run via root script
npm run bench
```

This runs:
1. **Startup Performance**: Tracks the millisecond timing to load default, developer, document, business, security, and startup packs, compiling all routes.
2. **Memory Heap Allocations**: Measures heap growth after loading registries.
3. **Execution Latency**: Runs 500 iterations over a fixture suite of natural language queries to compute average sub-millisecond routing speeds.
4. **Accuracy and Fallbacks**: Validates routing resolutions against the target expected workflow IDs.

---

## Metric Explanations

* **Routes Loaded**: Total count of routing intent triggers defined across all workflows.
* **Workflows Loaded**: Total count of workflows registered.
* **Skills Loaded**: Total count of skill descriptions.
* **Startup Time**: Time in milliseconds required to initialize the router and parse the registries.
* **Memory Usage**: Heap memory change (in Megabytes) before and after pack ingestion.
* **Avg Route Lat**: The average latency (in milliseconds) to normalize a query and resolve the matching route.
* **Route Accuracy**: Percentage of test prompts correctly resolved to their expected workflow IDs.
* **Fallback Rate**: Percentage of prompts successfully routed to the default fallback `supreme-router` when no match exists.

---

## Performance Disclaimers

All benchmark statistics are **local sample results**. Performance metrics vary based on system hardware, CPU load, and background operations.

We do not make exaggerated claims. Deterministic routing is designed to run in under **0.1ms** on modern architectures, whereas semantic similarity models or network fallbacks will add latency matching the target endpoint speeds.

---

## Reproducing Locally

To replicate benchmark statistics:
1. Ensure your local workspaces are fully compiled:
   ```bash
   npm run build
   ```
2. Run the benchmarks:
   ```bash
   npm run bench
   ```
   The fixture definitions are loaded dynamically from [`benchmarks/fixtures/route-prompts.json`](file:///Users/moramvenkatasatyajaswanth/yes-human/benchmarks/fixtures/route-prompts.json).
