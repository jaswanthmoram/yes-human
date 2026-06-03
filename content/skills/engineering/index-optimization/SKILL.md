---
quality_gate: production
id: engineering.index-optimization
name: Database Index Optimization
version: 1.0.0
domain: engineering
category: engineering.data
purpose: Design and maintain a database index strategy that speeds reads without degrading write performance.
summary: Covers index selection (B-tree, partial, covering, composite), index bloat detection, unused index removal, and the write-performance trade-off. Applies to PostgreSQL with patterns applicable to MySQL and SQLite.
triggers:
  - database index optimization
  - add database index
  - remove unused index
  - index bloat
  - covering index
activation_triggers:
  - which columns should be indexed for this query pattern
  - optimize database indexes for the products table
  - this query is slow, should I add an index
  - queries are slow and we need indexes
  - our write performance is degrading
prerequisites:
  - Database accessible with query analysis permissions
  - pg_stat_user_indexes available (PostgreSQL)
inputs:
  - slow_query_pattern
  - existing_indexes
steps:
  - Audit existing indexes using pg_stat_user_indexes — identify indexes with idx_scan = 0 (unused)
  - Remove unused indexes (after confirming with the team) — they slow writes with no benefit
  - For the target query, identify the highest-cardinality column in the WHERE clause first
  - Design the index: single-column for simple filters, composite for multi-column WHERE, partial for filtered subsets, covering for query-only access
  - Create index CONCURRENTLY to avoid write locks on production
  - Monitor write performance after adding — if INSERT/UPDATE slows >20%, reconsider
outputs:
  - index_audit_report
  - index_migration_sql
  - before_after_benchmark
tools:
  - filesystem.read
  - shell.readonly
quality_gates:
  - Unused indexes identified and scheduled for removal
  - New index reduces target query time ≥30%
  - Write performance degradation <20%
failure_modes:
  - Index on low-cardinality column (boolean, status enum) — rarely helps
  - Too many indexes on a hot write table — degrades INSERT performance
  - Index added without CONCURRENTLY — production table locked
handoffs:
  - engineering.query-analysis (for query rewriting)
source_references:
  - https://github.com/drizzle-team/drizzle-orm
  - https://github.com/prisma/prisma
allowed_agents:
  - engineering.architect
  - engineering.build-resolver
status: active
budget_band: standard
rollback:
  - DROP INDEX CONCURRENTLY if writes degrade
  - Keep old index until new one confirmed working
validators:
  - skill.validator
---
## Trigger
Use when query optimization analysis identifies a Seq Scan on a large table, or when conducting a periodic index health audit.

## Prerequisites
- Database administrator access (at least read access to pg_stat_user_indexes)
- Slow query identified

## Steps

### 1. Audit Unused Indexes
`SELECT indexname, idx_scan FROM pg_stat_user_indexes WHERE schemaname='public' ORDER BY idx_scan;` — idx_scan=0 means unused.

### 2. Remove Dead Weight
For idx_scan=0 indexes not recently created, `DROP INDEX CONCURRENTLY`. Coordinate with team — someone might be planning to use it.

### 3. Choose Index Type
B-tree (default) for equality and range. GIN for arrays and JSONB. Partial for `WHERE status='active'`. Covering for `INCLUDE (col)` to avoid heap fetch.

### 4. Create CONCURRENTLY
`CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id)` — no table lock, slower to build but safe for production.

### 5. Verify Usage
Run `EXPLAIN ANALYZE` on the target query after index creation. Confirm Index Scan appears instead of Seq Scan.

### 6. Monitor Writes
Track INSERT/UPDATE times before/after. If writes degrade >20%, the index cost outweighs the read benefit.

## Verification
- [ ] Unused indexes identified and removed or documented
- [ ] New index used by target query (Index Scan in EXPLAIN)
- [ ] Write performance monitored

## Rollback
`DROP INDEX CONCURRENTLY idx_name;`

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Index not used | Planner prefers Seq Scan for small table | Accept it — Seq Scan is faster for <1K rows |
| Too many indexes | Historical accumulation | Regular audit with pg_stat_user_indexes |
| Lock during creation | Forgot CONCURRENTLY | Always use CONCURRENTLY in production |

## Examples
**Example A:** `orders.user_id` missing index — query does Seq Scan on 1M rows — add B-tree index.
**Example B:** Partial index: `CREATE INDEX ON orders(created_at) WHERE status='pending'` — only indexes pending orders.
