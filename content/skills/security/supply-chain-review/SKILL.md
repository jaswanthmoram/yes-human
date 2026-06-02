---
id: security.supply-chain-review
name: Dependency Supply Chain Risk Assessment
version: 1.0.0
domain: security
category: security.supply-chain
purpose: Assess and mitigate supply chain risks in software dependencies.
summary: Systematic review of dependencies for supply chain attacks, compromised packages, and trust issues.
triggers:
  - assess supply chain risk
  - supply chain security risk assessment
  - dependency security audit for vulnerabilities
  - check dependencies for supply chain attacks
  - package supply chain security review
  - audit dependencies for security risks
activation_triggers:
  - supply chain attack prevention
  - dependency security risk assessment
  - package supply chain security audit
prerequisites:
  - access to dependency list
  - dependency scanning tools
inputs:
  - dependency_list (package.json, requirements.txt, etc.)
  - lock_file
  - scan_results (optional)
steps:
  - Inventory all dependencies (direct and transitive)
  - Check for known compromised packages
  - Analyze package metadata (maintainers, downloads, age)
  - Review package source code for suspicious patterns
  - Check for typosquatting risks
  - Verify package signatures and checksums
  - Assess maintainer trust (bus factor, organization backing)
  - Create risk mitigation plan
outputs:
  - dependency_inventory
  - risk_assessment
  - compromised_packages
  - mitigation_plan
tools:
  - shell.readonly (npm audit, pip-audit, etc.)
  - filesystem.read
  - web.search (check package reputation)
quality_gates:
  - All dependencies inventoried
  - Known compromised packages identified
  - High-risk packages flagged
  - Mitigation plan documented
failure_modes:
  - Missing transitive dependencies
  - Not checking for typosquatting
  - Ignoring package metadata
  - Not verifying package integrity
handoffs:
  - engineering.dependency-upgrade (for remediation)
  - security.vulnerability-assessment (for CVE analysis)
source_references:
  - ref.github.supply-chain-security.2026-06-01
allowed_agents:
  - security.dependency-risk-agent
  - security.security-reviewer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when assessing supply chain risks, auditing dependencies, or responding to supply chain attacks.

## Prerequisites
- Access to dependency files (package.json, requirements.txt, Cargo.toml, etc.)
- Dependency scanning tools (npm audit, pip-audit, etc.)
- Internet access to check package metadata

## Steps
1. **Inventory Dependencies**:
   - List all direct dependencies
   - List all transitive dependencies (from lock file)
   - Count total dependencies
   - Identify critical dependencies (auth, crypto, etc.)
2. **Check for Compromised Packages**:
   - Run security audit: `npm audit`, `pip-audit`, `cargo audit`
   - Check for known supply chain attacks (event-stream, ua-parser-js, etc.)
   - Search for recent security advisories
3. **Analyze Package Metadata**:
   - **Maintainers**: How many? Are they active?
   - **Downloads**: Is it widely used? (low downloads = higher risk)
   - **Age**: How old is the package? (very new = higher risk)
   - **Last Update**: When was it last updated? (abandoned = risk)
   - **Repository**: Is source code available? Is it active?
4. **Review for Suspicious Patterns**:
   - Check for post-install scripts (potential malware vector)
   - Look for obfuscated code
   - Check for excessive permissions or network calls
   - Review recent changes for suspicious additions
5. **Check for Typosquatting**:
   - Compare package names to popular packages
   - Check for similar names (lodash vs 1odash, react vs raect)
   - Verify correct package is installed
6. **Verify Package Integrity**:
   - Check package signatures (if available)
   - Verify checksums in lock file
   - Use integrity checking tools (npm verify, pip check)
7. **Assess Maintainer Trust**:
   - **Bus Factor**: How many maintainers? (1 = high risk)
   - **Organization**: Backed by company or individual?
   - **Reputation**: Known maintainer or anonymous?
   - **Response Time**: How quickly are issues addressed?
8. **Create Risk Mitigation Plan**:
   - **High Risk**: Replace with alternative, vendor, or fork
   - **Medium Risk**: Pin to specific version, monitor closely
   - **Low Risk**: Regular updates, standard monitoring
   - Document rationale for each decision

## Verification
- All dependencies inventoried and assessed
- No known compromised packages in use
- High-risk packages have mitigation plans
- Package integrity verified
- Regular monitoring in place

## Rollback
- No state changes; this is an assessment skill

## Common Failures
- Only checking direct dependencies (missing transitive risks)
- Not checking for typosquatting
- Ignoring package metadata (maintainers, downloads)
- Not verifying package integrity
- Assuming popular packages are always safe

## Examples
### Auditing npm Dependencies
Input: package.json with 50 dependencies
Output:
- Inventory: 50 direct, 847 transitive dependencies
- Compromised: None found
- High Risk:
  - `small-package-123` (10 downloads, 1 maintainer, no updates in 2 years)
    - Mitigation: Replace with `popular-alternative`
  - `crypto-lib` (post-install script, obfuscated code)
    - Mitigation: Replace with `well-known-crypto`
- Medium Risk:
  - `new-framework` (6 months old, 1000 downloads)
    - Mitigation: Pin to v1.2.3, monitor for issues
- Typosquatting: None detected
- Integrity: All checksums verified

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
