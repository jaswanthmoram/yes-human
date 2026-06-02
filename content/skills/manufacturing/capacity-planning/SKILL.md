---
id: manufacturing.capacity-planning
name: Capacity Planning
version: 1.0.0
domain: manufacturing
category: manufacturing.production
purpose: Analyze and plan manufacturing capacity to meet current and future demand with appropriate utilization targets.
summary: Capacity planning covering rough-cut capacity, detailed capacity analysis, expansion planning, and utilization optimization.
triggers:
  - capacity planning analysis
  - rough cut capacity check
  - capacity expansion review
  - utilization optimization
  - bottleneck capacity analysis
aliases:
  - capacity planning
  - capacity analysis
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - demand_forecast
  - capacity_data
  - equipment_utilization
  - expansion_options
outputs:
  - capacity_analysis
  - utilization_report
  - expansion_recommendations
  - bottleneck_identification
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Capacity analysis without demand scenarios
  - Utilization targets not validated
  - Missing bottleneck identification
verification:
  - Demand scenarios defined (base, high, low)
  - Capacity measured at each work center
  - Bottlenecks identified and ranked
  - Expansion options evaluated with ROI
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert capacity plan if expansion assumptions prove invalid
validators:
  - skill.validator
---

## Mission
Analyze and plan manufacturing capacity to meet current and future demand with appropriate utilization targets.

## When To Use
- When evaluating capacity for new product introductions
- During annual or quarterly capacity planning
- For capital expansion justification
- When identifying and addressing bottlenecks

## When Not To Use
- For detailed production scheduling (use production-scheduling skill)
- For demand forecasting (use production-planning skill)
- For facility layout design (use industrial engineering agent)

## Procedure
1. **Define Demand Scenarios**:
   - Establish base, high, and low demand scenarios
   - Include seasonality and growth projections
   - Quantify uncertainty for each scenario

2. **Measure Current Capacity**:
   - Calculate rated and effective capacity by work center
   - Account for planned downtime, breaks, and changeovers
   - Measure current utilization rates

3. **Identify Bottlenecks**:
   - Find the constraint (Theory of Constraints)
   - Rank bottlenecks by impact on throughput
   - Calculate capacity gap for each scenario

4. **Evaluate Expansion Options**:
   - Model overtime, additional shifts, outsourcing
   - Evaluate capital equipment additions
   - Calculate ROI and payback for each option

5. **Create Capacity Plan**:
   - Recommend actions by scenario and timeline
   - Include trigger points for capacity decisions
   - Document assumptions and risks

## Tool Policy
- Use `filesystem.read` to review demand forecasts, capacity data, and utilization reports
- Use `filesystem.write` to produce capacity analyses and expansion recommendations

## Verification
- Demand scenarios defined with quantified uncertainty
- Capacity measured at each work center with effective rates
- Bottlenecks identified, ranked, and capacity gaps calculated
- Expansion options evaluated with ROI and trigger points

## Failure Modes
- Capacity analysis based on single demand forecast
- Not accounting for effective vs rated capacity
- Missing bottleneck identification
- Expansion recommendations without trigger points

## Example Routes
- Capacity analysis for new product launch
- Bottleneck identification for assembly line
- Expansion evaluation for paint shop capacity

## Source Notes
- Goldratt, The Goal (Theory of Constraints)
- APICS CPIM Body of Knowledge
- Reference: ref.github.manufacturing.2026-05-31
