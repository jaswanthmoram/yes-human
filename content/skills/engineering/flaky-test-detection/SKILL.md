---
id: engineering.flaky-test-detection
name: Flaky Test Detection and Elimination
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Identify, classify, and permanently fix tests that non-deterministically pass or fail.
summary: Systematic flaky test elimination: detect via re-run analysis, classify root cause (timing, ordering, external deps, randomness), apply the correct fix pattern, and add quarantine gates to prevent re-introduction.
triggers:
  - flaky test detection
  - test fails intermittently
  - non deterministic test
  - test quarantine
  - fix flaky test
activation_triggers:
  - this test passes sometimes and fails sometimes
  - CI is unreliable because of flaky tests
prerequisites:
  - test suite runs in CI
  - ability to re-run tests in isolation
  - access to CI run history
inputs:
  - test_name_or_pattern
  - ci_run_history
steps:
  - Run the suspect test 10 times in isolation to confirm flakiness (use --runInBand for Node, -count=10 for Go)
  - Classify the root cause: timing (async/race), state pollution (shared mutable state), external dependency (network/DB), randomness (uncontrolled random), or ordering dependency
  - For timing issues: replace sleeps with explicit awaits, polling with waitFor, or proper lifecycle hooks
  - For state pollution: add beforeEach/afterEach cleanup, use per-test fixtures, avoid global singletons in tests
  - For external dependencies: mock the dependency at the test level or use testcontainers for isolated real instances
  - Add a quarantine label/tag, fix, verify with 20 consecutive passes, then remove quarantine tag
outputs:
  - root_cause_classification
  - fixed_test_file
  - consecutive_pass_count
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Test passes 20 consecutive times without modification
  - Root cause documented in test comment or PR description
  - No sleeps/arbitrary timeouts in fixed test
failure_modes:
  - Race condition masked by the fix but not eliminated — test still flaky under load
  - External service mocked incorrectly — test passes but doesn't reflect real behavior
  - Quarantine tag never removed — flaky tests accumulate
handoffs:
  - engineering.code-reviewer (for fix review)
source_references:
  - https://github.com/goldbergyoni/nodebestpractices
  - https://github.com/testcontainers/testcontainers-node
allowed_agents:
  - engineering.tdd-guide
  - engineering.build-resolver
status: active
budget_band: standard
rollback:
  - Revert fixed test file if fix introduces regression
  - Re-add quarantine tag if flakiness returns
validators:
  - skill.validator
---
## Trigger
Use when a test fails intermittently in CI or locally — not on every run but frequently enough to block reliable deployment.

## Prerequisites
- Can run the test in isolation (not as part of the full suite)
- CI run history available to confirm pattern (not just one-off)

## Steps

### 1. Confirm Flakiness
Run the test 10 times in isolation. If it fails at least once, it's genuinely flaky. Document the failure rate.

### 2. Classify Root Cause
Timing: async code not properly awaited. State: shared test state not reset. External: real network/DB calls. Random: seeded randomness not controlled. Ordering: test depends on another test's side effect.

### 3. Fix Timing Issues
Replace `setTimeout(done, 1000)` with proper `await`, `waitFor`, or event-based assertions. Use testing-library's `waitFor` or equivalent.

### 4. Fix State Pollution
Add explicit `beforeEach`/`afterEach` cleanup. Use factory functions to create fresh instances. Never share mutable state between test files.

### 5. Fix External Dependencies
Mock external services at the boundary using Jest mocks, Sinon stubs, or testcontainers for a real isolated instance.

### 6. Verify Elimination
Run 20 consecutive passes before marking fixed. Add comment documenting the root cause for future maintainers.

## Verification
- [ ] 20 consecutive passes confirmed
- [ ] Root cause documented
- [ ] No arbitrary sleeps/timeouts in fixed code

## Rollback
Revert the test change and re-add quarantine tag if flakiness returns.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Still flaky after timing fix | Race at OS level, not JS | Use event-driven assertion |
| Mock not matching real service | Mock too simplified | Use testcontainers |
| Fix breaks other tests | Shared state assumption | Audit all related tests |

## Examples
**Example A:** CI fails 1 in 5 runs on a test that waits for a Promise — fix: replace `setTimeout` with `await`.
**Example B:** DB test fails when run after another test — fix: add `afterEach` that truncates test tables.
