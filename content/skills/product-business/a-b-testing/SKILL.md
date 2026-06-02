---
id: product-business.a-b-testing
name: A/B Testing
version: 1.0.0
domain: product-business
category: product-business.experimentation
purpose: Design, execute, and analyze A/B tests to make data-driven product decisions with statistical rigor.
summary: Guides through hypothesis formation, test design, sample size calculation, and statistical analysis of A/B tests.
triggers:
  - a b test
  - ab test
  - split test
  - experiment design
activation_triggers:
  - run an experiment
  - test this change
  - a b test design
prerequisites:
  - measurable hypothesis
  - sufficient traffic for statistical significance
inputs:
  - hypothesis
  - primary_metric
  - traffic_estimate
steps:
  - Formulate testable hypothesis with expected impact
  - Define primary and guardrail metrics
  - Calculate required sample size and duration
  - Design variant and control experiences
  - Run test with proper randomization
  - Analyze results with statistical significance testing
outputs:
  - test_design
  - sample_size_calculation
  - results_analysis
tools:
  - filesystem.read
quality_gates:
  - Hypothesis is specific and measurable
  - Sample size calculated before test starts
  - Results analyzed with appropriate statistical test
failure_modes:
  - Peeking at results before reaching sample size
  - Testing too many variants simultaneously
  - Ignoring guardrail metrics
handoffs:
  - product-business.product-analyst (for deep analysis)
  - product-business.growth-manager (for experiment pipeline)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-analyst
  - product-business.growth-manager
  - product-business.master
allowed_workflows:
  - product-business.product-discovery
status: active
budget_band: standard
rollback:
  - Revert to control variant
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or analyzing A/B tests and product experiments.

## Prerequisites
- Measurable hypothesis
- Sufficient traffic for statistical significance

## Steps
1. **Hypothesis**: "Changing [X] will improve [metric] by [Y%] because [rationale]."
2. **Metrics**: Define primary metric + 2-3 guardrail metrics.
3. **Sample Size**: Calculate using MDE, alpha (0.05), power (0.80).
4. **Design**: Create variant(s) and control with proper randomization.
5. **Run**: Execute for calculated duration without peeking.
6. **Analyze**: Use t-test or chi-squared; report p-value and confidence interval.

## Verification
- Hypothesis stated before test begins
- Sample size reached before analysis
- Results include confidence intervals

## Rollback
- Revert to control variant if test is negative

## Common Failures
- Stopping test early due to "obvious" results
- Not accounting for multiple comparisons
- Ignoring novelty or seasonality effects

## Examples
### Hypothesis
"Changing the signup CTA from 'Get Started' to 'Start Free Trial' will increase signup conversion by 15% because it reduces perceived commitment."
Primary Metric: Signup conversion rate
Guardrail: Time to first action, D7 retention
