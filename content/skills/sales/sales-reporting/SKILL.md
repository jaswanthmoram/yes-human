---
id: sales.sales-reporting
name: Sales Reporting Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Design sales reports and dashboards that provide clear visibility into pipeline health, team performance, and revenue outcomes.
summary: Report structure design, dashboard configuration, and KPI definition for sales leadership visibility.
triggers:
  - define KPIs for quarterly business review
  - create pipeline dashboard for sales managers
  - design sales report
  - sales dashboard creation
  - KPI definition for sales
  - sales reporting structure
  - pipeline report design
  - revenue report template
aliases:
  - sales reporting
  - sales dashboards
  - sales KPIs
negative_keywords:
  - financial reporting
  - marketing reporting
  - product analytics dashboard
inputs:
  - reporting_requirements
  - data_sources
  - audience_needs
outputs:
  - report_structure
  - dashboard_design
  - kpi_definitions
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs reports without understanding audience needs
  - Defines KPIs without data source validation
  - Creates dashboards with too many metrics
verification:
  - Report aligned with audience needs
  - KPIs have validated data sources
  - Dashboard focused on actionable metrics
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
Design sales reports and dashboards that provide clear visibility into pipeline health, team performance, and revenue outcomes.

## When To Use
- Designing sales reports for leadership reviews
- Creating sales dashboards for team visibility
- Defining KPIs for sales performance tracking
- Building report templates for recurring reviews

## When Not To Use
- Financial reporting belongs to finance
- Marketing reporting belongs to marketing
- Product analytics dashboards belong to product-business

## Procedure
1. Identify audience and their decision-making needs.
2. Define KPIs aligned with audience decisions.
3. Validate data sources for each KPI.
4. Design report structure with appropriate granularity.
5. Configure dashboard with focused, actionable metrics.
6. Define refresh cadence and data quality checks.

## Tool Policy
- Use `filesystem.read` to access reporting requirements and data sources.
- Use `filesystem.write` to save report designs and KPI definitions.

## Verification
- Report structure aligned with audience decision needs
- Each KPI has validated data source and calculation method
- Dashboard limited to actionable metrics (max 8-12)

## Failure Modes
- Building reports nobody uses because they don't drive decisions
- Defining KPIs without confirming data availability
- Dashboard overload with too many metrics

## Example Routes
- "design weekly sales report for VP of Sales"
- "create pipeline dashboard for sales managers"
- "define KPIs for quarterly business review"

## Source Notes
- Sales reporting frameworks from Salesforce, HubSpot, and Pipedrive
- Reference: ref.github.sales.2026-05-31
