---
id: sales.account-planning
name: Account Planning Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Build strategic account plans that map stakeholder relationships, expansion opportunities, and risk factors for key accounts.
summary: Account plan structure, stakeholder mapping, expansion opportunity identification, and risk assessment for strategic accounts.
triggers:
  - identify expansion opportunities in key accounts
  - create account plan
  - account strategy design
  - stakeholder relationship mapping
  - expansion opportunity analysis
  - account risk assessment
  - strategic account review
aliases:
  - account planning
  - account strategy
  - key account plan
negative_keywords:
  - marketing account-based marketing
  - customer support plan
  - product roadmap
inputs:
  - account_data
  - relationship_history
  - expansion_signals
outputs:
  - account_plan
  - stakeholder_map
  - expansion_roadmap
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates plan without stakeholder relationship data
  - Identifies expansion without usage or satisfaction evidence
  - Skips risk factors and competitive threats
verification:
  - Stakeholder map with relationship status
  - Expansion opportunities tied to evidence
  - Risk factors and mitigation identified
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
Build strategic account plans that map stakeholder relationships, expansion opportunities, and risk factors for key accounts.

## When To Use
- Creating account plans for strategic or enterprise accounts
- Mapping stakeholder relationships for complex accounts
- Identifying expansion opportunities in existing accounts
- Assessing account risk and competitive threats

## When Not To Use
- Marketing ABM campaigns belong to marketing
- Customer support plans belong to customer success
- Product roadmap planning belongs to product-business

## Procedure
1. Gather account data including revenue, usage, and contract history.
2. Map stakeholder relationships with influence and sentiment.
3. Identify expansion opportunities tied to usage and satisfaction evidence.
4. Assess risk factors including competitive threats and satisfaction gaps.
5. Build an account plan with quarterly objectives and actions.
6. Define metrics for tracking account health and growth.

## Tool Policy
- Use `filesystem.read` to access account data and relationship history.
- Use `filesystem.write` to save account plans and stakeholder maps.

## Verification
- Stakeholder map includes relationship status and influence level
- Expansion opportunities tied to usage or satisfaction evidence
- Risk factors identified with mitigation strategies

## Failure Modes
- Planning without current stakeholder relationship data
- Assuming expansion opportunity without evidence
- Ignoring competitive threats in account plan

## Example Routes
- "create account plan for top enterprise customer"
- "map stakeholder relationships for strategic account"
- "identify expansion opportunities in key accounts"

## Source Notes
- Miller Heiman Strategic Selling, account planning frameworks
- Reference: ref.github.sales.2026-05-31
