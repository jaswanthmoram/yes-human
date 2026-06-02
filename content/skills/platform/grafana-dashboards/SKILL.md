---
id: platform.grafana-dashboards
name: Grafana Dashboard Design
version: 1.0.0
domain: platform
category: platform.observability
description: Design and build Grafana dashboards for effective metrics visualization and operational awareness.
triggers:
  - Grafana dashboard design
  - create Grafana dashboard
  - metrics visualization
  - Grafana panel configuration
  - dashboard as code
  - Grafana data source setup
aliases:
  - grafana panels
  - metrics dashboard
  - monitoring dashboard
negative_keywords:
  - prometheus alerts
  - log analysis
  - Kibana
  - non-grafana visualization
inputs:
  - metrics_sources
  - dashboard_requirements
  - target_audience
  - visualization_goals
outputs:
  - dashboard_json
  - panel_configurations
  - data_source_config
  - dashboard_documentation
allowed_tools:
  - shell.readonly (grafana-cli, API queries)
  - filesystem.read (dashboard JSON)
  - filesystem.write (dashboard JSON, provisioning)
required_skills:
  - platform.observability-setup
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Overloaded dashboards with too many panels
  - Wrong query time ranges
  - Missing variables for filtering
  - Not using dashboard-as-code approach
verification:
  - Dashboard JSON validates
  - All panels render data correctly
  - Variables and filters work
  - Dashboard provisioned successfully
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.prometheus-alerts (for alert-linked dashboards)
  - platform.observability-setup (for data source setup)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.observability-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Restore previous dashboard version from JSON
validators:
  - skill.validator
---

## Mission
Provide patterns for designing clear, actionable Grafana dashboards that surface the right metrics for operational decision-making.

## When To Use
- Creating operational dashboards for on-call teams
- Building executive overview dashboards
- Designing service-level indicator (SLI) dashboards
- Implementing dashboard-as-code workflows

## When Not To Use
- Alert rule creation (use platform.prometheus-alerts)
- Log analysis dashboards (use platform.elk-stack)
- Non-metrics visualization

## Procedure
1. **Define Audience and Goals**: Identify who will use the dashboard and what decisions it supports
2. **Select Data Sources**: Configure Prometheus, Loki, or other data sources
3. **Design Layout**: Organize panels top-down: overview → service → instance detail
4. **Build Panels**: Create time series, gauges, tables, and stat panels with appropriate queries
5. **Add Variables**: Template dashboard with environment, service, and instance selectors
6. **Set Thresholds and Alerts**: Configure panel thresholds and link to alerting rules
7. **Export and Provision**: Export dashboard JSON and set up provisioning for dashboard-as-code

## Tool Policy
- Use dashboard-as-code (JSON in version control) for all production dashboards
- Use Grafana provisioning for data sources and dashboard auto-loading
- Leverage Grafonnet or similar libraries for complex dashboards

## Verification
- All panels display data from correct sources
- Variables filter panels correctly
- Dashboard loads within acceptable time
- Provisioning applies dashboard without errors

## Failure Modes
- Too many panels on one dashboard (cognitive overload)
- Queries too expensive (slow dashboard load)
- Missing time range context on panels
- Hardcoded values instead of template variables

## Example Routes
- "create SRE overview dashboard" → golden signals + SLI panels
- "build Kubernetes cluster dashboard" → node, pod, container metrics
- "export dashboard as code" → JSON export + provisioning config

## Source Notes
Based on Grafana official documentation and dashboard design best practices. Referenced dossier: ref.github.platform.2026-05-31.
