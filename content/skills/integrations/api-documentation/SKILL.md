---
id: integrations.api-documentation
name: API Documentation
version: 1.0.0
domain: integrations
category: integrations.documentation
purpose: Create comprehensive API documentation using OpenAPI/Swagger, GraphQL introspection, or custom documentation portals.
summary: Guides through building API documentation including endpoint descriptions, examples, authentication guides, and interactive explorers.
triggers:
  - document api endpoints
  - create api documentation
  - generate openapi docs
activation_triggers:
  - write api docs
  - api documentation portal
prerequisites:
  - api implementation complete
  - understanding of documentation standards
inputs:
  - api_specification
  - documentation_format
  - audience_type
steps:
  - Define documentation structure and sections
  - Document all endpoints with descriptions and parameters
  - Add request/response examples for every endpoint
  - Include authentication and error handling guides
  - Generate interactive API explorer (Swagger UI, Redoc)
  - Set up documentation versioning and changelog
outputs:
  - api_documentation
  - interactive_explorer
  - example_collection
tools:
  - filesystem.write (documentation files)
quality_gates:
  - Every endpoint documented
  - Examples for all operations
  - Authentication guide included
failure_modes:
  - Missing endpoint documentation
  - Outdated examples that do not match API
  - No error response documentation
handoffs:
  - integrations.openapi-specs (for OpenAPI generation)
  - integrations.api-testing (for example validation)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert documentation to previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when creating or updating API documentation for internal or external consumers.

## Prerequisites
- API implementation is stable
- Documentation standards defined

## Steps
1. **Structure**: Organize by resource, with overview, authentication, and reference sections.
2. **Document Endpoints**: Describe purpose, parameters, request body, and response for each.
3. **Add Examples**: Provide curl, SDK, and interactive examples for every operation.
4. **Error Guide**: Document all error codes, messages, and troubleshooting steps.
5. **Explorer**: Deploy Swagger UI, Redoc, or GraphQL Playground for interactive testing.
6. **Version**: Track documentation changes alongside API versions.

## Verification
- Every endpoint has description, parameters, and examples
- Examples are tested and match current API behavior
- Error responses are fully documented

## Rollback
- Revert documentation files to previous version

## Common Failures
- Documentation drifts from actual API behavior
- Missing examples for complex operations
- No documentation for error responses
