---
id: hr.workforce-analytics
name: Workforce Analytics
version: 1.0.0
domain: hr
category: hr.analytics
purpose: Design workforce analytics models, predictive analytics frameworks, and data-driven workforce insights.
summary: Workforce analytics modeling, predictive framework design, workforce insight generation, and analytics reporting.
triggers:
  - design workforce analytics model
  - create predictive workforce framework
  - build workforce insight report
  - hr predictive analytics
  - workforce data analysis
aliases:
  - workforce analytics
  - people analytics
  - hr analytics
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - workforce_data
  - analysis_objectives
  - prediction_goals
outputs:
  - analytics_model
  - predictive_framework
  - insight_report
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Models without data quality validation
  - Omits statistical methodology
  - Ignores actionable recommendations
verification:
  - Data quality validated
  - Statistical methodology defined
  - Recommendations actionable
source_references:
  - ref.github.hr.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design workforce analytics models, predictive analytics frameworks, and data-driven workforce insights.

## When To Use
- Designing workforce analytics models
- Creating predictive workforce frameworks
- Building workforce insight reports

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Define analysis objectives and prediction goals.
2. Validate workforce data quality and completeness.
3. Design analytics model with statistical methodology.
4. Generate actionable workforce insights.
5. Create reporting framework for stakeholders.

## Tool Policy
- Use `filesystem.read` to access workforce data and analytics tools.
- Use `filesystem.write` to save analytics models and reports.

## Verification
- Data quality validated before modeling
- Statistical methodology defined
- Recommendations actionable and specific

## Failure Modes
- Modeling without data quality validation
- Omitting statistical methodology
- Ignoring actionable recommendations

## Example Routes
- "design attrition prediction model"
- "create workforce planning analytics"
- "build people analytics dashboard"

## Source Notes
- AIHR workforce analytics frameworks, SHRM people analytics resources
- Reference: ref.github.hr.2026-05-31
