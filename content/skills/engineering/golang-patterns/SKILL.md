---
quality_gate: production
id: engineering.golang-patterns
name: Go Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Go code for idiomatic error handling, goroutine safety, and context propagation.
summary: Go Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - go review
  - golang review
  - review golang
  - go code audit
  - golang code review
activation_triggers:
  - how do I go review
  - help me with golang review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check error handling — errors must be checked; _, err := f() with ignored err is a red flag
  - Review goroutine lifecycle — every goroutine must have a clear termination path; leaked goroutines cause memory leaks
  - Check context propagation — ctx must be the first parameter and passed through every call in the chain
  - Review defer usage — defer runs on function return, not block exit; be careful with defer in loops
  - Check for race conditions — run go test -race on the package; shared maps need sync.Map or mutex
  - Verify interface design — keep interfaces small (1-3 methods); accept interfaces, return structs
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
  - Ignored errors approved without justification
  - Missing context propagation in library code
  - Goroutines without cancel/done channel
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/golang/go
  - https://github.com/golangci/golangci-lint
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

Use this skill for tasks related to: go review, golang review, review golang.

## Prerequisites

- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step

Check error handling — errors must be checked; \_, err := f() with ignored err is a red flag

### 2. Step

Review goroutine lifecycle — every goroutine must have a clear termination path; leaked goroutines cause memory leaks

### 3. Step

Check context propagation — ctx must be the first parameter and passed through every call in the chain

### 4. Step

Review defer usage — defer runs on function return, not block exit; be careful with defer in loops

### 5. Step

Check for race conditions — run go test -race on the package; shared maps need sync.Map or mutex

### 6. Step

Verify interface design — keep interfaces small (1-3 methods); accept interfaces, return structs

## Verification

- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback

No writes — read-only review

## Common Failures

| Failure                                       | Cause         | Fix               |
| --------------------------------------------- | ------------- | ----------------- |
| Ignored errors approved without justification | See procedure | Address in review |
| Missing context propagation in library code   | See procedure | Address in review |
| Goroutines without cancel/done channel        | See procedure | Address in review |

## Examples

**Example A:** Apply this skill to a typical instance of 'go review'.
**Example B:** Apply this skill when facing 'review golang' in a complex codebase.
