---
id: engineering.dependency-upgrade
name: Safe Dependency Update Workflow
version: 1.0.0
domain: engineering
category: engineering.dev-workflow
purpose: Safely update project dependencies while minimizing risk of breaking changes and security vulnerabilities.
summary: Guides through dependency updates with security scanning, compatibility checks, and rollback planning.
triggers:
  - update package dependencies
  - upgrade npm packages
  - fix security vulnerability in dependency
  - update outdated dependencies
  - dependency version upgrade
activation_triggers:
  - update npm packages
  - upgrade pip packages
  - fix security vulnerabilities
prerequisites:
  - access to package manager (npm, pip, cargo, etc.)
  - ability to run tests
inputs:
  - current_dependencies
  - update_scope (all, security-only, specific-package)
  - test_suite_available
steps:
  - Audit current dependencies for known vulnerabilities
  - Check for outdated packages and breaking changes
  - Create update plan with rollback strategy
  - Update dependencies incrementally
  - Run full test suite after each update
  - Verify no security vulnerabilities remain
  - Document changes and update lockfile
outputs:
  - vulnerability_report
  - update_plan
  - updated_dependencies
  - test_results
tools:
  - shell.readonly (npm audit, npm outdated)
  - filesystem.read
  - filesystem.write (package.json, lockfile)
quality_gates:
  - All critical vulnerabilities addressed
  - All tests pass after updates
  - No breaking changes without migration plan
failure_modes:
  - Introducing breaking changes without testing
  - Missing transitive dependency vulnerabilities
  - Not updating lockfile
  - Skipping test suite after updates
handoffs:
  - security.dependency-risk-agent (for security review)
  - engineering.testing-unit (for test verification)
source_references:
  - ref.github.dependency-management-best-practices.2026-06-01
allowed_agents:
  - engineering.dev-workflow
  - engineering.master
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert package.json and lockfile to previous version
  - Reinstall dependencies from lockfile
validators:
  - skill.validator
---

## Trigger
Use this skill when updating project dependencies, fixing security vulnerabilities, or performing dependency audits.

## Prerequisites
- Access to package manager (npm, pip, cargo, maven, etc.)
- Ability to run the full test suite
- Backup or version control for rollback

## Steps
1. **Audit Dependencies**: Run security audit (e.g., `npm audit`, `pip-audit`) to identify vulnerabilities.
2. **Check for Updates**: Run outdated check (e.g., `npm outdated`) to see available updates.
3. **Review Breaking Changes**: Check changelogs for major version updates to identify breaking changes.
4. **Create Update Plan**:
   - Prioritize security vulnerabilities (critical first)
   - Group related updates together
   - Plan rollback strategy for each group
5. **Update Incrementally**:
   - Update one package or group at a time
   - Run full test suite after each update
   - Fix any test failures before proceeding
6. **Verify Security**: Re-run security audit to confirm vulnerabilities are resolved.
7. **Update Lockfile**: Ensure lockfile is updated and committed.
8. **Document Changes**: Update CHANGELOG or release notes with dependency changes.

## Verification
- `npm audit` (or equivalent) shows no critical vulnerabilities
- Full test suite passes
- Application runs without errors
- Lockfile is updated and committed

## Rollback
- Revert package.json to previous version: `git checkout HEAD~1 package.json`
- Revert lockfile: `git checkout HEAD~1 package-lock.json`
- Reinstall: `npm install` (or equivalent)

## Common Failures
- Updating all dependencies at once without testing incrementally
- Not checking for breaking changes in major version updates
- Forgetting to update the lockfile
- Not running the full test suite after updates
- Missing transitive dependency vulnerabilities

## Examples
### Security Update
Input: `npm audit` shows 3 critical vulnerabilities
Output:
- Update `lodash` from 4.17.15 to 4.17.21 (fixes prototype pollution)
- Update `axios` from 0.21.0 to 0.21.4 (fixes SSRF vulnerability)
- Update `express` from 4.17.0 to 4.17.3 (fixes open redirect)
- Run tests after each update
- Verify `npm audit` shows 0 vulnerabilities

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
