---
id: security.dependency-audit
name: Dependency Vulnerability Auditing
version: 1.0.0
domain: security
category: security.supply-chain
purpose: Audit project dependencies for known vulnerabilities, license issues, and outdated packages.
summary: Systematic dependency auditing using package managers and vulnerability databases to identify and prioritize remediation.
triggers:
  - audit dependencies for vulnerabilities
  - check npm packages for CVEs
  - dependency security review
  - find vulnerable dependencies
  - license compliance check for dependencies
  - outdated dependency assessment
  - supply chain dependency audit
aliases:
  - dep audit
  - dependency check
  - package audit
negative_keywords:
  - runtime monitoring
  - dependency installation
  - package publishing
inputs:
  - package_manifest
  - lock_files
  - sbom
outputs:
  - vulnerability_report
  - license_report
  - remediation_plan
  - risk_assessment
allowed_tools:
  - filesystem.read
  - filesystem.write
  - bash.exec
  - web.search
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - Missing transitive dependency vulnerabilities
  - Outdated vulnerability database
  - Not checking license compatibility
  - Ignoring pinned versions in lock files
verification:
  - All direct and transitive dependencies audited
  - Critical and high vulnerabilities addressed
  - License compatibility verified
  - Remediation plan created with timelines
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert dependency updates if they break builds
validators:
  - skill.validator
---

## Mission
Audit project dependencies for known vulnerabilities, license compliance issues, and maintenance status to ensure a secure and compliant software supply chain.

## When To Use
- Before releasing to production
- During regular security review cycles (weekly/monthly)
- When adding new dependencies to a project
- After receiving security advisories for used packages
- During compliance audits requiring SBOM review

## When Not To Use
- For runtime dependency monitoring (use RASP or runtime agents)
- For installing or updating packages (use package manager directly)
- For publishing packages (use package registry tools)
- When only checking a single CVE (use web search directly)

## Procedure
1. **Inventory Dependencies**:
   - Parse package manifests (package.json, requirements.txt, go.mod, pom.xml, Gemfile)
   - Generate or review SBOM (Software Bill of Materials)
   - Identify direct vs transitive dependencies
   - Note pinned versions and version ranges

2. **Run Vulnerability Scans**:
   - Execute `npm audit`, `pip-audit`, `cargo audit`, `mvn dependency-check`
   - Cross-reference with NVD, GitHub Advisory Database, OSV
   - Check for known malware or typosquatting packages
   - Review dependency update advisories

3. **Assess License Compliance**:
   - Identify all dependency licenses
   - Check for copyleft licenses (GPL, AGPL) in proprietary code
   - Verify license compatibility with project license
   - Flag dependencies with no license or deprecated licenses

4. **Evaluate Maintenance Status**:
   - Check last commit date and release frequency
   - Identify abandoned or unmaintained packages
   - Review open issue counts and response times
   - Check for archived repositories

5. **Prioritize Findings**:
   - Score by CVSS, exploitability, and business impact
   - Group by fix complexity (minor bump vs major version)
   - Identify quick wins (patch updates) vs complex migrations
   - Consider dependency depth (direct vs deeply transitive)

6. **Create Remediation Plan**:
   - Define update strategy (automated vs manual)
   - Set timelines based on severity
   - Plan testing strategy for major version updates
   - Document exceptions for unfixable vulnerabilities

7. **Verify Fixes**:
   - Re-run audit after updates
   - Verify no regressions in test suite
   - Confirm lock files are updated
   - Update SBOM

## Tool Policy
- Use `bash.exec` to run audit commands (npm audit, pip-audit, etc.)
- Use `filesystem.read` to parse manifests and lock files
- Use `web.search` for CVE details and migration guides
- Use `filesystem.write` to produce audit reports

## Verification
- All direct and transitive dependencies scanned
- Critical vulnerabilities have remediation within SLA
- License compatibility confirmed for all dependencies
- SBOM updated after remediation
- Re-audit shows zero critical/high findings

## Failure Modes
- Only scanning direct dependencies, missing transitive ones
- Not updating vulnerability databases before scanning
- Accepting risk on critical vulnerabilities without documentation
- Breaking builds by updating without testing
- Missing dependencies in monorepo sub-packages

## Example Routes
- `package.json` audit: run `npm audit --production` and analyze results
- `requirements.txt` audit: run `pip-audit` and check PyPI advisories
- `go.mod` audit: run `govulncheck ./...` for Go vulnerabilities
- Monorepo: scan all workspace package manifests

## Source Notes
- npm audit: https://docs.npmjs.com/cli/audit
- OSV (Open Source Vulnerabilities): https://osv.dev/
- GitHub Advisory Database: https://github.com/advisories
- Reference: ref.github.security.2026-05-31
