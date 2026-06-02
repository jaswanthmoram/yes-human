---
id: legal-compliance.legal-citations
name: Legal Citations
version: 1.0.0
domain: legal-compliance
category: legal-compliance.legal-citations
purpose: Format and verify legal citations following Bluebook or jurisdiction-specific citation rules.
summary: Legal citation formatting, Bluebook compliance verification, and citation authority checking.
triggers:
  - format legal citations
  - verify bluebook citations
  - check citation authority
  - citation style conversion
  - legal reference formatting
aliases:
  - legal citations
  - citation formatting
negative_keywords:
  - code citations
  - academic citations
  - bibliography formatting
inputs:
  - citation_list
  - citation_style
  - jurisdiction
outputs:
  - formatted_citations
  - verification_report
  - authority_check
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
Format and verify legal citations following Bluebook or jurisdiction-specific citation rules.

## When To Use
- format legal citations
- verify bluebook citations
- check citation authority
- citation style conversion

## When Not To Use
- code citations belongs to a different domain
- academic citations belongs to a different domain
- bibliography formatting belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: citation_list, citation_style, jurisdiction.
3. Produce the core outputs: formatted_citations, verification_report, authority_check.
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
- "format legal citations"
- "verify bluebook citations"
- "check citation authority"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
