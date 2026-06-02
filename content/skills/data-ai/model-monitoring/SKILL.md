---
id: data-ai.model-monitoring
name: Model Monitoring
version: 1.0.0
domain: data-ai
category: data-ai.operations
purpose: Monitor deployed ML models for drift, performance degradation, and data quality issues.
summary: Comprehensive model monitoring including data drift, concept drift, prediction quality, and system health metrics.
triggers:
  - monitor model performance
  - detect model drift
  - model health check
  - prediction quality monitoring
  - model degradation alert
activation_triggers:
  - model monitoring
  - drift detection
  - performance degradation
prerequisites:
  - deployed model in production
  - baseline metrics established
  - monitoring infrastructure available
inputs:
  - deployed_model
  - baseline_metrics
  - monitoring_configuration
steps:
  - Define monitoring metrics and thresholds
  - Set up data drift detection (feature distributions)
  - Configure concept drift detection (prediction distributions)
  - Monitor system health (latency, error rate, throughput)
  - Set up alerting for threshold breaches
  - Create dashboards for ongoing visibility
  - Define retraining triggers and procedures
outputs:
  - monitoring_dashboard
  - drift_reports
  - alert_configuration
  - retraining_triggers
tools:
  - shell.readonly (monitoring scripts)
  - filesystem.read (model, metrics)
  - filesystem.write (reports, dashboards)
quality_gates:
  - Drift detection configured
  - Alerting active
  - Retraining triggers defined
failure_modes:
  - Monitoring only system health, not model quality
  - Thresholds set without statistical basis
  - No retraining trigger defined
handoffs:
  - data-ai.ml-engineer (for retraining)
  - data-ai.mlops-engineer (for pipeline automation)
source_references:
  - ref.github.data-ai.model-monitoring.2026-05-31
allowed_agents:
  - data-ai.mlops-engineer
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when monitoring deployed ML models for drift, degradation, or health issues.

## Prerequisites
- Model deployed in production
- Baseline performance metrics established
- Monitoring infrastructure available

## Steps
1. **Define Metrics**: Prediction quality, data drift, concept drift, system health.
2. **Data Drift Detection**: Monitor feature distributions vs training data (PSI, KS test).
3. **Concept Drift Detection**: Monitor prediction distributions and accuracy over time.
4. **System Health**: Track latency, error rate, throughput, resource utilization.
5. **Alerting**: Configure alerts for threshold breaches with severity levels.
6. **Dashboards**: Create real-time dashboards for model and system health.
7. **Retraining Triggers**: Define conditions that trigger model retraining.

## Verification
- Drift detection active for data and predictions
- Alerting configured and tested
- Retraining triggers defined and documented

## Rollback
- No state changes; this is a monitoring skill

## Common Failures
- Only monitoring system health, not model quality
- Alert thresholds without statistical basis
- No automated retraining trigger
