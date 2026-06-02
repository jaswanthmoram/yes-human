---
id: security.oauth2-flows
name: OAuth 2.0 Implementation Review
version: 1.0.0
domain: security
category: security.authentication
purpose: Review and implement secure OAuth 2.0 authorization flows following RFC 6749 and security best practices.
summary: OAuth 2.0 security review covering grant type selection, token management, PKCE, and protection against common OAuth attacks.
triggers:
  - audit OAuth2 PKCE and redirect URI validation
  - check OAuth2 token endpoint for security issues
  - review OAuth 2.0 implementation
  - implement secure OAuth flow
  - check OAuth grant type security
  - OAuth security audit
  - review authorization code flow
  - implement PKCE for OAuth
  - OAuth token security review
aliases:
  - OAuth review
  - OAuth audit
  - auth flow review
negative_keywords:
  - SAML implementation
  - API key management
  - basic authentication
inputs:
  - oauth_implementation
  - auth_server_config
  - client_configuration
  - flow_diagrams
outputs:
  - oauth_security_report
  - grant_type_assessment
  - vulnerability_findings
  - secure_implementation_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 12000
failure_modes:
  - Using implicit grant for new implementations
  - Missing PKCE on authorization code flow
  - Open redirect in redirect_uri
  - Not validating state parameter
verification:
  - Authorization code flow with PKCE implemented
  - Redirect URIs strictly validated
  - State parameter used and validated
  - Refresh tokens rotated on use
  - Token storage follows security best practices
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert OAuth library version if changes break authentication flows
validators:
  - skill.validator
---

## Mission
Review and implement secure OAuth 2.0 authorization flows following RFC 6749, RFC 7636 (PKCE), and the OAuth 2.0 Security Best Current Practice to prevent common OAuth attacks.

## When To Use
- When implementing OAuth 2.0 authorization in applications
- During security review of existing OAuth implementations
- When adding new OAuth clients or grant types
- Before integrating with third-party OAuth providers
- When migrating from deprecated OAuth patterns

## When Not To Use
- For SAML-based SSO implementations (different protocol)
- For simple API key authentication (use secret-scanning)
- When implementing custom authentication protocols
- For service-to-service authentication without user context (use mTLS)

## Procedure
1. **Review Grant Type Selection**:
   - Verify authorization code flow is used for web apps (not implicit)
   - Confirm PKCE is implemented for all public clients
   - Check client credentials flow for service-to-service auth
   - Verify device code flow for input-constrained devices
   - Ensure implicit grant is not used for new implementations

2. **Validate Authorization Endpoint**:
   - Check redirect_uri validation (exact match, no open redirects)
   - Verify state parameter generation and validation
   - Check for CSRF protection on authorization endpoint
   - Review consent screen for proper scope display
   - Verify authorization code is single-use and short-lived

3. **Review Token Endpoint**:
   - Verify client authentication (client_secret, private_key_jwt)
   - Check token response includes proper token_type and expires_in
   - Verify refresh token rotation on each use
   - Check for token binding or sender-constrained tokens
   - Review error responses for information leakage

4. **Assess Token Security**:
   - Verify access token format and validation
   - Check refresh token storage security
   - Review token revocation implementation
   - Verify introspection endpoint security
   - Check for token leakage vectors (referrer headers, logs)

5. **Test for Common Attacks**:
   - Authorization code interception (mitigated by PKCE)
   - CSRF attacks (mitigated by state parameter)
   - Open redirect via redirect_uri manipulation
   - Token replay and token theft
   - Mix-up attacks (confusion between authorization servers)
   - Authorization server metadata spoofing

6. **Review Client Configuration**:
   - Verify client secret strength and storage
   - Check client registration validation
   - Review scope definitions and enforcement
   - Verify confidential vs public client classification

7. **Implement Security Controls**:
   - Enable PKCE for all client types
   - Implement token binding where supported
   - Set up monitoring for OAuth anomalies
   - Document OAuth security decisions

## Tool Policy
- Use `filesystem.read` to review OAuth implementation code
- Use `code.grep` to find OAuth library usage and configuration
- Use `web.search` for OAuth security advisories and RFC updates
- Use `filesystem.write` to produce security review reports

## Verification
- Authorization code flow with PKCE implemented for all clients
- Redirect URIs strictly validated with exact matching
- State parameter cryptographically random and validated
- Refresh tokens rotated on each use with detection of reuse
- No OAuth security vulnerabilities found in testing

## Failure Modes
- Using implicit grant for SPAs (should use auth code + PKCE)
- Not implementing PKCE, vulnerable to code interception
- Allowing wildcard or partial redirect_uri matching
- Not rotating refresh tokens, enabling token theft
- Logging access tokens in application logs

## Example Routes
- `GET /oauth/authorize` - review authorization endpoint security
- `POST /oauth/token` - review token endpoint and client auth
- `POST /oauth/revoke` - review token revocation implementation
- `GET /oauth/userinfo` - review userinfo endpoint access control

## Source Notes
- RFC 6749 (OAuth 2.0): https://datatracker.ietf.org/doc/html/rfc6749
- RFC 7636 (PKCE): https://datatracker.ietf.org/doc/html/rfc7636
- OAuth 2.0 Security BCP: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics
- Reference: ref.github.security.2026-05-31
