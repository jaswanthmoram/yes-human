---
quality_gate: production
id: engineering.typescript-patterns
name: TypeScript Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review TypeScript code for type safety, idiom correctness, and common anti-patterns.
summary: TypeScript Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - typescript review
  - ts code review
  - review typescript
  - typescript code audit
  - ts file review
activation_triggers:
  - how do I typescript review
  - help me with ts code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check strict mode is enabled (strict: true in tsconfig.json) — non-negotiable baseline
  - Review any/unknown usage — any is a type escape hatch that defeats TypeScript; use unknown with type guards
  - Check for non-null assertion operator (!) overuse — should be documented with a comment why it's safe
  - Review generic constraints — ensure T extends SomeInterface when the type must satisfy requirements
  - Check discriminated unions for exhaustiveness — switch statements on union types should have a default that asserts never
  - Verify import types (import type {Foo}) are used for type-only imports to avoid runtime overhead
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
  - Approving any casts without requiring justification
  - Missing exhaustiveness checks on discriminated unions
  - Accepting ! without documentation
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/microsoft/TypeScript
  - https://github.com/total-typescript/ts-reset
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - No writes — read-only review
validators:
  - skill.validator
---

## Trigger
Use this skill for tasks related to: typescript review, ts code review, review typescript.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Check strict mode is enabled (strict: true in tsconfig.json) — non-negotiable baseline

### 2. Step
Review any/unknown usage — any is a type escape hatch that defeats TypeScript; use unknown with type guards

### 3. Step
Check for non-null assertion operator (!) overuse — should be documented with a comment why it's safe

### 4. Step
Review generic constraints — ensure T extends SomeInterface when the type must satisfy requirements

### 5. Step
Check discriminated unions for exhaustiveness — switch statements on union types should have a default that asserts never

### 6. Step
Verify import types (import type {Foo}) are used for type-only imports to avoid runtime overhead

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
No writes — read-only review

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Approving any casts without requiring justification | See procedure | Address in review |
| Missing exhaustiveness checks on discriminated unions | See procedure | Address in review |
| Accepting ! without documentation | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'typescript review'.
**Example B:** Apply this skill when facing 'review typescript' in a complex codebase.
