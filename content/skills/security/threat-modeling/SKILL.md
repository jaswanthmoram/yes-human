---
id: security.threat-modeling
name: Threat Modeling Techniques
version: 1.0.0
domain: security
category: security.design-review
purpose: Apply structured threat modeling methodologies to identify security threats and design mitigations.
summary: Systematic threat modeling using STRIDE, PASTA, and attack trees to identify threats and design security controls.
triggers:
  - perform STRIDE threat modeling on new service
  - perform threat modeling on application
  - identify security threats using STRIDE
  - create attack tree for system
  - PASTA threat analysis
  - design security mitigations for architecture
  - threat model review for new feature
  - LINDDUN privacy threat model
aliases:
  - threat model
  - STRIDE analysis
  - attack tree
negative_keywords:
  - penetration testing
  - vulnerability scanning
  - code review
inputs:
  - architecture_diagram
  - data_flow_diagram
  - asset_inventory
  - trust_boundaries
outputs:
  - threat_catalog
  - risk_ratings
  - mitigation_plan
  - updated_data_flows
allowed_tools:
  - filesystem.read
  - filesystem.write
  - web.search
required_skills: []
budget_band: standard
max_context_tokens: 14000
failure_modes:
  - Incomplete system decomposition
  - Missing trust boundary identification
  - Threats identified without mitigations
  - Not considering insider threats
verification:
  - All trust boundaries identified and documented
  - Each threat has STRIDE category, risk rating, and mitigation
  - Mitigations mapped to existing or new controls
  - Threat model reviewed by second party
source_references:
  - ref.github.security.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Apply structured threat modeling methodologies (STRIDE, PASTA, attack trees, LINDDUN) to systematically identify security threats in system designs and produce actionable mitigation plans.

## When To Use
- During design phase of new features or systems
- Before implementing authentication or authorization changes
- When integrating with external services or APIs
- During architecture review boards
- After a security incident to identify missed threats
- When processing sensitive data in new ways

## When Not To Use
- For simple UI-only changes with no data flow changes
- When a full penetration test is needed (use dast-testing)
- For reviewing existing code vulnerabilities (use owasp-top-10 or sast-analysis)
- When the architecture is already frozen and changes are not possible

## Procedure
1. **Decompose the System**:
   - Create or update data flow diagrams (DFDs)
   - Identify all components, data stores, external entities
   - Map trust boundaries between components
   - Document data sensitivity classifications

2. **Apply STRIDE Methodology**:
   - **Spoofing**: Can an attacker impersonate a user or system?
   - **Tampering**: Can data be modified in transit or at rest?
   - **Repudiation**: Can actions be denied due to lack of logging?
   - **Information Disclosure**: Can sensitive data leak?
   - **Denial of Service**: Can the system be overwhelmed?
   - **Elevation of Privilege**: Can access controls be bypassed?

3. **Build Attack Trees**:
   - Define attacker goals (e.g., "steal user data")
   - Enumerate attack paths to each goal
   - Assess feasibility and impact of each path
   - Identify the lowest-cost attack paths

4. **Assess Privacy Threats (LINDDUN)**:
   - Linkability, Identifiability, Non-repudiation
   - Detectability, Disclosure of information
   - Unawareness, Non-compliance

5. **Rate Threats**:
   - Use DREAD or custom risk scoring
   - Consider likelihood (ease of exploitation, attacker skill)
   - Consider impact (data sensitivity, business impact)

6. **Design Mitigations**:
   - Map each threat to existing controls
   - Identify gaps where new controls are needed
   - Prioritize mitigations by risk reduction
   - Document residual risk acceptance

7. **Validate and Review**:
   - Cross-reference with OWASP Top 10
   - Review with development and security teams
   - Update threat model as architecture evolves

## Tool Policy
- Use `filesystem.read` to review architecture documents and design specs
- Use `web.search` for threat intelligence and attack pattern references
- Use `filesystem.write` to produce threat model documents and diagrams

## Verification
- All system components and trust boundaries documented
- Each STRIDE category assessed for every trust boundary
- Attack trees created for top 3 attacker goals
- Every threat has a risk rating and mitigation (or accepted risk)
- Threat model reviewed by at least one other team member

## Failure Modes
- Incomplete system decomposition missing key components
- Focusing only on external threats, ignoring insider threats
- Identifying threats without actionable mitigations
- Not updating threat model after architecture changes
- Over-engineering mitigations for low-risk threats

## Example Routes
- New payment processing service - model data flow through payment gateway
- User-facing API with OAuth - model token theft and replay attacks
- Microservice architecture - model inter-service authentication failures
- File upload feature - model malicious file execution paths

## Source Notes
- Microsoft STRIDE methodology
- OWASP Threat Modeling guide
- PASTA (Process for Attack Simulation and Threat Analysis)
- Reference: ref.github.security.2026-05-31
