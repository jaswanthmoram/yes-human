---
quality_gate: production
id: engineering.security-review-pr
name: PR Security Review Checklist
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Perform a targeted security review on a pull request covering OWASP Top 10 risks relevant to the changed code.
summary: PR Security Review Checklist skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - security review pr
  - appsec code check
  - review for security vulnerabilities
  - code security scan
  - check injection vulnerabilities
activation_triggers:
  - how do I security review pr
  - help me with appsec code check
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Run Semgrep or equivalent scanner on changed files — read scanner output before any manual review
  - Check all input entry points for validation: HTTP params, headers, body, file uploads
  - Review authentication and authorization: are endpoints protected, does the current user have rights
  - Inspect data flows for injection risks: SQL, command, XSS, SSRF
  - Check for secrets in code: API keys, tokens, credentials — run gitleaks if not in CI
  - Report with CVSS severity, file:line reference, and remediation suggestion
outputs:
  - completed_output
  - review_or_analysis_report
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Output addresses all required criteria
  - Sources cited where patterns were drawn from
  - No hallucinated APIs or non-existent patterns
failure_modes:
  - LLM-only findings without scanner run
  - Missing evidence for a finding
  - Reporting style issues as security issues
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/anthropics/claude-code-security-review
  - https://github.com/OWASP/CheatSheetSeries
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - No writes — read-only review skill
validators:
  - skill.validator
---

## Trigger

Use this skill for tasks related to: security review pr, appsec code check, review for security vulnerabilities.

## Prerequisites

- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step

Run Semgrep or equivalent scanner on changed files — read scanner output before any manual review

### 2. Step

Check all input entry points for validation: HTTP params, headers, body, file uploads

### 3. Step

Review authentication and authorization: are endpoints protected, does the current user have rights

### 4. Step

Inspect data flows for injection risks: SQL, command, XSS, SSRF

### 5. Step

Check for secrets in code: API keys, tokens, credentials — run gitleaks if not in CI

### 6. Step

Report with CVSS severity, file:line reference, and remediation suggestion

## Verification

- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback

No writes — read-only review skill

## Common Failures

| Failure                                   | Cause         | Fix               |
| ----------------------------------------- | ------------- | ----------------- |
| LLM-only findings without scanner run     | See procedure | Address in review |
| Missing evidence for a finding            | See procedure | Address in review |
| Reporting style issues as security issues | See procedure | Address in review |

## Examples

**Example A:** Apply this skill to a typical instance of 'security review pr'.
**Example B:** Apply this skill when facing 'review for security vulnerabilities' in a complex codebase.
