---
id: engineering.test-coverage
name: Test Coverage Analysis
description: Analyze test coverage metrics, identify untested critical paths, and recommend targeted tests to improve meaningful coverage.
triggers:
  - what code paths are not tested
  - test coverage
  - coverage report
  - coverage analysis
  - untested code
  - improve coverage
  - coverage gap
  - code coverage
aliases:
  - coverage review
  - test gap analysis
  - coverage metrics
negative_keywords:
  - mutation testing
  - snapshot testing
  - performance testing
  - load testing
inputs:
  - coverage_report
  - source_files
  - test_files (optional)
  - critical_paths (optional)
outputs:
  - coverage_analysis
  - untested_critical_paths
  - recommended_tests
  - coverage_improvement_plan
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Chasing coverage percentage without testing meaningful behavior
  - Missing critical error-handling paths in coverage analysis
  - Recommending trivial tests that add coverage but not confidence
  - Ignoring integration coverage gaps while focusing on unit coverage
verification:
  - Coverage report shows measurable improvement after adding tests
  - Recommended tests cover actual business logic, not just line execution
  - Critical paths identified and prioritized correctly
  - No false positives in untested path detection
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Analyze test coverage beyond raw percentages to identify meaningful coverage gaps, prioritize testing of critical paths, and recommend high-value tests.

## When To Use
- Reviewing coverage reports to identify testing gaps
- Prioritizing which untested code to write tests for
- Setting or evaluating coverage targets for a project
- Pre-release coverage audit for critical paths
- Investigating why bugs escape despite high coverage numbers

## When Not To Use
- Mutation testing (use engineering.mutation-testing)
- Snapshot or visual regression testing
- Performance or load testing coverage
- Writing the actual tests (hand off to test-writing skills)

## Procedure
1. **Collect Coverage Data**: Run coverage tool (Istanbul, c8, coverage.py, go test -cover) and collect reports. Identify line, branch, and function coverage metrics.
2. **Map Critical Paths**: Identify business-critical code paths: authentication, payments, data mutations, error handlers. Cross-reference with coverage data.
3. **Identify Coverage Gaps**: Find uncovered branches, untested error paths, and missing edge case tests. Distinguish between trivial and critical gaps.
4. **Analyze Coverage Quality**: Check if existing tests assert meaningful behavior or just execute code. Look for tests with no assertions or trivial assertions.
5. **Prioritize Recommendations**: Rank untested areas by risk (frequency of change, business impact, complexity). Recommend specific test cases for highest-risk gaps.
6. **Generate Improvement Plan**: Create a prioritized list of recommended tests with estimated effort and expected coverage gain.
7. **Validate Impact**: After implementing recommended tests, verify coverage improvement and confirm tests catch real regressions.

## Tool Policy
- Use shell.readonly to run coverage tools and inspect reports
- Use filesystem.read to analyze source and test files
- Use code_graph.query to trace critical code paths and dependencies
- Never modify source or test files during analysis

## Verification
- Coverage percentage increases after implementing recommended tests
- New tests have meaningful assertions, not just code execution
- Critical paths show branch coverage, not just line coverage
- Bug detection rate improves with added tests

## Failure Modes
- Recommending tests for dead code or unreachable branches
- Focusing on line coverage while missing branch and path coverage gaps
- Not distinguishing between testable and untestable code (generated code, type definitions)
- Suggesting tests that duplicate existing test behavior

## Example Routes
- `analyze test coverage` -> engineering.test-coverage
- `what code is not tested` -> engineering.test-coverage
- `improve coverage for auth module` -> engineering.test-coverage

## Source Notes
Coverage analysis patterns from Istanbul/nyc, c8, coverage.py, and Go testing documentation. Critical path testing strategies from testing literature. Reference dossier: `ref.github.engineering.2026-05-31`.
