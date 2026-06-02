---
id: integrations.rate-limiting
name: Rate Limiting
version: 1.0.0
domain: integrations
category: integrations.resilience
purpose: Implement rate limiting strategies to protect APIs from abuse and ensure fair resource allocation.
summary: Guides through implementing token bucket, sliding window, and distributed rate limiting for API protection.
triggers:
  - implement rate limiting
  - api throttling setup
  - rate limit configuration
activation_triggers:
  - protect api from abuse
  - add throttling
prerequisites:
  - understanding of traffic patterns
  - storage backend for counters
inputs:
  - rate_limit_policy
  - storage_backend
  - enforcement_point
steps:
  - Define rate limit policies per endpoint and consumer
  - Choose algorithm (token bucket, sliding window, fixed window)
  - Implement distributed counter storage (Redis preferred)
  - Add rate limit headers to responses
  - Configure graceful degradation for limited requests
  - Monitor and tune limits based on actual traffic
outputs:
  - rate_limit_implementation
  - policy_configuration
  - monitoring_dashboard
tools:
  - filesystem.write (rate limiter code)
quality_gates:
  - Limits enforced consistently
  - Headers communicate limits to clients
  - No race conditions in distributed setup
failure_modes:
  - Race conditions in counter increments
  - Limits too restrictive causing legitimate failures
  - Missing rate limit headers in responses
handoffs:
  - integrations.api-gateway-setup (for gateway-level limiting)
  - integrations.api-monitoring (for observability)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-gateway-architect
  - integrations.middleware-developer
allowed_workflows:
  - integrations.api-gateway-configuration
status: active
budget_band: standard
rollback:
  - Disable rate limiting temporarily during incidents
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing rate limiting for API protection.

## Prerequisites
- Traffic patterns understood
- Redis or similar storage available for distributed counters

## Steps
1. **Define Policies**: Set limits per endpoint, consumer, and time window.
2. **Choose Algorithm**: Token bucket for burst tolerance, sliding window for accuracy.
3. **Implement Storage**: Use Redis with atomic operations for distributed counting.
4. **Add Headers**: Return X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset.
5. **Handle Limits**: Return 429 with Retry-After header when limits exceeded.
6. **Monitor**: Track limit hits and adjust thresholds based on real traffic.

## Verification
- Rate limits enforced under load testing
- Headers correctly communicate remaining quota
- Distributed setup handles concurrent requests

## Rollback
- Disable rate limiting or increase limits during incidents

## Common Failures
- Race conditions in non-atomic counter updates
- Not returning rate limit headers in successful responses
- Setting limits without monitoring actual traffic patterns
