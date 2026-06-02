---
id: manufacturing.production-planning
name: Production Planning
version: 1.0.0
domain: manufacturing
category: manufacturing.production
purpose: Plan and optimize production schedules, batch sizes, and resource allocation to meet demand targets.
summary: Production planning covering scheduling, batch optimization, resource allocation, and capacity-constrained planning.
triggers:
  - create production plan
  - optimize production schedule
  - plan batch sizes
  - resource allocation for production
  - production capacity review
aliases:
  - production planning
  - production scheduling
negative_keywords:
  - financial forecast
  - code review
  - contract review
inputs:
  - demand_forecast
  - capacity_data
  - material_availability
  - production_constraints
outputs:
  - production_schedule
  - resource_allocation_plan
  - capacity_utilization_report
  - risk_assessment
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Scheduling without capacity validation
  - Ignoring material availability constraints
  - Not accounting for changeover times
verification:
  - Schedule validated against capacity
  - Material availability confirmed
  - Changeover times included
  - Risk scenarios documented
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous production schedule if plan causes capacity violations
validators:
  - skill.validator
---

## Mission
Plan and optimize production schedules, batch sizes, and resource allocation to meet demand targets within capacity and material constraints.

## When To Use
- When creating or updating production schedules
- During capacity planning for new product introductions
- When optimizing batch sizes for efficiency
- Before committing to customer delivery dates

## When Not To Use
- For demand forecasting (use demand planning)
- For inventory policy design (use inventory optimization)
- For financial budgeting (use finance tools)

## Procedure
1. **Validate Demand Input**:
   - Confirm demand forecast by product family and period
   - Check forecast confidence levels and uncertainty bands
   - Identify peak demand periods and seasonality

2. **Assess Capacity**:
   - Map available capacity by work center and shift
   - Identify bottlenecks and constrained resources
   - Calculate effective capacity after planned downtime

3. **Build Production Schedule**:
   - Sequence orders by priority and due date
   - Optimize batch sizes considering changeover costs
   - Balance level-loading against demand variability

4. **Validate Material Availability**:
   - Cross-reference BOM with inventory and purchase orders
   - Flag material shortages or lead time risks
   - Identify substitute materials where applicable

5. **Generate Risk Assessment**:
   - Document capacity and material risks
   - Create contingency scenarios for demand shifts
   - Identify single points of failure

## Tool Policy
- Use `filesystem.read` to review demand forecasts, capacity data, and material reports
- Use `filesystem.write` to produce production schedules and capacity reports

## Verification
- Production schedule validated against available capacity
- Material availability confirmed for all scheduled items
- Changeover and setup times included in schedule
- Risk scenarios documented with mitigation actions

## Failure Modes
- Scheduling production beyond validated capacity
- Ignoring material lead times and availability
- Not accounting for changeover and setup times
- Missing risk scenarios for demand variability

## Example Routes
- Create master production schedule for Q3
- Optimize batch sizes for packaging line
- Capacity analysis for new product introduction

## Source Notes
- APICS CPIM Body of Knowledge
- Reference: ref.github.manufacturing.2026-05-31
