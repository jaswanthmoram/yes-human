---
id: engineering.query-analysis
name: Database Query Analysis and Optimization
version: 1.0.0
domain: engineering
category: engineering.data
purpose: Identify and fix slow or inefficient database queries using EXPLAIN analysis and indexing strategy.
summary: Systematic query optimization: capture slow queries from logs, run EXPLAIN ANALYZE, identify sequential scans and missing indexes, apply fixes incrementally, and measure improvement. Covers PostgreSQL, MySQL, and SQLite patterns.
triggers:
  - slow database query
  - query analysis
  - explain analyze
  - database performance
  - index missing
activation_triggers:
  - the API is slow and the database is the bottleneck
  - EXPLAIN ANALYZE shows a sequential scan
prerequisites:
  - database query logging enabled (log_min_duration_statement)
  - ability to run EXPLAIN ANALYZE in a non-production environment
  - query to optimize identified
inputs:
  - slow_query
  - explain_output
steps:
  - Enable slow query logging (log_min_duration_statement = 100 for PG) and identify top queries by total time
  - Run EXPLAIN ANALYZE on the query — read cost estimates and actual times; look for Seq Scan on large tables
  - Identify the bottleneck: missing index, N+1 query, full table scan, missing join condition, or bad statistics
  - For missing indexes: create a covering index on the most selective column(s) in the WHERE/ORDER BY clause
  - For N+1: rewrite with JOIN or use dataloader batching pattern; never loop and query inside a loop
  - Measure the improvement: compare query time before and after; only keep the index if it reduces time ≥30%
outputs:
  - explain_analysis_report
  - index_migration
  - query_rewrite
tools:
  - filesystem.read
  - shell.readonly
quality_gates:
  - Query time reduced ≥30% in staging environment
  - No full-table sequential scans on tables >10K rows
  - Index added via migration (not manual ALTER TABLE in production)
failure_modes:
  - Index created on wrong column — check cardinality first
  - EXPLAIN without ANALYZE — no actual timing data
  - Index added in production without CONCURRENTLY — table locks
handoffs:
  - engineering.architect (for schema redesign decisions)
source_references:
  - https://github.com/prisma/prisma
  - https://github.com/pganalyze/pganalyze-collector
allowed_agents:
  - engineering.build-resolver
  - engineering.architect
status: active
budget_band: standard
rollback:
  - DROP INDEX CONCURRENTLY if new index degrades write performance
  - Revert query rewrite via git
validators:
  - skill.validator
---
## Trigger
Use when API response times are high and database is identified as the bottleneck through profiling.

## Prerequisites
- Access to slow query log or query profiler
- EXPLAIN ANALYZE available in a non-production DB

## Steps

### 1. Find Slow Queries
Enable `log_min_duration_statement = 100` (100ms). Check `pg_stat_statements` for queries by total time.

### 2. Run EXPLAIN ANALYZE
Run the exact query with `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)`. Read: Seq Scan = bad on large tables. Look at "actual time" vs "cost".

### 3. Identify Root Cause
Missing index (Seq Scan with filter), N+1 (query in loop), missing JOIN condition (cartesian product), or stale statistics (ANALYZE table).

### 4. Add Index
`CREATE INDEX CONCURRENTLY idx_users_email ON users(email)`. Use CONCURRENTLY to avoid locks. Use partial indexes for filtered queries.

### 5. Rewrite if Needed
Replace N+1 loops with JOIN. Replace `SELECT *` with explicit columns. Use `LIMIT` on large result sets.

### 6. Measure Improvement
Run the original query before and after. Log both timings. Only keep changes that show ≥30% improvement.

## Verification
- [ ] Query time reduced ≥30%
- [ ] No Seq Scan on large tables
- [ ] Index added via CONCURRENTLY migration

## Rollback
`DROP INDEX CONCURRENTLY idx_name;` to remove index. Revert query changes via git.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Index not used | Low cardinality column | Use composite index or different column |
| Writes become slow | Too many indexes | Remove unused indexes |
| EXPLAIN shows different plan in prod | Different stats | Run ANALYZE on prod table |

## Examples
**Example A:** `SELECT * FROM orders WHERE user_id = ?` does Seq Scan — add index on user_id.
**Example B:** Loading posts with comments does 100 queries (N+1) — rewrite with JOIN and GROUP.
