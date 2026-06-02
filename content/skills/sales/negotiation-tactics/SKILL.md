---
id: sales.negotiation-tactics
name: Negotiation Tactics Framework
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Design negotiation strategies and tactics for commercial discussions that protect value while advancing deal closure.
summary: Negotiation preparation, concession planning, and tactical frameworks for structured commercial negotiations.
triggers:
  - negotiation strategy design
  - concession planning
  - negotiation preparation
  - deal negotiation tactics
  - pricing negotiation framework
  - commercial negotiation guide
aliases:
  - negotiation
  - deal negotiation
  - negotiation tactics
negative_keywords:
  - legal contract negotiation
  - salary negotiation
  - vendor procurement
inputs:
  - deal_context
  - negotiation_objectives
  - concession_limits
outputs:
  - negotiation_plan
  - concession_matrix
  - tactical_playbook
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Plans concessions without defining walk-away point
  - Confuses commercial negotiation with legal negotiation
  - Skips preparation for counterparty tactics
verification:
  - Walk-away point defined
  - Concession limits set
  - Counterparty tactics anticipated
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
Design negotiation strategies and tactics for commercial discussions that protect value while advancing deal closure.

## When To Use
- Preparing for deal negotiations
- Designing concession frameworks for sales teams
- Planning negotiation tactics for specific opportunities
- Training sellers on negotiation techniques

## When Not To Use
- Legal contract negotiation belongs to legal-compliance
- Salary negotiation belong to hr
- Vendor procurement belongs to finance or operations

## Procedure
1. Define negotiation objectives and priorities.
2. Establish walk-away point and concession limits.
3. Anticipate counterparty tactics and prepare responses.
4. Design a concession matrix with trade-off options.
5. Plan the negotiation sequence and timing.
6. Define approval requirements for concessions beyond limits.

## Tool Policy
- Use `filesystem.read` to access deal data and pricing policies.
- Use `filesystem.write` to save negotiation plans and concession matrices.

## Verification
- Walk-away point explicitly defined
- Concession limits set with approval requirements
- Counterparty tactics anticipated with prepared responses

## Failure Modes
- Entering negotiation without defined limits
- Giving concessions without getting value in return
- Not preparing for common counterparty tactics

## Example Routes
- "design negotiation strategy for enterprise deal"
- "create concession matrix for annual contracts"
- "plan negotiation tactics for price-sensitive buyer"

## Source Notes
- Principled Negotiation: Harvard Negotiation Project
- Reference: ref.github.sales.2026-05-31
