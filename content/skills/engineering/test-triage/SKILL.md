---
id: engineering.test-triage
name: Test Failure Analysis and Prioritization
version: 1.0.0
domain: engineering
category: engineering.testing-qa
purpose: Analyze test failures, identify root causes, and prioritize fixes based on impact and severity.
summary: Systematic approach to triaging test failures, distinguishing between flaky tests, real bugs, and test infrastructure issues.
triggers:
  - test failure
  - failing test
  - test is broken
  - why is test failing
  - triage test failures
activation_triggers:
  - tests are failing
  - fix the tests
  - test suite broken
prerequisites:
  - access to test output and logs
  - ability to run tests locally
inputs:
  - test_output
  - failing_test_names
  - recent_changes (optional)
steps:
  - Collect and analyze test failure output
  - Categorize failures (real bug, flaky test, infrastructure issue)
  - Identify root cause for each failure
  - Check if failures are related to recent changes
  - Prioritize fixes by severity and impact
  - Create actionable fix plan
outputs:
  - failure_analysis (categorized)
  - root_causes
  - prioritized_fix_plan
tools:
  - shell.readonly (run tests)
  - filesystem.read
  - code_graph.query
quality_gates:
  - All failures categorized
  - Root causes identified
  - Fix plan is actionable
failure_modes:
  - Misidentifying flaky tests as real bugs
  - Missing the actual root cause
  - Not checking recent changes for correlation
handoffs:
  - engineering.testing-unit (for test fixes)
  - engineering.build-resolver (for infrastructure issues)
source_references:
  - ref.github.test-triage-best-practices.2026-06-01
allowed_agents:
  - engineering.testing-unit
  - engineering.testing-integration
  - engineering.testing-e2e
allowed_workflows:
  - engineering.test-suite-expansion
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when tests are failing and you need to analyze, categorize, and prioritize fixes.

## Prerequisites
- Access to test output (logs, error messages, stack traces)
- Ability to run the test suite locally
- Knowledge of recent code changes

## Steps
1. **Collect Test Output**: Gather all failing test names, error messages, and stack traces.
2. **Categorize Failures**:
   - **Real Bugs**: Test correctly identifies broken functionality
   - **Flaky Tests**: Test fails intermittently without code changes
   - **Infrastructure Issues**: Test environment, dependencies, or configuration problems
   - **Test Bugs**: Test itself is incorrect or outdated
3. **Identify Root Causes**:
   - For real bugs: trace back to the code change that broke it
   - For flaky tests: identify timing, race conditions, or external dependencies
   - For infrastructure: check dependencies, environment variables, network issues
4. **Correlate with Recent Changes**: Check git log for recent commits that might have caused failures.
5. **Prioritize Fixes**:
   - Critical: Blocks core functionality
   - High: Affects important features
   - Medium: Minor functionality or edge cases
   - Low: Flaky tests, cosmetic issues
6. **Create Fix Plan**: Document specific actions for each failure with estimated effort.

## Verification
- Run the test suite after fixes to confirm resolution
- Verify no new failures introduced
- Check that flaky tests are either fixed or documented

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Assuming all failures are real bugs without checking for flakiness
- Not running tests in isolation to reproduce failures
- Missing the correlation between test failures and recent changes
- Prioritizing low-impact fixes over critical bugs

## Examples
### Triaging a CI Failure
Input: 5 tests failing in CI
Output:
- Critical: `test_user_login` - Real bug in auth logic (commit abc123)
- High: `test_payment_processing` - Flaky due to timing issue
- Medium: `test_email_notification` - Test outdated after API change
- Low: `test_ui_rendering` - Flaky, needs retry logic
- Infrastructure: `test_database_connection` - CI database not initialized
