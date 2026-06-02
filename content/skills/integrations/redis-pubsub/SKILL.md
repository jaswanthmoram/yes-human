---
id: integrations.redis-pubsub
name: Redis Pub/Sub
version: 1.0.0
domain: integrations
category: integrations.messaging
purpose: Implement Redis Pub/Sub for real-time messaging with proper channel design, subscriber management, and message persistence strategies.
summary: Guides through building Redis Pub/Sub integrations including channel patterns, subscriber resilience, and Streams API usage.
triggers:
  - redis pubsub setup
  - redis channels implementation
  - redis streams configuration
activation_triggers:
  - implement real time messaging
  - redis pub sub
prerequisites:
  - redis instance available
  - understanding of pub/sub patterns
inputs:
  - channel_design
  - subscriber_requirements
  - persistence_needs
steps:
  - Design channel naming and subscription patterns
  - Implement publishers with error handling
  - Implement subscribers with reconnection logic
  - Configure Redis Streams for persistent messaging if needed
  - Add consumer groups for load balancing
  - Monitor channel activity and subscriber health
outputs:
  - publisher_implementation
  - subscriber_implementation
  - channel_configuration
tools:
  - filesystem.write (redis pub/sub code)
quality_gates:
  - Subscribers reconnect on failure
  - Messages persisted when using Streams
  - Channel naming follows conventions
failure_modes:
  - Lost messages during subscriber disconnection (Pub/Sub)
  - No reconnection logic for subscribers
  - Channel naming collisions
handoffs:
  - integrations.message-queue-engineer (for durable messaging)
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
  - Revert channel and subscriber configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing Redis Pub/Sub or Redis Streams for real-time messaging.

## Prerequisites
- Redis instance provisioned
- Understanding of fire-and-forget vs. persistent messaging needs

## Steps
1. **Design Channels**: Use namespaced channel names (e.g., app:events:orders).
2. **Implement Publishers**: Publish with error handling and logging.
3. **Implement Subscribers**: Add automatic reconnection with backoff.
4. **Consider Streams**: Use Redis Streams when message persistence is required.
5. **Consumer Groups**: Use consumer groups for load-balanced processing.
6. **Monitor**: Track subscriber count, message rates, and lag.

## Verification
- Subscribers receive published messages
- Reconnection works after Redis restart
- Streams consumers process all messages

## Rollback
- Revert channel configuration and subscriber settings

## Common Failures
- Using Pub/Sub when message persistence is required
- No reconnection logic causing silent subscriber loss
- Not using consumer groups for horizontal scaling
