---
id: security.secret-scanning
name: Secret Detection and Scanning
version: 1.0.0
domain: security
category: security.credential-management
purpose: Detect hardcoded secrets, API keys, tokens, and credentials in source code and configuration files.
summary: Comprehensive secret scanning across codebases to identify exposed credentials and sensitive tokens.
triggers:
  - find exposed tokens in configuration files
  - scan codebase for hardcoded API keys and secrets
  - scan codebase for hardcoded secrets
  - find API keys in source code
  - detect credentials in configuration files
  - check for leaked tokens and passwords
  - secret detection in git history
  - audit for exposed credentials
  - find sensitive data in code
aliases:
  - secret scan
  - credential scan
  - key detection
negative_keywords:
  - runtime secret injection
  - vault management
  - key rotation
inputs:
  - source_code
  - git_history
  - configuration_files
  - environment_files
outputs:
  - secret_findings
  - severity_report
  - remediation_steps
  - gitignore_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code.grep
  - bash.exec
required_skills: []
budget_band: micro
max_context_tokens: 8000
failure_modes:
  - False positives from test fixtures
  - Missing encoded or obfuscated secrets
  - Not scanning git history for removed secrets
  - Ignoring configuration management tools
verification:
  - All source files and config files scanned
  - Git history checked for previously committed secrets
  - Each finding validated as true positive or documented false positive
  - Remediation applied or tracked
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
Detect and report hardcoded secrets, API keys, tokens, and credentials across source code, configuration files, and git history to prevent credential exposure.

## When To Use
- Before pushing code to public or shared repositories
- During security audits of existing codebases
- When onboarding new repositories to CI/CD pipelines
- After suspected credential exposure incidents
- As part of pre-commit hook setup

## When Not To Use
- For runtime secret management (use vault solutions like HashiCorp Vault)
- For key rotation procedures (use key-management skill)
- When secrets are properly managed via environment variables or secret managers
- For scanning binary files or compiled artifacts

## Procedure
1. **Define Scan Scope**:
   - Identify all repositories and branches to scan
   - Include configuration files, environment files, and scripts
   - Determine if git history scanning is needed

2. **Run Pattern-Based Detection**:
   - Search for common secret patterns (API keys, tokens, passwords)
   - Check for AWS access keys, GCP service account keys
   - Detect private keys (RSA, DSA, EC)
   - Find database connection strings with credentials
   - Check for OAuth tokens and JWT secrets

3. **Scan Git History**:
   - Use tools like `git-secrets`, `truffleHog`, or `gitleaks`
   - Check all branches including deleted ones
   - Identify secrets that were committed and later removed

4. **Validate Findings**:
   - Distinguish true positives from false positives
   - Check if detected secrets are active or rotated
   - Verify test fixtures and example values are not real credentials

5. **Assess Exposure**:
   - Determine if secrets were pushed to remote repositories
   - Check if secrets are accessible in CI/CD logs
   - Assess the blast radius of each exposed credential

6. **Remediate**:
   - Rotate all exposed credentials immediately
   - Remove secrets from code and git history (BFG Repo-Cleaner)
   - Add patterns to `.gitignore` and pre-commit hooks
   - Migrate to environment variables or secret managers

7. **Prevent Future Exposure**:
   - Set up pre-commit hooks (gitleaks, detect-secrets)
   - Configure CI/CD secret scanning
   - Document secret management procedures

## Tool Policy
- Use `code.grep` for regex-based secret pattern matching
- Use `bash.exec` to run gitleaks, truffleHog, or git-secrets
- Use `filesystem.read` to inspect flagged files
- Use `filesystem.write` to produce findings report

## Verification
- All source files, configs, and environment files scanned
- Git history scanned for previously committed secrets
- Each finding classified as true positive, false positive, or needs-review
- All true positive secrets rotated and removed from code
- Pre-commit hooks configured to prevent future exposure

## Failure Modes
- Missing base64-encoded or obfuscated secrets
- Not scanning git history, only current HEAD
- False positives overwhelming the review process
- Not rotating credentials after finding exposed secrets
- Ignoring secrets in CI/CD pipeline configurations

## Example Routes
- Scan `src/config/database.ts` for hardcoded connection strings
- Check `.env` files committed to repository
- Search git history for AWS access key patterns
- Detect private key files (`.pem`, `.key`) in source tree

## Source Notes
- gitleaks: https://github.com/gitleaks/gitleaks
- truffleHog: https://github.com/trufflesecurity/trufflehog
- detect-secrets: https://github.com/Yelp/detect-secrets
- Reference: ref.github.security.2026-05-31
