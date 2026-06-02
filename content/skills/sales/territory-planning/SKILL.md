---
id: sales.territory-planning
name: Territory Planning Framework
version: 1.0.0
domain: sales
category: sales.operations
purpose: Design territory assignments and coverage models that maximize market penetration and rep productivity.
summary: Territory design, account tiering, coverage models, and capacity planning for sales territory optimization.
triggers:
  - create coverage model for SMB segment
  - territory plan design
  - territory assignment review
  - coverage model creation
  - territory capacity planning
  - account tiering design
  - territory realignment
aliases:
  - territory planning
  - territory design
  - territory optimization
negative_keywords:
  - marketing campaign targeting
  - HR headcount planning
  - logistics routing
inputs:
  - market_data
  - account_list
  - rep_capacity
outputs:
  - territory_plan
  - coverage_model
  - capacity_analysis
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs territory without capacity analysis
  - Tiers accounts without data-driven criteria
  - Skips coverage model trade-offs
verification:
  - Capacity analysis included
  - Account tiering criteria defined
  - Coverage trade-offs stated
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
Design territory assignments and coverage models that maximize market penetration and rep productivity.

## When To Use
- Designing territory plans for new or expanding sales teams
- Reviewing territory assignments for balance and coverage
- Creating coverage models for different market segments
- Planning territory realignment due to growth or reorg

## When Not To Use
- Marketing campaign targeting belongs to marketing
- HR headcount planning belongs to hr
- Logistics routing belongs to operations

## Procedure
1. Analyze market data and account potential by geography or segment.
2. Tier accounts using data-driven criteria (revenue potential, strategic value).
3. Assess rep capacity against account volume and complexity.
4. Design coverage model with appropriate touchpoints per tier.
5. Assign territories balancing workload and opportunity.
6. Define metrics for territory performance tracking.

## Tool Policy
- Use `filesystem.read` to access market data and account lists.
- Use `filesystem.write` to save territory plans and coverage models.

## Verification
- Capacity analysis shows rep-to-account ratio
- Account tiering uses explicit, data-driven criteria
- Coverage model trade-offs documented

## Failure Modes
- Assigning territories without capacity analysis
- Tiering accounts based on relationships rather than data
- Not documenting coverage model trade-offs

## Example Routes
- "design territory plan for West Coast enterprise team"
- "review territory assignments for balance issues"
- "create coverage model for SMB segment"

## Source Notes
- Territory design frameworks from sales operations best practices
- Reference: ref.github.sales.2026-05-31
