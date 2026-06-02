---
id: platform.prometheus-alerts
name: Prometheus Alerting Rules
version: 1.0.0
domain: platform
category: platform.observability
description: Design, implement, and maintain Prometheus alerting rules for infrastructure and application monitoring.
triggers:
  - Prometheus alerting rules
  - create Prometheus alerts
  - PromQL alert expressions
  - alertmanager configuration
  - monitoring alert thresholds
  - Prometheus rule optimization
aliases:
  - prometheus alerts
  - prom rules
  - alertmanager setup
negative_keywords:
  - grafana dashboard
  - ELK stack
  - datadog
  - non-prometheus monitoring
inputs:
  - metrics_sources
  - alert_thresholds
  - escalation_policies
  - notification_channels
outputs:
  - alerting_rules
  - alertmanager_config
  - runbook_links
  - alert_tests
allowed_tools:
  - shell.readonly (promtool check rules)
  - filesystem.read (rule files)
  - filesystem.write (rule files, configs)
required_skills:
  - platform.observability-setup
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Alert fatigue from too many low-severity alerts
  - Missing labels for alert routing
  - PromQL expression errors
  - Not testing alert expressions
verification:
  - promtool check rules passes
  - Alert expressions tested in Prometheus UI
  - Alertmanager routing verified
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.grafana-dashboards (for alert visualization)
  - platform.observability-setup (for overall setup)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.observability-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Revert rule files and reload Prometheus
validators:
  - skill.validator
---

## Mission
Provide patterns for creating effective Prometheus alerting rules that catch real issues without generating alert fatigue.

## When To Use
- Creating alerting rules for infrastructure metrics
- Setting up application-level alerts
- Configuring Alertmanager routing and receivers
- Optimizing existing alert thresholds

## When Not To Use
- Dashboard creation (use platform.grafana-dashboards)
- Log-based alerting (use platform.elk-stack)
- Non-Prometheus monitoring systems

## Procedure
1. **Identify Alert Conditions**: Map critical metrics to alert conditions using RED/USE methods
2. **Write PromQL Expressions**: Craft alert expressions with appropriate thresholds and durations
3. **Set Severity Levels**: Classify alerts as critical, warning, or info with proper labels
4. **Configure Routing**: Set up Alertmanager routes, receivers, and inhibition rules
5. **Add Annotations**: Include summary, description, and runbook links in alert annotations
6. **Validate Rules**: Run `promtool check rules` and test expressions in Prometheus UI
7. **Test End-to-End**: Trigger test alerts and verify notification delivery

## Tool Policy
- Always validate rules with `promtool check rules` before deploying
- Test PromQL expressions in Prometheus UI before creating rules
- Use recording rules for complex expressions to reduce query load

## Verification
- `promtool check rules` passes
- Alert expressions return expected results in Prometheus
- Alertmanager delivers test notifications correctly
- Alert deduplication and grouping working

## Failure Modes
- Alert fatigue from overly sensitive thresholds
- Missing `for` duration causing flapping alerts
- Incorrect label matchers in Alertmanager routes
- Recording rules not updated when alert rules change

## Example Routes
- "alert on high error rate" → PromQL with rate() and threshold
- "configure PagerDuty alerts" → Alertmanager receiver setup
- "reduce alert noise" → inhibition rules and threshold tuning

## Source Notes
Based on Prometheus official documentation and SRE alerting practices. Referenced dossier: ref.github.platform.2026-05-31.
