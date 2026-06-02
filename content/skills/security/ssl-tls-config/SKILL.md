---
id: security.ssl-tls-config
name: SSL/TLS Configuration Review
version: 1.0.0
domain: security
category: security.cryptography
purpose: Review and harden SSL/TLS configurations for servers, load balancers, and application endpoints.
summary: SSL/TLS configuration audit ensuring strong cipher suites, proper certificate management, and protection against known TLS attacks.
triggers:
  - review SSL TLS configuration
  - harden TLS cipher suites
  - check SSL certificate validity
  - TLS security audit
  - fix SSL Labs rating
  - configure HTTPS properly
  - review certificate chain
aliases:
  - SSL review
  - TLS audit
  - HTTPS config
negative_keywords:
  - certificate purchasing
  - DNS configuration
  - load balancer setup
inputs:
  - server_config
  - certificate_files
  - tls_settings
  - domain_list
outputs:
  - tls_assessment_report
  - cipher_suite_recommendations
  - certificate_status
  - hardening_checklist
allowed_tools:
  - bash.exec
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Supporting deprecated protocols (SSLv3, TLS 1.0)
  - Weak cipher suite selection
  - Missing HSTS headers
  - Certificate expiration not monitored
verification:
  - TLS 1.2 minimum enforced (TLS 1.3 preferred)
  - Only strong cipher suites enabled
  - SSL Labs rating A or above
  - HSTS configured with preload
  - Certificate chain validated
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous TLS configuration if changes break connectivity
validators:
  - skill.validator
---

## Mission
Review and harden SSL/TLS configurations to ensure secure encrypted communications, proper certificate management, and protection against known TLS vulnerabilities.

## When To Use
- When setting up new HTTPS endpoints or load balancers
- During periodic security reviews of TLS configurations
- After receiving SSL Labs grade below A
- When migrating to TLS 1.3
- Before compliance audits requiring encryption verification
- When renewing or replacing SSL certificates

## When Not To Use
- For purchasing certificates (use certificate vendor directly)
- For DNS configuration changes (use DNS management tools)
- When only checking certificate expiration dates (use monitoring tools)
- For internal-only services using mTLS with custom CAs (different workflow)

## Procedure
1. **Assess Current Configuration**:
   - Test endpoint with SSL Labs (https://www.ssllabs.com/ssltest/)
   - Check supported TLS versions (SSLv2, SSLv3, TLS 1.0, 1.1, 1.2, 1.3)
   - List enabled cipher suites and their order
   - Verify certificate chain completeness

2. **Review Certificate Management**:
   - Check certificate validity dates and expiration
   - Verify certificate chain to trusted root
   - Check for certificate transparency log entries
   - Verify SAN (Subject Alternative Name) coverage
   - Check for SHA-1 or other deprecated signatures

3. **Harden Protocol Versions**:
   - Disable SSLv2, SSLv3, TLS 1.0, TLS 1.1
   - Enable TLS 1.2 and TLS 1.3
   - Configure session resumption securely
   - Enable OCSP stapling

4. **Configure Cipher Suites**:
   - Prefer AEAD ciphers (AES-GCM, ChaCha20-Poly1305)
   - Disable RC4, DES, 3DES, NULL, EXPORT ciphers
   - Prefer ECDHE for key exchange (forward secrecy)
   - Set server cipher order preference
   - Use 256-bit keys minimum for symmetric ciphers

5. **Configure Security Headers**:
   - Set HSTS with max-age >= 31536000 (1 year)
   - Include HSTS preload directive
   - Configure HPKP (deprecated) or CT expectations
   - Set Expect-CT header

6. **Test for Known Attacks**:
   - Test for BEAST, POODLE, CRIME, BREACH
   - Test for Heartbleed vulnerability
   - Test for ROBOT (RSA key exchange)
   - Test for downgrade attacks

7. **Monitor and Maintain**:
   - Set up certificate expiration monitoring
   - Automate certificate renewal (Let's Encrypt, certbot)
   - Schedule periodic TLS configuration re-tests
   - Document configuration for audit trail

## Tool Policy
- Use `bash.exec` to run testssl.sh, ssllabs-scan, or openssl s_client
- Use `filesystem.read` to review nginx, Apache, or load balancer configs
- Use `web.search` for latest TLS best practices and vulnerability advisories
- Use `filesystem.write` to produce configuration audit reports

## Verification
- SSL Labs grade A or above achieved
- TLS 1.2 minimum, TLS 1.3 preferred
- Only AEAD cipher suites with forward secrecy
- HSTS enabled with preload and long max-age
- Certificate chain valid with no expiration within 30 days
- No known TLS attack vectors successful

## Failure Modes
- Supporting legacy clients requiring TLS 1.0/1.1
- Misconfigured certificate chain (missing intermediates)
- Not enabling HSTS on all subdomains
- Forgetting to test after configuration changes
- Not monitoring certificate expiration

## Example Routes
- `https://api.example.com` - test TLS configuration and certificate
- nginx config review - check ssl_protocols and ssl_ciphers directives
- Load balancer TLS termination - verify cipher suite configuration
- Certificate renewal - verify new certificate chain and configuration

## Source Notes
- Mozilla SSL Configuration Generator: https://ssl-config.mozilla.org/
- SSL Labs: https://www.ssllabs.com/ssltest/
- testssl.sh: https://testssl.sh/
- Reference: ref.github.security.2026-05-31
