---
id: education.learning-analytics
name: Learning Analytics
version: 1.0.0
domain: education
category: education.data
purpose: Analyze learner data to identify patterns, predict outcomes, and recommend interventions using ethical and privacy-aware analytics practices.
summary: Learner data analysis with predictive modeling, engagement tracking, and intervention recommendations using ethical analytics frameworks.
triggers:
  - learning analytics analysis
  - student data analysis
  - predictive analytics education
  - learner engagement tracking
  - education data insights
aliases:
  - learning analytics
  - ed analytics
negative_keywords:
  - financial analytics
  - marketing analytics
  - web analytics
inputs:
  - learner_data
  - analysis_objectives
  - privacy_constraints
outputs:
  - analytics_report
  - risk_predictions
  - intervention_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Analyzes data without privacy safeguards
  - Predictions lack validation or confidence intervals
  - Recommendations not tied to evidence-based interventions
verification:
  - Privacy safeguards documented
  - Predictions validated with confidence measures
  - Interventions evidence-based
source_references:
  - ref.github.education.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Analyze learner data to identify patterns, predict outcomes, and recommend interventions using ethical and privacy-aware analytics practices.

## When To Use
- Analyzing student performance data for trends
- Building predictive models for at-risk learners
- Tracking engagement metrics across courses
- Recommending data-driven interventions

## When Not To Use
- Financial analytics belongs to finance domain
- Marketing analytics belongs to marketing domain
- Web analytics belongs to product-business domain

## Procedure
1. Define analysis objectives aligned to institutional goals.
2. Verify data privacy safeguards and consent status.
3. Perform descriptive analysis of learner patterns.
4. Build predictive models with validation and confidence measures.
5. Recommend evidence-based interventions tied to findings.
6. Document limitations, biases, and ethical considerations.

## Tool Policy
- Use `filesystem.read` to access learner data and institutional reports.
- Use `filesystem.write` to save analytics reports and dashboards.

## Verification
- Privacy safeguards documented and consent verified
- Predictions include confidence intervals or validation metrics
- All recommendations tied to evidence-based interventions

## Failure Modes
- Analyzing learner data without privacy safeguards
- Making predictions without validation or confidence measures
- Recommending interventions without evidence base

## Example Routes
- "learning analytics analysis for at-risk students"
- "student data analysis for retention improvement"
- "predictive analytics education for course completion"

## Source Notes
- SoLAR (Society for Learning Analytics Research) frameworks
- EDUCAUSE learning analytics reports
- Reference: ref.github.education.2026-05-31
