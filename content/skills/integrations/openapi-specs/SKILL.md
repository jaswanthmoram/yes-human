---
id: integrations.openapi-specs
name: OpenAPI Specifications
version: 1.0.0
domain: integrations
category: integrations.documentation
purpose: Create and maintain OpenAPI 3.x specifications for REST APIs with proper schema definitions, examples, and validation.
summary: Guides through writing OpenAPI specifications including paths, components, security schemes, and server definitions.
triggers:
  - create openapi spec
  - write swagger specification
  - openapi schema definition
activation_triggers:
  - generate api specification
  - openapi yaml json
prerequisites:
  - api endpoints defined
  - understanding of openapi specification
inputs:
  - api_endpoints
  - schema_definitions
  - security_requirements
steps:
  - Define info, servers, and tags sections
  - Document all paths with operations, parameters, and request bodies
  - Create reusable component schemas for request/response models
  - Define security schemes (API key, OAuth2, HTTP bearer)
  - Add examples for all request and response bodies
  - Validate specification against OpenAPI 3.x schema
outputs:
  - openapi_specification
  - component_schemas
  - security_definitions
tools:
  - filesystem.write (OpenAPI YAML/JSON)
quality_gates:
  - Specification validates against OpenAPI 3.x
  - All endpoints documented with examples
  - Schemas reusable and consistent
failure_modes:
  - Invalid OpenAPI syntax
  - Missing required fields in schemas
  - Inconsistent naming across components
handoffs:
  - integrations.api-documentation (for doc generation)
  - integrations.api-testing (for contract testing)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.api-gateway-architect
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert specification to previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when creating or updating OpenAPI 3.x specifications for REST APIs.

## Prerequisites
- API endpoints implemented or designed
- Understanding of OpenAPI specification structure

## Steps
1. **Info and Servers**: Define API metadata, version, and server URLs.
2. **Paths**: Document each endpoint with summary, parameters, request body, and responses.
3. **Components**: Create reusable schemas for models, parameters, and responses.
4. **Security**: Define security schemes and apply to operations.
5. **Examples**: Add inline examples for all request and response bodies.
6. **Validate**: Run specification through OpenAPI validator (spectral, swagger-editor).

## Verification
- Specification passes OpenAPI 3.x validation
- All paths have operations with complete documentation
- Component schemas are reused consistently

## Rollback
- Revert specification file to previous version

## Common Failures
- Using any type instead of defining proper schemas
- Missing response codes (only documenting 200)
- Inconsistent naming between path parameters and schemas

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
