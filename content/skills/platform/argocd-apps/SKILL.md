---
id: platform.argocd-apps
name: ArgoCD Application Management
version: 1.0.0
domain: platform
category: platform.gitops
description: Manage ArgoCD applications for GitOps-based continuous delivery on Kubernetes.
triggers:
  - ArgoCD application management
  - GitOps deployment with ArgoCD
  - ArgoCD sync issues
  - ArgoCD application set
  - ArgoCD project configuration
  - continuous delivery with ArgoCD
aliases:
  - argocd deploy
  - gitops workflow
  - argo cd
negative_keywords:
  - jenkins pipeline
  - manual deployment
  - helm install
  - non-gitops CI/CD
inputs:
  - git_repository
  - kubernetes_cluster
  - application_manifests
  - sync_policy
outputs:
  - argocd_application
  - sync_status
  - health_status
  - rollback_plan
allowed_tools:
  - shell.readonly (argocd app get, argocd app list)
  - shell.write (argocd app create, sync)
  - filesystem.read (application manifests)
  - filesystem.write (application specs)
required_skills:
  - platform.kubectl-commands
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Sync loop failures
  - Git repository not accessible
  - Out-of-sync resources
  - Health check failures
verification:
  - argocd app get shows Synced and Healthy
  - All resources deployed correctly
  - Auto-sync functioning
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.helm-charts (for Helm-based apps)
  - platform.kubectl-commands (for direct K8s operations)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.release-manager
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - argocd app rollback <app-name>
validators:
  - skill.validator
---

## Mission
Provide patterns for managing ArgoCD applications and implementing GitOps-based continuous delivery workflows.

## When To Use
- Setting up GitOps continuous delivery
- Managing multi-environment deployments
- Troubleshooting ArgoCD sync failures
- Configuring application sets for fleet management

## When Not To Use
- One-off deployments (use kubectl directly)
- Non-Kubernetes deployments
- CI pipeline configuration (use platform.github-actions or platform.jenkins-pipelines)

## Procedure
1. **Configure ArgoCD Project**: Set up project with source repos, destinations, and RBAC
2. **Create Application**: Define application spec with source repo, path, and target cluster
3. **Set Sync Policy**: Configure auto-sync, prune, and self-heal options
4. **Verify Sync Status**: Check application sync and health status
5. **Handle Sync Failures**: Diagnose and resolve sync errors, out-of-sync resources
6. **Manage Rollbacks**: Use ArgoCD rollback or revert Git commits
7. **Scale with AppSets**: Use ApplicationSets for managing multiple similar applications

## Tool Policy
- Use `argocd app get` and `argocd app diff` for inspection before syncing
- Prefer Git-driven changes over manual `argocd app set` commands
- Enable auto-sync with self-heal for production applications

## Verification
- `argocd app get <name>` shows Synced/Healthy
- No out-of-sync resources in application tree
- Auto-sync triggers correctly on Git changes
- Health checks passing for all resources

## Failure Modes
- Git repository authentication failures
- Helm chart rendering errors in ArgoCD
- Resource hooks failing during sync
- Out-of-sync resources due to manual kubectl changes

## Example Routes
- "set up ArgoCD for microservice" → application spec + sync policy
- "debug ArgoCD sync failure" → app diff + event logs analysis
- "create ApplicationSet for environments" → generator + template pattern

## Source Notes
Based on ArgoCD official documentation and GitOps best practices. Referenced dossier: ref.github.platform.2026-05-31.
