---
id: product-business.retention-analysis
name: Retention Analysis
version: 1.0.0
domain: product-business
category: product-business.analytics
purpose: Measure and improve user retention through lifecycle analysis, churn prediction, and intervention strategies.
summary: Guides through retention measurement, churn analysis, and designing retention interventions.
triggers:
  - retention analysis
  - churn analysis
  - retention metrics
  - user retention strategy
activation_triggers:
  - analyze retention
  - why are users churning
  - improve retention
prerequisites:
  - user activity data over time
  - defined retention event and period
inputs:
  - retention_event
  - time_period
  - segment_criteria (optional)
steps:
  - Define retention event and measurement period
  - Calculate N-day, unbounded, and rolling retention
  - Identify churn patterns and at-risk segments
  - Analyze correlation between features and retention
  - Design retention interventions for key segments
  - Define measurement plan for interventions
outputs:
  - retention_report
  - churn_analysis
  - intervention_plan
tools:
  - filesystem.read
quality_gates:
  - Retention event is meaningful to product value
  - Multiple retention types measured
  - Interventions linked to specific churn causes
failure_modes:
  - Measuring retention on wrong event
  - Not distinguishing between new and existing user retention
  - Designing interventions without understanding churn cause
handoffs:
  - product-business.growth-manager (for experiment design)
  - product-business.product-analyst (for deeper analysis)
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
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when analyzing user retention or designing retention strategies.

## Prerequisites
- User activity data over time
- Defined retention event and period

## Steps
1. **Define Retention**: Choose retention event (login, core action, value moment).
2. **Measure**: Calculate N-day (D1, D7, D30), unbounded, and rolling retention.
3. **Identify Churn**: Find at-risk segments and churn timing patterns.
4. **Correlate**: Find features or behaviors correlated with retention.
5. **Intervene**: Design targeted interventions (onboarding, re-engagement, value reinforcement).
6. **Measure**: Set up tracking for intervention impact.

## Verification
- Retention curves show clear trends
- Churn causes are identified, not just symptoms
- Interventions are testable hypotheses

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Optimizing vanity retention (login) instead of value retention
- Not segmenting by user type or acquisition source
- Treating all churn the same

## Examples
### Retention Analysis
Retention Event: Created first project
D1: 45%, D7: 30%, D30: 20%
Finding: Users who invite a teammate in first session have 2x D30 retention
Intervention: Add teammate invite prompt to onboarding

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
