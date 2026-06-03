---
quality_gate: production
id: engineering.java-patterns
name: Java Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Java code for modern idioms, thread safety, and common anti-patterns.
summary: Java Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - java review
  - java code review
  - review java
  - java code audit
  - java file review
activation_triggers:
  - how do I java review
  - help me with java code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check for null pointer risks — prefer Optional<T> over returning null; use @NonNull annotations
  - Review thread safety — shared mutable state requires synchronization or concurrent collections
  - Check exception handling — never catch(Exception e) {} silently; always log or rethrow
  - Review stream usage — avoid side effects in stream lambdas; prefer collect() over forEach for transformation
  - Check equals/hashCode contract — if you override equals, you must override hashCode
  - Review resource management — always use try-with-resources for Closeable objects
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
  - Approving null returns without Optional wrapper
  - Missing synchronized on shared state
  - Silent exception swallowing
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/google/error-prone
  - https://github.com/checkstyle/checkstyle
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
Use this skill for tasks related to: java review, java code review, review java.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Check for null pointer risks — prefer Optional<T> over returning null; use @NonNull annotations

### 2. Step
Review thread safety — shared mutable state requires synchronization or concurrent collections

### 3. Step
Check exception handling — never catch(Exception e) {} silently; always log or rethrow

### 4. Step
Review stream usage — avoid side effects in stream lambdas; prefer collect() over forEach for transformation

### 5. Step
Check equals/hashCode contract — if you override equals, you must override hashCode

### 6. Step
Review resource management — always use try-with-resources for Closeable objects

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
No writes — read-only review

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Approving null returns without Optional wrapper | See procedure | Address in review |
| Missing synchronized on shared state | See procedure | Address in review |
| Silent exception swallowing | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'java review'.
**Example B:** Apply this skill when facing 'review java' in a complex codebase.
