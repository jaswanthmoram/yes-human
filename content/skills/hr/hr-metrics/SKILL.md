---
id: hr.hr-metrics
name: HR Metrics
version: 1.0.0
domain: hr
category: hr.analytics
purpose: Define and track HR metrics including turnover, time-to-fill, cost-per-hire, and workforce productivity indicators.
summary: HR metric definition, KPI design, dashboard specification, and benchmarking framework for people analytics.
triggers:
  - define hr metrics
  - create hr kpis
  - design hr dashboard
  - hr benchmarking framework
  - people metrics definition
aliases:
  - hr metrics
  - hr kpis
  - people metrics
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - business_objectives
  - data_availability
  - stakeholder_needs
outputs:
  - metrics_definitions
  - kpi_framework
  - dashboard_specification
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Defines metrics without business alignment
  - Omits data source validation
  - Ignores privacy requirements
verification:
  - Business alignment defined
  - Data sources validated
  - Privacy requirements addressed
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
Define and track HR metrics including turnover, time-to-fill, cost-per-hire, and workforce productivity indicators.

## When To Use
- Defining HR metrics and KPIs
- Designing HR dashboards
- Creating benchmarking frameworks

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Align metrics with business objectives.
2. Define metrics with clear formulas and data sources.
3. Validate data availability and quality.
4. Address privacy and confidentiality requirements.
5. Create dashboard specifications for stakeholders.

## Tool Policy
- Use `filesystem.read` to access HR data and existing metrics.
- Use `filesystem.write` to save metric definitions and dashboards.

## Verification
- Business alignment defined for each metric
- Data sources validated
- Privacy requirements addressed

## Failure Modes
- Defining metrics without business alignment
- Omitting data source validation
- Ignoring privacy requirements

## Example Routes
- "define turnover metrics for organization"
- "create time-to-fill KPIs"
- "design HR dashboard for leadership"

## Source Notes
- SHRM HR metrics benchmarks, AIHR people analytics frameworks
- Reference: ref.github.hr.2026-05-31
