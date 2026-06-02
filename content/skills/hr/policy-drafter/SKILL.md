---
id: hr.policy-drafter
name: policy-drafter
version: 1.0.0
domain: hr
category: hr.policy-drafter
purpose: Drafts HR policies with review gates.
summary: Drafts HR policies with review gates.
triggers:
  - hr policy draft
  - policy drafter task
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
  - ref.github.hr.policy-drafter.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
