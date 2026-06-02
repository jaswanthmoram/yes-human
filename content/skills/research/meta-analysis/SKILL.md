---
id: research.meta-analysis
name: Meta-Analysis
version: 1.0.0
category: research.methodology
summary: Performs quantitative meta-analysis with effect size calculation, heterogeneity assessment, and forest plot generation.
triggers:
  - meta-analysis execution
  - quantitative evidence synthesis
  - effect size calculation
  - heterogeneity assessment
  - forest plot generation
prerequisites:
  - systematic_review_completed
steps:
  - extract effect sizes from included studies
  - calculate pooled effect using fixed or random effects model
  - assess heterogeneity with I-squared and Q statistics
  - check for publication bias with funnel plots
  - generate forest plot and summary tables
outputs:
  - pooled_effect_estimate
  - heterogeneity_statistics
  - forest_plot
budget_band: expanded
rollback:
  - discard intermediate calculations
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a completed systematic review has sufficient homogeneous quantitative data for statistical pooling.

## Prerequisites
- A completed systematic review with extracted quantitative data.
- Sufficient number of studies for meaningful pooling.

## Steps
1. Extract effect sizes and standard errors from each included study.
2. Select fixed-effect or random-effects model based on heterogeneity.
3. Calculate pooled effect size with confidence intervals.
4. Assess heterogeneity using I-squared, tau-squared, and Q statistics.
5. Check for publication bias using funnel plots and Egger test.
6. Generate forest plot and summary tables for reporting.

## Verification
- Model choice justified by heterogeneity statistics.
- Sensitivity analysis confirms robustness of findings.

## Rollback
- Discard intermediate calculations and cached data.

## Common Failures
- Pooling studies with incompatible outcome measures.
- Ignoring substantial heterogeneity in effect sizes.
