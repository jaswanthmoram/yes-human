---
quality_gate: production
id: engineering.implementation-planning
name: Implementation Planning
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Break a feature or task into a structured, sequenced implementation plan before writing any code.
summary: Implementation Planning skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - plan the implementation
  - create implementation plan
  - break down this task
  - task planning
  - implementation strategy
activation_triggers:
  - how do I plan the implementation
  - help me with create implementation plan
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Understand the goal and constraints — clarify acceptance criteria and non-goals
  - Identify the smallest slice that delivers value — the walking skeleton
  - Break into sequential tasks with explicit dependencies
  - Identify risks and unknowns — flag them before coding begins
  - Estimate complexity (S/M/L) per task and identify which to prototype first
  - Document the plan in a PR description or task comment before opening any code files
outputs:
  - completed_output
  - review_or_analysis_report
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Output addresses all required criteria
  - Sources cited where patterns were drawn from
  - No hallucinated APIs or non-existent patterns
failure_modes:
  - Planning without understanding constraints
  - Tasks not sequenced by dependency
  - No risk identification before coding
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/garrytan/gstack
  - https://github.com/eyaltoledano/claude-task-master
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - Plans are documents — no code to revert
validators:
  - skill.validator
---

## Trigger

Use this skill for tasks related to: plan the implementation, create implementation plan, break down this task.

## Prerequisites

- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step

Understand the goal and constraints — clarify acceptance criteria and non-goals

### 2. Step

Identify the smallest slice that delivers value — the walking skeleton

### 3. Step

Break into sequential tasks with explicit dependencies

### 4. Step

Identify risks and unknowns — flag them before coding begins

### 5. Step

Estimate complexity (S/M/L) per task and identify which to prototype first

### 6. Step

Document the plan in a PR description or task comment before opening any code files

## Verification

- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback

Plans are documents — no code to revert

## Common Failures

| Failure                                    | Cause         | Fix               |
| ------------------------------------------ | ------------- | ----------------- |
| Planning without understanding constraints | See procedure | Address in review |
| Tasks not sequenced by dependency          | See procedure | Address in review |
| No risk identification before coding       | See procedure | Address in review |

## Examples

**Example A:** Apply this skill to a typical instance of 'plan the implementation'.
**Example B:** Apply this skill when facing 'break down this task' in a complex codebase.
