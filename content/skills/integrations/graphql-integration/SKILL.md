---
id: integrations.graphql-integration
name: GraphQL Integration
version: 1.0.0
domain: integrations
category: integrations.api
purpose: Implement GraphQL client and server integrations with proper query management, caching, and error handling.
summary: Guides through building GraphQL integrations including schema design, resolver implementation, and client-side query management.
triggers:
  - graphql client setup
  - graphql server integration
  - graphql schema implementation
activation_triggers:
  - connect graphql api
  - implement graphql
prerequisites:
  - graphql schema or endpoint
  - understanding of query patterns
inputs:
  - schema_definition
  - resolver_requirements
  - client_configuration
steps:
  - Define or review the GraphQL schema and types
  - Implement resolvers with proper data loading
  - Configure query batching and caching
  - Add error handling and partial failure support
  - Implement query complexity analysis
  - Set up introspection and documentation
outputs:
  - graphql_schema
  - resolver_implementation
  - client_configuration
tools:
  - filesystem.write (schema and resolver files)
quality_gates:
  - Schema validates against specification
  - Resolvers handle null and error cases
  - Query complexity limits configured
failure_modes:
  - N+1 query problems in resolvers
  - Missing null handling in schema
  - Unbounded query depth
handoffs:
  - integrations.api-authentication (for auth)
  - integrations.api-testing (for testing)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.graphql-integrator
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert schema and resolver changes
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing GraphQL client or server integrations.

## Prerequisites
- GraphQL schema or endpoint available
- Understanding of query and mutation patterns needed

## Steps
1. **Define Schema**: Create types, queries, mutations, and subscriptions as needed.
2. **Implement Resolvers**: Build data loaders with batching to avoid N+1 queries.
3. **Configure Caching**: Set up query result caching with appropriate TTLs.
4. **Handle Errors**: Implement structured error responses with error codes.
5. **Complexity Analysis**: Add query depth and complexity limits.
6. **Document**: Enable introspection and generate documentation.

## Verification
- Schema passes validation
- Resolvers return correct data for all types
- Error responses follow GraphQL specification

## Rollback
- Revert schema and resolver changes

## Common Failures
- N+1 queries from naive resolver implementation
- Missing authorization checks in resolvers
- Unbounded query depth allowing DoS
