---
id: platform.istio-config
name: Istio Configuration Patterns
version: 1.0.0
domain: platform
category: platform.service-mesh
description: Configure and manage Istio service mesh for traffic management, security, and observability.
triggers:
  - Istio configuration patterns
  - service mesh setup
  - Istio traffic management
  - Istio mTLS configuration
  - Istio virtual service routing
  - service mesh observability
aliases:
  - istio mesh
  - sidecar config
  - traffic splitting
negative_keywords:
  - linkerd
  - consul connect
  - raw kubernetes networking
  - ingress without mesh
inputs:
  - mesh_topology
  - traffic_policies
  - security_requirements
  - observability_goals
outputs:
  - virtual_services
  - destination_rules
  - gateway_configs
  - peer_authentications
allowed_tools:
  - shell.readonly (istioctl analyze, kubectl get)
  - shell.write (kubectl apply for Istio CRDs)
  - filesystem.read (Istio configs)
  - filesystem.write (Istio configs)
required_skills:
  - platform.kubectl-commands
budget_band: standard
max_context_tokens: 8192
failure_modes:
  - Conflicting virtual services
  - mTLS breaking non-mesh workloads
  - Sidecar injection failures
  - Gateway misconfiguration
verification:
  - istioctl analyze reports no issues
  - Traffic routing verified with test requests
  - mTLS enabled between mesh services
  - Envoy sidecars healthy
source_references:
  - ref.github.platform.2026-05-31
quality_gate: staging
handoffs:
  - platform.kubectl-commands (for underlying K8s operations)
  - platform.prometheus-alerts (for mesh metrics alerting)
source_refs:
  - ref.github.platform.2026-05-31
allowed_agents:
  - platform.kubernetes-operator
  - platform.devops-engineer
allowed_workflows: []
status: active
rollback:
  - kubectl delete -f istio-configs/
  - istioctl x uninstall
validators:
  - skill.validator
---

## Mission
Provide patterns for configuring Istio service mesh for traffic management, mutual TLS, and service observability.

## When To Use
- Setting up service mesh traffic management
- Implementing mTLS between services
- Canary deployments with traffic splitting
- Adding observability to service-to-service communication

## When Not To Use
- Simple service-to-service communication (use Kubernetes services)
- Non-Kubernetes environments
- When Linkerd or another mesh is already in use

## Procedure
1. **Verify Mesh Status**: Check Istio installation and sidecar injection with `istioctl proxy-status`
2. **Configure Traffic Routing**: Create VirtualServices for routing rules (canary, mirroring, retries)
3. **Set Destination Rules**: Define traffic policies, connection pools, and outlier detection
4. **Enable mTLS**: Configure PeerAuthentication for strict mTLS between services
5. **Set Up Gateways**: Configure Istio Gateway and VirtualService for external traffic
6. **Validate Configuration**: Run `istioctl analyze` to check for conflicts and errors
7. **Monitor Mesh**: Verify traffic flow, check Envoy stats, and review mesh metrics

## Tool Policy
- Always run `istioctl analyze` before applying configurations
- Use `istioctl proxy-config` to inspect sidecar configuration
- Test traffic routing with small percentage before full cutover

## Verification
- `istioctl analyze` reports no errors or warnings
- Traffic splitting verified with request sampling
- mTLS confirmed via `istioctl authn tls-check`
- Envoy sidecars reporting healthy status

## Failure Modes
- Conflicting VirtualServices causing routing ambiguity
- mTLS strict mode breaking communication with non-mesh services
- Sidecar injection not enabled on namespace
- Gateway selector not matching any ingress gateway

## Example Routes
- "canary deployment with Istio" → VirtualService with traffic weights
- "enable mTLS for namespace" → PeerAuthentication policy
- "debug 503 errors in mesh" → Envoy logs + outlier detection config

## Source Notes
Based on Istio official documentation and production service mesh patterns. Referenced dossier: ref.github.platform.2026-05-31.
