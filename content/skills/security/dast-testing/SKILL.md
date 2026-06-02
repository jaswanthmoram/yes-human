---
id: security.dast-testing
name: Dynamic Application Security Testing
version: 1.0.0
domain: security
category: security.application-security
purpose: Test running applications for security vulnerabilities through automated and manual dynamic testing.
summary: DAST testing by interacting with live applications to identify runtime vulnerabilities including injection, auth bypass, and misconfigurations.
triggers:
  - run dynamic security test on application
  - DAST scan running application
  - test live application for vulnerabilities
  - automated web application pentest
  - runtime security testing
  - black-box security testing
  - web vulnerability scanning
aliases:
  - DAST
  - dynamic scan
  - web pentest
negative_keywords:
  - source code review
  - static analysis
  - dependency audit
inputs:
  - application_url
  - authentication_credentials
  - api_specification
  - test_environment_config
outputs:
  - vulnerability_report
  - proof_of_concept
  - risk_assessment
  - remediation_recommendations
allowed_tools:
  - bash.exec
  - web.search
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 12000
failure_modes:
  - Testing production without authorization
  - Missing authenticated endpoints
  - Incomplete crawl of application surface
  - Not testing API endpoints separately
verification:
  - All application endpoints discovered and tested
  - Authenticated and unauthenticated paths tested
  - Findings include proof of concept
  - Critical findings have remediation verified by re-test
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Clean up any test data created during scanning
validators:
  - skill.validator
---

## Mission
Perform dynamic application security testing against running applications to identify runtime vulnerabilities through automated scanning and targeted manual testing.

## When To Use
- Before production deployment of web applications
- During periodic security assessments of live applications
- After significant feature additions or changes
- To validate SAST findings in a running environment
- For compliance requirements mandating dynamic testing

## When Not To Use
- Against production systems without explicit authorization
- When source code is available and SAST is more appropriate (use sast-analysis)
- For API-only services without proper test environment
- When application is not in a testable state (under maintenance)

## Procedure
1. **Define Test Scope and Authorization**:
   - Obtain written authorization for testing
   - Define in-scope URLs, endpoints, and parameters
   - Identify out-of-scope systems (third-party integrations)
   - Set up dedicated test environment when possible

2. **Discover Application Surface**:
   - Crawl application to discover all pages and forms
   - Map API endpoints from OpenAPI/Swagger specs
   - Identify authentication mechanisms and session handling
   - Document input parameters for each endpoint

3. **Test Authentication and Authorization**:
   - Test for default credentials
   - Check session management (fixation, hijacking)
   - Test horizontal and vertical privilege escalation
   - Verify logout functionality and session invalidation

4. **Test for Injection Vulnerabilities**:
   - SQL injection on all database-backed inputs
   - XSS (reflected, stored, DOM-based)
   - Command injection on system call parameters
   - LDAP, XML, and header injection testing

5. **Test Configuration and Information Disclosure**:
   - Check for verbose error messages
   - Test for directory listing and file disclosure
   - Verify security headers presence
   - Check for backup files and debug endpoints

6. **Analyze and Validate Findings**:
   - Confirm each finding with proof of concept
   - Eliminate false positives through manual verification
   - Assess real-world exploitability
   - Calculate risk based on impact and likelihood

7. **Report and Verify Remediation**:
   - Document findings with reproduction steps
   - Provide specific remediation guidance
   - Re-test after fixes are applied
   - Track finding closure

## Tool Policy
- Use `bash.exec` to run DAST tools (OWASP ZAP, Burp Suite, Nikto)
- Use `web.search` for vulnerability research and exploit references
- Use `filesystem.write` to produce detailed test reports
- Never use tools against unauthorized systems

## Verification
- All discovered endpoints tested (minimum 95% coverage)
- Both authenticated and unauthenticated testing completed
- Each finding has proof of concept and reproduction steps
- Re-test confirms critical findings are resolved
- Report delivered to stakeholders

## Failure Modes
- Testing without proper authorization
- Missing authenticated test scenarios
- Incomplete application crawl missing hidden endpoints
- Not testing file upload functionality
- Ignoring business logic vulnerabilities

## Example Routes
- `POST /login` - test for SQL injection in credentials
- `GET /api/users/:id` - test for IDOR on user data
- `POST /api/search` - test for XSS in search results
- `GET /admin/*` - test for authorization bypass on admin routes

## Source Notes
- OWASP ZAP: https://www.zaproxy.org/
- OWASP Testing Guide v4.2
- Burp Suite: https://portswigger.net/burp
- Reference: ref.github.security.2026-05-31
