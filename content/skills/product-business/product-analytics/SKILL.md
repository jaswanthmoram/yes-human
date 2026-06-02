---
id: product-business.product-analytics
name: Product Analytics
version: 1.0.0
domain: product-business
category: product-business.analytics
purpose: Set up and interpret product analytics to measure feature adoption, user engagement, and product health.
summary: Guides through defining product metrics, building dashboards, and interpreting analytics for product decisions.
triggers:
  - product analytics
  - product metrics
  - analytics dashboard
  - feature adoption metrics
activation_triggers:
  - set up analytics
  - measure product health
  - product metrics dashboard
prerequisites:
  - analytics tool configured (PostHog, Mixpanel, Amplitude)
  - event tracking plan
inputs:
  - product_goals
  - event_tracking_plan
  - dashboard_requirements
steps:
  - Define north star metric and supporting metrics
  - Map events to product goals
  - Build dashboards for key metrics
  - Set up alerts for metric anomalies
  - Interpret trends and identify opportunities
  - Create metric review cadence
outputs:
  - metric_definitions
  - dashboard_spec
  - analytics_review
tools:
  - filesystem.read
quality_gates:
  - Metrics are tied to product goals
  - Dashboard covers key user journeys
  - Review cadence is established
failure_modes:
  - Tracking vanity metrics without action potential
  - Dashboard overload without clear ownership
  - Not connecting metrics to decisions
handoffs:
  - product-business.product-analyst (for deep dives)
  - product-business.cohort-analysis (for retention analysis)
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
Use this skill when setting up or interpreting product analytics.

## Prerequisites
- Analytics tool configured
- Event tracking plan

## Steps
1. **North Star**: Define the one metric that best captures product value delivery.
2. **Supporting Metrics**: Map input metrics (activation, engagement, retention, revenue, referral).
3. **Dashboards**: Build views for product health, feature adoption, and user journeys.
4. **Alerts**: Set thresholds for anomaly detection.
5. **Interpret**: Analyze trends, segment by user type, and identify opportunities.
6. **Review**: Establish weekly or bi-weekly metric review meetings.

## Verification
- North star metric is measurable and owned
- Dashboards are actionable, not just informational
- Review cadence is maintained

## Rollback
- No state changes; this is an analytics skill

## Common Failures
- Measuring everything, acting on nothing
- Not defining metric ownership
- Ignoring qualitative signals in favor of quantitative only

## Examples
### Metric Hierarchy
North Star: Weekly Active Projects
Supporting: Signup conversion, D1 activation, D7 retention, Feature adoption rate
Dashboard: Product Health (weekly review)
