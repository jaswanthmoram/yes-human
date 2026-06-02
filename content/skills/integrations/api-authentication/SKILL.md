---
id: integrations.api-authentication
name: API Authentication
version: 1.0.0
domain: integrations
category: integrations.security
purpose: Implement secure API authentication using OAuth 2.0, JWT, API keys, or mutual TLS following industry best practices.
summary: Guides through choosing and implementing the right authentication strategy for API integrations.
triggers:
  - api auth setup
  - oauth2 implementation
  - jwt authentication
  - api key management
activation_triggers:
  - secure api endpoint
  - implement authentication
prerequisites:
  - identity provider or auth service
  - understanding of security requirements
inputs:
  - auth_method
  - token_lifecycle
  - security_requirements
steps:
  - Choose appropriate authentication method for the use case
  - Implement token acquisition and refresh flows
  - Configure token validation and expiration handling
  - Add secure credential storage and rotation
  - Implement scope-based authorization
  - Configure audit logging for auth events
outputs:
  - auth_implementation
  - token_management
  - security_configuration
tools:
  - filesystem.write (auth configuration)
quality_gates:
  - Tokens properly validated
  - Credentials never logged or exposed
  - Refresh flows implemented
failure_modes:
  - Storing tokens in plaintext
  - Missing token expiration handling
  - Overly broad permission scopes
handoffs:
  - security.auth-review (for security audit)
  - integrations.rest-api-integration (for client setup)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.middleware-developer
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Rotate compromised credentials immediately
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing authentication for API integrations.

## Prerequisites
- Identity provider or auth service available
- Security requirements documented

## Steps
1. **Choose Method**: Select OAuth 2.0, JWT, API keys, or mTLS based on use case.
2. **Implement Flows**: Build token acquisition, refresh, and revocation flows.
3. **Validate Tokens**: Verify signatures, expiration, and claims on every request.
4. **Store Securely**: Use environment variables or secret managers for credentials.
5. **Authorize**: Implement scope-based access control at the API level.
6. **Audit**: Log authentication events for security monitoring.

## Verification
- Authentication flow works end-to-end
- Token refresh handles expiration gracefully
- No credentials appear in logs or error messages

## Rollback
- Rotate any exposed credentials immediately

## Common Failures
- Hardcoding API keys in source code
- Not implementing token refresh
- Using overly broad OAuth scopes
