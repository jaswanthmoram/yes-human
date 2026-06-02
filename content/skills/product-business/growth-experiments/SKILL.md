---
id: product-business.growth-experiments
name: Growth Experiments
version: 1.0.0
domain: product-business
category: product-business.growth
purpose: Design and run growth experiments across the user lifecycle with structured hypothesis and measurement.
summary: Guides through ICE-scored experiment design, execution planning, and results analysis for growth initiatives.
triggers:
  - growth experiment
  - growth test
  - experiment design
  - growth hypothesis
activation_triggers:
  - design a growth experiment
  - test growth idea
  - growth experiment backlog
prerequisites:
  - growth metric and baseline
  - experiment infrastructure (feature flags, analytics)
inputs:
  - growth_metric
  - experiment_idea
  - baseline_data
steps:
  - Formulate hypothesis with expected impact
  - Score experiment using ICE framework
  - Define variant, control, and success criteria
  - Plan execution with timeline and sample size
  - Run experiment with proper measurement
  - Analyze results and decide ship/iterate/kill
outputs:
  - experiment_card
  - ice_score
  - results_and_decision
tools:
  - filesystem.read
quality_gates:
  - Hypothesis is specific and falsifiable
  - ICE score includes rationale
  - Ship/iterate/kill decision is data-backed
failure_modes:
  - Running too many experiments simultaneously
  - Not defining kill criteria upfront
  - Shipping without statistical confidence
handoffs:
  - product-business.a-b-testing (for test design)
  - product-business.product-analyst (for analysis)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.growth-manager
  - product-business.product-analyst
  - product-business.master
allowed_workflows:
  - product-business.product-discovery
status: active
budget_band: standard
rollback:
  - Revert experiment variant
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or evaluating growth experiments.

## Prerequisites
- Growth metric and baseline
- Experiment infrastructure available

## Steps
1. **Hypothesis**: "If we [change], then [metric] will [improve] by [amount] because [reason]."
2. **ICE Score**: Impact (1-10), Confidence (1-10), Ease (1-10). Average = priority.
3. **Design**: Define variant, control, success metric, and kill criteria.
4. **Plan**: Timeline, sample size, segmentation, and measurement setup.
5. **Run**: Execute with monitoring for anomalies.
6. **Decide**: Ship (significant positive), Iterate (inconclusive), Kill (negative or no effect).

## Verification
- Hypothesis is falsifiable
- ICE scores are justified
- Decision is backed by data

## Rollback
- Revert variant if experiment is killed

## Common Failures
- Running experiments without kill criteria
- Not accounting for interaction between experiments
- Shipping on insufficient data

## Examples
### Experiment Card
Hypothesis: Adding social proof to pricing page will increase trial signup by 10%
ICE: Impact 7, Confidence 6, Ease 8 = 7.0
Success Metric: Trial signup conversion rate
Kill Criteria: No improvement after 2 weeks at full traffic

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
