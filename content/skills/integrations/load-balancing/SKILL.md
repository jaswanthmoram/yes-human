---
id: integrations.load-balancing
name: Load Balancing
version: 1.0.0
domain: integrations
category: integrations.infrastructure
purpose: Configure load balancing strategies for distributing traffic across service instances with health checking and failover.
summary: Guides through implementing load balancing including round-robin, least-connections, consistent hashing, and health-based routing.
triggers:
  - configure load balancer
  - load balancing strategy
  - traffic distribution setup
activation_triggers:
  - distribute traffic
  - service failover
prerequisites:
  - multiple service instances
  - health check endpoints
inputs:
  - balancing_algorithm
  - health_check_config
  - failover_strategy
steps:
  - Choose load balancing algorithm for the workload type
  - Configure health checks for backend instances
  - Set up session affinity if required
  - Implement failover and circuit breaking
  - Configure SSL termination at load balancer
  - Monitor distribution and instance health
outputs:
  - load_balancer_config
  - health_check_setup
  - failover_rules
tools:
  - filesystem.write (load balancer configuration)
quality_gates:
  - Traffic distributed according to algorithm
  - Unhealthy instances removed from pool
  - Failover completes within SLA
failure_modes:
  - Uneven traffic distribution causing hotspots
  - Health checks too lenient allowing degraded instances
  - Session affinity causing sticky session problems
handoffs:
  - integrations.api-gateway-setup (for gateway-level balancing)
  - integrations.circuit-breaker (for failover patterns)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-gateway-architect
  - integrations.microservices-integrator
allowed_workflows:
  - integrations.api-gateway-configuration
status: active
budget_band: standard
rollback:
  - Revert load balancer configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when configuring load balancing for distributing traffic across service instances.

## Prerequisites
- Multiple service instances deployed
- Health check endpoints implemented

## Steps
1. **Choose Algorithm**: Round-robin for stateless, least-connections for variable workloads, consistent hashing for caching.
2. **Health Checks**: Configure active and passive health checks with appropriate thresholds.
3. **Session Affinity**: Enable only when required (e.g., WebSocket connections, in-memory sessions).
4. **Failover**: Configure automatic failover with circuit breaker integration.
5. **SSL Termination**: Handle TLS at the load balancer for performance.
6. **Monitor**: Track request distribution, latency percentiles, and instance health.

## Verification
- Load tests show even distribution across instances
- Unhealthy instances are removed within health check interval
- Failover completes without dropped requests

## Rollback
- Revert load balancer configuration to previous version

## Common Failures
- Health check interval too long, keeping bad instances in pool
- Session affinity preventing proper load distribution
- Not accounting for connection draining during deployments
