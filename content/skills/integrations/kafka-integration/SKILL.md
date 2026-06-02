---
id: integrations.kafka-integration
name: Kafka Integration
version: 1.0.0
domain: integrations
category: integrations.messaging
purpose: Implement Apache Kafka producers and consumers with proper partitioning, serialization, and exactly-once semantics.
summary: Guides through building Kafka integrations including topic design, producer/consumer configuration, and stream processing.
triggers:
  - kafka producer setup
  - kafka consumer implementation
  - kafka topic configuration
activation_triggers:
  - implement kafka messaging
  - kafka stream processing
prerequisites:
  - kafka cluster available
  - topic naming conventions
inputs:
  - topic_configuration
  - serialization_format
  - delivery_semantics
steps:
  - Design topic structure with appropriate partitions and replication
  - Configure producers with acknowledgment and idempotency settings
  - Implement consumers with proper offset management
  - Set up schema registry for serialization (Avro/Protobuf)
  - Configure dead letter topics for failed processing
  - Implement monitoring for lag and throughput
outputs:
  - kafka_producer
  - kafka_consumer
  - topic_configuration
tools:
  - filesystem.write (kafka configuration)
quality_gates:
  - Messages delivered with configured semantics
  - Consumer lag within acceptable bounds
  - Schema compatibility enforced
failure_modes:
  - Message loss from incorrect ack settings
  - Consumer rebalance storms
  - Schema incompatibility breaking consumers
handoffs:
  - integrations.event-streaming-architect (for architecture)
  - integrations.api-monitoring (for observability)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.message-queue-engineer
  - integrations.event-streaming-architect
allowed_workflows:
  - integrations.message-queue-setup
status: active
budget_band: expanded
rollback:
  - Revert topic and consumer group configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing Apache Kafka producers, consumers, or stream processing.

## Prerequisites
- Kafka cluster provisioned
- Topic naming conventions established

## Steps
1. **Design Topics**: Define topics with partition count based on throughput and ordering needs.
2. **Configure Producers**: Set acks=all for durability, enable.idempotence=true for exactly-once.
3. **Implement Consumers**: Use consumer groups with manual or auto commit based on use case.
4. **Schema Registry**: Register schemas with backward or forward compatibility levels.
5. **Dead Letters**: Route failed messages to DLQ topics for investigation.
6. **Monitor**: Track consumer lag, throughput, and error rates.

## Verification
- Messages produced and consumed with expected semantics
- Consumer lag stays within bounds under load
- Schema evolution does not break existing consumers

## Rollback
- Revert topic configuration and consumer group offsets

## Common Failures
- Using acks=0 or acks=1 when durability is required
- Not handling consumer rebalance gracefully
- Schema changes without compatibility checks
