---
id: engineering.query-analysis
name: SQL Query Analysis and Optimization
description: Analyze SQL queries for performance issues, identify anti-patterns, and recommend optimized query structures.
triggers:
  - optimize the reporting dashboard query
  - find N+1 queries in the repository layer
  - analyze why this SQL query is slow
  - analyze query
  - slow SQL
  - query optimization
  - N+1 query
  - query performance
  - explain plan
  - optimize SQL
aliases:
  - sql tuning
  - query review
  - sql analysis
negative_keywords:
  - ORM configuration
  - database design
  - schema design
  - connection pooling
inputs:
  - sql_queries
  - query_plans (optional)
  - table_schemas (optional)
  - performance_metrics (optional)
outputs:
  - query_analysis_report
  - anti_patterns_found
  - optimized_queries
  - performance_recommendations
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Missing N+1 queries hidden in ORM abstractions
  - Recommending denormalization without considering consistency
  - Overlooking implicit type conversions in WHERE clauses
  - Ignoring query parameter sniffing issues
verification:
  - Optimized query produces identical results
  - EXPLAIN plan shows measurable improvement
  - No regression in concurrent query performance
  - Application tests pass with optimized queries
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Systematically analyze SQL queries to identify performance anti-patterns, recommend optimizations, and verify improvements through execution plan analysis.

## When To Use
- Specific queries are identified as slow or resource-intensive
- N+1 query problems suspected in ORM-generated SQL
- Query review before deploying to production
- Investigating database CPU or I/O spikes
- Optimizing report-generation or analytics queries

## When Not To Use
- Schema design or normalization decisions
- Database connection pool tuning
- ORM framework configuration
- Full-text search query optimization

## Procedure
1. **Collect Target Queries**: Gather slow query logs, ORM-generated SQL, or manually specified queries. Capture execution times and frequency.
2. **Analyze Query Structure**: Break down each query's SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, and ORDER BY clauses. Identify subqueries and CTEs.
3. **Identify Anti-Patterns**: Check for N+1 queries, SELECT *, implicit type conversions, functions on indexed columns in WHERE, correlated subqueries, and missing JOIN conditions.
4. **Review Execution Plans**: Run EXPLAIN ANALYZE on each query. Identify sequential scans, nested loop joins on large sets, and sort operations.
5. **Generate Optimized Queries**: Rewrite queries to eliminate anti-patterns. Replace correlated subqueries with JOINs. Add appropriate WHERE clause filters. Use CTEs for readability.
6. **Validate Results**: Execute optimized queries and compare results with originals. Run EXPLAIN ANALYZE on optimized versions.
7. **Document Recommendations**: Provide before/after query comparisons with execution plan improvements. Include index recommendations if applicable.

## Tool Policy
- Use shell.readonly for EXPLAIN ANALYZE and query execution
- Use filesystem.read to inspect ORM query builders and repository code
- Use code_graph.query to trace query generation paths
- Never execute write queries (UPDATE, DELETE, DROP) during analysis

## Verification
- Optimized query returns identical result set to original
- EXPLAIN ANALYZE shows improved cost estimate and execution time
- No new anti-patterns introduced by optimization
- Application integration tests pass with optimized queries

## Failure Modes
- Optimizing a query that is already fast enough, wasting effort
- Rewriting ORM queries that are regenerated on each deploy
- Missing parameterized query issues leading to SQL injection risk
- Recommending query changes that break application-level assumptions

## Example Routes
- `this SQL query is slow` -> engineering.query-analysis
- `find N+1 queries in the codebase` -> engineering.query-analysis
- `optimize the reporting query` -> engineering.query-analysis

## Source Notes
SQL optimization patterns from PostgreSQL EXPLAIN documentation, MySQL performance schema guides, and Use The Index Luke. N+1 detection patterns from ORM community best practices. Reference dossier: `ref.github.engineering.2026-05-31`.
