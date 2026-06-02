---
id: integrations.rabbitmq-integration
name: RabbitMQ Integration
version: 1.0.0
domain: integrations
category: integrations.messaging
purpose: Implement RabbitMQ producers and consumers with proper exchange topology, routing, and message reliability.
summary: Guides through building RabbitMQ integrations including exchange design, queue binding, and consumer patterns.
triggers:
  - rabbitmq setup
  - rabbitmq exchange design
  - rabbitmq consumer implementation
activation_triggers:
  - implement rabbitmq messaging
  - configure message broker
prerequisites:
  - rabbitmq instance available
  - understanding of message patterns
inputs:
  - exchange_topology
  - queue_configuration
  - routing_requirements
steps:
  - Design exchange topology (direct, topic, fanout, headers)
  - Configure queues with durability and TTL settings
  - Bind queues to exchanges with routing keys
  - Implement producers with publisher confirms
  - Implement consumers with manual acknowledgment
  - Configure dead letter exchanges for failed messages
outputs:
  - exchange_topology_config
  - producer_implementation
  - consumer_implementation
tools:
  - filesystem.write (rabbitmq configuration)
quality_gates:
  - Messages persisted when required
  - Acknowledgment patterns correct
  - Dead letter routing configured
failure_modes:
  - Message loss from auto-ack without processing
  - Unbounded queue growth without TTL
  - Missing publisher confirms for critical messages
handoffs:
  - integrations.message-queue-engineer (for architecture)
  - integrations.api-monitoring (for observability)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.message-queue-engineer
allowed_workflows:
  - integrations.message-queue-setup
status: active
budget_band: standard
rollback:
  - Revert exchange and queue configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing RabbitMQ producers, consumers, or exchange topology.

## Prerequisites
- RabbitMQ instance provisioned
- Message routing patterns understood

## Steps
1. **Design Exchanges**: Choose exchange type based on routing requirements.
2. **Configure Queues**: Set durable=true for persistent messages, configure TTL and max-length.
3. **Bind Queues**: Create bindings with appropriate routing keys.
4. **Implement Producers**: Use publisher confirms for guaranteed delivery.
5. **Implement Consumers**: Use manual acknowledgment after successful processing.
6. **Dead Letters**: Configure DLX for messages that fail processing.

## Verification
- Messages survive broker restart when durable
- Consumers acknowledge only after successful processing
- Failed messages route to dead letter exchange

## Rollback
- Revert exchange, queue, and binding configuration

## Common Failures
- Using auto-ack and losing messages on consumer crash
- Not setting queue TTL leading to unbounded growth
- Missing publisher confirms for important messages

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
