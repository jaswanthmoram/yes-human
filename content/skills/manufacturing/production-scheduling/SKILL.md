---
id: manufacturing.production-scheduling
name: Production Scheduling
version: 1.0.0
domain: manufacturing
category: manufacturing.production
purpose: Create and optimize detailed production schedules considering sequencing, changeovers, and resource constraints.
summary: Production scheduling covering sequencing rules, changeover optimization, finite capacity scheduling, and schedule adherence.
triggers:
  - create production schedule
  - optimize job sequencing
  - changeover optimization
  - finite capacity scheduling
  - schedule adherence review
aliases:
  - production scheduling
  - job scheduling
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - order_book
  - capacity_data
  - changeover_matrix
  - priority_rules
outputs:
  - detailed_schedule
  - sequencing_plan
  - changeover_optimization_report
  - adherence_analysis
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Schedule without finite capacity validation
  - Changeover times not included
  - Priority rules not applied consistently
verification:
  - Schedule validated against finite capacity
  - Changeover times included in sequencing
  - Priority rules applied and documented
  - Schedule adherence metrics tracked
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous schedule if new sequence causes delivery failures
validators:
  - skill.validator
---

## Mission
Create and optimize detailed production schedules considering sequencing, changeovers, and resource constraints.

## When To Use
- When creating detailed weekly or daily production schedules
- During job sequencing optimization
- For changeover time reduction projects
- When reviewing schedule adherence performance

## When Not To Use
- For aggregate production planning (use production-planning skill)
- For demand forecasting (use production-planning skill)
- For long-term capacity planning (use capacity-planning skill)

## Procedure
1. **Load Order Book**:
   - Import open orders with due dates and priorities
   - Validate order completeness and accuracy
   - Apply priority rules (EDD, CR, SPT)

2. **Sequence Jobs**:
   - Apply sequencing rules to minimize changeovers
   - Group similar products for campaign runs
   - Balance due date adherence against efficiency

3. **Validate Finite Capacity**:
   - Check schedule against work center capacity
   - Identify overloaded periods and bottlenecks
   - Adjust schedule to respect capacity constraints

4. **Optimize Changeovers**:
   - Use changeover matrix to minimize setup times
   - Identify opportunities for SMED improvements
   - Sequence to reduce changeover frequency and duration

5. **Track Adherence**:
   - Measure planned vs actual output by period
   - Analyze schedule breaks and their causes
   - Report adherence metrics with trend analysis

## Tool Policy
- Use `filesystem.read` to review order books, capacity data, and changeover matrices
- Use `filesystem.write` to produce schedules and adherence reports

## Verification
- Schedule respects finite capacity at each work center
- Changeover times included and minimized
- Priority rules applied consistently and documented
- Adherence metrics tracked with root cause for breaks

## Failure Modes
- Scheduling beyond finite capacity
- Ignoring changeover times in sequencing
- Inconsistent application of priority rules
- Not tracking schedule adherence

## Example Routes
- Weekly production schedule for packaging line
- Job sequencing optimization for paint shop
- Schedule adherence review for Q2

## Source Notes
- Pinedo, Scheduling: Theory, Algorithms, and Systems
- APICS CPIM Body of Knowledge
- Reference: ref.github.manufacturing.2026-05-31
