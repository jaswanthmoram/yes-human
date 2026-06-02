---
id: sales.contract-review
name: Contract Review for Sales
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Review commercial contract terms from a sales perspective, identifying deal-structure risks and coordinating legal handoff for non-standard terms.
summary: Commercial term review, risk identification, and legal-routing coordination for sales contracts.
triggers:
  - review contract terms for deal
  - commercial terms check
  - contract risk assessment
  - deal terms review
  - non-standard terms flag
  - contract compliance check
aliases:
  - contract review
  - terms review
  - deal terms check
negative_keywords:
  - legal contract drafting
  - litigation review
  - compliance audit
inputs:
  - contract_draft
  - standard_terms
  - deal_context
outputs:
  - term_analysis
  - risk_flags
  - legal_routing_recommendation
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Reviews terms without comparing to standard playbook
  - Fails to flag non-standard terms for legal review
  - Confuses commercial risk with legal risk
verification:
  - Terms compared against standard playbook
  - Non-standard terms flagged with risk level
  - Legal routing recommendation included
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Review commercial contract terms from a sales perspective, identifying deal-structure risks and coordinating legal handoff for non-standard terms.

## When To Use
- Reviewing contract drafts before sending to buyer
- Checking commercial terms against standard playbook
- Identifying non-standard terms that need legal review
- Assessing deal-structure risks for sales leadership

## When Not To Use
- Legal contract drafting belongs to legal-compliance
- Litigation review belongs to legal-compliance
- Compliance audit belongs to legal-compliance

## Procedure
1. Compare contract terms against standard term playbook.
2. Identify non-standard or modified terms.
3. Assess commercial risk of each non-standard term.
4. Flag terms requiring legal review with risk level.
5. Recommend legal routing for non-standard terms.
6. Document assumptions and open questions.

## Tool Policy
- Use `filesystem.read` to access contract drafts and standard term playbooks.
- Use `filesystem.write` to save term analyses and risk flags.

## Verification
- All contract sections compared against standard playbook
- Non-standard terms flagged with risk level (high/medium/low)
- Legal routing recommendation included for flagged terms

## Failure Modes
- Skipping sections assumed to be standard without verification
- Not distinguishing commercial risk from legal risk
- Failing to route non-standard terms to legal

## Example Routes
- "review this contract draft for commercial risks"
- "check these terms against our standard playbook"
- "flag non-standard terms in this enterprise agreement"

## Source Notes
- IACCM contract standards
- Reference: ref.github.sales.2026-05-31
