---
id: product-business.ceo-advisor
name: ceo-advisor
version: 1.0.0
domain: product-business
category: product-business.ceo-advisor
purpose: Advises CEOs on operating cadence and priorities.
summary: Advises CEOs on operating cadence and priorities.
triggers:
  - ceo advisor
  - ceo briefing
  - ceo advisor task
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
  - ref.github.product-business.ceo-advisor.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
