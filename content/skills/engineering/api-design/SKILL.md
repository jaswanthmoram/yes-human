---
id: engineering.api-design
name: REST/GraphQL API Design Patterns
version: 1.0.0
domain: engineering
category: engineering.architecture
purpose: Design APIs following REST or GraphQL best practices for consistency, usability, and maintainability.
summary: Guides through API design decisions including resource naming, HTTP methods, status codes, pagination, and error handling.
triggers:
  - design API
  - create API
  - API design
  - REST API
  - GraphQL schema
activation_triggers:
  - design an API
  - create an endpoint
  - API structure
prerequisites:
  - understanding of requirements
  - knowledge of REST/GraphQL principles
inputs:
  - requirements
  - api_type (REST or GraphQL)
  - existing_apis (optional)
steps:
  - Identify resources and their relationships
  - Choose appropriate HTTP methods (REST) or operations (GraphQL)
  - Design consistent naming conventions
  - Plan pagination and filtering strategies
  - Define error handling and status codes
  - Design authentication and authorization
  - Create API documentation structure
outputs:
  - api_specification (OpenAPI/Swagger or GraphQL schema)
  - resource_model
  - endpoint_list
  - error_codes
tools:
  - filesystem.write (API spec files)
quality_gates:
  - Consistent naming conventions
  - Proper HTTP method usage
  - Comprehensive error handling
  - Pagination for large datasets
failure_modes:
  - Inconsistent naming (camelCase vs snake_case)
  - Using GET for state-changing operations
  - Missing pagination for list endpoints
  - Poor error messages
handoffs:
  - engineering.backend-api (for implementation)
  - security.auth-review (for auth design)
source_references:
  - ref.github.api-design-best-practices.2026-06-01
allowed_agents:
  - engineering.architect
  - engineering.backend-api
allowed_workflows:
  - engineering.backend-api-implementation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when designing new APIs, creating API specifications, or reviewing API designs.

## Prerequisites
- Clear understanding of the resources and operations needed
- Knowledge of REST or GraphQL principles
- Awareness of existing APIs in the project

## Steps
1. **Identify Resources**: List all entities/resources (users, orders, products, etc.) and their relationships.
2. **Choose API Type**:
   - REST: For simple CRUD operations, cacheable responses
   - GraphQL: For complex queries, multiple resource fetching, client-driven queries
3. **Design Endpoints/Operations**:
   - REST: Use nouns for resources, HTTP verbs for actions
     - GET /users (list)
     - POST /users (create)
     - GET /users/:id (read)
     - PUT /users/:id (update)
     - DELETE /users/:id (delete)
   - GraphQL: Define types, queries, mutations
4. **Naming Conventions**:
   - Use plural nouns for collections: `/users` not `/user`
   - Use kebab-case for URLs: `/user-profiles` not `/userProfiles`
   - Be consistent across all endpoints
5. **Pagination and Filtering**:
   - Use cursor-based pagination for large datasets
   - Support filtering via query parameters: `?status=active&sort=created_at`
   - Include total count in response metadata
6. **Error Handling**:
   - Use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)
   - Provide detailed error messages in response body
   - Include error codes for programmatic handling
7. **Authentication**:
   - Use standard methods (OAuth2, JWT, API keys)
   - Document required scopes/permissions
8. **Documentation**:
   - Create OpenAPI/Swagger spec for REST
   - Create GraphQL schema with descriptions
   - Include examples for all endpoints

## Verification
- API spec validates against OpenAPI/GraphQL standards
- All endpoints have examples
- Error cases are documented
- Authentication requirements are clear

## Rollback
- No state changes; this is a design skill

## Common Failures
- Using GET for operations that change state
- Inconsistent naming (mixing camelCase and snake_case)
- Missing pagination for list endpoints
- Poor error messages ("Something went wrong")
- Not versioning the API

## Examples
### REST API Design
Input: Design API for blog posts
Output:
- GET /posts - List posts (with pagination)
- POST /posts - Create post
- GET /posts/:id - Get post
- PUT /posts/:id - Update post
- DELETE /posts/:id - Delete post
- GET /posts/:id/comments - List comments for post
- POST /posts/:id/comments - Add comment
