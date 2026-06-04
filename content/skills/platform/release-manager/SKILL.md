---
quality_gate: production
id: platform.release-manager
name: Release Management
version: 1.0.0
domain: platform
category: platform.release
purpose: Coordinate software releases with semantic versioning, changelog generation, feature flag gating, and post-release verification.
summary: Reliable releases require: semantic versioning, automated changelog, feature flag rollout, deployment verification, and clear rollback triggers. This skill structures the release process from code freeze to post-release sign-off.
triggers:
  - release management
  - release plan
  - release coordination
  - ship this release
  - release readiness
activation_triggers:
  - we need to ship this release
  - how do we do a safe deployment
prerequisites:
  - CI/CD pipeline passing on release branch
  - Semantic versioning adopted
  - Feature flags configured for new features
inputs:
  - release_candidate
  - changelog_entries
  - rollback_criteria
steps:
  - Generate changelog from conventional commits (npx conventional-changelog-cli) — review and edit for clarity
  - Bump version with semantic-release or manually: MAJOR (breaking), MINOR (feature), PATCH (fix)
  - Run release readiness checklist: all tests green, feature flags configured, rollback plan documented
  - Deploy to staging with production-equivalent config — run smoke tests
  - Gradual rollout: 1% → 10% → 50% → 100% using feature flags or canary deployment
  - Monitor error rates and latency for 30 minutes post-rollout; document rollback trigger thresholds
outputs:
  - changelog_md
  - version_tag
  - deployment_plan
  - post_release_report
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - All CI tests passing on release candidate
  - Changelog reviewed and approved by team lead
  - Rollback criteria documented before deployment starts
  - Smoke tests pass on staging
failure_modes:
  - Releasing without a rollback plan
  - Skipping staging deployment
  - No error rate monitoring post-deploy
handoffs:
  - platform.devops-engineer (for deployment execution)
  - platform.incident-responder (if rollback triggered)
source_references:
  - https://github.com/semantic-release/semantic-release
  - https://github.com/conventional-changelog/conventional-changelog
allowed_agents:
  - platform.devops-engineer
  - startup-ops.release
status: active
budget_band: standard
rollback:
  - Feature flag: disable new features immediately
  - Deployment: revert to previous image tag
  - Database: only if rollback migration prepared in advance
validators:
  - skill.validator
---

## Trigger

Use before any production deployment to structure the release process, generate changelog, and define rollback criteria.

## Prerequisites

- CI pipeline green on release branch
- Conventional commit format used in the team

## Steps

### 1. Generate Changelog

`npx conventional-changelog-cli -p angular -i CHANGELOG.md -s` — review the output, edit for clarity. Remove internal/irrelevant commits.

### 2. Bump Version

Follow semver: MAJOR for breaking API changes, MINOR for new features (backward compatible), PATCH for fixes. Tag in git.

### 3. Release Readiness Checklist

All tests green. Feature flags configured for new features. Rollback plan documented. On-call engineer briefed. Stakeholders notified.

### 4. Deploy to Staging

Deploy the release candidate to staging with production-equivalent environment variables. Run smoke tests. Never skip this step.

### 5. Gradual Rollout

If using feature flags: enable for 1% → 10% → 50% → 100%. If using canary: deploy to 1 pod first. Monitor before each step.

### 6. Post-Release Verification

Monitor error rate, p99 latency, and business metrics for 30 minutes. Document the release in the team's release log.

## Verification

- [ ] Changelog accurate and reviewed
- [ ] Smoke tests pass on staging
- [ ] Error rates stable 30 min post-deploy
- [ ] Rollback criteria defined

## Rollback

Disable feature flags first (immediate). Revert deployment image tag second (2-5 min). Database rollback last and only if migration prepared.

## Common Failures

| Failure               | Cause                        | Fix                                       |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Post-release incident | No monitoring window         | Always monitor 30min post-deploy          |
| Bad changelog         | Inconsistent commit messages | Enforce conventional commits              |
| No rollback trigger   | Criteria not defined         | Define error rate threshold before deploy |

## Examples

**Example A:** v2.3.0 release with 3 new features: feature-flag each, canary to 10%, then full rollout after 1 hour.
**Example B:** Hotfix v1.2.1: skip feature flags, deploy directly to 100%, monitor 30 minutes.
