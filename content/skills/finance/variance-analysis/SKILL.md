---
id: finance.variance-analysis
name: Variance Analysis
version: 1.0.0
domain: finance
category: finance.analysis
purpose: Analyze variances between actuals and budget or forecast, identifying drivers and recommending corrective actions.
summary: Budget-to-actual and forecast-to-actual variance analysis with driver identification and action recommendations.
triggers:
  - variance analysis report
  - budget vs actual review
  - forecast variance explanation
  - spending variance investigation
  - variance driver analysis
aliases:
  - variance analysis
  - budget variance
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - actuals_data
  - budget_or_forecast
  - variance_thresholds
outputs:
  - variance_report
  - driver_analysis
  - corrective_actions
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Reports variances without explaining drivers
  - Omits materiality thresholds
  - Confuses favorable and unfavorable variances
verification:
  - Drivers identified for material variances
  - Materiality thresholds applied
  - Corrective actions recommended
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
Analyze variances between actuals and budget or forecast, identifying drivers and recommending corrective actions.

## When To Use
- Analyzing budget-to-actual variances
- Investigating forecast variances
- Identifying spending variance drivers

## When Not To Use
- Budget creation belongs to budget-creation skill
- Forecast building belongs to financial-forecasting skill
- Tax variance belongs to tax-specialist

## Procedure
1. Obtain actuals and budget or forecast data for comparison.
2. Calculate variances at appropriate level of detail.
3. Apply materiality thresholds to focus analysis.
4. Identify root cause drivers for material variances.
5. Classify variances as favorable or unfavorable.
6. Recommend corrective actions for adverse variances.

## Tool Policy
- Use `filesystem.read` to access actuals and budget/forecast data.

## Verification
- Drivers identified for material variances
- Materiality thresholds applied consistently
- Corrective actions recommended where appropriate

## Failure Modes
- Reporting variances without explaining drivers
- Omitting materiality thresholds
- Confusing favorable and unfavorable variances

## Example Routes
- "Q3 budget vs actual variance analysis"
- "forecast variance explanation"
- "spending variance investigation"

## Source Notes
- Reference: ref.github.finance.2026-05-31
