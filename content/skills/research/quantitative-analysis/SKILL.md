---
id: research.quantitative-analysis
name: Quantitative Analysis
version: 1.0.0
category: research.analysis
summary: Performs quantitative data analysis with descriptive statistics, inferential tests, and effect size reporting for research datasets.
triggers:
  - quantitative data analysis
  - descriptive statistics report
  - inferential analysis task
  - effect size computation
  - research dataset analysis
prerequisites:
  - quantitative_data_cleaned
steps:
  - validate data quality and handle missing values
  - compute descriptive statistics
  - select and run inferential tests
  - calculate effect sizes and confidence intervals
  - produce analysis report with tables and figures
outputs:
  - descriptive_statistics
  - inferential_results
  - analysis_report
budget_band: standard
rollback:
  - discard intermediate datasets
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires statistical analysis of quantitative data with formal reporting of results.

## Prerequisites
- Cleaned quantitative dataset in a structured format.
- Defined research hypotheses or analysis questions.

## Steps
1. Validate data quality, check for outliers, and handle missing values.
2. Compute descriptive statistics (means, medians, standard deviations, distributions).
3. Select appropriate inferential tests based on data type and hypotheses.
4. Calculate effect sizes and confidence intervals alongside p-values.
5. Produce an analysis report with formatted tables and figures.

## Verification
- Statistical tests match data type and distribution assumptions.
- Effect sizes reported alongside significance tests.

## Rollback
- Discard intermediate datasets and cached results.

## Common Failures
- Applying parametric tests to non-normal data without transformation.
- Reporting p-values without effect sizes or confidence intervals.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
