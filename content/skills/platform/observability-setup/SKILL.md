---
id: platform.observability-setup
name: Monitoring and Logging Setup
version: 1.0.0
domain: platform
category: platform.observability
purpose: Set up comprehensive monitoring, logging, and alerting for applications and infrastructure.
summary: Guides through implementing observability including metrics, logs, traces, and alerting strategies.
triggers:
  - set up monitoring and alerts
  - configure logging and metrics
  - add observability to application
  - set up alerting system
  - implement distributed tracing
activation_triggers:
  - monitoring setup
  - logging configuration
  - observability setup
prerequisites:
  - application deployed
  - access to monitoring tools
inputs:
  - application_type
  - infrastructure_platform
  - monitoring_requirements
  - existing_tools (optional)
steps:
  - Identify key metrics to monitor (RED, USE, Golden Signals)
  - Set up metrics collection (Prometheus, Datadog, etc.)
  - Configure structured logging
  - Set up log aggregation (ELK, Loki, etc.)
  - Implement distributed tracing (Jaeger, Zipkin, etc.)
  - Create dashboards for key metrics
  - Set up alerting rules and escalation
  - Document observability setup
outputs:
  - metrics_configuration
  - logging_configuration
  - tracing_setup
  - dashboards
  - alerting_rules
  - observability_documentation
tools:
  - shell.write (deploy configs)
  - filesystem.write (config files)
quality_gates:
  - Key metrics collected
  - Logs aggregated and searchable
  - Traces working end-to-end
  - Alerts configured and tested
  - Dashboards created
failure_modes:
  - Missing critical metrics
  - Logs not structured (hard to search)
  - Traces not propagated across services
  - Alert fatigue (too many false positives)
  - No documentation
handoffs:
  - platform.devops-engineer (for infrastructure setup)
  - platform.incident-responder (for incident response integration)
source_references:
  - ref.github.observability-best-practices.2026-06-01
allowed_agents:
  - platform.devops-engineer
  - platform.observability-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Remove monitoring configs if they cause issues
validators:
  - skill.validator
---

## Trigger
Use this skill when setting up monitoring, logging, alerting, or distributed tracing for applications.

## Prerequisites
- Application deployed and running
- Access to monitoring tools (Prometheus, Grafana, Datadog, etc.)
- Understanding of application architecture

## Steps
1. **Identify Key Metrics**:
   - **RED Method** (for services): Rate, Errors, Duration
   - **USE Method** (for infrastructure): Utilization, Saturation, Errors
   - **Golden Signals**: Latency, Traffic, Errors, Saturation
   - Business metrics: User signups, transactions, etc.
2. **Set Up Metrics Collection**:
   - Instrument application code (Prometheus client, StatsD, etc.)
   - Configure metrics exporter
   - Set up metrics storage (Prometheus, InfluxDB, etc.)
   - Verify metrics are being collected
3. **Configure Structured Logging**:
   - Use JSON format for logs
   - Include correlation IDs for request tracing
   - Log at appropriate levels (INFO, WARN, ERROR)
   - Avoid logging sensitive data
   - Include context (user ID, request ID, etc.)
4. **Set Up Log Aggregation**:
   - Deploy log collector (Fluentd, Filebeat, etc.)
   - Configure log shipping to central system
   - Set up log storage (Elasticsearch, Loki, etc.)
   - Create log search interface (Kibana, Grafana Loki)
5. **Implement Distributed Tracing**:
   - Add tracing library (OpenTelemetry, Jaeger client)
   - Propagate trace context across services
   - Set up trace storage (Jaeger, Zipkin)
   - Verify traces are complete end-to-end
6. **Create Dashboards**:
   - Overview dashboard (high-level health)
   - Service-specific dashboards (detailed metrics)
   - Infrastructure dashboards (CPU, memory, disk, network)
   - Business dashboards (user metrics, transactions)
7. **Set Up Alerting**:
   - Define alert conditions (thresholds, anomalies)
   - Set up alert routing (PagerDuty, Slack, email)
   - Configure escalation policies
   - Test alerts to ensure they work
   - Avoid alert fatigue (only alert on actionable issues)
8. **Document**:
   - Document all metrics and their meaning
   - Create runbooks for common alerts
   - Document how to use dashboards
   - Create onboarding guide for new team members

## Verification
- Metrics are being collected and visible in dashboards
- Logs are searchable and include correlation IDs
- Traces show complete request flows
- Alerts fire correctly in test scenarios
- Documentation is complete and accurate

## Rollback
- Remove monitoring configs: `kubectl delete -f monitoring/`
- Disable alerting rules
- Stop log collectors

## Common Failures
- Not instrumenting critical code paths
- Logs without structure (hard to search/analyze)
- Traces not propagated across service boundaries
- Too many alerts leading to alert fatigue
- No documentation (team doesn't know what metrics mean)
- Not testing alerts (they don't work when needed)

## Examples
### Setting Up Monitoring for a Web API
Input: Node.js Express API deployed on Kubernetes
Output:
- Metrics: Request rate, error rate, latency (p50, p95, p99), active connections
- Logging: JSON logs with request ID, user ID, endpoint, status code, duration
- Tracing: OpenTelemetry with propagation to database and external APIs
- Dashboards:
  - Overview: Request rate, error rate, latency
  - Detailed: Per-endpoint metrics, database query times
  - Infrastructure: Pod CPU/memory, node utilization
- Alerts:
  - Error rate > 5% for 5 minutes → PagerDuty
  - Latency p99 > 2s for 10 minutes → Slack
  - Pod restarts > 3 in 1 hour → Email
- Documentation: Runbooks for each alert, dashboard guide
