---
id: finance.budget-creation
name: Budget Creation
version: 1.0.0
domain: finance
category: finance.planning
purpose: Create operating and capital budgets with department-level detail, assumption documentation, and approval workflows.
summary: Budget development with department allocation, assumption tracking, and variance baseline establishment.
triggers:
  - create annual budget
  - department budget build
  - capital budget plan
  - operating budget creation
  - budget allocation review
aliases:
  - budget creation
  - budget build
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - historical_spend
  - strategic_priorities
  - revenue_targets
outputs:
  - budget_document
  - allocation_summary
  - assumption_tracker
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Budgets without assumption documentation
  - Omits department-level detail
  - Ignores strategic priorities
verification:
  - Assumptions documented
  - Department allocations included
  - Strategic alignment noted
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Create operating and capital budgets with department-level detail, assumption documentation, and approval workflows.

## When To Use
- Creating annual budgets
- Building department-level budgets
- Planning capital expenditures

## When Not To Use
- Forecast updates belong to financial-forecasting skill
- Variance analysis belongs to variance-analysis skill
- Tax planning belongs to tax-specialist

## Procedure
1. Gather historical spend data and strategic priorities.
2. Define revenue targets and constraint parameters.
3. Build department-level budget allocations.
4. Document assumptions for each major budget line.
5. Create capital budget with project-level detail.
6. Establish variance baseline for tracking.

## Tool Policy
- Use `filesystem.read` to access historical data and strategic inputs.
- Use `filesystem.write` to save budget documents when requested.

## Verification
- Assumptions documented for major budget lines
- Department allocations included with detail
- Strategic alignment noted for key allocations

## Failure Modes
- Budgeting without assumption documentation
- Omitting department-level detail
- Ignoring strategic priorities

## Example Routes
- "create annual operating budget"
- "department budget build"
- "capital budget plan"

## Source Notes
- Reference: ref.github.finance.2026-05-31
