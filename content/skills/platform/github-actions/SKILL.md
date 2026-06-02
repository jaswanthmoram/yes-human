---
id: platform.github-actions
name: GitHub Actions Workflow Design
version: 1.0.0
domain: platform
category: platform.ci-cd
description: Design, implement, and optimize GitHub Actions workflows for CI/CD automation.
triggers:
  - optimize slow GitHub Actions pipeline
  - GitHub Actions workflow design
  - create GitHub Actions workflow
  - CI/CD with GitHub Actions
  - GitHub Actions optimization
  - reusable workflow patterns
  - GitHub Actions matrix strategy
aliases:
  - GH Actions
  - github CI
  - actions workflow
negative_keywords:
  - jenkins pipeline
  - gitlab CI
  - circleci
  - non-github CI
inputs:
  - repository_structure
  - build_requirements
  - deployment_targets
  - secrets_configuration
outputs:
  - workflow_yaml
  - reusable_workflows
  - action_composites
  - optimization_recommendations
allowed_tools:
  - shell.readonly (gh CLI, act for local testing)
  - filesystem.read (workflow files)
  - filesystem.write (workflow files)
required_skills: []
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Workflow syntax errors
  - Secrets not properly referenced
  - Matrix strategy causing excessive runs
  - Missing concurrency controls
verification:
  - Workflow YAML validates
  - act local test passes
  - Workflow triggers correctly
  - All jobs complete successfully
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.argocd-apps (for GitOps deployment trigger)
  - platform.ci-triage (for workflow failure diagnosis)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.ci-cd-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Revert workflow file changes
  - Cancel running workflow: gh run cancel
validators:
  - skill.validator
---

## Mission
Provide patterns for designing efficient, maintainable GitHub Actions workflows for CI/CD automation.

## When To Use
- Creating CI/CD pipelines for GitHub repositories
- Building reusable workflows and composite actions
- Optimizing workflow performance and costs
- Implementing matrix builds and parallel jobs

## When Not To Use
- Non-GitHub repositories (use platform.jenkins-pipelines)
- Simple scripts that don't need CI (run locally)
- Infrastructure provisioning (use platform.terraform-modules)

## Procedure
1. **Define Workflow Triggers**: Set up on push, pull_request, schedule, or workflow_dispatch events
2. **Structure Jobs**: Organize into build, test, and deploy jobs with proper dependencies
3. **Configure Matrix**: Set up matrix strategy for multi-version or multi-platform builds
4. **Manage Secrets**: Use repository/environment secrets, never hardcode credentials
5. **Add Caching**: Cache dependencies and build artifacts to speed up workflows
6. **Set Concurrency**: Add concurrency groups to prevent parallel runs on same ref
7. **Create Reusable Workflows**: Extract common patterns into reusable or composite actions

## Tool Policy
- Use `act` for local workflow testing when possible
- Pin action versions to SHA for security
- Use `actions/cache` for dependency caching
- Set `timeout-minutes` on all jobs

## Verification
- Workflow YAML is valid (no syntax errors)
- All jobs complete successfully on test trigger
- Secrets are properly referenced and scoped
- Caching reduces workflow duration

## Failure Modes
- Using `latest` tag for actions (supply chain risk)
- Secrets exposed in logs
- Missing `permissions` block (over-privileged token)
- No concurrency control causing resource contention

## Example Routes
- "create CI workflow for Node.js" → build + test + lint pipeline
- "optimize slow GitHub Actions" → caching + concurrency + matrix tuning
- "reusable workflow for Docker build" → workflow_call with inputs

## Source Notes
Based on GitHub Actions official documentation and CI/CD best practices. Referenced dossier: ref.github.platform.2026-05-31.
