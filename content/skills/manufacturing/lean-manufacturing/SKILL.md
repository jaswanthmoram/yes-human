---
id: manufacturing.lean-manufacturing
name: Lean Manufacturing
version: 1.0.0
domain: manufacturing
category: manufacturing.operations
purpose: Apply lean principles to eliminate waste, improve flow, and create pull-based production systems.
summary: Lean manufacturing covering value stream mapping, waste identification, pull systems, and continuous flow design.
triggers:
  - lean assessment
  - value stream mapping
  - waste identification
  - pull system design
  - continuous flow analysis
aliases:
  - lean
  - lean production
  - TPS
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - current_state_data
  - demand_data
  - process_flow_data
outputs:
  - value_stream_map
  - waste_assessment
  - future_state_design
  - implementation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Value stream map without current state validation
  - Waste categories not quantified
  - Future state without implementation roadmap
verification:
  - Current state validated with gemba data
  - All eight wastes assessed and quantified
  - Future state includes measurable targets
  - Implementation plan has phased milestones
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to current state if lean changes disrupt production flow
validators:
  - skill.validator
---

## Mission
Apply lean principles to eliminate waste, improve flow, and create pull-based production systems.

## When To Use
- When conducting lean assessments or transformations
- During value stream mapping exercises
- When designing pull systems or kanban
- For waste reduction initiatives

## When Not To Use
- For statistical analysis (use six-sigma skill)
- For facility layout design (use industrial engineering agent)
- For capital equipment justification (use finance)

## Procedure
1. **Map Current State**:
   - Walk the gemba and document actual process flow
   - Capture cycle times, WIP, and lead times
   - Identify information flow and decision points

2. **Identify Waste (DOWNTIME)**:
   - Defects: rework, scrap, inspection failures
   - Overproduction: building ahead of demand
   - Waiting: idle time between operations
   - Non-utilized talent: skills not leveraged
   - Transportation: unnecessary material movement
   - Inventory: excess WIP or finished goods
   - Motion: unnecessary operator movement
   - Extra-processing: over-engineering or redundant steps

3. **Design Future State**:
   - Establish takt time from customer demand
   - Design continuous flow where possible
   - Implement pull systems at decoupling points
   - Level production (heijunka) to smooth demand

4. **Create Implementation Plan**:
   - Prioritize improvements by impact and feasibility
   - Define kaizen events and rapid improvement cycles
   - Set measurable targets for each improvement

## Tool Policy
- Use `filesystem.read` to review process data, demand records, and flow documentation
- Use `filesystem.write` to produce value stream maps and implementation plans

## Verification
- Current state map validated against actual operations
- All eight DOWNTIME wastes assessed
- Future state includes takt time and flow targets
- Implementation plan has phased milestones with owners

## Failure Modes
- Mapping without gemba validation
- Not quantifying waste in time or cost
- Future state without measurable targets
- Implementation plan missing resource requirements

## Example Routes
- Value stream map for assembly line
- Waste assessment for packaging operation
- Pull system design for component supply

## Source Notes
- Womack & Jones, Lean Thinking
- Rother & Shook, Learning to See
- Reference: ref.github.manufacturing.2026-05-31
