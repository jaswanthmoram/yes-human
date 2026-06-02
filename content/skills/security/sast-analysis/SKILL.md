---
id: security.sast-analysis
name: Static Application Security Testing
version: 1.0.0
domain: security
category: security.application-security
purpose: Perform static analysis of source code to detect security vulnerabilities without executing the application.
summary: SAST analysis using pattern matching, data flow analysis, and taint tracking to find security flaws in source code.
triggers:
  - taint analysis on user input data flows
  - perform SAST scan for injection vulnerabilities
  - run static security analysis on code
  - SAST scan for vulnerabilities
  - find security flaws in source code
  - static code analysis for injection
  - taint analysis on user input
  - code security pattern review
  - automated security linting
aliases:
  - SAST
  - static analysis
  - code scan
negative_keywords:
  - runtime testing
  - dynamic analysis
  - penetration testing
inputs:
  - source_code
  - build_configuration
  - rule_sets
outputs:
  - vulnerability_findings
  - data_flow_report
  - false_positive_list
  - remediation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - bash.exec
required_skills: []
budget_band: standard
max_context_tokens: 12000
failure_modes:
  - High false positive rate
  - Missing framework-specific patterns
  - Incomplete data flow tracking
  - Not analyzing generated code
verification:
  - All source files included in scan scope
  - Findings triaged into true/false positives
  - True positives have remediation guidance
  - Critical findings addressed before release
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
Perform static application security testing by analyzing source code patterns, data flows, and taint propagation to identify security vulnerabilities without executing the application.

## When To Use
- During code review for security-sensitive changes
- As part of CI/CD pipeline security gates
- When onboarding new codebases for security review
- Before third-party security audits
- During refactoring of security-critical code paths

## When Not To Use
- For runtime behavior analysis (use dast-testing)
- For infrastructure configuration review (use container-scanning or network-scanning)
- When only checking dependencies (use dependency-audit)
- For compiled binaries without source access

## Procedure
1. **Configure Scan Scope**:
   - Identify all source files, including generated code
   - Configure language-specific rule sets
   - Set up custom rules for project-specific patterns
   - Exclude test files and vendor directories from critical findings

2. **Run Pattern-Based Analysis**:
   - Detect dangerous function calls (eval, exec, system)
   - Find SQL query construction without parameterization
   - Identify hardcoded credentials and secrets
   - Check for insecure random number generation
   - Detect use of weak cryptographic algorithms

3. **Perform Data Flow Analysis**:
   - Trace user input from entry points to sinks
   - Identify taint propagation paths
   - Check for missing sanitization between source and sink
   - Map authorization checks on data access paths

4. **Analyze Framework-Specific Patterns**:
   - Check ORM usage for raw query injection
   - Verify template engine auto-escaping
   - Review middleware security configurations
   - Check framework-specific authentication patterns

5. **Triage Findings**:
   - Classify each finding as true positive, false positive, or needs-review
   - Assign severity based on exploitability and impact
   - Group related findings by vulnerability type
   - Identify systemic issues vs one-off mistakes

6. **Produce Remediation Guidance**:
   - Provide specific code fixes for each finding
   - Reference secure coding standards
   - Suggest framework-native mitigations
   - Prioritize by risk score

7. **Integrate into CI/CD**:
   - Configure SAST as a pipeline stage
   - Set quality gates (block on critical findings)
   - Configure notification for new findings
   - Track finding trends over time

## Tool Policy
- Use `code.grep` for regex-based vulnerability pattern detection
- Use `bash.exec` to run SAST tools (Semgrep, CodeQL, Bandit, etc.)
- Use `filesystem.read` to inspect flagged code paths
- Use `filesystem.write` to produce analysis reports

## Verification
- All source files scanned with appropriate rule sets
- Findings triaged with less than 10% unclassified
- All critical and high true positives have remediation
- SAST integrated into CI/CD pipeline
- Finding count trending downward over time

## Failure Modes
- High false positive rate causing alert fatigue
- Missing vulnerabilities in dynamically generated code
- Not updating rule sets for new vulnerability patterns
- Scanning only application code, ignoring shared libraries
- Not tracing data flow across module boundaries

## Example Routes
- `POST /api/users` - trace user input through validation to database query
- `GET /api/reports/:id` - check authorization before data retrieval
- `POST /api/upload` - analyze file path construction for traversal
- Template rendering - verify auto-escaping in HTML output

## Source Notes
- Semgrep: https://semgrep.dev/
- CodeQL: https://codeql.github.com/
- OWASP Source Code Review Guide
- Reference: ref.github.security.2026-05-31
