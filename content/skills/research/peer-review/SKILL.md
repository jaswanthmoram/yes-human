---
id: research.peer-review
name: Peer Review
version: 1.0.0
category: research.quality
summary: Conducts structured peer reviews of manuscripts with methodology assessment, contribution evaluation, and constructive feedback.
triggers:
  - manuscript peer review
  - paper review assessment
  - research quality evaluation
  - reviewer report drafting
  - manuscript critique task
prerequisites:
  - manuscript_received
steps:
  - assess originality and contribution
  - evaluate methodology rigor
  - check statistical analysis validity
  - review literature coverage
  - draft structured reviewer report
outputs:
  - reviewer_report
  - recommendation
  - revision_suggestions
budget_band: standard
rollback:
  - discard review drafts
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a task requires reviewing a research manuscript or paper for quality, rigor, and contribution to the field.

## Prerequisites
- A complete manuscript received for review.
- Familiarity with the subject area and methodological standards.

## Steps
1. Assess the originality and significance of the contribution.
2. Evaluate the rigor and appropriateness of the methodology.
3. Check the validity of statistical analyses and interpretation.
4. Review the completeness and accuracy of literature coverage.
5. Draft a structured reviewer report with specific, constructive feedback.

## Verification
- Review addresses all major manuscript sections.
- Feedback is specific, actionable, and constructive.

## Rollback
- Discard review drafts.

## Common Failures
- Providing vague feedback without specific examples.
- Overlooking methodological flaws due to domain unfamiliarity.
