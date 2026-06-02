---
id: engineering.index-optimization
name: Database Index Optimization
description: Analyze query patterns and recommend optimal database indexes to improve query performance while minimizing write overhead.
triggers:
  - optimize index
  - slow query
  - add index
  - index optimization
  - database performance
  - query plan
  - missing index
aliases:
  - db indexing
  - index tuning
  - query optimization
negative_keywords:
  - full text search
  - search engine
  - caching
  - denormalization
inputs:
  - slow_queries
  - table_schemas
  - query_patterns
  - database_engine (optional)
outputs:
  - index_recommendations
  - impact_analysis
  - create_index_statements
  - performance_estimates
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 6000
failure_modes:
  - Over-indexing increases write latency
  - Index on low-cardinality column wastes space
  - Missing composite index for multi-column queries
  - Index bloat from unused indexes
verification:
  - EXPLAIN ANALYZE shows improved query plan
  - Write benchmarks show acceptable overhead
  - Index usage statistics confirm utilization
  - No duplicate or redundant indexes introduced
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Identify and recommend optimal database indexes based on query patterns, balancing read performance gains against write overhead and storage costs.

## When To Use
- Queries are slow despite adequate hardware
- EXPLAIN output shows sequential scans on large tables
- Adding new features that introduce new query patterns
- Periodic index audit for database health
- Post-deployment performance regression investigation

## When Not To Use
- Full-text search optimization (use dedicated search engines)
- Caching strategy design (use caching layers instead)
- Data denormalization decisions
- NoSQL document store optimization

## Procedure
1. **Collect Query Patterns**: Gather slow query logs, identify top-N expensive queries. Extract WHERE, JOIN, ORDER BY, and GROUP BY clauses.
2. **Analyze Existing Indexes**: Review current indexes on affected tables. Identify unused, duplicate, or redundant indexes.
3. **Map Queries to Indexes**: For each query pattern, determine the ideal index structure. Consider composite indexes, covering indexes, and partial indexes.
4. **Evaluate Trade-offs**: Assess write overhead for each proposed index. Check index cardinality and selectivity. Estimate storage impact.
5. **Generate Recommendations**: Produce CREATE INDEX statements with rationale. Prioritize by expected performance gain vs write cost.
6. **Validate with EXPLAIN**: Run EXPLAIN ANALYZE before and after index creation. Verify query plan improvement.
7. **Monitor Post-Deployment**: Track index usage statistics. Remove unused indexes after observation period.

## Tool Policy
- Use shell.readonly for EXPLAIN ANALYZE and index inspection queries
- Use filesystem.read to analyze ORM model definitions and query code
- Never auto-execute CREATE INDEX on production databases

## Verification
- EXPLAIN ANALYZE shows index scan instead of sequential scan
- Query execution time improves measurably
- Write latency increase is within acceptable bounds
- Index is actually used (pg_stat_user_indexes confirms)

## Failure Modes
- Creating indexes on low-selectivity columns (boolean, enum) with no benefit
- Over-indexing a write-heavy table degrades insert/update performance
- Composite index column order doesn't match query filter patterns
- Partial index predicate doesn't match actual query WHERE clauses

## Example Routes
- `slow query on users table` -> engineering.index-optimization
- `add index for email lookup` -> engineering.index-optimization
- `optimize database performance` -> engineering.index-optimization

## Source Notes
Index optimization patterns from PostgreSQL, MySQL, and SQLite documentation. Covering index and partial index strategies from Use The Index Luke. Reference dossier: `ref.github.engineering.2026-05-31`.
