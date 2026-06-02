---
id: manufacturing.kaizen
name: Kaizen
version: 1.0.0
domain: manufacturing
category: manufacturing.operations
purpose: Facilitate kaizen events and continuous improvement activities to drive incremental operational improvements.
summary: Kaizen covering event planning, rapid improvement cycles, 5S workplace organization, and standard work documentation.
triggers:
  - kaizen event planning
  - rapid improvement workshop
  - 5S implementation
  - standard work documentation
  - continuous improvement review
aliases:
  - kaizen
  - continuous improvement
  - rapid improvement
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - improvement_opportunity
  - current_process_data
  - team_availability
outputs:
  - kaizen_event_plan
  - improvement_results
  - standard_work_documentation
  - follow_up_actions
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Kaizen event without clear scope and metrics
  - Improvements not documented as standard work
  - Missing follow-up and sustainability plan
verification:
  - Event scope and metrics defined
  - Before/after metrics compared
  - Standard work updated
  - Follow-up actions assigned with dates
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous standard work if kaizen changes cause quality issues
validators:
  - skill.validator
---

## Mission
Facilitate kaizen events and continuous improvement activities to drive incremental operational improvements.

## When To Use
- When planning kaizen events or blitzes
- During 5S workplace organization initiatives
- When documenting standard work after improvements
- For continuous improvement program reviews

## When Not To Use
- For large-scale transformation (use lean-manufacturing skill)
- For statistical analysis (use six-sigma skill)
- For capital projects (use industrial engineering agent)

## Procedure
1. **Plan Kaizen Event**:
   - Define scope, objectives, and success metrics
   - Select cross-functional team members
   - Prepare current state data and baseline metrics
   - Schedule event (typically 3-5 days)

2. **Execute Rapid Improvement**:
   - Observe current process (gemba walk)
   - Identify root causes and improvement ideas
   - Implement quick wins immediately
   - Test and validate improvements

3. **Document Standard Work**:
   - Update work instructions with new methods
   - Create visual management aids
   - Document new cycle times and WIP limits
   - Train all affected operators

4. **Measure Results**:
   - Compare before/after metrics
   - Quantify improvements in time, quality, or cost
   - Document lessons learned

5. **Sustain and Follow Up**:
   - Assign follow-up actions with owners and dates
   - Schedule 30/60/90 day reviews
   - Update improvement tracking system

## Tool Policy
- Use `filesystem.read` to review process data, work instructions, and improvement logs
- Use `filesystem.write` to produce event plans and standard work documentation

## Verification
- Event scope and success metrics clearly defined
- Before/after metrics compared and documented
- Standard work updated for all affected processes
- Follow-up actions assigned with owners and dates

## Failure Modes
- Event without clear scope or measurable objectives
- Improvements not captured in standard work
- No follow-up plan for sustainability
- Team not cross-functional

## Example Routes
- Plan kaizen event for changeover reduction
- 5S implementation for tool room
- Standard work documentation for assembly cell

## Source Notes
- Imai, Kaizen: The Key to Japan's Competitive Success
- Reference: ref.github.manufacturing.2026-05-31
