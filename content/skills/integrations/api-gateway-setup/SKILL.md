---
id: integrations.api-gateway-setup
name: API Gateway Setup
version: 1.0.0
domain: integrations
category: integrations.infrastructure
purpose: Configure and deploy API gateways with routing, authentication, rate limiting, and observability plugins.
summary: Guides through setting up API gateways including Kong, Tyk, or AWS API Gateway with proper routing and plugin configuration.
triggers:
  - setup api gateway
  - configure gateway routing
  - gateway plugin configuration
activation_triggers:
  - deploy api gateway
  - gateway infrastructure
prerequisites:
  - gateway platform selected
  - service topology documented
inputs:
  - gateway_platform
  - routing_rules
  - plugin_requirements
steps:
  - Select and provision the gateway platform
  - Define routing rules mapping external paths to internal services
  - Configure authentication plugins (JWT, OAuth, API keys)
  - Set up rate limiting and throttling plugins
  - Enable logging and monitoring plugins
  - Configure TLS termination and certificate management
outputs:
  - gateway_configuration
  - routing_rules
  - plugin_config
tools:
  - filesystem.write (gateway configuration)
quality_gates:
  - All routes resolve correctly
  - Authentication enforced on protected routes
  - Rate limits active and tested
failure_modes:
  - Routes exposing internal services publicly
  - Missing authentication on sensitive endpoints
  - Plugin conflicts causing request failures
handoffs:
  - integrations.rate-limiting (for throttling details)
  - integrations.api-authentication (for auth plugins)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-gateway-architect
allowed_workflows:
  - integrations.api-gateway-configuration
status: active
budget_band: expanded
rollback:
  - Revert gateway configuration to previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when setting up or configuring an API gateway for microservices.

## Prerequisites
- Gateway platform selected (Kong, Tyk, AWS API Gateway, etc.)
- Service topology and routing requirements documented

## Steps
1. **Provision Gateway**: Deploy the gateway platform with appropriate sizing.
2. **Define Routes**: Map external paths to internal service endpoints.
3. **Auth Plugins**: Configure JWT validation, OAuth, or API key checking.
4. **Rate Limiting**: Set up per-consumer and per-route rate limits.
5. **Observability**: Enable request logging, metrics, and distributed tracing.
6. **TLS**: Configure certificate management and TLS termination.

## Verification
- Routes resolve to correct backend services
- Authentication rejects unauthenticated requests
- Rate limits return 429 when exceeded

## Rollback
- Revert gateway configuration to previous known-good version

## Common Failures
- Wildcard routes catching requests meant for specific services
- Missing auth plugin on newly added routes
- Plugin ordering causing unexpected behavior

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
