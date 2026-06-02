---
id: integrations.circuit-breaker
name: Circuit Breaker
version: 1.0.0
domain: integrations
category: integrations.resilience
purpose: Implement circuit breaker patterns to prevent cascading failures and enable graceful degradation in distributed systems.
summary: Guides through implementing circuit breakers with proper thresholds, state transitions, and fallback strategies.
triggers:
  - implement circuit breaker
  - circuit breaker configuration
  - cascading failure prevention
activation_triggers:
  - add resilience pattern
  - protect from downstream failures
prerequisites:
  - understanding of failure modes
  - fallback strategies defined
inputs:
  - failure_threshold
  - recovery_timeout
  - fallback_strategy
steps:
  - Define failure conditions that trip the circuit
  - Configure thresholds for open/half-open/closed transitions
  - Implement fallback responses for open circuit state
  - Add monitoring for circuit state changes
  - Configure bulkhead isolation for critical paths
  - Test circuit breaker behavior under failure conditions
outputs:
  - circuit_breaker_config
  - fallback_implementation
  - monitoring_setup
tools:
  - filesystem.write (circuit breaker code)
quality_gates:
  - Circuit opens after configured failure threshold
  - Half-open state allows probe requests
  - Fallbacks provide degraded but functional responses
failure_modes:
  - Threshold too high, allowing cascading failures
  - No fallback causing complete service unavailability
  - Circuit never resetting after transient failures
handoffs:
  - integrations.retry-patterns (for retry with circuit breaker)
  - integrations.api-monitoring (for observability)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.microservices-integrator
  - integrations.middleware-developer
allowed_workflows:
  - integrations.microservices-integration
status: active
budget_band: standard
rollback:
  - Reset circuit breaker state to closed
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing circuit breaker patterns for service resilience.

## Prerequisites
- Failure modes identified for downstream services
- Fallback strategies defined (cached response, default value, error)

## Steps
1. **Define Triggers**: Set failure rate and count thresholds that open the circuit.
2. **State Machine**: Implement closed → open → half-open → closed transitions.
3. **Fallbacks**: Return cached data, defaults, or graceful errors when circuit is open.
4. **Monitor**: Track state transitions, failure counts, and fallback usage.
5. **Bulkheads**: Isolate circuit breakers per downstream service.
6. **Test**: Simulate failures to verify circuit breaker behavior.

## Verification
- Circuit opens after N consecutive failures
- Half-open state allows a single probe request
- Fallback responses are returned when circuit is open

## Rollback
- Force circuit breaker to closed state

## Common Failures
- Setting failure threshold too high, allowing cascade
- No fallback implementation causing total unavailability
- Not testing circuit breaker behavior in staging

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
