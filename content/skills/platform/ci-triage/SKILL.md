---
id: platform.ci-triage
name: CI Failure Diagnosis
version: 1.0.0
domain: platform
category: platform.ci-cd
purpose: Diagnose and resolve CI/CD pipeline failures by analyzing logs, identifying root causes, and applying targeted fixes.
summary: Systematic approach to troubleshooting CI failures including build errors, test failures, and infrastructure issues.
triggers:
  - CI/CD pipeline failure diagnosis
  - CI pipeline failed in build system
  - build failed in CI/CD pipeline
  - GitHub Actions workflow failed
  - Jenkins CI build failed
activation_triggers:
  - CI pipeline is broken
  - CI/CD pipeline error
  - CI build pipeline failed
prerequisites:
  - access to CI logs
  - ability to run builds locally
inputs:
  - ci_logs
  - pipeline_configuration
  - recent_changes
steps:
  - Access and analyze CI failure logs
  - Identify failure stage (build, test, deploy)
  - Categorize failure type (code, config, infrastructure, flaky)
  - Check for recent changes that might have caused failure
  - Reproduce failure locally if possible
  - Apply targeted fix based on failure type
  - Verify fix by re-running pipeline
  - Document common failure patterns
outputs:
  - failure_diagnosis
  - root_cause
  - fix_applied
  - prevention_recommendations
tools:
  - shell.readonly (run builds, check logs)
  - filesystem.read (pipeline configs)
  - filesystem.write (fixes)
quality_gates:
  - Root cause identified
  - Fix verified in CI
  - Prevention measures documented
failure_modes:
  - Misidentifying failure category
  - Not checking recent changes
  - Applying temporary workaround instead of fix
  - Not verifying fix in CI environment
handoffs:
  - engineering.build-resolver (for build errors)
  - engineering.test-triage (for test failures)
  - platform.devops-engineer (for infrastructure issues)
source_references:
  - ref.github.ci-cd-troubleshooting.2026-06-01
allowed_agents:
  - platform.ci-cd-engineer
  - platform.devops-engineer
allowed_workflows:
  - platform.ci-failure-triage
status: active
budget_band: standard
rollback:
  - Revert changes using version control
validators:
  - skill.validator
---

## Trigger
Use this skill when CI/CD pipelines are failing, builds are broken in CI, or deployment pipelines have errors.

## Prerequisites
- Access to CI system logs (GitHub Actions, Jenkins, GitLab CI, etc.)
- Ability to run builds locally
- Knowledge of the CI/CD pipeline configuration

## Steps
1. **Access CI Logs**:
   - Navigate to failed pipeline run
   - Download or view full logs
   - Identify the failed stage (build, test, deploy, etc.)
2. **Categorize Failure**:
   - **Code Issues**: Compilation errors, linting failures, test failures
   - **Configuration Issues**: Wrong environment variables, missing secrets, incorrect paths
   - **Infrastructure Issues**: Runner out of disk space, network timeouts, service unavailable
   - **Flaky Tests**: Intermittent failures, timing issues, external service dependencies
   - **Dependency Issues**: Package installation failures, version conflicts
3. **Check Recent Changes**:
   - Review commits since last successful build
   - Check if pipeline configuration changed
   - Look for dependency updates
4. **Reproduce Locally**:
   - Run the same commands locally
   - Use same environment (Docker, Node version, etc.)
   - Compare local vs CI output
5. **Apply Targeted Fix**:
   - Code issues: Fix the code error
   - Config issues: Update pipeline configuration
   - Infrastructure: Contact DevOps or adjust resource limits
   - Flaky tests: Add retries, fix timing issues, mock external services
   - Dependencies: Pin versions, update lockfile
6. **Verify Fix**:
   - Push fix and re-run pipeline
   - Verify all stages pass
   - Check for new warnings or issues
7. **Document**:
   - Add to troubleshooting guide
   - Create issue if it's a recurring problem
   - Update pipeline documentation

## Verification
- CI pipeline passes all stages
- No new warnings introduced
- Fix is permanent (not a workaround)
- Documentation updated

## Rollback
- Revert changes: `git checkout HEAD~1 <file>`
- Re-run pipeline to confirm rollback works

## Common Failures
- Only looking at the last error (missing context from earlier stages)
- Not checking if the failure is flaky vs consistent
- Applying a workaround instead of fixing root cause
- Not verifying the fix works in CI environment
- Ignoring warnings that indicate deeper issues

## Examples
### Diagnosing a Test Failure in CI
Input: GitHub Actions pipeline fails at test stage
Output:
- Failure: `npm test` exits with code 1
- Logs show: `FAIL src/auth.test.js - timeout exceeded`
- Diagnosis: Flaky test due to slow database query
- Root cause: Test database not indexed, query takes >5s
- Fix: Add database index, increase test timeout to 10s
- Verification: Pipeline passes, test completes in 2s
- Prevention: Add database migration to CI setup
