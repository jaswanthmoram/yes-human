---
id: data-ai.etl-processes
name: ETL Processes
version: 1.0.0
domain: data-ai
category: data-ai.engineering
purpose: Design and implement Extract, Transform, Load processes for reliable data integration.
summary: Systematic ETL design including extraction strategies, transformation logic, loading patterns, and data quality checks.
triggers:
  - build etl process
  - etl design
  - extract transform load
  - data integration pipeline
  - etl optimization
activation_triggers:
  - ETL process
  - data extraction and loading
  - ETL optimization
prerequisites:
  - source systems identified
  - target schema defined
  - data volume understood
inputs:
  - source_systems
  - target_schema
  - transformation_rules
  - load_frequency
steps:
  - Design extraction strategy (full, incremental, CDC)
  - Implement data transformations with validation
  - Configure loading pattern (append, upsert, replace)
  - Add data quality checks at each stage
  - Implement error handling and recovery
  - Optimize for performance and resource usage
  - Document ETL logic and lineage
outputs:
  - etl_process
  - data_quality_checks
  - lineage_documentation
  - performance_report
tools:
  - shell.readonly (ETL scripts)
  - filesystem.read (source configs)
  - filesystem.write (ETL configs)
quality_gates:
  - Extraction strategy appropriate
  - Data quality checks in place
  - Error handling tested
failure_modes:
  - Full extraction when incremental suffices
  - Missing data quality checks
  - No recovery mechanism for failures
handoffs:
  - data-ai.data-pipelines (for orchestration)
  - data-ai.data-warehousing (for target design)
source_references:
  - ref.github.data-ai.etl-processes.2026-05-31
allowed_agents:
  - data-ai.data-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert loaded data to previous state
  - Replay from last successful extraction
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or optimizing ETL processes for data integration.

## Prerequisites
- Source systems and access methods identified
- Target schema and loading pattern defined
- Data volume and frequency understood

## Steps
1. **Extraction Strategy**: Full load, incremental, or CDC based on source capabilities and latency needs.
2. **Transformations**: Apply business logic, data cleansing, type conversions with validation.
3. **Loading**: Configure append, upsert, or full replace based on target requirements.
4. **Quality Checks**: Validate row counts, null rates, referential integrity at each stage.
5. **Error Handling**: Retry logic, dead-letter tables, alerting on failures.
6. **Optimize**: Partitioning, parallelism, resource allocation for performance.
7. **Document**: ETL logic, data lineage, and operational runbooks.

## Verification
- Extraction strategy matches requirements
- Data quality checks validate output
- Error recovery tested

## Rollback
- Revert loaded data to previous state
- Replay from last successful extraction

## Common Failures
- Using full extraction when incremental is feasible
- Missing quality checks (silent data corruption)
- No recovery mechanism for partial failures
