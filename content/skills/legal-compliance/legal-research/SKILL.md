---
id: legal-compliance.legal-research
name: Legal Research
version: 1.0.0
domain: legal-compliance
category: legal-compliance.legal-research
purpose: Conduct structured legal research across case law, statutes, and regulations with proper citation methodology.
summary: Legal research methodology, case law analysis, statutory interpretation, and citation management.
triggers:
  - research case law
  - find relevant statutes
  - legal precedent search
  - regulatory research
  - jurisdictional comparison
aliases:
  - legal research
  - law research
negative_keywords:
  - web scraping
  - market research
  - user research
inputs:
  - research_question
  - jurisdiction
  - source_types
outputs:
  - research_findings
  - citation_list
  - jurisdiction_analysis
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
Conduct structured legal research across case law, statutes, and regulations with proper citation methodology.

## When To Use
- research case law
- find relevant statutes
- legal precedent search
- regulatory research

## When Not To Use
- web scraping belongs to a different domain
- market research belongs to a different domain
- user research belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: research_question, jurisdiction, source_types.
3. Produce the core outputs: research_findings, citation_list, jurisdiction_analysis.
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
- "research case law"
- "find relevant statutes"
- "legal precedent search"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31
