---
id: sales.sales-analytics
name: Sales Analytics Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Analyze sales performance data to produce actionable insights on conversion, velocity, win rates, and rep productivity.
summary: Sales metric analysis, performance dashboards, trend identification, and actionable insight generation for sales leadership.
triggers:
  - sales performance analysis
  - sales metrics dashboard
  - conversion analysis
  - win rate analysis
  - rep productivity review
  - sales trend report
aliases:
  - sales analytics
  - sales metrics
  - performance analysis
negative_keywords:
  - financial reporting
  - marketing analytics
  - product analytics
inputs:
  - sales_data
  - time_period
  - analysis_dimensions
outputs:
  - performance_report
  - trend_analysis
  - actionable_insights
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Reports metrics without actionable recommendations
  - Confuses correlation with causation
  - Analyzes without sufficient data quality check
verification:
  - Data quality assessed before analysis
  - Insights include actionable recommendations
  - Methodology and limitations stated
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Analyze sales performance data to produce actionable insights on conversion, velocity, win rates, and rep productivity.

## When To Use
- Analyzing sales performance for leadership reviews
- Building sales metrics dashboards
- Identifying trends in conversion, velocity, or win rates
- Reviewing rep productivity against benchmarks

## When Not To Use
- Financial reporting belongs to finance
- Marketing analytics belongs to marketing
- Product analytics belongs to product-business

## Procedure
1. Assess data quality and completeness before analysis.
2. Define analysis dimensions (conversion, velocity, win rate, productivity).
3. Calculate metrics with appropriate segmentations.
4. Identify trends and patterns with statistical support.
5. Produce actionable recommendations tied to findings.
6. Document methodology, limitations, and confidence levels.

## Tool Policy
- Use `filesystem.read` to access sales data and CRM exports.
- Use `filesystem.write` to save analysis reports and dashboards.

## Verification
- Data quality assessed and limitations stated
- Each insight paired with actionable recommendation
- Methodology documented with confidence levels

## Failure Modes
- Reporting metrics without context or recommendations
- Drawing conclusions from insufficient data
- Not distinguishing statistically significant trends from noise

## Example Routes
- "analyze Q2 sales performance by segment"
- "build sales metrics dashboard for leadership"
- "review rep productivity against team benchmarks"

## Source Notes
- Sales analytics frameworks from Gong, Pipedrive, and HubSpot
- Reference: ref.github.sales.2026-05-31
