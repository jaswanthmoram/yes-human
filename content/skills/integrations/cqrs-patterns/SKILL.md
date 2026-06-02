---
id: integrations.cqrs-patterns
name: CQRS Patterns
version: 1.0.0
domain: integrations
category: integrations.patterns
purpose: Implement Command Query Responsibility Segregation with separate read and write models for optimized performance and scalability.
summary: Guides through implementing CQRS including command handlers, query handlers, and read model synchronization.
triggers:
  - implement cqrs
  - command query separation
  - read write model split
activation_triggers:
  - separate read and write paths
  - optimize query performance
prerequisites:
  - domain model understanding
  - separate read and write requirements
inputs:
  - command_definitions
  - query_requirements
  - synchronization_strategy
steps:
  - Identify commands (writes) and queries (reads) in the domain
  - Design command handlers with validation and business rules
  - Design query handlers with optimized read models
  - Implement read model synchronization from write side
  - Configure eventual consistency handling
  - Add monitoring for sync lag and consistency
outputs:
  - command_handlers
  - query_handlers
  - synchronization_config
tools:
  - filesystem.write (CQRS implementation)
quality_gates:
  - Commands and queries fully separated
  - Read models eventually consistent
  - No direct database reads from command side
failure_modes:
  - Leaking write model into query handlers
  - Read model sync failures without recovery
  - Stale reads without consistency guarantees
handoffs:
  - integrations.event-sourcing (for event-driven CQRS)
  - integrations.microservices-integrator (for service boundaries)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.microservices-integrator
  - integrations.event-streaming-architect
allowed_workflows:
  - integrations.microservices-integration
status: active
budget_band: standard
rollback:
  - Rebuild read models from write side
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing CQRS patterns for separating read and write operations.

## Prerequisites
- Domain model with distinct read and write patterns
- Understanding of consistency requirements

## Steps
1. **Separate Concerns**: Identify which operations are commands vs. queries.
2. **Command Handlers**: Implement with full validation and business rule enforcement.
3. **Query Handlers**: Build optimized read models (denormalized views, materialized views).
4. **Synchronize**: Use events or change data capture to update read models.
5. **Handle Consistency**: Document and implement eventual consistency patterns.
6. **Monitor**: Track sync lag and consistency drift.

## Verification
- Commands never read from query models
- Read models reflect write side within acceptable lag
- Sync failures trigger alerts and recovery

## Rollback
- Rebuild read models from the write-side event stream

## Common Failures
- Mixing read and write concerns in handlers
- Not handling read model synchronization failures
- Assuming strong consistency when using eventual consistency

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
