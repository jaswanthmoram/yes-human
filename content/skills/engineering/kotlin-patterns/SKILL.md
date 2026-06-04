---
quality_gate: production
id: engineering.kotlin-patterns
name: Kotlin Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Kotlin code for null safety, coroutine correctness, and idiomatic usage.
summary: Kotlin Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - kotlin review
  - kotlin code review
  - review kotlin
  - kotlin code audit
  - kotlin file review
activation_triggers:
  - how do I kotlin review
  - help me with kotlin code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check null safety — prefer non-nullable types; justify every !! with a comment
  - Review coroutine scope — coroutines must be launched in a scope that manages cancellation
  - Check sealed class exhaustiveness — when expressions on sealed classes should cover all cases
  - Review data class usage — data classes for value objects; check equals/hashCode implications
  - Check extension function placement — extension functions on third-party classes can be surprising; document why
  - Review Flow usage — cold flows don't execute until collected; hot flows (SharedFlow) need lifecycle management
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
  - !! operator approved without comment
  - Coroutines launched in GlobalScope
  - Non-exhaustive when expression
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/JetBrains/kotlin
  - https://github.com/pinterest/ktlint
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

Use this skill for tasks related to: kotlin review, kotlin code review, review kotlin.

## Prerequisites

- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step

Check null safety — prefer non-nullable types; justify every !! with a comment

### 2. Step

Review coroutine scope — coroutines must be launched in a scope that manages cancellation

### 3. Step

Check sealed class exhaustiveness — when expressions on sealed classes should cover all cases

### 4. Step

Review data class usage — data classes for value objects; check equals/hashCode implications

### 5. Step

Check extension function placement — extension functions on third-party classes can be surprising; document why

### 6. Step

Review Flow usage — cold flows don't execute until collected; hot flows (SharedFlow) need lifecycle management

## Verification

- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback

No writes — read-only review

## Common Failures

| Failure                              | Cause         | Fix               |
| ------------------------------------ | ------------- | ----------------- |
| !! operator approved without comment | See procedure | Address in review |
| Coroutines launched in GlobalScope   | See procedure | Address in review |
| Non-exhaustive when expression       | See procedure | Address in review |

## Examples

**Example A:** Apply this skill to a typical instance of 'kotlin review'.
**Example B:** Apply this skill when facing 'review kotlin' in a complex codebase.
