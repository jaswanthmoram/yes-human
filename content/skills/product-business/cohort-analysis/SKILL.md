---
id: product-business.cohort-analysis
name: Cohort Analysis
version: 1.0.0
domain: product-business
category: product-business.analytics
purpose: Analyze user behavior over time using cohort-based segmentation to identify retention and engagement patterns.
summary: Guides through defining cohorts, building cohort tables, and interpreting retention and engagement trends.
triggers:
  - cohort analysis
  - retention cohort
  - cohort report
  - user cohort breakdown
activation_triggers:
  - analyze cohorts
  - retention by cohort
  - cohort behavior
prerequisites:
  - user event data with timestamps
  - defined cohort criteria
inputs:
  - cohort_criteria
  - time_granularity
  - metric_to_measure
steps:
  - Define cohort criteria (signup date, feature adoption, plan type)
  - Select time granularity (daily, weekly, monthly)
  - Build cohort table with retention or engagement metric
  - Identify patterns across cohorts
  - Compare cohort performance over time
  - Draw actionable conclusions for product decisions
outputs:
  - cohort_table
  - retention_curves
  - pattern_analysis
tools:
  - filesystem.read
quality_gates:
  - Cohort criteria clearly defined
  - Sufficient data for meaningful analysis
  - Patterns linked to product decisions
failure_modes:
  - Cohorts too small for statistical significance
  - Confusing correlation with causation
  - Not accounting for seasonality
handoffs:
  - product-business.product-analyst (for deeper analysis)
  - product-business.retention-analysis (for retention focus)
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
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when analyzing user behavior patterns across cohorts.

## Prerequisites
- User event data with timestamps
- Defined cohort criteria

## Steps
1. **Define Cohorts**: Group users by signup date, feature adoption, or plan type.
2. **Select Granularity**: Choose daily, weekly, or monthly buckets.
3. **Build Table**: Create cohort × time matrix with retention or engagement metric.
4. **Identify Patterns**: Look for improving, flat, or declining trends.
5. **Compare**: Benchmark recent cohorts against earlier ones.
6. **Conclude**: Link patterns to product changes or external factors.

## Verification
- Cohort sizes are sufficient for analysis
- Trends are visualized clearly
- Conclusions are tied to specific product actions

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Using cohorts that are too small
- Not normalizing for cohort size differences
- Drawing conclusions without enough time periods

## Examples
### Cohort Definition
Cohort: Users who signed up in January 2026
Metric: Weekly active usage
Finding: Week-4 retention improved from 25% to 35% after onboarding redesign
