---
id: data-ai.analytics-engineer
name: Analytics Engineering with dbt
version: 1.0.0
domain: data-ai
category: data-ai.analytics
purpose: Design and build analytics data models using dbt that transform raw data into reliable business metrics.
summary: Analytics engineering bridges data engineering and business intelligence. This skill covers dbt model design, metrics layer definition, data freshness SLAs, lineage documentation, and SQL quality review for performance.
triggers:
  - analytics engineering
  - dbt model design
  - analytics pipeline
  - build metrics layer
  - data transformation dbt
activation_triggers:
  - our analytics data is unreliable
  - we need a metrics layer
prerequisites:
  - dbt installed and connected to data warehouse
  - raw source tables identified
  - business metrics defined by stakeholders
inputs:
  - raw_source_tables
  - business_metric_definitions
  - existing_dbt_project
steps:
  - Audit existing sources and models in dbt project — check for documentation coverage and test coverage
  - Design the layer structure: sources (raw) → staging (cleaned/typed) → intermediate → marts (business-facing)
  - Write staging models: rename columns to consistent snake_case, cast types explicitly, add NOT NULL tests
  - Define metrics in dbt metrics layer or dbt_metrics package — one metric per business concept
  - Add freshness checks on source tables (freshness: warn_after: 24 hours, error_after: 48 hours)
  - Run dbt test and dbt docs generate — all tests must pass; documentation coverage ≥80%
outputs:
  - dbt_models
  - metrics_definitions
  - freshness_config
  - test_suite
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - All staging models have not_null and unique tests on primary keys
  - Source freshness checks configured
  - dbt docs generated with ≥80% column documentation
failure_modes:
  - Business logic in staging models — put it in intermediate or mart layer
  - Missing unique tests on mart primary keys — causes duplicate metrics
  - No freshness checks — silent stale data
handoffs:
  - data-ai.ml-engineer (for feature engineering from analytics models)
source_references:
  - https://github.com/dbt-labs/dbt-core
  - https://github.com/great-expectations/great_expectations
allowed_agents:
  - data-ai.data-analyst
  - data-ai.data-engineer
status: active
budget_band: standard
rollback:
  - dbt run --select previous_model_version
  - Revert model SQL via git
validators:
  - skill.validator
---
## Trigger
Use when building or redesigning analytics data models, defining business metrics, or diagnosing unreliable analytics data.

## Prerequisites
- dbt project initialized with warehouse connection
- Source tables and business metric definitions available

## Steps

### 1. Audit Existing State
Run `dbt ls` and `dbt test` to see what exists and what's failing. Check documentation coverage with `dbt docs generate`.

### 2. Design Layer Architecture
Sources (raw) → Staging (clean, typed, renamed) → Intermediate (business logic) → Marts (aggregated, business-facing). Never skip layers.

### 3. Build Staging Models
One model per source table. Rename columns, cast types, add `not_null` and `unique` tests on primary keys. No business logic here.

### 4. Define Metrics
Use dbt Semantic Layer or dbt_metrics. One metric per business concept: revenue, active_users, churn_rate. Document calculation logic.

### 5. Add Freshness Checks
Configure `freshness` blocks on source tables. Set warn_after and error_after thresholds matching the business SLA.

### 6. Document and Test
Run `dbt docs generate`. Write column-level descriptions for every mart table column. Target ≥80% documentation coverage.

## Verification
- [ ] All staging models tested (not_null, unique on PKs)
- [ ] Source freshness configured
- [ ] dbt docs generated with ≥80% coverage

## Rollback
`git revert` the model changes. Run `dbt run --select reverted_model`.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Duplicate rows in mart | Missing unique test | Add unique test and investigate source |
| Stale data silently | No freshness checks | Add freshness to all sources |
| Business logic drift | Logic duplicated across models | Centralize in intermediate layer |

## Examples
**Example A:** Build `fct_orders` mart from `stg_orders` and `stg_customers` with revenue metric.
**Example B:** Define `active_users` metric as users with ≥1 session in last 30 days in dbt Semantic Layer.
