---
id: integrations.webhook-implementation
name: Webhook Implementation
version: 1.0.0
domain: integrations
category: integrations.events
purpose: Implement reliable webhook receivers and senders with signature verification, idempotency, and retry handling.
summary: Guides through building webhook infrastructure including endpoint security, payload validation, and delivery guarantees.
triggers:
  - implement webhook
  - webhook receiver setup
  - webhook sender config
activation_triggers:
  - receive webhook events
  - send webhooks
prerequisites:
  - webhook payload specification
  - signing secret or key
inputs:
  - webhook_specification
  - signing_method
  - processing_requirements
steps:
  - Define webhook payload schema and event types
  - Implement signature verification (HMAC-SHA256 or RSA)
  - Create idempotent event processing with deduplication
  - Add async processing with queue backing
  - Implement retry logic for failed deliveries
  - Configure monitoring and alerting for delivery failures
outputs:
  - webhook_endpoint
  - verification_middleware
  - event_processor
tools:
  - filesystem.write (webhook handler code)
quality_gates:
  - All payloads signature-verified
  - Idempotency keys tracked
  - Dead letter queue configured
failure_modes:
  - Accepting unverified payloads
  - Processing duplicate events
  - Silent delivery failures
handoffs:
  - integrations.api-authentication (for signing)
  - integrations.api-monitoring (for observability)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.webhook-developer
allowed_workflows:
  - integrations.webhook-implementation
status: active
budget_band: standard
rollback:
  - Revert webhook endpoint configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing webhook receivers or senders for event-driven integrations.

## Prerequisites
- Webhook payload specification defined
- Signing secret or certificate provisioned

## Steps
1. **Define Schema**: Document expected payload structure and event types.
2. **Verify Signatures**: Implement HMAC-SHA256 verification on every incoming request.
3. **Deduplicate**: Track event IDs to ensure exactly-once processing.
4. **Process Async**: Acknowledge receipt immediately, process via background queue.
5. **Retry Failures**: Implement exponential backoff for failed processing.
6. **Monitor**: Track delivery success rates and processing latency.

## Verification
- All incoming webhooks verified by signature
- Duplicate events are detected and skipped
- Failed events are retried or moved to dead letter queue

## Rollback
- Revert webhook endpoint and processing configuration

## Common Failures
- Not verifying webhook signatures
- Synchronous processing causing timeouts
- Missing idempotency leading to duplicate side effects
