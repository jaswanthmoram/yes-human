---
id: security.auth-review
name: Authentication Flow Security Review
version: 1.0.0
domain: security
category: security.authentication
purpose: Review authentication implementations for security vulnerabilities and best practice compliance.
summary: Systematic review of authentication flows including password handling, session management, and token security.
triggers:
  - check login implementation
  - review authentication implementation security
  - authentication security review and audit
  - check login security measures and implementation
  - password security audit and review
  - audit session management security
activation_triggers:
  - review auth security implementation
  - login security check and audit
  - authentication flow security review
prerequisites:
  - access to authentication code
  - understanding of authentication protocols
inputs:
  - auth_implementation
  - auth_flow_diagram (optional)
  - user_stories (optional)
steps:
  - Map authentication flows (login, signup, password reset, etc.)
  - Review password handling (hashing, storage, complexity)
  - Check session management (creation, storage, expiration)
  - Review token security (JWT, OAuth, API keys)
  - Test for common vulnerabilities (brute force, session fixation)
  - Check for secure password reset flow
  - Review multi-factor authentication implementation
  - Verify secure logout and session invalidation
outputs:
  - auth_flow_analysis
  - vulnerabilities_found
  - best_practice_compliance
  - remediation_recommendations
tools:
  - filesystem.read
  - shell.readonly (run tests, check configs)
quality_gates:
  - All auth flows reviewed
  - Password hashing uses strong algorithms
  - Sessions properly managed
  - Common vulnerabilities tested
failure_modes:
  - Weak password hashing (MD5, SHA1)
  - Session fixation vulnerabilities
  - Missing rate limiting
  - Insecure password reset
  - Token leakage
handoffs:
  - security.threat-modeler (for comprehensive threat model)
  - engineering.code-reviewer (for implementation fixes)
source_references:
  - ref.github.owasp-authentication-cheatsheet.2026-06-01
allowed_agents:
  - security.security-reviewer
  - security.threat-modeler
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when reviewing authentication implementations, checking login security, or auditing session management.

## Prerequisites
- Access to authentication code
- Understanding of authentication protocols (OAuth, JWT, etc.)
- Knowledge of the application's auth requirements

## Steps
1. **Map Authentication Flows**:
   - Login flow (username/password, SSO, social login)
   - Signup/registration flow
   - Password reset flow
   - Session management (creation, refresh, logout)
   - Multi-factor authentication (if present)
2. **Review Password Handling**:
   - **Hashing Algorithm**: Must use bcrypt, Argon2, or PBKDF2 (not MD5, SHA1)
   - **Salt**: Unique salt per password
   - **Work Factor**: Appropriate cost factor (bcrypt: 10-12)
   - **Storage**: Never store plain text passwords
   - **Complexity**: Enforce minimum requirements (length, complexity)
   - **Comparison**: Use constant-time comparison to prevent timing attacks
3. **Check Session Management**:
   - **Session ID**: Cryptographically random, sufficient length (128+ bits)
   - **Storage**: Secure, HttpOnly cookies (not localStorage for sensitive data)
   - **Expiration**: Appropriate timeout (15-30 min for sensitive, longer for remember-me)
   - **Regeneration**: Regenerate session ID after login
   - **Invalidation**: Proper logout that invalidates session server-side
   - **Concurrent Sessions**: Limit or track concurrent sessions
4. **Review Token Security**:
   - **JWT**: Check signature algorithm (not "none"), verify expiration, validate issuer/audience
   - **OAuth**: Verify state parameter, check redirect URIs, validate tokens
   - **API Keys**: Rotate regularly, scope appropriately, store securely
   - **Refresh Tokens**: Secure storage, rotation on use, revocation mechanism
5. **Test for Common Vulnerabilities**:
   - **Brute Force**: Check for rate limiting and account lockout
   - **Session Fixation**: Verify session ID regenerated after login
   - **Session Hijacking**: Check for secure cookie flags
   - **Credential Stuffing**: Check for breach detection
   - **Username Enumeration**: Verify consistent error messages
6. **Check Password Reset Flow**:
   - Token generation (cryptographically random)
   - Token expiration (short-lived, 15-60 minutes)
   - Single-use tokens
   - Secure delivery (email, SMS with caution)
   - Password change confirmation
7. **Review Multi-Factor Authentication**:
   - Proper implementation (TOTP, WebAuthn, SMS with caution)
   - Backup codes for account recovery
   - Secure enrollment process
   - Proper validation
8. **Verify Logout**:
   - Client-side: Clear cookies, tokens
   - Server-side: Invalidate session/token
   - All devices: Option to logout from all sessions

## Verification
- Password hashing uses strong algorithms
- Sessions properly managed and invalidated
- No common vulnerabilities present
- Rate limiting in place
- Secure password reset flow
- Logout properly invalidates sessions

## Rollback
- No state changes; this is a review skill

## Common Failures
- Using weak hashing algorithms (MD5, SHA1)
- Not regenerating session ID after login (session fixation)
- Storing sessions in localStorage (XSS vulnerability)
- Missing rate limiting on login attempts
- Insecure password reset (predictable tokens, no expiration)
- Not invalidating sessions on logout
- Username enumeration via different error messages

## Examples
### Reviewing Login Implementation
Input: Express.js login endpoint
Output:
- Password Hashing: ✓ Using bcrypt with cost factor 12
- Session Management: ✗ Session ID not regenerated after login (session fixation risk)
  - Fix: Add `req.session.regenerate()` after successful login
- Rate Limiting: ✗ No rate limiting on login endpoint
  - Fix: Add express-rate-limit (5 attempts per 15 minutes)
- Session Storage: ✗ Using localStorage for session token
  - Fix: Use HttpOnly, Secure, SameSite cookies
- Logout: ✗ Only clears client-side token
  - Fix: Add server-side session invalidation

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
