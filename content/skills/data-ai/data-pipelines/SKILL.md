---
id: data-ai.data-pipelines
name: Data Pipelines
version: 1.0.0
domain: data-ai
category: data-ai.engineering
purpose: Design and implement data pipelines for reliable, scalable data movement and transformation.
summary: Systematic data pipeline design including orchestration, error handling, idempotency, and monitoring.
triggers:
  - build data pipeline
  - data pipeline design
  - orchestrate data flow
  - batch processing setup
  - streaming data pipeline
activation_triggers:
  - data pipeline
  - data orchestration
  - batch or streaming pipeline
prerequisites:
  - data sources identified
  - destination defined
  - latency requirements understood
inputs:
  - data_sources
  - destination
  - latency_requirements
  - volume_estimates
steps:
  - Define pipeline topology (sources, transforms, sinks)
  - Design for idempotency and exactly-once processing
  - Implement error handling and dead-letter queues
  - Configure orchestration (scheduling, dependencies)
  - Set up monitoring and alerting
  - Test with representative data volumes
  - Document pipeline architecture and SLAs
outputs:
  - pipeline_design
  - orchestration_config
  - monitoring_setup
  - pipeline_documentation
tools:
  - shell.readonly (pipeline scripts)
  - filesystem.read (source configs)
  - filesystem.write (pipeline configs)
quality_gates:
  - Idempotency verified
  - Error handling tested
  - Monitoring active
failure_modes:
  - Non-idempotent processing causing duplicates
  - Missing dead-letter handling for bad records
  - No monitoring for pipeline failures
handoffs:
  - data-ai.data-engineer (for implementation)
  - data-ai.etl-processes (for ETL specifics)
source_references:
  - ref.github.data-ai.data-pipelines.2026-05-31
allowed_agents:
  - data-ai.data-engineer
  - data-ai.mlops-engineer
allowed_workflows: []
status: active
budget_band: expanded
rollback:
  - Revert pipeline configuration
  - Replay from last successful checkpoint
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or implementing data pipelines for batch or streaming data processing.

## Prerequisites
- Data sources and destinations identified
- Latency and volume requirements understood
- Orchestration platform selected

## Steps
1. **Define Topology**: Sources, transformations, sinks, and dependencies.
2. **Idempotency**: Design for safe reprocessing (upserts, idempotent writes).
3. **Error Handling**: Dead-letter queues, retry policies, alerting on failures.
4. **Orchestration**: Scheduling, dependency management, SLA tracking.
5. **Monitoring**: Pipeline health, data freshness, throughput metrics.
6. **Test**: Validate with representative volumes and edge cases.
7. **Document**: Architecture, SLAs, runbooks for operations.

## Verification
- Idempotency verified with reprocessing test
- Error handling tested with bad records
- Monitoring dashboards active

## Rollback
- Revert pipeline configuration
- Replay from last successful checkpoint

## Common Failures
- Non-idempotent processing causing duplicates
- Missing dead-letter handling
- No alerting on pipeline staleness
