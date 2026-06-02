---
id: security.security-headers
name: HTTP Security Headers Configuration
version: 1.0.0
domain: security
category: security.application-security
purpose: Configure and review HTTP security headers to protect web applications against common attacks.
summary: Security headers review covering CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and other protective HTTP headers.
triggers:
  - review HTTP security headers
  - configure security headers
  - check CSP header implementation
  - security headers audit
  - implement HSTS preload
  - review X-Frame-Options
  - harden HTTP response headers
aliases:
  - headers review
  - HTTP headers
  - response headers
negative_keywords:
  - API-only services
  - request headers
  - custom headers
inputs:
  - server_configuration
  - web_application_url
  - current_headers
outputs:
  - headers_assessment
  - missing_headers_list
  - configuration_guide
  - test_results
allowed_tools:
  - bash.exec
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 6000
failure_modes:
  - CSP too restrictive breaking legitimate functionality
  - Missing HSTS on all subdomains
  - Conflicting header values
  - Not testing headers after deployment
verification:
  - All recommended security headers present
  - CSP configured without unsafe-inline
  - HSTS with preload and long max-age
  - Headers verified with securityheaders.com scan
  - No application functionality broken by headers
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert header changes if they break application functionality
validators:
  - skill.validator
---

## Mission
Configure and review HTTP security headers to protect web applications against XSS, clickjacking, MIME sniffing, and other client-side attacks.

## When To Use
- When deploying web applications to production
- During security hardening of web servers
- After security headers scan shows missing headers
- When implementing Content Security Policy
- During compliance reviews requiring header evidence

## When Not To Use
- For API-only services without HTML responses
- When only configuring CORS headers (different concern)
- For internal-only services without browser clients
- When headers are managed entirely by CDN/WAF with no customization

## Procedure
1. **Audit Current Headers**:
   - Scan application with securityheaders.com or curl -I
   - Document all current security headers and values
   - Identify missing recommended headers
   - Check for information-leaking headers (Server, X-Powered-By)

2. **Configure Content-Security-Policy (CSP)**:
   - Start with report-only mode to identify violations
   - Define script-src with nonce or hash-based allowlist
   - Configure style-src, img-src, font-src, connect-src
   - Remove unsafe-inline and unsafe-eval where possible
   - Set report-uri or report-to for violation monitoring
   - Enforce CSP after testing in report-only mode

3. **Configure Transport Security**:
   - Set Strict-Transport-Security with max-age >= 31536000
   - Include includeSubDomains directive
   - Submit to HSTS preload list (hstspreload.org)
   - Verify all subdomains support HTTPS before preload

4. **Configure Clickjacking Protection**:
   - Set X-Frame-Options: DENY or SAMEORIGIN
   - Alternatively use CSP frame-ancestors directive
   - Verify framing protection on all pages

5. **Configure Additional Security Headers**:
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy (formerly Feature-Policy)
   - X-XSS-Protection: 0 (deprecated, rely on CSP)
   - Cross-Origin-Opener-Policy: same-origin
   - Cross-Origin-Resource-Policy: same-origin
   - Cross-Origin-Embedder-Policy: require-corp (if needed)

6. **Remove Information-Leaking Headers**:
   - Remove Server header or minimize version info
   - Remove X-Powered-By header
   - Remove X-AspNet-Version if applicable
   - Minimize error page information disclosure

7. **Test and Monitor**:
   - Test all pages with new headers for functionality
   - Monitor CSP violation reports
   - Verify headers with automated scanning
   - Document header configuration decisions

## Tool Policy
- Use `bash.exec` to run curl -I or security header scanners
- Use `filesystem.read` to review server configuration files
- Use `web.search` for header best practices and CSP generators
- Use `filesystem.write` to produce assessment reports

## Verification
- All recommended security headers present and correctly configured
- CSP deployed in enforce mode without unsafe-inline
- HSTS configured with preload eligibility
- No information-leaking headers present
- Application functionality verified with new headers
- securityheaders.com grade A or above

## Failure Modes
- CSP too restrictive breaking scripts, styles, or images
- HSTS preload before all subdomains support HTTPS
- Not testing in report-only mode before enforcing CSP
- Conflicting X-Frame-Options and CSP frame-ancestors
- Breaking third-party integrations with overly strict CSP

## Example Routes
- `https://app.example.com` - scan and review all security headers
- nginx config - add security headers to server block
- Express middleware - configure helmet.js with custom CSP
- CDN configuration - set security headers at edge

## Source Notes
- OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
- Content Security Policy Reference: https://content-security-policy.com/
- securityheaders.com: https://securityheaders.com/
- Reference: ref.github.security.2026-05-31
