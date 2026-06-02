---
id: legal-compliance.legal-writing
name: Legal Writing
version: 1.0.0
domain: legal-compliance
category: legal-compliance.legal-writing
purpose: Draft legal documents with proper structure, citation format, and plain-language clarity for attorney review.
summary: Legal document drafting, citation formatting, and plain-language legal writing.
triggers:
  - draft legal document
  - format legal citations
  - write legal memo
  - legal document structure
  - plain language legal writing
aliases:
  - legal writing
  - legal drafting
negative_keywords:
  - technical writing
  - documentation writing
  - blog writing
inputs:
  - document_type
  - citation_style
  - audience_level
outputs:
  - draft_document
  - citation_index
  - readability_assessment
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
Draft legal documents with proper structure, citation format, and plain-language clarity for attorney review.

## When To Use
- draft legal document
- format legal citations
- write legal memo
- legal document structure

## When Not To Use
- technical writing belongs to a different domain
- documentation writing belongs to a different domain
- blog writing belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: document_type, citation_style, audience_level.
3. Produce the core outputs: draft_document, citation_index, readability_assessment.
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
- "draft legal document"
- "format legal citations"
- "write legal memo"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
