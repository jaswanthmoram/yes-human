---
id: data-ai.a-b-testing-ml
name: A/B Testing for ML
version: 1.0.0
domain: data-ai
category: data-ai.evaluation
purpose: Design and analyze A/B experiments for ML model comparisons with statistical rigor.
summary: Systematic A/B testing including experiment design, sample size calculation, analysis, and interpretation.
triggers:
  - a b test ml model
  - ml experiment design
  - compare models online
  - online evaluation
  - controlled experiment for model
activation_triggers:
  - A/B testing
  - online experiment
  - model comparison experiment
prerequisites:
  - two or more model versions
  - production traffic available
  - success metrics defined
inputs:
  - model_variants
  - success_metrics
  - traffic_allocation
steps:
  - Define hypothesis and success metrics
  - Calculate required sample size and duration
  - Design experiment with proper randomization
  - Launch experiment with monitoring
  - Analyze results with statistical tests
  - Check for novelty and primacy effects
  - Document findings and recommendation
outputs:
  - experiment_design
  - statistical_analysis
  - recommendation_report
tools:
  - shell.readonly (analysis scripts)
  - filesystem.read (experiment data)
  - filesystem.write (analysis report)
quality_gates:
  - Sample size calculated a priori
  - Proper randomization verified
  - Statistical significance tested
failure_modes:
  - Peeking at results and stopping early
  - Not correcting for multiple comparisons
  - Ignoring novelty and primacy effects
handoffs:
  - data-ai.ml-engineer (for model promotion)
  - data-ai.mlops-engineer (for deployment)
source_references:
  - ref.github.data-ai.a-b-testing.2026-05-31
allowed_agents:
  - data-ai.data-scientist
  - data-ai.mlops-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert traffic allocation
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or analyzing A/B experiments for ML model comparisons.

## Prerequisites
- Two or more model versions ready for comparison
- Production traffic available for experiment
- Success metrics clearly defined

## Steps
1. **Define Hypothesis**: Null and alternative hypotheses with success criteria.
2. **Sample Size**: Calculate required sample size for statistical power (typically 80%).
3. **Design**: Randomization unit, traffic split, experiment duration.
4. **Launch**: Deploy with monitoring for early issues (SRM check).
5. **Analyze**: Statistical tests (t-test, chi-squared, bootstrap) with confidence intervals.
6. **Check Biases**: Novelty effects, primacy effects, sample ratio mismatch.
7. **Recommend**: Document findings with confidence level and recommendation.

## Verification
- Sample size calculated before experiment
- Randomization verified (SRM check)
- Statistical significance properly tested

## Rollback
- Revert traffic allocation to previous model

## Common Failures
- Peeking at results and stopping early (inflated false positive rate)
- Not correcting for multiple comparisons
- Ignoring sample ratio mismatch

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
