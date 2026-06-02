---
id: research.statistical-testing
name: Statistical Testing
version: 1.0.0
category: research.analysis
summary: Selects and executes appropriate statistical tests with assumption checking, multiple comparison correction, and result interpretation.
triggers:
  - statistical test execution
  - hypothesis testing task
  - assumption checking analysis
  - multiple comparison correction
  - test selection guidance
prerequisites:
  - data_prepared_for_analysis
steps:
  - verify test assumptions for the data
  - select appropriate statistical test
  - execute the test and capture output
  - apply multiple comparison corrections if needed
  - interpret results with effect sizes
outputs:
  - test_results
  - assumption_checks
  - interpretation_notes
budget_band: standard
rollback:
  - discard test outputs
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires selecting and running a specific statistical test with proper assumption validation.

## Prerequisites
- Data prepared and cleaned for analysis.
- A defined hypothesis or comparison to test.

## Steps
1. Verify test assumptions (normality, homogeneity of variance, independence).
2. Select the appropriate test (parametric or non-parametric based on assumptions).
3. Execute the test and capture test statistics, p-values, and degrees of freedom.
4. Apply corrections for multiple comparisons (Bonferroni, Holm, FDR) when applicable.
5. Interpret results distinguishing statistical from practical significance.

## Verification
- Assumptions checked before test execution.
- Corrections applied when multiple tests are performed.

## Rollback
- Discard test outputs and intermediate results.

## Common Failures
- Running tests without checking assumptions.
- Ignoring family-wise error rate in multiple testing scenarios.
