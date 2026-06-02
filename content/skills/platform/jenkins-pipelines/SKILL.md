---
id: platform.jenkins-pipelines
name: Jenkins Pipeline Design
version: 1.0.0
domain: platform
category: platform.ci-cd
description: Design, implement, and maintain Jenkins declarative and scripted pipelines for CI/CD automation.
triggers:
  - Jenkins pipeline design
  - create Jenkinsfile
  - Jenkins pipeline optimization
  - Jenkins shared libraries
  - Jenkins agent configuration
  - Jenkins plugin management
aliases:
  - Jenkinsfile
  - Jenkins CI
  - Jenkins declarative pipeline
negative_keywords:
  - github actions
  - gitlab CI
  - circleci
  - non-jenkins CI
inputs:
  - pipeline_requirements
  - build_stages
  - agent_configuration
  - credential_store
outputs:
  - jenkinsfile
  - shared_library
  - pipeline_documentation
  - optimization_recommendations
allowed_tools:
  - shell.readonly (jenkins-cli, API queries)
  - filesystem.read (Jenkinsfiles, configs)
  - filesystem.write (Jenkinsfiles, shared libs)
required_skills: []
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Pipeline syntax errors
  - Agent resource exhaustion
  - Credential exposure in logs
  - Shared library version conflicts
verification:
  - Jenkinsfile validates with linter
  - Pipeline runs successfully end-to-end
  - All stages complete without errors
  - Credentials properly scoped
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.ci-triage (for pipeline failure diagnosis)
  - platform.docker-compose (for build environments)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.ci-cd-engineer
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - Revert Jenkinsfile changes
  - Replay previous successful build
validators:
  - skill.validator
---

## Mission
Provide patterns for designing robust Jenkins pipelines that automate build, test, and deployment workflows.

## When To Use
- Creating CI/CD pipelines on Jenkins
- Building shared libraries for pipeline reuse
- Configuring multi-branch and matrix pipelines
- Managing Jenkins agents and plugins

## When Not To Use
- GitHub-hosted repositories (prefer platform.github-actions)
- Simple single-stage builds (use shell scripts)
- Serverless CI/CD needs

## Procedure
1. **Choose Pipeline Type**: Prefer declarative pipelines for standard workflows, scripted for complex logic
2. **Define Stages**: Structure pipeline into build, test, security scan, and deploy stages
3. **Configure Agents**: Assign appropriate agent labels for resource requirements
4. **Manage Credentials**: Use Jenkins credential store with proper scoping
5. **Add Post Actions**: Configure always/success/failure post-build actions
6. **Create Shared Libraries**: Extract reusable pipeline steps into shared library
7. **Optimize Performance**: Use parallel stages, caching, and agent pooling

## Tool Policy
- Use declarative pipeline syntax as default
- Validate Jenkinsfile with `jenkins-cli` or online linter before committing
- Pin shared library versions with `@tag` syntax
- Use `timeout` wrapper on all stages

## Verification
- Jenkinsfile passes syntax validation
- Pipeline executes all stages successfully
- Post actions fire correctly
- Shared library functions work as expected

## Failure Modes
- Groovy sandbox restrictions blocking scripted pipeline logic
- Agent disconnection during long-running builds
- Credential binding not available in parallel stages
- Shared library breaking changes without versioning

## Example Routes
- "create Jenkinsfile for Java app" → Maven build + test + deploy pipeline
- "build shared library for Docker" → reusable Docker build/push steps
- "parallel test stages in Jenkins" → matrix parallel execution

## Source Notes
Based on Jenkins official documentation and pipeline best practices. Referenced dossier: ref.github.platform.2026-05-31.
