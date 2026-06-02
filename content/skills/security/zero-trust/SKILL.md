---
id: security.zero-trust
name: Zero Trust Architecture Review
version: 1.0.0
domain: security
category: security.architecture
purpose: Review and implement zero trust security principles across network, identity, and access management.
summary: Zero trust architecture review covering identity verification, least privilege, microsegmentation, and continuous validation.
triggers:
  - review zero trust implementation
  - implement zero trust architecture
  - zero trust security audit
  - check identity-based access controls
  - microsegmentation review
  - beyondcorp implementation
  - verify never trust always verify
aliases:
  - zero trust
  - ZTA review
  - beyondcorp
negative_keywords:
  - perimeter security
  - VPN configuration
  - firewall rules only
inputs:
  - network_architecture
  - identity_provider_config
  - access_policies
  - service_mesh_config
outputs:
  - zero_trust_assessment
  - gap_analysis
  - implementation_roadmap
  - policy_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
  - bash.exec
required_skills: []
budget_band: standard
max_context_tokens: 12000
failure_modes:
  - Implicit trust in internal network
  - Missing identity verification for service-to-service
  - Overly broad access policies
  - Not implementing continuous verification
verification:
  - All access decisions based on identity, not network location
  - Least privilege enforced for all users and services
  - Microsegmentation implemented between services
  - Continuous verification of device and user posture
  - All access logged and auditable
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous access policies if zero trust changes disrupt operations
validators:
  - skill.validator
---

## Mission
Review and implement zero trust architecture principles across the organization, ensuring no implicit trust is granted based on network location and all access is continuously verified.

## When To Use
- When designing new system architectures or network layouts
- During migration from perimeter-based to identity-based security
- When implementing service mesh or microservices communication
- Before compliance audits requiring access control evidence
- After security incidents involving lateral movement

## When Not To Use
- For simple perimeter firewall configuration (use network-scanning)
- When only configuring VPN access (different security model)
- For small teams where full zero trust is disproportionate
- When network segmentation is the only goal (use simpler segmentation)

## Procedure
1. **Assess Current Trust Model**:
   - Map current network trust boundaries
   - Identify implicit trust assumptions (internal network = trusted)
   - Document current authentication and authorization mechanisms
   - Identify lateral movement paths in current architecture

2. **Implement Identity as the Perimeter**:
   - Deploy identity provider (IdP) as central trust anchor
   - Implement SSO with MFA for all users
   - Establish device identity and posture assessment
   - Implement service identity for machine-to-machine auth

3. **Enforce Least Privilege Access**:
   - Define access policies based on user/service identity
   - Implement just-in-time access for privileged operations
   - Use attribute-based access control (ABAC) where appropriate
   - Remove standing admin access, use break-glass procedures

4. **Implement Microsegmentation**:
   - Segment network at workload level, not just VLAN level
   - Implement service mesh mTLS for service-to-service auth
   - Define east-west traffic policies
   - Implement workload identity for container/VM communication

5. **Enable Continuous Verification**:
   - Implement device posture checks before access
   - Continuously verify user session validity
   - Monitor for anomalous access patterns
   - Implement risk-based adaptive authentication

6. **Implement Comprehensive Logging**:
   - Log all access decisions (allow and deny)
   - Log authentication events with context
   - Implement real-time monitoring and alerting
   - Enable forensic analysis of access patterns

7. **Create Migration Roadmap**:
   - Prioritize high-value assets for zero trust first
   - Plan phased migration from perimeter model
   - Maintain backward compatibility during transition
   - Measure and report zero trust maturity

## Tool Policy
- Use `filesystem.read` to review access policies and configurations
- Use `bash.exec` to check identity provider and service mesh configs
- Use `web.search` for zero trust frameworks (NIST 800-207, BeyondCorp)
- Use `filesystem.write` to produce assessment and roadmap documents

## Verification
- No implicit trust based on network location
- All access decisions based on verified identity and context
- Microsegmentation prevents unauthorized lateral movement
- Continuous verification of user and device posture
- All access decisions logged and auditable

## Failure Modes
- Maintaining implicit trust for internal network traffic
- Not implementing service-to-service authentication
- Overly broad access policies defeating least privilege
- Missing device posture verification
- Incomplete logging preventing security monitoring

## Example Routes
- Service mesh mTLS configuration between microservices
- Identity-aware proxy setup for internal applications
- Just-in-time access implementation for production systems
- Device trust verification before network access

## Source Notes
- NIST SP 800-207: Zero Trust Architecture
- Google BeyondCorp: https://cloud.google.com/beyondcorp
- CISA Zero Trust Maturity Model
- Reference: ref.github.security.2026-05-31
