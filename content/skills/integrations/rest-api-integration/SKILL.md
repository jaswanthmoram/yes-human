---
id: integrations.rest-api-integration
name: REST API Integration
version: 1.0.0
domain: integrations
category: integrations.api
purpose: Implement robust REST API client integrations with proper error handling, authentication, and retry logic.
summary: Guides through building REST API clients with connection pooling, request/response transformation, and resilience patterns.
triggers:
  - build rest api client
  - integrate rest endpoint
  - http client setup
activation_triggers:
  - connect to external api
  - rest client implementation
prerequisites:
  - target api documentation
  - authentication credentials
inputs:
  - api_base_url
  - auth_method
  - endpoint_specifications
steps:
  - Review API documentation and authentication requirements
  - Design the client interface and data models
  - Implement connection pooling and HTTP client configuration
  - Add request/response transformation and serialization
  - Implement retry logic with exponential backoff
  - Add circuit breaker for service degradation
  - Configure logging and monitoring
outputs:
  - api_client_implementation
  - data_models
  - error_handling_strategy
tools:
  - filesystem.write (client code)
quality_gates:
  - All endpoints covered
  - Error handling for all HTTP status codes
  - Retry logic implemented
failure_modes:
  - Missing error handling for edge cases
  - Hardcoded configuration values
  - No timeout configuration
handoffs:
  - integrations.api-authentication (for auth setup)
  - integrations.api-testing (for test coverage)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.third-party-integrator
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert client configuration changes
validators:
  - skill.validator
---

## Trigger
Use this skill when building REST API client integrations or connecting to external HTTP services.

## Prerequisites
- Target API documentation available
- Authentication credentials provisioned
- Network connectivity to target service

## Steps
1. **Review API Documentation**: Understand endpoints, auth requirements, rate limits, and response formats.
2. **Design Client Interface**: Define the public API surface of your client with typed inputs and outputs.
3. **Configure HTTP Client**: Set up connection pooling, timeouts, and TLS configuration.
4. **Transform Data**: Map between internal models and external API representations.
5. **Add Resilience**: Implement retry with exponential backoff and circuit breaker patterns.
6. **Monitor**: Add structured logging and metrics for request latency and error rates.

## Verification
- Client handles all documented endpoints
- Error responses are properly categorized
- Retry logic respects API rate limits

## Rollback
- Revert client configuration and code changes

## Common Failures
- Not handling 429 Too Many Requests properly
- Missing timeout on connection and read operations
- Logging sensitive data from requests or responses
