---
id: security.jwt-validation
name: JWT Token Validation
version: 1.0.0
domain: security
category: security.authentication
purpose: Review and implement secure JWT token validation, signing, and management patterns.
summary: JWT security review covering algorithm validation, token structure, claims verification, and protection against common JWT attacks.
triggers:
  - review JWT implementation
  - validate JWT token security
  - check JWT algorithm configuration
  - JWT security audit
  - fix JWT vulnerability
  - implement secure JWT validation
  - review token signing algorithm
aliases:
  - JWT review
  - token validation
  - JWT audit
negative_keywords:
  - OAuth flow design
  - session management
  - API key management
inputs:
  - jwt_implementation_code
  - token_samples
  - signing_configuration
  - auth_flow_diagram
outputs:
  - jwt_security_report
  - vulnerability_findings
  - secure_implementation_guide
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
  - Accepting 'none' algorithm
  - Not validating token expiration
  - Using weak signing keys
  - Not verifying audience and issuer claims
verification:
  - Algorithm allowlist enforced (no 'none' or algorithm confusion)
  - All claims validated (exp, iss, aud, sub)
  - Signing key strength verified (RS256 2048-bit minimum)
  - Token revocation mechanism in place
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous JWT library version if changes break authentication
validators:
  - skill.validator
---

## Mission
Review and harden JWT (JSON Web Token) implementations to prevent common attacks including algorithm confusion, token forgery, and claim manipulation.

## When To Use
- When implementing JWT-based authentication
- During security review of existing JWT implementations
- After JWT-related security advisories
- When migrating between JWT libraries
- Before using JWTs for authorization decisions

## When Not To Use
- For designing OAuth 2.0 flows (use oauth2-flows skill)
- For session management architecture (use auth-review skill)
- When tokens are opaque and not self-contained JWTs
- For API key management (use secret-scanning skill)

## Procedure
1. **Review Token Structure**:
   - Decode JWT header, payload, and signature
   - Verify header algorithm matches expected algorithm
   - Check for unexpected or custom claims
   - Verify token size is reasonable (not carrying excessive data)

2. **Validate Algorithm Security**:
   - Ensure algorithm is explicitly specified (not trusting token header)
   - Reject 'none' algorithm unconditionally
   - Prevent algorithm confusion attacks (RS256/HS256 swap)
   - Use asymmetric algorithms (RS256, ES256) for distributed systems
   - Verify key strength (RSA >= 2048 bits, EC >= P-256)

3. **Verify Claims**:
   - **exp** (expiration): Always validate, set reasonable TTL
   - **iat** (issued at): Check for tokens issued in the future
   - **iss** (issuer): Validate against expected issuer
   - **aud** (audience): Verify token is intended for this service
   - **sub** (subject): Validate subject matches authenticated user
   - **nbf** (not before): Enforce if present

4. **Check Key Management**:
   - Verify signing keys are stored securely (not hardcoded)
   - Check key rotation procedures
   - Verify JWKS endpoint security (if using JWK Set)
   - Ensure keys are not shared across environments

5. **Test for Common Attacks**:
   - Algorithm confusion (HS256 with RSA public key)
   - Token tampering (modify payload without re-signing)
   - Token replay (use without nonce/jti tracking)
   - Key confusion (using symmetric key as asymmetric)
   - JWK header injection

6. **Implement Revocation**:
   - Add token blacklist or revocation list
   - Implement short-lived access tokens with refresh tokens
   - Use jti (JWT ID) claim for one-time-use tokens
   - Consider token binding for sensitive operations

7. **Secure Implementation Patterns**:
   - Use well-maintained JWT libraries (not custom implementations)
   - Set strict validation on library configuration
   - Log JWT validation failures for monitoring
   - Implement rate limiting on token validation endpoints

## Tool Policy
- Use `filesystem.read` to review JWT implementation code
- Use `code.grep` to find JWT library usage and configuration
- Use `web.search` for JWT vulnerability advisories and library updates
- Use `filesystem.write` to produce security review reports

## Verification
- Algorithm allowlist enforced, 'none' rejected
- All standard claims validated on every request
- Signing keys meet minimum strength requirements
- Token revocation mechanism operational
- No JWT validation bypass possible in testing

## Failure Modes
- Trusting the algorithm specified in the token header
- Not validating expiration, allowing indefinite token use
- Using weak or hardcoded signing keys
- Storing sensitive data in JWT payload (base64 encoded, not encrypted)
- Not implementing token revocation for logout

## Example Routes
- `POST /auth/login` - review JWT issuance and signing
- `GET /api/protected` - review JWT validation middleware
- `POST /auth/refresh` - review refresh token rotation
- `POST /auth/logout` - review token revocation implementation

## Source Notes
- RFC 7519 (JSON Web Token): https://datatracker.ietf.org/doc/html/rfc7519
- OWASP JWT Cheat Sheet
- JWT.io: https://jwt.io/
- Reference: ref.github.security.2026-05-31
