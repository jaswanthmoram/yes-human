---
id: legal-compliance.nda-reviewer
name: nda-reviewer
version: 1.0.0
domain: legal-compliance
category: legal-compliance.nda-reviewer
purpose: Reviews NDAs; escalate to counsel.
summary: Reviews NDAs; escalate to counsel.
triggers:
  - nda review
  - nda reviewer task
prerequisites:
  - task_context
steps:
  - Execute procedure
outputs:
  - skill_output
budget_band: standard
rollback:
  - revert
validators:
  - outputs_complete
source_references:
  - ref.github.legal-compliance.nda-reviewer.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
