---
quality_gate: production
id: engineering.rust-patterns
name: Rust Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Rust code for ownership correctness, lifetime safety, and unsafe block justification.
summary: Rust Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - rust review
  - rust code review
  - review rust
  - rust code audit
  - rust file review
activation_triggers:
  - how do I rust review
  - help me with rust code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check unsafe blocks — every unsafe must have a comment documenting the invariants being upheld
  - Review clone/copy usage — excessive .clone() may indicate a design issue; prefer borrows
  - Check error handling — use ? operator; avoid .unwrap() in library code (use in tests only)
  - Review lifetime annotations — elided lifetimes are fine; explicit lifetimes on public APIs need justification
  - Check for panic paths — .unwrap(), .expect(), index out of bounds — all must be justified or replaced
  - Verify async correctness — ensure Future is Send when used across threads; check for blocking in async context
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
  - Unsafe blocks without invariant documentation
  - Unwrap() in library code
  - Blocking calls inside async context
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/rust-lang/rust
  - https://github.com/rust-lang/rustfmt
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
Use this skill for tasks related to: rust review, rust code review, review rust.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Check unsafe blocks — every unsafe must have a comment documenting the invariants being upheld

### 2. Step
Review clone/copy usage — excessive .clone() may indicate a design issue; prefer borrows

### 3. Step
Check error handling — use ? operator; avoid .unwrap() in library code (use in tests only)

### 4. Step
Review lifetime annotations — elided lifetimes are fine; explicit lifetimes on public APIs need justification

### 5. Step
Check for panic paths — .unwrap(), .expect(), index out of bounds — all must be justified or replaced

### 6. Step
Verify async correctness — ensure Future is Send when used across threads; check for blocking in async context

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
No writes — read-only review

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Unsafe blocks without invariant documentation | See procedure | Address in review |
| Unwrap() in library code | See procedure | Address in review |
| Blocking calls inside async context | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'rust review'.
**Example B:** Apply this skill when facing 'review rust' in a complex codebase.
