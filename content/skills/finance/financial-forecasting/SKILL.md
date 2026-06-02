---
id: finance.financial-forecasting
name: Financial Forecasting
version: 1.0.0
domain: finance
category: finance.planning
purpose: Build financial forecasts with scenario analysis, assumption documentation, and variance tracking against actuals.
summary: Financial forecast construction with scenario ranges, assumption logs, and actuals comparison.
triggers:
  - build financial forecast
  - revenue forecast model
  - expense forecast update
  - forecast scenario analysis
  - rolling forecast refresh
aliases:
  - financial forecasting
  - forecast build
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - actuals_data
  - forecast_horizon
  - assumption_set
outputs:
  - forecast_model
  - scenario_analysis
  - assumption_log
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Forecasts without assumption documentation
  - Omits scenario analysis
  - Confuses actuals with projections
verification:
  - Assumptions documented
  - Scenarios included
  - Actuals labeled separately
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Build financial forecasts with scenario analysis, assumption documentation, and variance tracking against actuals.

## When To Use
- Building financial forecasts
- Creating scenario analyses
- Updating rolling forecasts

## When Not To Use
- Budget creation belongs to budget-creation skill
- Tax projections belong to tax-specialist
- Investment forecasts belong to investment-analyst

## Procedure
1. Gather actuals data and define the forecast horizon.
2. Document key assumptions with sources.
3. Build base-case forecast from assumptions and trends.
4. Create upside and downside scenarios.
5. Compare forecast against actuals and prior forecasts.
6. Document variance drivers.

## Tool Policy
- Use `filesystem.read` to access actuals data and assumption inputs.

## Verification
- Assumptions documented with sources
- Scenarios included (base, upside, downside)
- Actuals labeled separately from projections

## Failure Modes
- Forecasting without assumption documentation
- Omitting scenario analysis
- Confusing actuals with projections

## Example Routes
- "build Q4 financial forecast"
- "revenue forecast model"
- "rolling forecast refresh"

## Source Notes
- Reference: ref.github.finance.2026-05-31
