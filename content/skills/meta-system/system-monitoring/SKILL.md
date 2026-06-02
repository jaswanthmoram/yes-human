---
id: meta-system.system-monitoring
name: System Monitoring and Health Checks
version: 1.0.0
domain: meta-system
category: meta-system.operations
purpose: Monitor system health, detect anomalies, and track registry metrics over time.
summary: Systematic approach to monitoring yes-human system health and detecting issues early.
triggers:
  - monitor system health
  - run health check
  - detect registry anomalies
  - track system metrics
  - system status report
activation_triggers:
  - system monitoring
  - health check run
  - anomaly detection
prerequisites:
  - system accessible
  - metrics collection configured
  - baseline health known
inputs:
  - system_state
  - metrics_config
  - baseline_health
steps:
  - Collect current system metrics
  - Compare to baseline health
  - Detect anomalies in metrics
  - Check registry consistency
  - Verify route table integrity
  - Monitor token budget usage
  - Identify degraded components
  - Generate health report
  - Alert on critical issues
  - Recommend remediation
outputs:
  - health_report
  - anomaly_list
  - degradation_alerts
  - remediation_recommendations
tools:
  - filesystem.read (read system state and metrics)
  - shell.readonly (run health check scripts)
quality_gates:
  - Metrics collected completely
  - Anomalies detected and classified
  - Registry consistency verified
  - Health report generated
  - Critical issues alerted
failure_modes:
  - Monitoring without baseline comparison
  - Missing anomaly detection
  - Ignoring registry consistency
  - Not alerting on critical issues
  - Incomplete metrics collection
handoffs:
  - meta-system.system-optimizer (for optimization recommendations)
  - meta-system.quality-assurance (for QA review of issues)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.system-optimizer
  - meta-system.quality-assurance
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert monitoring configuration changes
  - Restore previous monitoring state
validators:
  - skill.validator
---

## Trigger
Use this skill when monitoring system health, running health checks, or detecting registry anomalies.

## Prerequisites
- System accessible
- Metrics collection configured
- Baseline health known

## Steps
1. **Collect Metrics**: Gather current system metrics from all components.
2. **Compare Baseline**: Compare current metrics to known baseline health.
3. **Detect Anomalies**: Identify metrics that deviate from normal ranges.
4. **Check Registry**: Verify registry consistency and completeness.
5. **Verify Routes**: Check route table integrity and correctness.
6. **Monitor Budget**: Track token budget usage against limits.
7. **Identify Degradation**: Find components showing degraded performance.
8. **Generate Report**: Produce a structured health report.
9. **Alert**: Raise alerts for critical issues.
10. **Recommend**: Suggest remediation actions for detected issues.

## Verification
- All quality gates passed
- Metrics collected completely
- Anomalies detected and classified
- Critical issues alerted

## Common Failures
- Monitoring without comparing to baseline
- Missing anomaly detection logic
- Not alerting on critical issues
