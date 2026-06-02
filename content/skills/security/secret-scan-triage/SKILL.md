---
id: security.secret-scan-triage
name: Secret Detection and False Positive Filtering
version: 1.0.0
domain: security
category: security.secret-scanning
purpose: Detect hardcoded secrets in code and triage findings to distinguish real secrets from false positives.
summary: Systematic approach to scanning for secrets, validating findings, and remediating exposed credentials.
triggers:
  - scan for secrets
  - find hardcoded secrets
  - secret detection
  - check for API keys
  - credential leak
activation_triggers:
  - scan secrets
  - find API keys
  - check credentials
prerequisites:
  - access to codebase
  - secret scanning tool (git-secrets, truffleHog, etc.)
inputs:
  - codebase_path
  - scan_results
  - known_false_positives (optional)
steps:
  - Run secret scanning tool on codebase
  - Review all findings
  - Categorize findings (real secret, false positive, test data)
  - Validate real secrets by checking if they're active
  - Prioritize by severity (production vs dev, high-privilege vs low)
  - Create remediation plan
  - Rotate exposed secrets
  - Remove secrets from code and history
outputs:
  - secret_findings (categorized)
  - validation_results
  - remediation_plan
  - rotated_secrets_list
tools:
  - shell.readonly (run scanning tools)
  - filesystem.read
  - filesystem.write (remove secrets)
quality_gates:
  - All findings reviewed
  - Real secrets identified and rotated
  - False positives documented
  - Secrets removed from code
failure_modes:
  - Missing secrets due to tool limitations
  - Not rotating exposed secrets
  - Leaving secrets in git history
  - Not checking if secrets are still active
handoffs:
  - security.dependency-risk-agent (if secrets in dependencies)
  - platform.incident-responder (if production secrets exposed)
source_references:
  - ref.github.secret-scanning-best-practices.2026-06-01
allowed_agents:
  - security.secret-scan-agent
  - security.security-reviewer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert code changes if secret removal breaks functionality
validators:
  - skill.validator
---

## Trigger
Use this skill when scanning for hardcoded secrets, reviewing secret detection results, or responding to credential leaks.

## Prerequisites
- Access to the codebase
- Secret scanning tool installed (git-secrets, truffleHog, detect-secrets, etc.)
- Permissions to rotate secrets if found

## Steps
1. **Run Secret Scan**:
   - Execute scanning tool: `git-secrets --scan` or `truffleHog --regex --entropy=False`
   - Scan entire repository including git history
   - Export results to file for review
2. **Review Findings**:
   - Examine each finding
   - Check context (is it in code, config, or test?)
   - Identify the type of secret (API key, password, token, etc.)
3. **Categorize Findings**:
   - **Real Secret**: Active credential that should not be in code
   - **False Positive**: Looks like a secret but isn't (e.g., "password" in variable name)
   - **Test Data**: Secrets used only in tests (should still be removed)
   - **Example/Documentation**: Placeholders in docs (acceptable if clearly marked)
4. **Validate Real Secrets**:
   - Check if the secret is still active (try to use it in a safe way)
   - Determine if it's production or development
   - Identify what service/system it belongs to
5. **Prioritize by Severity**:
   - Critical: Production secrets with high privileges
   - High: Production secrets with limited access
   - Medium: Development/staging secrets
   - Low: Test/example secrets
6. **Create Remediation Plan**:
   - Rotate all exposed secrets immediately
   - Remove secrets from code
   - Use environment variables or secret managers
   - Clean git history if necessary (BFG Repo-Cleaner)
7. **Implement Fixes**:
   - Replace hardcoded secrets with environment variables
   - Update configuration to use secret manager
   - Add pre-commit hooks to prevent future secrets
8. **Verify**:
   - Re-run scan to confirm secrets removed
   - Test application still works with new secret management

## Verification
- Secret scan returns no findings (or only documented false positives)
- All real secrets rotated
- Application works with new secret management
- Pre-commit hooks prevent future secrets

## Rollback
- If secret removal breaks functionality, temporarily restore and fix properly
- Use version control to revert: `git checkout HEAD~1 <file>`

## Common Failures
- Not scanning git history (secrets in old commits)
- Assuming false positives without validation
- Not rotating exposed secrets
- Leaving secrets in git history after removal
- Not adding pre-commit hooks to prevent recurrence

## Examples
### Scanning and Remediating Secrets
Input: `git-secrets --scan` finds 3 potential secrets
Output:
- Finding 1: `AWS_SECRET_ACCESS_KEY=AKIA...` in config.js → Real secret (production AWS)
  - Action: Rotate AWS key, move to environment variable
- Finding 2: `password = "test123"` in test file → Test data
  - Action: Remove, use test fixtures
- Finding 3: `const passwordField = "password"` in form component → False positive
  - Action: Document as false positive
