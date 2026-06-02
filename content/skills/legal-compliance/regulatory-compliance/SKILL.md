---
id: legal-compliance.regulatory-compliance
name: Regulatory Compliance
version: 1.0.0
domain: legal-compliance
category: legal-compliance.regulatory-compliance
purpose: Map business operations to regulatory requirements and identify compliance gaps across frameworks.
summary: Regulatory requirement mapping, compliance gap identification, and remediation planning.
triggers:
  - map regulatory requirements
  - compliance gap analysis
  - regulatory obligation review
  - framework compliance check
  - regulatory change impact
aliases:
  - regulatory compliance
  - compliance mapping
negative_keywords:
  - code compliance
  - accessibility compliance
  - build compliance
inputs:
  - regulatory_framework
  - operational_scope
  - current_controls
outputs:
  - requirement_map
  - gap_analysis
  - remediation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Performs analysis without naming scope or jurisdiction
  - Presents findings as definitive legal conclusions
  - Omits attorney-review or compliance-owner handoff
verification:
  - Scope and jurisdiction named in output
  - Findings include severity or applicability ratings
  - Attorney-review or compliance-owner handoff included
source_references:
  - ref.github.legal-compliance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Map business operations to regulatory requirements and identify compliance gaps across frameworks.

## When To Use
- map regulatory requirements
- compliance gap analysis
- regulatory obligation review
- framework compliance check

## When Not To Use
- code compliance belongs to a different domain
- accessibility compliance belongs to a different domain
- build compliance belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: regulatory_framework, operational_scope, current_controls.
3. Produce the core outputs: requirement_map, gap_analysis, remediation_plan.
4. Name the jurisdiction and scope explicitly.
5. Separate findings from recommended next steps.
6. End with attorney-review or compliance-owner handoff.

## Tool Policy
- Use `filesystem.read` to access documents and reference materials.
- Use `filesystem.write` to save analysis outputs and reports.

## Verification
- Scope and jurisdiction named in every output
- Findings include severity or applicability ratings
- Attorney-review or compliance-owner handoff included

## Failure Modes
- Performing analysis without naming scope or jurisdiction
- Presenting findings as definitive legal conclusions
- Omitting attorney-review or compliance-owner handoff

## Example Routes
- "map regulatory requirements"
- "compliance gap analysis"
- "regulatory obligation review"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
