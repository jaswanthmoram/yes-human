---
id: engineering.mutation-testing
name: Mutation Testing for Test Quality
description: Evaluate test suite effectiveness by introducing code mutations and measuring test detection rates to find weak spots.
triggers:
  - find surviving mutants in the billing service
  - how effective are our tests really
  - mutation testing
  - mutation score
  - test quality
  - test effectiveness
  - kill mutants
  - mutation analysis
  - test suite quality
aliases:
  - mutant testing
  - mutation analysis
  - fault injection testing
negative_keywords:
  - fuzzing
  - chaos engineering
  - penetration testing
  - snapshot testing
inputs:
  - source_code
  - test_suite
  - mutation_config (optional)
  - coverage_baseline (optional)
outputs:
  - mutation_score_report
  - surviving_mutants
  - weak_test_areas
  - improvement_recommendations
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Equivalent mutants inflate mutation score denominator
  - Mutation tool too slow for large codebases
  - Surviving mutants dismissed without analysis
  - Focusing on score without understanding context
verification:
  - Mutation score is calculated for critical modules
  - Surviving mutants are analyzed and categorized
  - New tests added for high-risk surviving mutants
  - Mutation score improves after targeted test additions
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Measure and improve test suite quality by introducing controlled code mutations and identifying tests that fail to detect real behavioral changes.

## When To Use
- Evaluating whether high code coverage actually catches bugs
- Finding weak spots in test suites where mutations survive
- Prioritizing test improvements beyond coverage metrics
- Pre-release quality audit for critical modules
- Comparing test effectiveness across different modules

## When Not To Use
- Fuzzing or random input testing
- Chaos engineering or infrastructure fault injection
- Performance or load testing
- Simple coverage measurement (use engineering.test-coverage)

## Procedure
1. **Establish Baseline**: Run existing test suite and confirm all tests pass. Record current coverage metrics as baseline.
2. **Configure Mutation Tool**: Set up mutation testing tool (Stryker, PIT, mutmut, cosmic-ray). Configure to target critical modules first. Set mutation operators and timeout.
3. **Run Mutation Analysis**: Execute mutation testing on target modules. Collect mutation score: killed mutants / total non-equivalent mutants.
4. **Analyze Surviving Mutants**: Categorize surviving mutants: equivalent mutants (no behavioral change), missing assertions, incomplete edge case coverage, or logic gaps.
5. **Prioritize Improvements**: Rank surviving mutants by risk: business-critical code, security-relevant logic, complex algorithms. Skip equivalent mutants.
6. **Write Targeted Tests**: Add or improve tests to kill high-risk surviving mutants. Focus on behavioral assertions, not just execution coverage.
7. **Re-run and Validate**: Run mutation testing again to confirm score improvement. Document mutation score trends over time.

## Tool Policy
- Use shell.readonly to run mutation testing tools and collect results
- Use filesystem.read to analyze surviving mutants in source context
- Use code_graph.query to understand mutation impact propagation
- Never modify source code during mutation analysis (only test code for improvements)

## Verification
- Mutation score is calculated and documented for target modules
- Surviving mutants are individually analyzed with disposition
- New tests kill previously surviving high-risk mutants
- Mutation score trend is tracked across iterations

## Failure Modes
- Spending excessive time on equivalent mutants that cannot be killed
- Running mutation testing on entire codebase instead of critical modules
- Dismissing surviving mutants as "not important" without analysis
- Mutation testing runtime too long for CI integration

## Example Routes
- `run mutation testing on auth module` -> engineering.mutation-testing
- `how good are our tests really` -> engineering.mutation-testing
- `find weak tests with mutation analysis` -> engineering.mutation-testing

## Source Notes
Mutation testing patterns from Stryker Mutator, PIT (Java), mutmut (Python), and cosmic-ray documentation. Mutation operator design from academic mutation testing research. Reference dossier: `ref.github.engineering.2026-05-31`.
