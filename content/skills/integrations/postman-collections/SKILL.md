---
id: integrations.postman-collections
name: Postman Collections
version: 1.0.0
domain: integrations
category: integrations.testing
purpose: Create and maintain Postman collections for API testing, documentation, and development workflows.
summary: Guides through building Postman collections with organized requests, environment variables, test scripts, and mock servers.
triggers:
  - create postman collection
  - build api test collection
  - postman environment setup
activation_triggers:
  - organize api tests
  - postman workspace
prerequisites:
  - api endpoints available
  - understanding of postman features
inputs:
  - api_endpoints
  - test_scenarios
  - environment_config
steps:
  - Organize requests into folders by resource or workflow
  - Define environment variables for different stages
  - Add test scripts for response validation
  - Create pre-request scripts for authentication
  - Set up collection runners for automated testing
  - Configure mock servers for development
outputs:
  - postman_collection
  - environment_files
  - test_scripts
tools:
  - filesystem.write (Postman JSON)
quality_gates:
  - All endpoints have corresponding requests
  - Test scripts validate responses
  - Environments properly configured
failure_modes:
  - Hardcoded values instead of variables
  - Missing test assertions
  - Environment variables not properly scoped
handoffs:
  - integrations.api-testing (for test automation)
  - integrations.api-documentation (for docs)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert collection to previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when creating Postman collections for API testing and development.

## Prerequisites
- API endpoints deployed and accessible
- Understanding of test scenarios needed

## Steps
1. **Organize**: Group requests by resource (users, orders) or workflow (auth, checkout).
2. **Variables**: Use environment variables for base URLs, tokens, and IDs.
3. **Test Scripts**: Add assertions for status codes, response body, and headers.
4. **Pre-request**: Automate token acquisition and header injection.
5. **Runners**: Configure collection runs with data files for parameterized testing.
6. **Mock Servers**: Create mocks for dependent services during development.

## Verification
- Collection runs pass all test scripts
- Environment variables properly parameterized
- Mock servers return expected responses

## Rollback
- Revert collection JSON to previous version

## Common Failures
- Hardcoding URLs and tokens instead of using variables
- Test scripts with no assertions (just logging)
- Not separating development, staging, and production environments
