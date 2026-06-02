---
id: platform.helm-charts
name: Helm Chart Development
version: 1.0.0
domain: platform
category: platform.kubernetes
description: Design, develop, and maintain Helm charts for Kubernetes application packaging and deployment.
triggers:
  - Helm chart development
  - create Helm chart
  - Helm template debugging
  - Helm values configuration
  - package Kubernetes app with Helm
  - Helm chart best practices
  - Helm release management
aliases:
  - helm packaging
  - k8s chart
  - helm deploy
negative_keywords:
  - raw kubectl
  - terraform module
  - docker-compose
  - kustomize
inputs:
  - application_manifests
  - deployment_requirements
  - environment_values
outputs:
  - helm_chart
  - values_yaml
  - chart_templates
  - release_notes
allowed_tools:
  - shell.readonly (helm lint, helm template)
  - shell.write (helm install, upgrade)
  - filesystem.read (chart files)
  - filesystem.write (chart scaffolding)
required_skills:
  - platform.kubectl-commands
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Template rendering errors
  - Values not properly overridden per environment
  - Missing resource limits in templates
  - Chart version not bumped on changes
verification:
  - helm lint passes with no errors
  - helm template renders valid YAML
  - helm install --dry-run succeeds
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.argocd-apps (for GitOps deployment)
  - platform.kubectl-commands (for direct deployment)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.kubernetes-operator
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - helm rollback <release> <revision>
validators:
  - skill.validator
---

## Mission
Provide patterns for building, testing, and maintaining Helm charts that package Kubernetes applications for repeatable deployment.

## When To Use
- Packaging applications for Kubernetes deployment
- Creating reusable chart templates across environments
- Managing complex multi-service deployments
- Templating configuration across staging/production

## When Not To Use
- Simple single-resource deployments (use raw kubectl)
- Infrastructure provisioning (use Terraform)
- Local development environments (use docker-compose)

## Procedure
1. **Scaffold Chart**: Run `helm create <chart-name>` and review generated structure
2. **Design Templates**: Create deployment, service, ingress, and configmap templates with proper helpers
3. **Structure Values**: Organize values.yaml with sensible defaults, document each field
4. **Add Conditionals**: Use `{{- if }}` for optional components (ingress, HPA, service accounts)
5. **Test Rendering**: Run `helm template` and `helm lint` to validate output
6. **Version and Package**: Bump chart version in Chart.yaml, run `helm package`
7. **Deploy and Verify**: Use `helm install --dry-run` then actual install with environment-specific values

## Tool Policy
- Always lint before packaging
- Use `helm template` to inspect rendered output before deploying
- Keep chart dependencies pinned to specific versions

## Verification
- `helm lint` passes cleanly
- `helm template` renders valid Kubernetes YAML
- `helm install --dry-run` succeeds
- All resources created match expected state

## Failure Modes
- Template syntax errors causing render failures
- Values override not applied (wrong file path or key)
- Chart dependencies out of sync
- Not bumping version before publishing

## Example Routes
- "create Helm chart for Node.js API" → scaffold + templates + values
- "debug Helm template rendering error" → helm template + lint analysis
- "add HPA to existing chart" → conditional HPA template + values

## Source Notes
Based on Helm official documentation and production chart patterns. Referenced dossier: ref.github.platform.2026-05-31.
