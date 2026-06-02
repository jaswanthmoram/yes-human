---
id: platform.kubectl-commands
name: kubectl Command Patterns
version: 1.0.0
domain: platform
category: platform.kubernetes
description: Author, debug, and optimize kubectl commands for cluster operations, workload management, and troubleshooting.
triggers:
  - kubectl command patterns
  - manage Kubernetes workloads
  - kubectl debug pod issues
  - kubectl rollout and scaling
  - inspect cluster resources
  - kubectl port-forward and exec
aliases:
  - kubectl help
  - kubernetes cli
  - k8s commands
negative_keywords:
  - helm chart
  - terraform
  - istio config
  - non-kubernetes infra
inputs:
  - cluster_context
  - namespace
  - resource_type
  - operation
outputs:
  - kubectl_commands
  - resource_diagnosis
  - remediation_steps
allowed_tools:
  - shell.readonly (kubectl get, describe, logs)
  - shell.write (kubectl apply, delete, scale)
  - filesystem.read (manifests)
required_skills: []
budget_band: micro
max_context_tokens: 4096
failure_modes:
  - Wrong cluster context or namespace
  - Mutating commands without dry-run
  - Ignoring RBAC constraints
  - Not checking resource quotas
verification:
  - Commands validated with --dry-run=client
  - Output parsed and verified
  - No unintended mutations
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.helm-charts (for templated deployments)
  - platform.istio-config (for service mesh issues)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.kubernetes-operator
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - kubectl rollout undo deployment/<name>
validators:
  - skill.validator
---

## Mission
Provide reliable kubectl command patterns for managing Kubernetes workloads, debugging pod issues, and performing cluster operations safely.

## When To Use
- Managing deployments, services, configmaps, secrets
- Debugging pod crashes, CrashLoopBackOff, pending states
- Scaling workloads and performing rollouts
- Inspecting cluster state and resource usage
- Port-forwarding and exec into pods

## When Not To Use
- Helm chart development (use platform.helm-charts)
- Infrastructure provisioning (use platform.terraform-modules)
- Service mesh configuration (use platform.istio-config)

## Procedure
1. **Verify Context**: Run `kubectl config current-context` and confirm the target cluster and namespace
2. **Inspect Resources**: Use `kubectl get <resource> -n <ns> -o wide` for overview, `kubectl describe` for detail
3. **Diagnose Issues**: Check pod status, events, logs (`kubectl logs -f`), and previous container logs (`--previous`)
4. **Apply Changes Safely**: Always use `--dry-run=client -o yaml` before applying mutations
5. **Scale and Rollout**: Use `kubectl scale` for immediate scaling, `kubectl rollout` for deployment management
6. **Verify Outcome**: Re-inspect resources and confirm desired state is reached
7. **Document Commands**: Record successful command sequences for runbooks

## Tool Policy
- Prefer read-only commands first; mutate only after verification
- Always specify namespace explicitly to avoid default-namespace accidents
- Use `-o jsonpath` or `-o yaml` for structured output parsing

## Verification
- `kubectl get <resource>` confirms desired state
- No unexpected events in `kubectl get events --sort-by=.lastTimestamp`
- Pod readiness probes passing

## Failure Modes
- Operating on wrong context (production vs staging)
- Running mutating commands without dry-run
- Ignoring pod disruption budgets during scaling
- Not checking resource quotas before creating workloads

## Example Routes
- "debug CrashLoopBackOff on deployment/api-server" → logs + describe + events analysis
- "scale deployment to 5 replicas" → kubectl scale with verification
- "port-forward to database pod" → kubectl port-forward with connection test

## Source Notes
Patterns derived from official Kubernetes documentation and production cluster operations runbooks. Referenced dossier: ref.github.platform.2026-05-31.
