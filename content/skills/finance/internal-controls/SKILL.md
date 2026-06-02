---
id: finance.internal-controls
name: Internal Controls
version: 1.0.0
domain: finance
category: finance.audit
purpose: Design, assess, and test internal financial controls following COSO framework with gap analysis and remediation planning.
summary: Internal control design and assessment using COSO framework with testing protocols and gap remediation.
triggers:
  - internal control design
  - control assessment review
  - SOX control testing
  - control gap analysis
  - remediation planning
aliases:
  - internal controls
  - control assessment
negative_keywords:
  - IT controls
  - code review
  - security controls
inputs:
  - process_documentation
  - control_objectives
  - risk_assessment
outputs:
  - control_design
  - testing_results
  - gap_remediation_plan
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits COSO framework alignment
  - Skips control testing
  - Inadequate remediation planning
verification:
  - COSO components addressed
  - Controls tested
  - Remediation plan complete
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design, assess, and test internal financial controls following COSO framework with gap analysis and remediation planning.

## When To Use
- Designing internal financial controls
- Assessing control effectiveness
- Planning control remediation

## When Not To Use
- IT general controls belong to platform domain
- Security controls belong to security domain
- Legal compliance controls belong to legal-compliance

## Procedure
1. Map processes to COSO framework components.
2. Identify key controls for each process.
3. Design controls with clear objectives and owners.
4. Test control operating effectiveness.
5. Identify control gaps and deficiencies.
6. Develop remediation plan with timelines.

## Tool Policy
- Use `filesystem.read` to access process and control documentation.

## Verification
- COSO components addressed in design
- Controls tested with evidence
- Remediation plan complete with owners and timelines

## Failure Modes
- Omitting COSO framework alignment
- Skipping control testing
- Inadequate remediation planning

## Example Routes
- "design internal controls for revenue cycle"
- "SOX control testing plan"
- "control gap analysis and remediation"

## Source Notes
- Reference: ref.github.finance.2026-05-31
