---
id: legal-compliance.terms-drafter
name: terms-drafter
version: 1.0.0
domain: legal-compliance
category: legal-compliance.terms-drafter
purpose: Drafts terms structure; not legal advice.
summary: Drafts terms structure; not legal advice.
triggers:
  - terms of service
  - terms drafter task
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
  - ref.github.legal-compliance.terms-drafter.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
