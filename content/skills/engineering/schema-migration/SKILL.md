---
id: engineering.schema-migration
name: Database Schema Migration Patterns
description: Plan, generate, and validate safe database schema migrations with rollback strategies and zero-downtime deployment support.
triggers:
  - schema migration
  - database migration
  - alter table
  - migrate schema
  - add column
  - database change
  - migration script
aliases:
  - db migration
  - schema change
  - ddl migration
negative_keywords:
  - data migration
  - ETL
  - backup restore
  - seeding
inputs:
  - current_schema
  - target_schema
  - migration_tool (optional)
  - database_engine (optional)
outputs:
  - migration_plan
  - migration_scripts
  - rollback_scripts
  - validation_report
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Data loss from destructive column drops
  - Lock contention on large tables during ALTER
  - Missing rollback scripts
  - Incompatible migration across environments
verification:
  - Migration applies cleanly on test database
  - Rollback restores previous schema state
  - No data loss verified after migration
  - Application tests pass post-migration
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Provide safe, repeatable database schema migration patterns that support zero-downtime deployments, proper rollback strategies, and cross-environment consistency.

## When To Use
- Adding, modifying, or removing database tables, columns, or indexes
- Changing column types, constraints, or defaults
- Introducing new relationships or foreign keys
- Planning multi-step migrations for large tables
- Setting up migration tooling and workflows

## When Not To Use
- Pure data migrations or ETL pipelines (use dedicated data migration tools)
- Database backup and restore operations
- Seeding initial development data
- NoSQL schema-less document store changes

## Procedure
1. **Analyze Current Schema**: Inspect the existing schema, identify affected tables, indexes, and constraints. Map dependencies between tables.
2. **Design Migration Plan**: Define the target schema state. Break complex changes into small, safe steps. Identify destructive vs additive changes.
3. **Generate Migration Scripts**: Write forward migration SQL or ORM migration files. Follow the expand-contract pattern for column renames and type changes.
4. **Create Rollback Scripts**: Write reverse migration for every forward step. Verify rollback restores the exact previous state.
5. **Validate Safety**: Check for lock contention risks on large tables. Verify no destructive operations without data backup. Ensure migrations are idempotent where possible.
6. **Test Migration**: Apply migration on a copy of production data or staging. Run application test suite against migrated schema. Measure migration execution time.
7. **Document and Deploy**: Document migration order and dependencies. Coordinate deployment with application code changes. Plan for gradual rollout on large datasets.

## Tool Policy
- Use project's existing migration framework (Prisma, Knex, Flyway, Alembic, golang-migrate)
- Prefer ORM-generated migrations when available for consistency
- Use shell.readonly to dry-run migrations, never auto-apply to production

## Verification
- `migrate up` applies without errors on test database
- `migrate down` restores previous schema exactly
- Application test suite passes post-migration
- Migration completes within acceptable time window for table sizes

## Failure Modes
- Destructive `DROP COLUMN` without data backup causes permanent data loss
- `ALTER TABLE` on large tables causes extended lock and downtime
- Missing foreign key constraints after migration breaks referential integrity
- Migration order conflicts in team environments cause apply failures

## Example Routes
- `schema migration` -> engineering.schema-migration
- `add a new column to users table` -> engineering.schema-migration
- `rename column safely` -> engineering.schema-migration

## Source Notes
Patterns derived from established migration best practices across Prisma, Flyway, and golang-migrate ecosystems. Expand-contract pattern referenced from Martin Fowler's database migration guidance. Reference dossier: `ref.github.engineering.2026-05-31`.
