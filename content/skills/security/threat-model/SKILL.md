---
id: security.threat-model
name: STRIDE/DREAD Threat Modeling
version: 1.0.0
domain: security
category: security.threat-modeling
purpose: Perform systematic threat modeling using STRIDE and DREAD frameworks to identify and prioritize security threats.
summary: Guides through identifying threats, vulnerabilities, and attack vectors using industry-standard threat modeling methodologies.
triggers:
  - identify security threats using STRIDE
  - threat model
  - threat modeling
  - identify security threats
  - STRIDE analysis
  - DREAD scoring
activation_triggers:
  - model threats
  - security threats
  - attack vectors
prerequisites:
  - system architecture documentation
  - data flow diagrams
inputs:
  - system_architecture
  - data_flows
  - trust_boundaries
  - assets_to_protect
steps:
  - Decompose the system into components and data flows
  - Identify trust boundaries and entry/exit points
  - Apply STRIDE framework to identify threats
  - Score threats using DREAD methodology
  - Prioritize threats by risk level
  - Document mitigation strategies
outputs:
  - threat_list (categorized by STRIDE)
  - dread_scores
  - prioritized_threats
  - mitigation_recommendations
tools:
  - filesystem.read (architecture docs)
  - filesystem.write (threat model document)
quality_gates:
  - All STRIDE categories analyzed
  - All threats scored with DREAD
  - Mitigation strategies documented
failure_modes:
  - Missing trust boundaries
  - Incomplete STRIDE analysis
  - Not prioritizing threats
  - Vague mitigation strategies
handoffs:
  - security.security-reviewer (for implementation review)
  - security.auth-review (for auth-related threats)
source_references:
  - ref.github.owasp-threat-modeling.2026-06-01
allowed_agents:
  - security.threat-modeler
  - security.security-reviewer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when performing threat modeling, identifying security threats, or analyzing attack vectors for a system.

## Prerequisites
- System architecture documentation
- Data flow diagrams
- Understanding of trust boundaries

## Steps
1. **Decompose the System**:
   - Identify all components (services, databases, APIs)
   - Map data flows between components
   - Document external dependencies
2. **Identify Trust Boundaries**:
   - Mark where data crosses trust levels (public to private, user to system)
   - Identify authentication and authorization points
   - Note entry and exit points
3. **Apply STRIDE Framework**:
   - **S**poofing: Can identity be faked?
   - **T**ampering: Can data be modified?
   - **R**epudiation: Can actions be denied?
   - **I**nformation Disclosure: Can data be exposed?
   - **D**enial of Service: Can service be disrupted?
   - **E**levation of Privilege: Can permissions be escalated?
4. **Score with DREAD**:
   - **D**amage: How bad is the attack? (1-10)
   - **R**eproducibility: How easy to reproduce? (1-10)
   - **E**xploitability: How easy to exploit? (1-10)
   - **A**ffected users: How many users affected? (1-10)
   - **D**iscoverability: How easy to discover? (1-10)
   - Total score = sum of all (max 50)
5. **Prioritize Threats**:
   - Critical: DREAD score 40-50
   - High: DREAD score 30-39
   - Medium: DREAD score 20-29
   - Low: DREAD score 10-19
6. **Document Mitigations**:
   - Specific controls for each threat
   - Implementation priority
   - Responsible team/person

## Verification
- All STRIDE categories covered
- All threats have DREAD scores
- Mitigations are specific and actionable
- Peer review completed

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Missing trust boundaries in complex systems
- Not considering all STRIDE categories
- Overlooking insider threats
- Vague mitigation strategies ("add security")
- Not updating threat model after architecture changes

## Examples
### Threat Model for Web API
Input: REST API with user authentication
Output:
- Spoofing: JWT token theft (DREAD: 35) → Use short-lived tokens, refresh tokens
- Tampering: Request body modification (DREAD: 28) → Validate all inputs, use HTTPS
- Information Disclosure: Error messages leak stack traces (DREAD: 32) → Generic error messages
- Elevation of Privilege: IDOR vulnerability (DREAD: 42) → Authorization checks on all endpoints

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
