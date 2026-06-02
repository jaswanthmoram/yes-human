---
id: security.input-validation
name: Input Validation Patterns
version: 1.0.0
domain: security
category: security.application-security
purpose: Implement comprehensive input validation to prevent injection attacks, buffer overflows, and data integrity issues.
summary: Input validation review covering allowlist/denylist patterns, type checking, length limits, and validation at trust boundaries.
triggers:
  - validate file upload type size and content
  - review input validation implementation
  - implement input validation patterns
  - check for input validation gaps
  - input validation audit
  - validate user input security
  - review form validation security
  - API input sanitization review
aliases:
  - input validation
  - input sanitization
  - form validation
negative_keywords:
  - output encoding
  - XSS prevention only
  - SQL injection only
inputs:
  - api_endpoints
  - form_definitions
  - validation_middleware
  - data_models
outputs:
  - validation_assessment
  - gap_analysis
  - validation_patterns_guide
  - test_cases
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Client-side validation only
  - Missing validation on file uploads
  - Not validating at trust boundaries
  - Inconsistent validation across entry points
verification:
  - All input validated server-side
  - Allowlist validation used where possible
  - Type, length, format, and range checks implemented
  - File upload validation includes content type and size
  - Validation errors handled without information leakage
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Relax validation rules if they break legitimate input
validators:
  - skill.validator
---

## Mission
Implement and review comprehensive input validation across all application entry points to prevent injection attacks, data corruption, and business logic abuse through malformed input.

## When To Use
- When building or reviewing API endpoints and forms
- During security review of data intake paths
- When implementing file upload functionality
- Before deploying applications that process user input
- When migrating validation logic to shared middleware

## When Not To Use
- When only addressing output encoding (use xss-prevention)
- For SQL injection specifically (use sql-injection skill for deeper review)
- When input is fully trusted (internal system-to-system with mTLS)
- For output sanitization (different concern from input validation)

## Procedure
1. **Map All Input Entry Points**:
   - Identify all API endpoints, forms, and file uploads
   - Document expected input types, formats, and ranges
   - Map input flow from client to processing logic
   - Identify trust boundaries where validation should occur

2. **Implement Allowlist Validation**:
   - Define allowed character sets for each input field
   - Use allowlist patterns over denylist (blocklist) patterns
   - Validate against known good formats (regex for email, phone, etc.)
   - Use enum validation for fixed-choice fields

3. **Enforce Type and Range Checks**:
   - Verify data types (string, integer, boolean, date)
   - Enforce minimum and maximum length for strings
   - Check numeric ranges (positive, within business limits)
   - Validate date formats and ranges
   - Check array/collection size limits

4. **Validate File Uploads**:
   - Check file size limits
   - Validate MIME type (not just extension)
   - Scan file content for malware
   - Verify file content matches declared type (magic bytes)
   - Store uploads outside web root
   - Use random filenames to prevent path traversal

5. **Validate at Trust Boundaries**:
   - Validate on server-side (never trust client-side only)
   - Re-validate when data crosses service boundaries
   - Validate deserialized data from untrusted sources
   - Check input from third-party APIs and webhooks

6. **Handle Validation Errors Securely**:
   - Return generic error messages (don't reveal validation rules)
   - Log validation failures for monitoring
   - Don't expose internal data structures in error responses
   - Implement consistent error response format

7. **Implement Validation Middleware**:
   - Centralize validation logic in middleware or decorators
   - Use schema validation libraries (Zod, Joi, Pydantic, JSON Schema)
   - Apply validation consistently across all endpoints
   - Test validation with fuzzing and boundary values

## Tool Policy
- Use `filesystem.read` to review validation implementation code
- Use `code.grep` to find unvalidated input paths
- Use `web.search` for validation libraries and fuzzing techniques
- Use `filesystem.write` to produce assessment reports

## Verification
- All input entry points have server-side validation
- Allowlist validation used for structured input
- File uploads validated for type, size, and content
- Validation errors don't leak implementation details
- Fuzzing testing confirms validation catches malformed input

## Failure Modes
- Relying solely on client-side validation
- Not validating file upload content (only checking extension)
- Missing validation on webhook and callback payloads
- Inconsistent validation across microservices
- Validation bypass through encoding tricks (double encoding, Unicode)

## Example Routes
- `POST /api/users` - validate registration form input
- `POST /api/upload` - validate file type, size, and content
- `GET /api/search?q=` - validate and sanitize search query
- `POST /api/webhook` - validate webhook payload signature and structure

## Source Notes
- OWASP Input Validation Cheat Sheet
- CWE-20: Improper Input Validation
- JSON Schema: https://json-schema.org/
- Reference: ref.github.security.2026-05-31
