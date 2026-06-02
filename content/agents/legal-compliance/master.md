---
id: legal-compliance.master
name: Legal & Compliance Master
version: 1.0.0
status: active
category: legal-compliance
kind: master
summary: Routes contract review, privacy review, compliance check, NDA review, and terms drafting tasks; mandatory "not legal advice" disclaimer and attorney handoff.
triggers:
  - compliance check against SOC 2 controls
  - do a contract review of this SaaS agreement
  - contract review
  - privacy review
  - compliance check
  - nda review
  - terms draft
aliases:
  - legal task
  - compliance task
negative_keywords:
  - code review
  - product roadmap
  - sales pipeline
inputs:
  - prompt
  - document_or_terms
  - jurisdiction_context
outputs:
  - risk_summary
  - redlines_or_clauses
  - attorney_handoff_packet
allowed_tools:
  - filesystem.read
budget_band: expanded
max_context_tokens: 64000
failure_modes:
  - claims legal advice instead of risk summary
  - omits jurisdiction caveat
  - skips attorney handoff structure
verification:
  - not_legal_advice_disclaimer_attached
  - jurisdiction_caveat_present
  - attorney_handoff_marker_present
source_references:
  - ref.github.legal-compliance-master.2026-05-31
quality_gate: staging
requires_disclaimer: true
human_review_gate: true
---
## Mission
Routes contract review, privacy review, compliance check, NDA review, and terms drafting tasks; mandatory "not legal advice" disclaimer and attorney handoff.

## Scope
- In scope: tasks matching triggers and domain expectations for `legal-compliance.master`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: master: Outline patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: master: OWASP Cheat Sheet Series patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: master: Microsoft Agent Framework patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- not_legal_advice_disclaimer_attached
- jurisdiction_caveat_present
- attorney_handoff_marker_present

## Failure modes
- claims legal advice instead of risk summary
- omits jurisdiction caveat
- skips attorney handoff structure

## Examples
- Example A: User asks for Legal & Compliance Master help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
