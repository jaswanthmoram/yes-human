---
id: research.research-ethics
name: Research Ethics
version: 1.0.0
category: research.governance
summary: Reviews research protocols for ethical compliance including informed consent, data privacy, IRB requirements, and participant protection.
triggers:
  - ethics review assessment
  - IRB protocol review
  - informed consent evaluation
  - participant protection check
  - research ethics compliance
prerequisites:
  - research_protocol_drafted
steps:
  - review protocol against ethical frameworks
  - assess informed consent adequacy
  - evaluate data privacy protections
  - check participant risk and benefit balance
  - document required modifications
outputs:
  - ethics_review_report
  - modification_recommendations
  - compliance_checklist
budget_band: standard
rollback:
  - archive review drafts
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research protocol requires ethical review before data collection or when evaluating compliance with research ethics standards.

## Prerequisites
- A drafted research protocol describing the study design and procedures.
- Knowledge of applicable ethical frameworks (Belmont Report, Declaration of Helsinki).

## Steps
1. Review the protocol against relevant ethical frameworks and regulations.
2. Assess whether informed consent procedures are adequate and understandable.
3. Evaluate data privacy and confidentiality protections.
4. Check the balance of risks and benefits for participants.
5. Document any required modifications before approval.

## Verification
- All ethical review criteria are addressed.
- Required modifications are clearly specified.

## Rollback
- Archive review drafts for audit trail.

## Common Failures
- Overlooking vulnerable population protections.
- Inadequate data anonymization procedures.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
