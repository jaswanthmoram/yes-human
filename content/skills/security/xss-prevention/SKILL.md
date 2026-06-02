---
id: security.xss-prevention
name: XSS Prevention Techniques
version: 1.0.0
domain: security
category: security.application-security
purpose: Prevent Cross-Site Scripting vulnerabilities through proper output encoding, input validation, and Content Security Policy.
summary: XSS prevention review covering reflected, stored, and DOM-based XSS with encoding strategies and CSP implementation.
triggers:
  - review XSS protection implementation
  - prevent cross-site scripting vulnerabilities
  - implement Content Security Policy
  - check for XSS vulnerabilities
  - output encoding review
  - DOM XSS prevention
  - sanitize user input for HTML
aliases:
  - XSS review
  - XSS audit
  - cross-site scripting check
negative_keywords:
  - CSRF protection
  - SQL injection
  - server-side only issues
inputs:
  - web_application_code
  - template_files
  - csp_headers
  - input_handling_code
outputs:
  - xss_assessment_report
  - encoding_gaps
  - csp_recommendations
  - remediation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Incomplete output encoding for all contexts
  - Missing CSP headers
  - Client-side sanitization only
  - Not addressing DOM-based XSS
verification:
  - All output contexts properly encoded (HTML, JS, URL, CSS)
  - CSP header configured with restrictive policy
  - Input validation on all user-supplied data
  - No XSS vulnerabilities found in testing
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert CSP policy if it breaks legitimate functionality
validators:
  - skill.validator
---

## Mission
Prevent Cross-Site Scripting (XSS) vulnerabilities through comprehensive output encoding, input validation, Content Security Policy implementation, and framework-level protections.

## When To Use
- When building or reviewing web applications that render user input
- During security review of template rendering and HTML generation
- When implementing Content Security Policy headers
- After XSS vulnerability reports in dependencies or frameworks
- When migrating to new frontend frameworks or template engines

## When Not To Use
- For API-only services that don't render HTML
- When only addressing CSRF (use csrf-protection skill)
- For server-side template injection (use sast-analysis for SSTI)
- When the application has no user-generated content

## Procedure
1. **Map Input Sources and Output Sinks**:
   - Identify all user input entry points (forms, URL params, headers)
   - Map where user input is rendered (HTML body, attributes, scripts, URLs)
   - Document stored input that is later rendered (stored XSS vectors)
   - Identify client-side DOM manipulation (DOM XSS vectors)

2. **Review Output Encoding**:
   - **HTML Body**: HTML entity encoding (&lt; &gt; &amp; &quot;)
   - **HTML Attributes**: Attribute encoding (hex entity encoding)
   - **JavaScript**: JavaScript encoding (escape sequences)
   - **URL Parameters**: URL encoding (percent encoding)
   - **CSS**: CSS encoding (hex escape sequences)
   - Verify encoding matches the output context

3. **Assess Content Security Policy**:
   - Review CSP header configuration
   - Check for unsafe-inline and unsafe-eval usage
   - Verify nonce or hash-based script allowlisting
   - Check report-uri or report-to for violation monitoring
   - Ensure CSP is enforced (not just report-only)

4. **Review Input Validation**:
   - Check server-side validation on all user input
   - Verify allowlist validation for structured input
   - Check for HTML sanitization libraries (DOMPurify, sanitize-html)
   - Verify rich text editor output sanitization

5. **Check Framework Protections**:
   - React: verify JSX auto-escaping (dangerouslySetInnerHTML usage)
   - Angular: verify bypassTrustHtml usage
   - Vue: verify v-html usage vs v-text
   - Django/Jinja: verify auto-escaping and |safe usage
   - Rails: verify html_safe and raw usage

6. **Test for DOM-Based XSS**:
   - Check document.write, innerHTML, outerHTML usage
   - Review location.hash, document.URL, document.referrer usage
   - Check postMessage handlers for origin validation
   - Test client-side template rendering

7. **Implement Defense-in-Depth**:
   - Set HttpOnly flag on session cookies
   - Configure X-Content-Type-Options: nosniff
   - Implement Trusted Types API where supported
   - Set up CSP violation monitoring

## Tool Policy
- Use `filesystem.read` to review template files and rendering code
- Use `code.grep` to find dangerous patterns (innerHTML, dangerouslySetInnerHTML, v-html)
- Use `web.search` for XSS bypass techniques and framework advisories
- Use `filesystem.write` to produce assessment reports

## Verification
- All output contexts use appropriate encoding
- CSP header deployed with no unsafe-inline
- No XSS payloads execute in testing
- Framework auto-escaping not bypassed without justification
- DOM-based XSS vectors eliminated

## Failure Modes
- Encoding for wrong context (HTML encoding in JavaScript context)
- Using blacklists instead of allowlists for input validation
- Relying solely on client-side sanitization
- CSP with unsafe-inline negating protection
- Missing XSS in file upload names or metadata

## Example Routes
- `GET /search?q=<script>` - test reflected XSS in search
- `POST /comments` - test stored XSS in comment body
- `GET /profile#<payload>` - test DOM-based XSS via hash
- Rich text editor output - test HTML sanitization bypass

## Source Notes
- OWASP XSS Prevention Cheat Sheet
- Content Security Policy Level 3: https://www.w3.org/TR/CSP3/
- DOMPurify: https://github.com/cure53/DOMPurify
- Reference: ref.github.security.2026-05-31
