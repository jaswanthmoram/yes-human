---
id: security.csrf-protection
name: CSRF Protection Patterns
version: 1.0.0
domain: security
category: security.application-security
purpose: Implement and review Cross-Site Request Forgery protection mechanisms across web applications.
summary: CSRF protection review covering token-based defenses, SameSite cookies, and origin validation patterns.
triggers:
  - review CSRF protection implementation
  - implement CSRF defense
  - check for CSRF vulnerabilities
  - CSRF token validation review
  - SameSite cookie configuration
  - cross-site request forgery audit
  - origin validation check
aliases:
  - CSRF review
  - CSRF audit
  - cross-site request check
negative_keywords:
  - XSS prevention
  - CORS configuration
  - clickjacking protection
inputs:
  - web_application_code
  - cookie_configuration
  - form_implementations
  - api_endpoints
outputs:
  - csrf_assessment_report
  - protection_gaps
  - implementation_guide
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
  - Missing CSRF tokens on state-changing operations
  - Tokens not validated server-side
  - SameSite cookie not configured
  - GET requests performing state changes
verification:
  - All state-changing endpoints have CSRF protection
  - CSRF tokens are unique, unpredictable, and tied to session
  - SameSite attribute set on session cookies
  - Origin/Referer header validation as defense-in-depth
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert CSRF library version if changes break form submissions
validators:
  - skill.validator
---

## Mission
Review and implement robust CSRF protection across web applications using token-based defenses, SameSite cookies, and origin validation to prevent unauthorized cross-site state changes.

## When To Use
- When implementing forms or state-changing API endpoints
- During security review of web applications
- When configuring cookie security attributes
- After CSRF vulnerability reports in dependencies
- Before deploying applications that handle sensitive operations

## When Not To Use
- For stateless APIs using Bearer tokens (not vulnerable to CSRF)
- For CORS configuration review (different security concern)
- When only addressing XSS (use xss-prevention skill)
- For mobile-only APIs without browser clients

## Procedure
1. **Identify State-Changing Operations**:
   - Map all POST, PUT, PATCH, DELETE endpoints
   - Identify operations that modify user data or state
   - Check for GET requests that perform state changes (anti-pattern)
   - Document which endpoints require CSRF protection

2. **Review Token-Based Protection**:
   - Verify CSRF tokens are generated for each session
   - Check token randomness and length (minimum 128 bits)
   - Verify tokens are validated server-side on every request
   - Check for token leakage in URLs or logs
   - Verify double-submit cookie pattern if used

3. **Assess SameSite Cookie Configuration**:
   - Verify SameSite=Lax or SameSite=Strict on session cookies
   - Check for SameSite=None with Secure flag (cross-site use cases)
   - Test browser compatibility for SameSite enforcement
   - Verify __Host- and __Secure- cookie prefixes where applicable

4. **Check Origin Validation**:
   - Verify Origin header validation on state-changing requests
   - Check Referer header validation as fallback
   - Ensure validation is strict (exact match, not substring)
   - Verify behavior when headers are missing

5. **Review Framework-Specific Implementations**:
   - Django: verify CsrfViewMiddleware is enabled
   - Rails: verify protect_from_forgery is configured
   - Express: verify csurf or similar middleware
   - Spring: verify CSRF protection not disabled

6. **Test for Bypasses**:
   - Test CSRF token reuse across sessions
   - Test missing token handling (should reject, not accept)
   - Test token prediction or brute force
   - Test subdomain-based bypass attempts
   - Test multipart form bypass

7. **Implement Defense-in-Depth**:
   - Combine token-based + SameSite + origin validation
   - Require re-authentication for sensitive operations
   - Implement custom header requirement for APIs
   - Set up monitoring for CSRF attack attempts

## Tool Policy
- Use `filesystem.read` to review CSRF implementation code
- Use `code.grep` to find CSRF middleware and token usage
- Use `web.search` for CSRF bypass techniques and framework updates
- Use `filesystem.write` to produce assessment reports

## Verification
- All state-changing endpoints protected against CSRF
- CSRF tokens are unique per session and validated server-side
- SameSite attribute configured on all session cookies
- Origin validation implemented as defense-in-depth
- No CSRF bypass possible in testing

## Failure Modes
- Protecting only forms, not AJAX/API endpoints
- Accepting requests when CSRF token is missing
- Using predictable or static CSRF tokens
- Not setting SameSite on session cookies
- GET requests performing state changes without CSRF protection

## Example Routes
- `POST /api/transfer` - verify CSRF token on financial transaction
- `PUT /api/profile` - check CSRF protection on profile update
- `DELETE /api/account` - verify CSRF on account deletion
- `POST /login` - check login CSRF protection

## Source Notes
- OWASP CSRF Prevention Cheat Sheet
- RFC 6265 (HTTP State Management / Cookies)
- SameSite cookie specification
- Reference: ref.github.security.2026-05-31
