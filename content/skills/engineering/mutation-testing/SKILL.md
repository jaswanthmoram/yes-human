---
id: engineering.mutation-testing
name: Mutation Testing with Stryker
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Measure test suite effectiveness by injecting code mutations and verifying tests catch them.
summary: Stryker introduces small code changes (mutations) — flipping operators, removing conditionals, changing return values — and checks if your tests fail (killed the mutant). A mutation score above 80% indicates a strong test suite.
triggers:
  - mutation testing
  - stryker mutation score
  - test suite quality check
  - mutation score report
  - kill mutants
activation_triggers:
  - our code coverage is 90% but bugs still slip through
  - how effective is our test suite really
prerequisites:
  - test suite exists with >50% line coverage
  - stryker installed (npx stryker run)
  - build passes cleanly
inputs:
  - target_files
  - test_runner_config
steps:
  - Install Stryker and initialize config (npx stryker init) — choose test runner (jest/mocha/karma)
  - Run Stryker on a focused module first (not the whole codebase) — set files to a single directory
  - Review HTML report: identify surviving mutants (mutations tests didn't catch)
  - For each survivor, write a test that would have killed it — the test is the specification
  - Re-run Stryker to confirm mutation score improved
  - Set a minimum mutation score threshold (80%) in stryker.config.js and add to CI
outputs:
  - mutation_score_report
  - surviving_mutants_list
  - new_test_cases
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Mutation score ≥80% on targeted module
  - All surviving mutants reviewed and either killed or documented as equivalent
  - Stryker threshold configured in CI
failure_modes:
  - Stryker takes too long — limit to one module at a time, use --concurrency flag
  - Many equivalent mutants — document as known-equivalent; don't write meaningless tests
  - Score drops after adding tests — check if new tests have assertions
handoffs:
  - engineering.tdd-guide (for writing killing tests)
source_references:
  - https://github.com/stryker-mutator/stryker-js
  - https://github.com/stryker-mutator/stryker-mutator.github.io
allowed_agents:
  - engineering.tdd-guide
  - engineering.code-reviewer
status: active
budget_band: standard
rollback:
  - Remove Stryker config if it blocks CI
  - Lower threshold temporarily while improving score
validators:
  - skill.validator
---
## Trigger
Use to measure real test suite effectiveness — not just coverage — especially before a major refactor or when bugs keep slipping through despite high coverage.

## Prerequisites
- Test suite passing cleanly
- stryker-cli available (npx stryker)

## Steps

### 1. Install and Init
`npx stryker init` generates stryker.config.js. Choose your test runner. Start with one module.

### 2. Run Focused Mutation
`npx stryker run --files src/payments/**` — limit scope to avoid hour-long runs.

### 3. Review Survivors
Open the HTML report. Each surviving mutant is a gap in your tests. Prioritize survivors in business-critical code.

### 4. Kill Survivors
Write a test that would detect each survivor. The test must fail when Stryker applies the mutation and pass on clean code.

### 5. Verify Improvement
Re-run Stryker. Score should rise. Repeat until ≥80%.

### 6. Set CI Threshold
Add `thresholds: { high: 80, low: 70, break: 65 }` to stryker.config.js. CI fails if score drops below break.

## Verification
- [ ] Mutation score ≥80% on target module
- [ ] Surviving mutants documented or killed
- [ ] CI threshold configured

## Rollback
Remove threshold from CI config if it blocks a legitimate release; re-add after fixing.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Score 40% on class | Tests check behavior not implementation | Rewrite tests around public API |
| Stryker times out | Too many files | Run per module |
| Score drops after PR | New code without tests | Make mutation score a PR check |

## Examples
**Example A:** Payment module has 95% coverage but mutation score 55% — tests weren't asserting amounts. Fix: add amount assertions.
**Example B:** Auth module survivors all on error paths — write tests for every error branch.
