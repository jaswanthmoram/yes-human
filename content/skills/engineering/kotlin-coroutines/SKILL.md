---
id: engineering.kotlin-coroutines
name: Kotlin Coroutines and Flow Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Kotlin coroutines and Flow patterns including structured concurrency, coroutine scopes, channels, and reactive streams.
triggers:
  - kotlin coroutines
  - kotlin flow
  - coroutine scope
  - suspend function
  - kotlin async
  - kotlin channels
  - structured concurrency
aliases:
  - coroutines patterns
  - kotlin async
  - flow patterns
negative_keywords:
  - java threads
  - rxjava
  - javascript promises
  - go routines
inputs:
  - concurrency_requirements
  - kotlin_version
  - platform (JVM, Android, Multiplatform)
outputs:
  - coroutine_implementation
  - flow_pipeline_code
  - concurrency_pattern_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Coroutine leaks from unstructured launches
  - Deadlocks from improper dispatcher usage
  - Flow backpressure causing memory issues
  - Cancellation not propagating correctly
verification:
  - All coroutines launched within proper scopes
  - No GlobalScope usage in production code
  - Flow collection handles cancellation
  - Exception handling with CoroutineExceptionHandler
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to callback-based implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Kotlin coroutines and Flow patterns, ensuring structured concurrency, proper dispatcher usage, and robust error handling in asynchronous code.

## When To Use
- Implementing asynchronous operations in Kotlin
- Building reactive data pipelines with Flow
- Managing concurrent tasks with structured concurrency
- Replacing callbacks or RxJava with coroutines
- Implementing Android ViewModel async operations

## When Not To Use
- Java-only projects without Kotlin
- Simple synchronous operations
- Projects using RxJava with established patterns (unless migrating)
- Non-Kotlin platforms

## Procedure
1. **Define Coroutine Scope**: Choose appropriate scope (viewModelScope, lifecycleScope, custom SupervisorJob) based on lifecycle requirements.
2. **Select Dispatcher**: Use Dispatchers.IO for blocking I/O, Dispatchers.Default for CPU-intensive work, Dispatchers.Main for UI updates.
3. **Implement Suspend Functions**: Write suspend functions for async operations, using withContext for dispatcher switching.
4. **Build Flow Pipelines**: Create Flow producers with flow {}, apply operators (map, filter, debounce, combine), and collect with proper lifecycle awareness.
5. **Handle Errors**: Apply try-catch in suspend functions, use catch {} operator on Flows, and configure CoroutineExceptionHandler for uncaught exceptions.
6. **Manage Cancellation**: Ensure cooperative cancellation with isActive checks, use ensureActive() in long-running loops, and handle cleanup in finally blocks.
7. **Test Coroutines**: Use runTest, TestDispatcher, and Turbine for testing coroutine and Flow behavior.

## Tool Policy
- Use `filesystem.read` to inspect existing coroutine code
- Use `filesystem.write` to create or update coroutine implementations
- Use `code_graph.query` to trace coroutine scope usage across the codebase

## Verification
- Run `./gradlew test` to verify coroutine tests pass
- Use Kotlin coroutines debug mode (-Dkotlinx.coroutines.debug)
- Check for GlobalScope usage with static analysis
- Verify no coroutine leaks with LeakCanary (Android)

## Failure Modes
- **Coroutine Leaks**: Launching coroutines without proper scope; always use structured concurrency
- **Dispatcher Misuse**: Running blocking code on Main dispatcher causing ANR; use withContext(Dispatchers.IO)
- **Cancellation Issues**: Not checking isActive in loops; use yield() or ensureActive()
- **Flow Backpressure**: Unbounded buffer in Flow; use buffer() with capacity or conflate()
- **Exception Swallowing**: Catching exceptions inside coroutine without rethrowing; use SupervisorJob for isolation

## Example Routes
- `yes route "implement kotlin flow pipeline"` -> engineering.kotlin-coroutines
- `yes route "fix coroutine cancellation"` -> engineering.kotlin-coroutines
- `yes route "replace callbacks with coroutines"` -> engineering.kotlin-coroutines

## Source Notes
- Kotlin coroutines official guide: https://kotlinlang.org/docs/coroutines-guide.html
- Kotlin Flow documentation: https://kotlinlang.org/docs/flow.html
- Roman Elizarov's coroutine articles (Kotlin team lead)
- github.com/Kotlin/kotlinx.coroutines (13k+ stars)
- Reference dossier: ref.github.engineering.2026-05-31
