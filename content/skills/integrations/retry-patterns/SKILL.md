---
id: integrations.retry-patterns
name: Retry Patterns
version: 1.0.0
domain: integrations
category: integrations.resilience
purpose: Implement retry strategies with exponential backoff, jitter, and idempotency for handling transient failures.
summary: Guides through building retry logic with configurable policies, backoff strategies, and circuit breaker integration.
triggers:
  - implement retry logic
  - retry with backoff
  - transient failure handling
activation_triggers:
  - add retry to api calls
  - handle temporary failures
prerequisites:
  - understanding of transient vs permanent failures
  - idempotency requirements
inputs:
  - retry_policy
  - backoff_strategy
  - max_retries
steps:
  - Classify errors as retryable or non-retryable
  - Choose backoff strategy (exponential, linear, fixed)
  - Add jitter to prevent thundering herd
  - Implement idempotency keys for safe retries
  - Configure maximum retry count and total timeout
  - Integrate with circuit breaker for cascading failures
outputs:
  - retry_implementation
  - backoff_configuration
  - idempotency_strategy
tools:
  - filesystem.write (retry logic code)
quality_gates:
  - Only transient errors are retried
  - Backoff prevents thundering herd
  - Idempotency prevents duplicate side effects
failure_modes:
  - Retrying non-idempotent operations
  - No backoff causing thundering herd
  - Retrying permanent failures indefinitely
handoffs:
  - integrations.circuit-breaker (for combined resilience)
  - integrations.api-monitoring (for retry metrics)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.microservices-integrator
allowed_workflows:
  - integrations.microservices-integration
status: active
budget_band: standard
rollback:
  - Disable retry logic temporarily
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing retry logic for handling transient failures in API calls or service communication.

## Prerequisites
- Understanding of which errors are transient vs. permanent
- Operations are idempotent or idempotency keys are available

## Steps
1. **Classify Errors**: Retry on 5xx, timeouts, and connection errors. Never retry 4xx.
2. **Backoff Strategy**: Use exponential backoff with base delay and maximum cap.
3. **Add Jitter**: Randomize delay to prevent synchronized retries (thundering herd).
4. **Idempotency**: Generate unique keys for each operation to prevent duplicates.
5. **Limits**: Set max retries (typically 3-5) and total timeout budget.
6. **Circuit Breaker**: Stop retrying when circuit breaker is open.

## Verification
- Transient failures are retried and eventually succeed
- Permanent failures fail fast without retries
- No duplicate side effects from retried operations

## Rollback
- Disable retry logic or reduce max retries

## Common Failures
- Retrying POST requests without idempotency keys
- No jitter causing thundering herd on service recovery
- Retrying 400/401/403 errors that will never succeed
