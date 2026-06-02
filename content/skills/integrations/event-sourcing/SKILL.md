---
id: integrations.event-sourcing
name: Event Sourcing
version: 1.0.0
domain: integrations
category: integrations.patterns
purpose: Implement event sourcing patterns with proper event store design, projection building, and snapshot management.
summary: Guides through building event-sourced systems including event store configuration, event handlers, and read model projections.
triggers:
  - implement event sourcing
  - event store setup
  - build event projections
activation_triggers:
  - event sourced architecture
  - append only event log
prerequisites:
  - understanding of domain events
  - event store infrastructure
inputs:
  - domain_events
  - projection_requirements
  - snapshot_strategy
steps:
  - Define domain events and their schemas
  - Design the event store schema and indexing
  - Implement event append and read operations
  - Build projection handlers for read models
  - Configure snapshot strategy for performance
  - Implement event replay and migration
outputs:
  - event_store_schema
  - projection_handlers
  - snapshot_configuration
tools:
  - filesystem.write (event store and projection code)
quality_gates:
  - Events are immutable once stored
  - Projections can be rebuilt from scratch
  - Snapshots consistent with event stream
failure_modes:
  - Mutating past events
  - Projections out of sync with event store
  - Snapshot corruption during rebuild
handoffs:
  - integrations.cqrs-patterns (for read/write separation)
  - integrations.event-streaming-architect (for streaming)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.event-streaming-architect
  - integrations.microservices-integrator
allowed_workflows:
  - integrations.event-streaming-deployment
status: active
budget_band: expanded
rollback:
  - Rebuild projections from event store
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing event sourcing patterns for domain-driven applications.

## Prerequisites
- Domain events identified and modeled
- Event store infrastructure available (EventStoreDB, Kafka, or custom)

## Steps
1. **Define Events**: Model domain events as immutable value objects with schemas.
2. **Design Store**: Create event store with append-only semantics and indexing.
3. **Implement Operations**: Build append and stream-read operations.
4. **Build Projections**: Create event handlers that build read models.
5. **Snapshot Strategy**: Take periodic snapshots to avoid replaying long streams.
6. **Replay Support**: Implement event replay for projection rebuilds and migrations.

## Verification
- Events are append-only and immutable
- Projections rebuild correctly from full event stream
- Snapshots match the state derived from events

## Rollback
- Rebuild projections from the event store

## Common Failures
- Allowing mutation of stored events
- Projections that cannot handle out-of-order events
- Snapshot strategy that misses edge cases
