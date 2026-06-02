---
id: data-ai.data-warehousing
name: Data Warehousing
version: 1.0.0
domain: data-ai
category: data-ai.engineering
purpose: Design and optimize data warehouse schemas, storage strategies, and query performance for analytical workloads.
summary: Systematic data warehouse design including dimensional modeling, partitioning, indexing, and query optimization.
triggers:
  - data warehouse design
  - dimensional modeling
  - star schema design
  - warehouse optimization
  - analytical storage setup
activation_triggers:
  - data warehousing
  - warehouse schema design
  - analytical storage
prerequisites:
  - analytical requirements defined
  - data sources identified
  - query patterns understood
inputs:
  - analytical_requirements
  - data_sources
  - query_patterns
  - volume_estimates
steps:
  - Define dimensional model (star, snowflake, vault)
  - Design fact and dimension tables
  - Configure partitioning and indexing strategy
  - Implement slowly changing dimensions (SCD)
  - Optimize for query patterns
  - Set up data retention and archival policies
  - Document schema and lineage
outputs:
  - warehouse_schema
  - partitioning_strategy
  - optimization_report
  - schema_documentation
tools:
  - shell.readonly (schema scripts)
  - filesystem.read (source schemas)
  - filesystem.write (warehouse configs)
quality_gates:
  - Dimensional model appropriate
  - Partitioning strategy defined
  - Query performance tested
failure_modes:
  - Over-normalized schema hurting query performance
  - Missing partitioning for large tables
  - No SCD strategy for changing dimensions
handoffs:
  - data-ai.data-engineer (for ETL integration)
  - data-ai.bi-developer (for reporting layer)
source_references:
  - ref.github.data-ai.data-warehousing.2026-05-31
allowed_agents:
  - data-ai.data-engineer
  - data-ai.bi-developer
allowed_workflows: []
status: active
budget_band: expanded
rollback:
  - Revert schema changes
  - Restore from backup
validators:
  - skill.validator
---

## Trigger
Use this skill when designing or optimizing a data warehouse schema or analytical storage system.

## Prerequisites
- Analytical requirements and query patterns understood
- Data sources and volumes identified
- Storage platform selected

## Steps
1. **Dimensional Model**: Star, snowflake, or data vault based on requirements.
2. **Fact and Dimension Tables**: Define grain, measures, and dimension attributes.
3. **Partitioning**: Range, hash, or list partitioning based on query patterns.
4. **SCD Strategy**: Type 1, 2, or 3 for slowly changing dimensions.
5. **Optimize**: Indexing, materialized views, clustering for query performance.
6. **Retention**: Define data lifecycle, archival, and purge policies.
7. **Document**: Schema definitions, lineage, and operational procedures.

## Verification
- Dimensional model matches analytical needs
- Partitioning improves query performance
- SCD strategy implemented correctly

## Rollback
- Revert schema changes
- Restore from backup

## Common Failures
- Over-normalized schema (slow queries)
- No partitioning for large fact tables
- Missing SCD strategy (historical data loss)
