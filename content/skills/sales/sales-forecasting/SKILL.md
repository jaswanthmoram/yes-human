---
id: sales.sales-forecasting
name: Sales Forecasting Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Build accurate sales forecasts using pipeline data, historical patterns, and deal-level analysis to support revenue planning.
summary: Forecast methodology design, deal-level forecast analysis, and forecast accuracy tracking for revenue planning.
triggers:
  - build Q3 sales forecast from current pipeline
  - build sales forecast
  - forecast methodology design
  - quarterly forecast review
  - forecast accuracy analysis
  - revenue projection model
  - deal-level forecast assessment
aliases:
  - forecasting
  - revenue forecast
  - sales projection
negative_keywords:
  - financial accounting forecast
  - market size projection
  - product demand forecast
inputs:
  - pipeline_data
  - historical_close_rates
  - forecast_period
outputs:
  - forecast_model
  - deal_level_assessment
  - accuracy_report
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Forecasts without historical close rate data
  - Treats all pipeline equally without stage weighting
  - Skips accuracy tracking against actuals
verification:
  - Forecast uses stage-weighted pipeline
  - Historical close rates applied
  - Accuracy tracked against actuals
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
Build accurate sales forecasts using pipeline data, historical patterns, and deal-level analysis to support revenue planning.

## When To Use
- Building quarterly or annual sales forecasts
- Designing forecast methodology for sales organization
- Reviewing forecast accuracy against actuals
- Assessing deal-level forecast confidence

## When Not To Use
- Financial accounting forecasts belong to finance
- Market size projections belong to research
- Product demand forecasts belong to product-business

## Procedure
1. Gather pipeline data with stage and close date information.
2. Apply historical close rates by stage and segment.
3. Build stage-weighted forecast model.
4. Assess deal-level confidence for large opportunities.
5. Compare forecast to actuals and track accuracy.
6. Identify forecast risks and upside opportunities.

## Tool Policy
- Use `filesystem.read` to access pipeline data and historical close rates.
- Use `filesystem.write` to save forecast models and accuracy reports.

## Verification
- Forecast uses stage-weighted pipeline with historical close rates
- Deal-level assessment for top opportunities included
- Accuracy tracked and compared against actuals

## Failure Modes
- Using unweighted pipeline for forecast
- Ignoring historical close rate patterns
- Not tracking forecast accuracy over time

## Example Routes
- "build Q3 sales forecast from current pipeline"
- "design forecast methodology for new sales team"
- "analyze forecast accuracy for last quarter"

## Source Notes
- Weighted pipeline forecasting, historical run-rate analysis
- Reference: ref.github.sales.2026-05-31
