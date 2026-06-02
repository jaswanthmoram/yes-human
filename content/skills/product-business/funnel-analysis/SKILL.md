---
id: product-business.funnel-analysis
name: Funnel Analysis
version: 1.0.0
domain: product-business
category: product-business.analytics
purpose: Analyze conversion funnels to identify drop-off points and optimization opportunities in user journeys.
summary: Guides through defining funnel steps, measuring conversion rates, and identifying optimization targets.
triggers:
  - funnel analysis
  - conversion funnel
  - drop off analysis
  - funnel optimization
activation_triggers:
  - analyze the funnel
  - where are users dropping off
  - conversion analysis
prerequisites:
  - defined user journey with sequential steps
  - event tracking for funnel steps
inputs:
  - funnel_steps
  - time_window
  - segment_criteria (optional)
steps:
  - Define funnel steps matching the user journey
  - Measure conversion rate at each step
  - Identify highest drop-off points
  - Segment funnel by user properties
  - Compare funnel performance over time
  - Prioritize optimization opportunities
outputs:
  - funnel_report
  - drop_off_analysis
  - optimization_recommendations
tools:
  - filesystem.read
quality_gates:
  - Funnel steps match actual user journey
  - Drop-off rates calculated accurately
  - Recommendations are prioritized by impact
failure_modes:
  - Defining steps that don't match real user behavior
  - Not segmenting by user type
  - Optimizing low-impact steps first
handoffs:
  - product-business.product-analyst (for deeper analysis)
  - product-business.growth-manager (for experiment design)
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
Use this skill when analyzing conversion funnels or identifying drop-off points.

## Prerequisites
- Defined user journey with sequential steps
- Event tracking for funnel steps

## Steps
1. **Define Steps**: Map the user journey from entry to conversion.
2. **Measure**: Calculate conversion rate and absolute numbers at each step.
3. **Identify Drop-offs**: Find the step with the highest absolute or relative loss.
4. **Segment**: Break funnel by user type, device, source, or plan.
5. **Compare**: Track funnel performance over time periods.
6. **Prioritize**: Focus on highest-impact optimization opportunities.

## Verification
- Funnel steps validated against actual user paths
- Drop-off rates are statistically significant
- Recommendations ranked by potential impact

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Including steps that users can skip
- Not accounting for time-to-convert between steps
- Optimizing a funnel that shouldn't exist

## Examples
### Signup Funnel
Landing → Signup Form → Email Verification → Onboarding → First Value Moment
Conversion: 100% → 40% → 32% → 28% → 18%
Biggest drop: Landing to Signup (60% loss) — optimize landing page CTA
