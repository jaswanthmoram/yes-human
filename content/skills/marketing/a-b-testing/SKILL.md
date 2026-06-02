---
id: marketing.a-b-testing
name: A/B Testing
version: 1.0.0
domain: marketing
category: marketing.optimization
purpose: Design and analyze A/B tests for marketing assets with proper statistical methodology and significance thresholds.
summary: A/B testing process covering hypothesis formation, test design, sample size calculation, and result analysis.
triggers:
  - design a b test
  - split test analysis
  - experiment design for marketing
  - test result interpretation
aliases:
  - a/b test
  - split testing
negative_keywords:
  - multivariate testing
  - engineering load test
  - unit testing
inputs:
  - test_hypothesis
  - current_variant
  - success_metric
outputs:
  - test_plan
  - sample_size_calculation
  - analysis_report
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Running tests without significance threshold
  - Peeking at results and stopping early
  - Testing multiple variables simultaneously
verification:
  - Hypothesis clearly stated
  - Sample size calculated
  - Statistical significance defined
source_references:
  - ref.github.marketing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to control variant if test variant underperforms
validators:
  - skill.validator
---

## Mission
Design statistically valid A/B tests that produce reliable insights for marketing optimization decisions.

## When To Use
- When testing landing page variations
- During email subject line optimization
- For ad creative testing
- When validating marketing hypotheses

## When Not To Use
- For multivariate testing with many variables
- For engineering performance testing
- For product feature experiments (use product-business)

## Procedure
1. **Hypothesis Formation**: State clear hypothesis with expected outcome and rationale.
2. **Variable Isolation**: Test one variable at a time (headline, CTA, image, layout).
3. **Sample Size**: Calculate required sample size for statistical significance.
4. **Test Duration**: Set minimum test duration accounting for traffic patterns.
5. **Analysis**: Evaluate results with confidence intervals and significance tests.
6. **Documentation**: Record results, learnings, and next test hypothesis.

## Tool Policy
- Use `filesystem.read` to review test data and historical results.
- Use `filesystem.write` to produce test plans and analysis reports.

## Verification
- Single variable isolated per test
- Sample size sufficient for significance
- Results documented with confidence level

## Failure Modes
- Stopping tests before reaching significance
- Testing too many variables at once
- Ignoring segment-level differences in results

## Example Routes
- `design A/B test for landing page headline`
- `analyze email subject line split test`
- `calculate sample size for conversion test`

## Source Notes
- CXL Institute A/B testing methodology
- Optimizely experimentation guides
- Reference: ref.github.marketing.2026-05-31
