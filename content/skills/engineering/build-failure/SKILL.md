---
id: engineering.build-failure
name: Build Error Diagnosis and Fix
version: 1.0.0
domain: engineering
category: engineering.build-resolver
purpose: Diagnose and fix build errors by analyzing error messages, dependencies, and configuration issues.
summary: Systematic approach to identifying root causes of build failures and applying targeted fixes.
triggers:
  - build failed
  - build error
  - compilation error
  - build is broken
  - fix build
activation_triggers:
  - build is failing
  - can't build
  - build error message
prerequisites:
  - access to build logs
  - ability to run build commands
inputs:
  - build_error_output
  - build_command
  - recent_changes (optional)
steps:
  - Capture and analyze full build error output
  - Identify error category (syntax, dependency, configuration, environment)
  - Check recent changes that might have caused the failure
  - Search for similar errors in project history or documentation
  - Apply targeted fix based on error category
  - Verify fix by running build again
  - Document the issue and solution
outputs:
  - error_diagnosis
  - root_cause
  - fix_applied
  - verification_result
tools:
  - shell.readonly (run build, check logs)
  - filesystem.read (check configs, dependencies)
  - filesystem.write (apply fixes)
quality_gates:
  - Build succeeds after fix
  - Root cause identified and documented
  - No new warnings introduced
failure_modes:
  - Misdiagnosing the error category
  - Applying a fix that masks the real problem
  - Not verifying the fix works
  - Ignoring warnings that indicate deeper issues
handoffs:
  - engineering.dependency-upgrade (if dependency issue)
  - platform.ci-triage (if CI/CD pipeline issue)
source_references:
  - ref.github.build-troubleshooting.2026-06-01
allowed_agents:
  - engineering.build-resolver
  - engineering.dev-workflow
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert changes using version control
validators:
  - skill.validator
---

## Trigger
Use this skill when builds are failing, compilation errors occur, or build commands return errors.

## Prerequisites
- Access to full build error output
- Ability to run build commands locally
- Version control for rollback

## Steps
1. **Capture Error Output**: Run the build command and capture the full error output, including stack traces.
2. **Categorize the Error**:
   - **Syntax Errors**: Code syntax issues (missing semicolons, typos)
   - **Dependency Errors**: Missing packages, version conflicts
   - **Configuration Errors**: Incorrect build config, environment variables
   - **Environment Errors**: Wrong Node/Python version, missing tools
   - **Resource Errors**: Out of memory, disk space issues
3. **Check Recent Changes**: Review git log for recent commits that might have introduced the issue.
4. **Search for Solutions**:
   - Check project documentation for known issues
   - Search error message in project issue tracker
   - Look for similar errors in build logs history
5. **Apply Targeted Fix**:
   - Syntax: Fix the code error
   - Dependency: Install missing package or resolve version conflict
   - Configuration: Update build config or environment variables
   - Environment: Install correct tool versions
6. **Verify Fix**: Run the build command again to confirm it succeeds.
7. **Document**: Add to troubleshooting guide or create issue if it's a recurring problem.

## Verification
- Build command succeeds with exit code 0
- No new warnings introduced
- Application runs correctly after build

## Rollback
- Revert changes: `git checkout HEAD~1 <file>`
- Or reset to last known good state: `git reset --hard HEAD~1`

## Common Failures
- Only reading the last error line (missing context from earlier errors)
- Applying a workaround instead of fixing the root cause
- Not checking if the fix works in CI/CD environment
- Ignoring deprecation warnings that will become errors

## Examples
### Fixing a Dependency Error
Input: `npm run build` fails with "Module not found: Can't resolve 'lodash'"
Output:
- Diagnosis: Missing dependency
- Root cause: `lodash` not in package.json
- Fix: `npm install lodash`
- Verification: Build succeeds, tests pass

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
