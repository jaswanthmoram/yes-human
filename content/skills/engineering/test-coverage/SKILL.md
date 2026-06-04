---
quality_gate: production
id: engineering.test-coverage
name: Test Coverage Analysis and Improvement
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Measure and improve test coverage to an agreed threshold using line, branch, and function coverage metrics.
summary: Coverage analysis identifies untested code paths. This skill covers generating coverage reports, interpreting branch vs line coverage, prioritizing which gaps matter most, and incrementally improving coverage with meaningful tests.
triggers:
  - test coverage report
  - improve coverage
  - coverage threshold
  - untested code paths
  - coverage gap analysis
activation_triggers:
  - improve coverage for the payment module
  - what code paths are not tested
  - analyze our test coverage report
  - our coverage is dropping below the threshold
  - which code paths are untested
prerequisites:
  - test suite running with coverage enabled (--coverage in Jest, -coverprofile in Go)
  - coverage thresholds defined per project
inputs:
  - coverage_report
  - threshold_targets
steps:
  - Generate coverage report with branch coverage enabled (not just line coverage)
  - Focus on branch coverage gaps first — these represent untested conditional paths, the most bug-prone
  - Identify high-priority uncovered branches — business logic, error handlers, auth checks
  - Write tests for each uncovered branch by creating the exact condition that exercises it
  - Re-run coverage to verify the gap is closed
  - Set minimum thresholds in Jest config (coverageThreshold) and enforce in CI
outputs:
  - coverage_report_html
  - gap_analysis
  - new_test_cases
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Branch coverage ≥80% on business-critical modules
  - Line coverage ≥70% overall
  - Coverage thresholds enforced in CI
failure_modes:
  - High line coverage with low branch coverage — tests don't exercise conditionals
  - Coverage inflated by trivial tests (getters/setters)
  - Coverage threshold met but critical paths untested
handoffs:
  - engineering.tdd-guide (for writing gap-filling tests)
source_references:
  - https://github.com/istanbuljs/nyc
  - https://github.com/goldbergyoni/nodebestpractices
allowed_agents:
  - engineering.tdd-guide
status: active
budget_band: standard
rollback:
  - Remove or lower coverage threshold if blocking a legitimate release
validators:
  - skill.validator
---

## Trigger

Use when coverage is dropping, before a major release, or when setting up a new project's quality baseline.

## Prerequisites

- `jest --coverage` or `go test -coverprofile` working
- Team agreed on minimum branch/line thresholds

## Steps

### 1. Generate Report with Branch Coverage

`jest --coverage --coverageReporters=html,text-summary` — open the HTML report. Look at uncovered branches (shown as yellow), not just lines.

### 2. Prioritize by Business Risk

Focus first on: auth/authz logic, payment processing, error handlers, data transformation. Ignore: generated code, migrations, test utilities.

### 3. Understand Each Branch

For each uncovered branch, read the code to understand what condition triggers it. Don't write tests without understanding the behavior.

### 4. Write Meaningful Tests

Write one test per uncovered branch. The test should assert the correct outcome, not just execute the line.

### 5. Verify Gap Closure

Re-run with coverage. Confirm the branch is now green.

### 6. Set and Enforce Threshold

`coverageThreshold: { global: { branches: 80, lines: 80 } }` in jest.config.js. Add coverage report to CI artifacts.

## Verification

- [ ] Branch coverage ≥80% on priority modules
- [ ] CI enforces threshold
- [ ] Coverage report committed or uploaded to CI artifacts

## Rollback

Lower threshold temporarily with a PR comment explaining the plan to restore it.

## Common Failures

| Failure                      | Cause                        | Fix                                   |
| ---------------------------- | ---------------------------- | ------------------------------------- |
| Line 100%, branch 40%        | Not using branch mode        | Add --coverage with branch reporting  |
| Coverage drops with every PR | No coverage CI gate          | Add threshold to jest.config.js       |
| Tests only test happy path   | Developers avoid error paths | Pair coverage review with code review |

## Examples

**Example A:** Auth module has 95% line coverage but error handler branch uncovered — write test where JWT is expired.
**Example B:** Payment processing has 60% branch coverage — write tests for declined card, insufficient funds, timeout.
