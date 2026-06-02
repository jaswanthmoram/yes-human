---
id: manufacturing.preventive-maintenance
name: Preventive Maintenance
version: 1.0.0
domain: manufacturing
category: manufacturing.maintenance
purpose: Design and optimize preventive maintenance schedules based on failure data, usage patterns, and manufacturer recommendations.
summary: Preventive maintenance covering PM schedule design, task selection, interval optimization, and resource planning.
triggers:
  - design preventive maintenance schedule
  - optimize PM intervals
  - PM task selection
  - maintenance resource planning
  - equipment PM review
aliases:
  - preventive maintenance
  - PM planning
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - equipment_data
  - failure_history
  - usage_patterns
  - manufacturer_recommendations
outputs:
  - pm_schedule
  - task_list
  - interval_optimization_report
  - resource_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - PM schedule without failure data analysis
  - Intervals not optimized for actual usage
  - Missing resource and spare parts planning
verification:
  - Failure modes mapped to PM tasks
  - Intervals based on data, not just calendar
  - Resource requirements documented
  - Spare parts list included
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous PM schedule if new intervals cause increased failures
validators:
  - skill.validator
---

## Mission
Design and optimize preventive maintenance schedules based on failure data, usage patterns, and manufacturer recommendations.

## When To Use
- When creating PM schedules for new equipment
- During PM interval optimization reviews
- When planning maintenance resources and spare parts
- For PM program effectiveness assessments

## When Not To Use
- For predictive maintenance (use predictive-maintenance skill)
- For breakdown maintenance (use maintenance engineering agent)
- For equipment replacement decisions (use industrial engineering agent)

## Procedure
1. **Analyze Failure Data**:
   - Review failure history and MTBF data
   - Identify dominant failure modes by equipment
   - Classify failures by P-F interval

2. **Select PM Tasks**:
   - Match tasks to failure modes (inspection, replacement, overhaul)
   - Eliminate tasks that don't prevent or detect failures
   - Prioritize safety-critical PM tasks

3. **Optimize Intervals**:
   - Base intervals on failure data and usage patterns
   - Adjust for operating environment and duty cycle
   - Balance PM cost against failure cost

4. **Plan Resources**:
   - Estimate labor hours by skill type
   - List required spare parts and tools
   - Schedule PM windows around production

5. **Document and Validate**:
   - Create PM task sheets with step-by-step instructions
   - Validate against manufacturer recommendations
   - Obtain maintenance manager approval

## Tool Policy
- Use `filesystem.read` to review equipment data, failure history, and usage logs
- Use `filesystem.write` to produce PM schedules and resource plans

## Verification
- All dominant failure modes have corresponding PM tasks
- Intervals based on failure data and usage patterns
- Resource requirements (labor, parts, tools) documented
- PM windows coordinated with production schedule

## Failure Modes
- PM tasks not linked to actual failure modes
- Calendar-based intervals ignoring usage variation
- Missing spare parts causing PM delays
- PM schedule conflicting with production

## Example Routes
- Design PM schedule for CNC machining center
- Optimize PM intervals for conveyor system
- Resource plan for annual shutdown maintenance

## Source Notes
- Moubray, Reliability-Centered Maintenance
- Smith & Hinchcliffe, RCM: Gateway to World Class Maintenance
- Reference: ref.github.manufacturing.2026-05-31
