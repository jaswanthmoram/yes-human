---
id: sales.pricing-strategist
name: pricing-strategist
version: 1.0.0
domain: sales
category: sales.pricing-strategist
purpose: Designs deal pricing and packaging.
summary: Designs deal pricing and packaging.
triggers:
  - sales pricing
  - pricing strategist task
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
  - ref.github.sales.pricing-strategist.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
