---
id: engineering.flaky-test-detection
name: Flaky Test Identification and Fixing
description: Detect, diagnose, and fix flaky tests using statistical analysis and common flakiness pattern recognition.
triggers:
  - flaky test
  - intermittent failure
  - test sometimes fails
  - non-deterministic test
  - test is unreliable
  - flaky test fix
  - test passes sometimes
aliases:
  - flaky test detection
  - intermittent test
  - unreliable test
negative_keywords:
  - test coverage
  - test architecture
  - test data
  - performance test
inputs:
  - test_results_history
  - failing_test_names
  - test_source_code
  - ci_logs (optional)
outputs:
  - flaky_test_report
  - root_cause_analysis
  - fix_recommendations
  - quarantine_list
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Misidentifying real bugs as flaky tests
  - Fixing symptoms instead of root cause
  - Quarantining tests without fixing them
  - Introducing new flakiness while fixing existing issues
verification:
  - Fixed test passes consistently over 100+ runs
  - No new flaky tests introduced by fixes
  - Root cause is documented for each fix
  - CI reliability improves measurably
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Systematically identify flaky tests, diagnose their root causes using pattern recognition, and apply targeted fixes that eliminate non-determinism.

## When To Use
- Tests fail intermittently without code changes
- CI pipeline reliability is below acceptable thresholds
- Team reports tests that "sometimes pass, sometimes fail"
- Post-deployment test reliability audit
- Setting up flaky test detection infrastructure

## When Not To Use
- Tests that consistently fail (use engineering.test-triage)
- Test architecture design decisions
- Test data generation issues (use engineering.test-data-generation)
- Performance or load test flakiness

## Procedure
1. **Detect Flaky Tests**: Analyze test run history to find tests with non-deterministic outcomes. Use statistical methods: failure rate, consecutive pass/fail patterns, and rerun success rate.
2. **Categorize Flakiness Patterns**: Classify each flaky test by root cause pattern: timing/race conditions, test order dependency, resource leaks, external service dependency, async/timing issues, or shared mutable state.
3. **Isolate Root Cause**: For each flaky test, reproduce flakiness locally using stress testing (repeated runs, parallel execution). Add logging to identify the exact point of non-determinism.
4. **Apply Targeted Fix**: Fix based on pattern: add explicit waits for async operations, use deterministic test ordering, mock external dependencies, isolate shared state, use fake timers.
5. **Validate Fix**: Run the fixed test 100+ times to confirm deterministic behavior. Run in CI conditions to verify environment-specific flakiness is resolved.
6. **Quarantine Unresolved Tests**: For tests that cannot be immediately fixed, add quarantine tags with tracking issues. Ensure quarantined tests are monitored and scheduled for fix.
7. **Prevent Future Flakiness**: Document common flakiness patterns for the team. Add CI checks for test retry rates. Consider adding flaky test detection to PR checks.

## Tool Policy
- Use shell.readonly to run tests repeatedly and analyze results
- Use filesystem.read to inspect test source code and CI configuration
- Use code_graph.query to trace async call chains and shared state
- Never disable or delete flaky tests without documentation

## Verification
- Fixed test passes 100 consecutive runs without failure
- CI pipeline retry rate decreases after fixes
- No new flaky tests introduced in the same test suite
- Root cause is clearly documented for each resolved flaky test

## Failure Modes
- Applying retry logic instead of fixing the root cause
- Adding arbitrary sleep timers that slow down the entire suite
- Fixing a test in isolation but not addressing shared state issues
- Confusing environment-specific flakiness with code-level flakiness

## Example Routes
- `this test fails sometimes` -> engineering.flaky-test-detection
- `find flaky tests in CI` -> engineering.flaky-test-detection
- `fix intermittent test failure` -> engineering.flaky-test-detection

## Source Notes
Flaky test detection strategies from Google's testing blog, BuildPulse flaky test research, and Erlang/PropEr concurrency testing patterns. Reference dossier: `ref.github.engineering.2026-05-31`.
