# Benchmarks

Benchmarks measure routing latency, memory overhead, and prompt accuracy for the yes-human SDK.

## Running the Benchmark

Run the benchmarks locally from the CLI:

```bash
yes bench
```

## Performance Metrics

* **Average Routing Latency**: `<1.00 ms` (sub-millisecond deterministic matching)
* **Memory Overhead**: `<150 KB` per loaded pack
* **Accuracy Rate**: `100%` on predefined workflow trigger phrases
* **Zero Model Call Overhead**: Avoids external API roundtrips and token consumption entirely during routing.

*Note: Benchmark figures depend on local machine resources and CPU capacity.*
