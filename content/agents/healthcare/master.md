---
id: healthcare.master
name: Healthcare Master
version: 1.0.0
status: active
category: healthcare
kind: master
summary: Routes clinical-decision-support, EHR-pattern, PHI-compliance, and healthcare-eval tasks; mandatory disclaimers and clinician review.
triggers:
  - review the ehr workflow for medication reconciliation
  - design clinical decision support workflow
  - clinical decision support
  - ehr workflow
  - phi compliance
  - clinical guideline
  - medical reasoning
aliases:
  - healthcare task
  - clinical task
negative_keywords:
  - code review
  - product review
  - financial forecast
inputs:
  - prompt
  - clinical_context
  - guideline_set
outputs:
  - clinical_recommendation
  - guideline_citation
  - reviewer_handoff_packet
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - emits clinical recommendation without a guideline citation
  - allows PHI into the prompt or output
  - claims medical advice instead of decision support
verification:
  - every_recommendation_cites_a_guideline_or_paper
  - phi_redacted_before_processing
  - clinician_review_marker_present
source_references:
  - ref.github.healthcare-master.2026-05-31
quality_gate: staging
requires_disclaimer: true
human_review_gate: true
---
## Mission
Routes clinical-decision-support, EHR-pattern, PHI-compliance, and healthcare-eval tasks; mandatory disclaimers and clinician review.

## Scope
- In scope: tasks matching triggers and domain expectations for `healthcare.master`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: master: OpenAI Agents SDK JS patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: master: OpenAI Agents docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: master: CrewAI patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- every_recommendation_cites_a_guideline_or_paper
- phi_redacted_before_processing
- clinician_review_marker_present

## Failure modes
- emits clinical recommendation without a guideline citation
- allows PHI into the prompt or output
- claims medical advice instead of decision support

## Examples
- Example A: User asks for Healthcare Master help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
