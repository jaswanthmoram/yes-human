---
id: integrations.api-monitoring
name: API Monitoring
version: 1.0.0
domain: integrations
category: integrations.observability
purpose: Implement comprehensive API monitoring with health checks, latency tracking, error rate alerting, and synthetic monitoring.
summary: Guides through setting up API observability including distributed tracing, metrics collection, log aggregation, and alerting.
triggers:
  - setup api monitoring
  - api observability configuration
  - api health monitoring
activation_triggers:
  - monitor api health
  - track api performance
prerequisites:
  - api endpoints deployed
  - monitoring infrastructure available
inputs:
  - monitoring_requirements
  - alert_thresholds
  - sla_definitions
steps:
  - Define SLIs and SLOs for each API endpoint
  - Implement health check endpoints
  - Configure distributed tracing (OpenTelemetry)
  - Set up metrics collection (latency, error rate, throughput)
  - Create synthetic monitoring tests
  - Configure alerting rules and escalation
outputs:
  - monitoring_configuration
  - alert_rules
  - dashboard_setup
tools:
  - filesystem.write (monitoring configuration)
quality_gates:
  - All endpoints have health checks
  - Latency and error rate tracked
  - Alerts fire within SLA thresholds
failure_modes:
  - Missing health checks causing undetected outages
  - Alert fatigue from poorly tuned thresholds
  - Traces not propagated across service boundaries
handoffs:
  - integrations.api-testing (for synthetic tests)
  - integrations.load-balancing (for health check integration)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.api-gateway-architect
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert monitoring configuration changes
validators:
  - skill.validator
---

## Trigger
Use this skill when setting up monitoring and observability for API services.

## Prerequisites
- API endpoints deployed and accessible
- Monitoring infrastructure (Prometheus, Grafana, Datadog, etc.) available

## Steps
1. **Define SLIs/SLOs**: Set targets for availability, latency (p50, p95, p99), and error rate.
2. **Health Checks**: Implement /health and /ready endpoints for each service.
3. **Distributed Tracing**: Instrument with OpenTelemetry for request tracing across services.
4. **Metrics**: Collect request count, latency histograms, and error rates.
5. **Synthetic Tests**: Run scheduled API tests from multiple regions.
6. **Alerting**: Configure alerts for SLO violations with appropriate severity and escalation.

## Verification
- Dashboards show real-time API health and performance
- Alerts fire correctly in test scenarios
- Traces show complete request paths across services

## Rollback
- Revert monitoring configuration to previous version

## Common Failures
- Health checks that always return 200 regardless of actual health
- Alert thresholds too sensitive causing alert fatigue
- Missing trace context propagation between services

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
