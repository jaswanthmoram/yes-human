---
id: security.owasp-top-10
name: OWASP Top 10 Vulnerability Review
version: 1.0.0
domain: security
category: security.application-security
purpose: Identify and remediate OWASP Top 10 vulnerabilities in web applications through systematic code review and testing.
summary: Comprehensive review against the OWASP Top 10 risk categories with detection patterns and remediation guidance.
triggers:
  - review code for OWASP Top 10 vulnerabilities
  - check application against OWASP risks
  - OWASP compliance audit
  - find injection flaws and broken auth
  - security review against OWASP categories
  - web application OWASP assessment
  - OWASP Top 10 checklist review
aliases:
  - owasp review
  - owasp audit
  - top 10 check
negative_keywords:
  - mobile only
  - network pentest
  - physical security
inputs:
  - source_code
  - architecture_diagram
  - dependency_list
  - existing_scan_results
outputs:
  - vulnerability_report
  - risk_matrix
  - remediation_plan
  - owasp_checklist_status
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
  - code.grep
required_skills: []
budget_band: standard
max_context_tokens: 12000
failure_modes:
  - Incomplete code coverage during review
  - False positive findings without validation
  - Missing framework-specific mitigations
  - Outdated OWASP version reference
verification:
  - All 10 OWASP categories assessed
  - Each finding has severity, location, and remediation
  - Remediation plan addresses all critical and high findings
  - Re-review confirms fixes applied
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Systematically review application code and architecture against the OWASP Top 10 (2021 edition) to identify vulnerabilities, assess risk, and produce actionable remediation plans.

## When To Use
- Before releasing a web application to production
- During periodic security audits
- When onboarding a new codebase for security review
- After a security incident to identify related weaknesses
- As part of a compliance review requiring OWASP alignment

## When Not To Use
- Mobile-only applications without web components (use MASVS instead)
- Pure network penetration testing (use network-scanning skill)
- Physical security assessments
- When a full pentest engagement is required (use professional pentesters)

## Procedure
1. **Map Application Surface**:
   - Identify all entry points (routes, APIs, forms, file uploads)
   - Document authentication and authorization boundaries
   - List external integrations and data stores

2. **A01 - Broken Access Control**:
   - Check for missing authorization checks on endpoints
   - Verify CORS configuration
   - Test for IDOR (Insecure Direct Object References)
   - Check path traversal protections
   - Verify principle of least privilege

3. **A02 - Cryptographic Failures**:
   - Identify sensitive data in transit without TLS
   - Check for weak algorithms (MD5, SHA1, DES)
   - Verify proper key management
   - Check for hardcoded secrets and credentials

4. **A03 - Injection**:
   - Search for raw SQL queries and string concatenation
   - Check for NoSQL injection vectors
   - Review template rendering for SSTI
   - Check command injection in system calls
   - Verify LDAP and header injection protections

5. **A04 - Insecure Design**:
   - Review threat model coverage
   - Check for missing rate limiting
   - Verify input validation at trust boundaries
   - Assess business logic for abuse cases

6. **A05 - Security Misconfiguration**:
   - Check default credentials and accounts
   - Verify security headers are set
   - Check for verbose error messages
   - Review cloud storage permissions
   - Verify framework security features enabled

7. **A06 - Vulnerable and Outdated Components**:
   - Run dependency audit (npm audit, pip audit, etc.)
   - Check for known CVEs in dependencies
   - Verify update policies and processes

8. **A07 - Identification and Authentication Failures**:
   - Check password policy enforcement
   - Verify MFA implementation
   - Test session management
   - Check for credential stuffing protections

9. **A08 - Software and Data Integrity Failures**:
   - Review CI/CD pipeline security
   - Check for unsigned updates or plugins
   - Verify deserialization protections

10. **A09 - Security Logging and Monitoring Failures**:
    - Verify audit logging for security events
    - Check log integrity and retention
    - Verify alerting on suspicious activity

11. **A10 - Server-Side Request Forgery (SSRF)**:
    - Check URL validation on server-side requests
    - Verify allowlists for outbound requests
    - Test for metadata service access (cloud environments)

## Tool Policy
- Use `filesystem.read` to scan source code for vulnerability patterns
- Use `code.grep` for pattern matching (e.g., raw SQL, eval, exec)
- Use `web.search` for CVE lookups and remediation guidance
- Use `filesystem.write` to produce the vulnerability report

## Verification
- All 10 OWASP categories have been assessed with findings or "not applicable"
- Each finding includes: category, severity (Critical/High/Medium/Low), file location, code snippet, remediation
- Remediation plan prioritizes Critical and High findings with timelines
- Re-review after fixes confirms vulnerabilities are resolved

## Failure Modes
- Skipping categories assumed "not relevant" without evidence
- Not checking framework-specific bypasses (e.g., Django ORM raw queries)
- Reporting findings without reproducible proof
- Missing server-side-only vulnerabilities by focusing on client code

## Example Routes
- `POST /api/users/:id` - check IDOR on user profile update
- `GET /admin/reports` - check authorization bypass on admin endpoint
- `POST /api/search` - check SQL injection in search parameter
- `POST /api/upload` - check path traversal in file upload

## Source Notes
- OWASP Top 10 2021: https://owasp.org/www-project-top-ten/
- OWASP Testing Guide v4.2
- CWE/SANS Top 25 Most Dangerous Software Weaknesses
- Reference: ref.github.security.2026-05-31
