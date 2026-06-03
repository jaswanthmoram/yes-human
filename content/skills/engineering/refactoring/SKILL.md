---
quality_gate: production
id: engineering.refactoring
name: Structured Code Refactoring
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Refactor code for clarity and reduced duplication without changing behavior, verified by the existing test suite.
summary: Structured Code Refactoring skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - refactor this code
  - clean up this module
  - reduce code duplication
  - simplify this function
  - improve code structure
activation_triggers:
  - how do I refactor this code
  - help me with clean up this module
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Run the full test suite and confirm it is green before touching any code
  - Identify the refactoring target and the specific improvement (extract function, eliminate duplication, rename for clarity)
  - Apply the smallest safe transformation first — one change at a time
  - Run tests after each transformation — commit if green, revert if red
  - Repeat until refactoring goal achieved without behavior change
  - Write a PR description explaining what changed and confirming no behavior change
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
  - Changing behavior while claiming to refactor
  - No test run between changes
  - Creating new coupling while reducing local duplication
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/Aider-AI/aider
  - https://github.com/affaan-m/ECC
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - git revert each incremental commit
validators:
  - skill.validator
---

## Trigger
Use this skill for tasks related to: refactor this code, clean up this module, reduce code duplication.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Run the full test suite and confirm it is green before touching any code

### 2. Step
Identify the refactoring target and the specific improvement (extract function, eliminate duplication, rename for clarity)

### 3. Step
Apply the smallest safe transformation first — one change at a time

### 4. Step
Run tests after each transformation — commit if green, revert if red

### 5. Step
Repeat until refactoring goal achieved without behavior change

### 6. Step
Write a PR description explaining what changed and confirming no behavior change

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
git revert each incremental commit

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Changing behavior while claiming to refactor | See procedure | Address in review |
| No test run between changes | See procedure | Address in review |
| Creating new coupling while reducing local duplication | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'refactor this code'.
**Example B:** Apply this skill when facing 'reduce code duplication' in a complex codebase.
