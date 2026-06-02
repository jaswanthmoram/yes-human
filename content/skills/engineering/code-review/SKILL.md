---
id: engineering.code-review
name: Systematic Code Review
version: 1.0.0
domain: engineering
category: engineering.code-quality
purpose: Perform systematic code reviews following industry best practices to identify bugs, security issues, and maintainability concerns.
summary: Guides through a structured code review process covering correctness, security, performance, and maintainability checks.
triggers:
  - review code
  - code review
  - review pull request
  - review PR
  - check code quality
activation_triggers:
  - review this code
  - can you review
  - please review
  - code looks good?
prerequisites:
  - access to code changes (diff or files)
  - understanding of project conventions
inputs:
  - code_diff_or_files
  - review_checklist (optional)
  - project_conventions (optional)
steps:
  - Understand the purpose and scope of the changes
  - Check for correctness: logic errors, edge cases, off-by-one errors
  - Review security: input validation, authentication, authorization, injection risks
  - Assess performance: algorithmic complexity, unnecessary allocations, N+1 queries
  - Evaluate maintainability: naming, structure, documentation, test coverage
  - Verify error handling and logging
  - Check for consistency with project conventions
  - Provide actionable feedback with specific suggestions
outputs:
  - review_findings (categorized by severity)
  - approval_or_changes_requested
  - specific_suggestions
tools:
  - filesystem.read
  - code_graph.query
quality_gates:
  - All critical issues identified and documented
  - Security vulnerabilities flagged
  - Actionable feedback provided
failure_modes:
  - Missing subtle logic bugs
  - Overlooking security vulnerabilities
  - Providing vague or non-actionable feedback
  - Not checking edge cases
handoffs:
  - engineering.security-reviewer (for security concerns)
  - engineering.testing-unit (for test coverage gaps)
source_references:
  - ref.github.code-review-best-practices.2026-06-01
allowed_agents:
  - engineering.code-reviewer
  - engineering.master
allowed_workflows:
  - engineering.code-review-with-security
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when reviewing code changes, pull requests, or when asked to check code quality.

## Prerequisites
- Access to the code changes (diff, files, or PR link)
- Understanding of the project's coding conventions and standards
- Familiarity with the codebase architecture

## Steps
1. **Understand Context**: Read the PR description, issue, or task to understand what the changes aim to accomplish.
2. **Correctness Review**: 
   - Trace through logic to verify correctness
   - Check edge cases and boundary conditions
   - Look for off-by-one errors, null pointer issues, race conditions
3. **Security Review**:
   - Validate all user inputs
   - Check authentication and authorization
   - Look for SQL injection, XSS, CSRF vulnerabilities
   - Verify secrets are not hardcoded
4. **Performance Review**:
   - Analyze algorithmic complexity (O(n²) vs O(n log n))
   - Check for unnecessary object allocations
   - Look for N+1 query problems in database code
   - Verify caching is used appropriately
5. **Maintainability Review**:
   - Check naming conventions (variables, functions, classes)
   - Verify code structure and organization
   - Ensure adequate documentation for complex logic
   - Check test coverage for new code
6. **Error Handling**:
   - Verify errors are caught and handled appropriately
   - Check logging is informative but not verbose
   - Ensure error messages are user-friendly
7. **Consistency Check**:
   - Verify adherence to project style guide
   - Check for consistency with existing code patterns
8. **Provide Feedback**:
   - Categorize findings (critical, major, minor, suggestion)
   - Provide specific, actionable suggestions
   - Explain the "why" behind each suggestion

## Verification
- Run `npm test` to ensure all tests pass
- Run linter to check style compliance
- Manually test critical paths if applicable

## Rollback
- No state changes; this is a review-only skill

## Common Failures
- Missing subtle concurrency bugs or race conditions
- Overlooking security vulnerabilities in input handling
- Providing feedback that is too vague ("this looks wrong")
- Not checking error paths and edge cases
- Focusing only on style issues while missing logic bugs

## Examples
### Reviewing a Pull Request
Input: PR #123 adding user authentication
Output: 
- Critical: Password stored in plain text (line 45)
- Major: Missing input validation on email field (line 23)
- Minor: Variable name `usr` should be `user` for clarity (line 12)
- Suggestion: Consider extracting auth logic to separate module

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
