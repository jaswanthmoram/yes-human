---
quality_gate: production
id: marketing.campaign-analyst
name: Campaign Performance Analysis
version: 1.0.0
domain: marketing
category: marketing.analytics
purpose: Analyze campaign performance, attribution quality, channel efficiency, and next-budget actions.
summary: Campaign analysis turns spend, traffic, conversion, and revenue data into a clear read on what worked, what did not, and where to reallocate budget.
triggers:
  - campaign analysis
  - campaign performance review
  - marketing attribution analysis
  - channel performance report
  - campaign ROI analysis
activation_triggers:
  - analyze this campaign
  - which channel performed best
prerequisites:
  - Campaign objective and dates are known
  - Spend, traffic, conversion, and revenue data are available
  - Attribution model or source of truth is identified
inputs:
  - campaign_metrics
  - spend_by_channel
  - conversion_events
  - attribution_model
steps:
  - Confirm campaign goal, target audience, channels, flight dates, and primary KPI.
  - Normalize data by channel and date; separate paid, owned, organic, and partner traffic.
  - Calculate CAC, CPA, ROAS, conversion rate, funnel drop-off, and payback where revenue is available.
  - Check attribution quality: missing UTMs, duplicate campaigns, delayed conversions, and assisted conversions.
  - Compare each channel to baseline or previous campaigns instead of judging absolute values only.
  - Produce a decision table: scale, hold, fix, or stop for each channel with evidence.
outputs:
  - campaign_performance_report
  - attribution_quality_notes
  - budget_reallocation_recommendations
  - follow_up_experiment_list
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Primary KPI matches the campaign objective
  - Spend and conversion windows are aligned
  - Recommendations separate data-backed findings from assumptions
failure_modes:
  - Optimizing for vanity metrics instead of the declared KPI
  - Comparing channels with different attribution windows
  - Ignoring tracking gaps before making budget recommendations
handoffs:
  - marketing.marketing-analyst
  - product-business.growth-marketer
source_references:
  - ref.github.marketing.campaign-analyst.2026-06-02
  - https://github.com/PostHog/posthog
allowed_agents:
  - marketing.campaign-analyst
  - marketing.marketing-analyst
status: active
budget_band: standard
rollback:
  - Revert generated report artifacts
  - Restore prior budget recommendation document
validators:
  - skill.validator
  - attribution_window_checked
---

## Procedure

1. Identify the campaign objective, primary KPI, budget, dates, audience, and channel mix.
2. Build one clean table by channel with spend, impressions, clicks, sessions, leads, customers, revenue, and attribution notes.
3. Compute channel efficiency metrics and compare them to prior campaign or baseline performance.
4. Inspect tracking quality before recommendations: UTMs, event naming, deduplication, and conversion delay.
5. Classify each channel as scale, hold, fix, or stop.
6. Write next actions with owner, expected impact, and measurement plan.

## Verification

- KPI and attribution model are stated.
- Every recommendation references a metric or tracking limitation.
- Budget changes include a measurement window.
