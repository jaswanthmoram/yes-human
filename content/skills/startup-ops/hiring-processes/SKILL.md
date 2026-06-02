---
id: startup-ops.hiring-processes
name: Hiring Process Design
version: 1.0.0
domain: startup-ops
category: startup-ops.people
purpose: Design structured hiring processes with scorecards, interview loops, and candidate evaluation frameworks.
summary: Creates hiring workflows including job descriptions, interview guides, scorecards, and decision frameworks.
triggers:
  - hiring process
  - interview design
  - hiring scorecard
  - recruiting process startup
activation_triggers:
  - hiring process
  - interview design
  - hiring scorecard
  - recruiting process startup
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define role requirements and scorecard
  - Design interview loop structure
  - Create behavioral and technical questions
  - Build evaluation rubrics
  - Set up candidate pipeline tracking
  - Define decision-making process
  - Create onboarding handoff plan
outputs:
  - hiring_process
  - interview_guides
  - scorecards
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Designs process without role scorecard
  - Skips structured evaluation rubrics
  - Confuses culture fit with culture add
handoffs:
  - startup-ops.hr-specialist
  - startup-ops.operations-manager
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when hiring process or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define role requirements and scorecard**: define role requirements and scorecard with evidence and documentation.
2. **Design interview loop structure**: design interview loop structure with evidence and documentation.
3. **Create behavioral and technical questions**: create behavioral and technical questions with evidence and documentation.
4. **Build evaluation rubrics**: build evaluation rubrics with evidence and documentation.
5. **Set up candidate pipeline tracking**: set up candidate pipeline tracking with evidence and documentation.
6. **Define decision-making process**: define decision-making process with evidence and documentation.
7. **Create onboarding handoff plan**: create onboarding handoff plan with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Designs process without role scorecard
- Skips structured evaluation rubrics
- Confuses culture fit with culture add

## Examples
### Hiring Process Design Example
Input: hiring process for a B2B SaaS startup
Output:
- hiring_process with evidence-based entries
- interview_guides with prioritized items
- scorecards with clear next steps