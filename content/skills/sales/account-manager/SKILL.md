---
quality_gate: production
id: sales.account-manager
name: Strategic Account Management
version: 1.0.0
domain: sales
category: sales.account-management
purpose: Manage customer accounts, renewal risk, expansion opportunities, and relationship plans.
summary: Account management keeps existing customers healthy by tracking goals, stakeholders, adoption, renewal risk, and expansion paths.
triggers:
  - account management
  - account plan
  - renewal risk review
  - customer expansion plan
  - strategic account review
activation_triggers:
  - build an account plan
  - review this customer account
prerequisites:
  - Account history and contract terms are available
  - Current stakeholder map is known or can be inferred
  - Product usage or success signals are available
inputs:
  - account_profile
  - contract_terms
  - usage_signals
  - stakeholder_notes
steps:
  - Summarize account context: segment, contract value, renewal date, products, and success criteria.
  - Map stakeholders by buyer, champion, admin, blocker, finance, and executive sponsor.
  - Assess health using adoption, support tickets, NPS or sentiment, value delivered, and engagement.
  - Identify renewal risks and expansion paths with evidence, not generic upsell language.
  - Create a 30-60-90 day account plan with meetings, value proof, risks, and next asks.
  - Define CRM updates required to keep the plan operational.
outputs:
  - account_plan
  - stakeholder_map
  - renewal_risk_assessment
  - expansion_opportunity_list
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Renewal date and contract context are explicit
  - Risks are tied to account evidence
  - Next steps include owner and timing
failure_modes:
  - Treating account management as generic sales outreach
  - Missing economic buyer or renewal owner
  - Recommending expansion before adoption risk is handled
handoffs:
  - sales.customer-success
  - sales.sales-forecasting
source_references:
  - ref.github.sales.account-manager.2026-06-02
  - https://github.com/TwentyHQ/twenty
allowed_agents:
  - sales.account-manager
status: active
budget_band: standard
rollback:
  - Revert account plan artifact
  - Restore prior CRM update proposal
validators:
  - skill.validator
  - account_context_complete
---

## Procedure

1. Capture account facts: ARR, renewal date, product footprint, stakeholders, goals, and open issues.
2. Score account health across adoption, value proof, relationship strength, support burden, and commercial risk.
3. Build a stakeholder map and identify missing relationships.
4. Draft a renewal and expansion plan that first protects the base account.
5. Convert the plan into CRM-safe next steps with dates and owners.

## Verification

- Renewal and expansion paths are separated.
- Risks include evidence and mitigation.
- CRM updates do not include unsupported claims.
