---
id: engineering.cpp-patterns
name: C++ Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review C++ code for memory safety, undefined behavior risks, and modern C++ idioms.
summary: C++ Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - c++ review
  - cpp review
  - review cpp
  - c plus plus review
  - cpp code audit
activation_triggers:
  - how do I c++ review
  - help me with cpp review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check for raw owning pointers — prefer unique_ptr/shared_ptr; raw new/delete should be rare and documented
  - Review RAII compliance — resources must be managed by destructors; no raw resource handles
  - Check for undefined behavior — signed integer overflow, out-of-bounds access, use-after-free
  - Review virtual destructor — any class with virtual methods needs a virtual destructor
  - Check const correctness — member functions that don't modify state must be const
  - Review move semantics — large objects should be moved, not copied; check for missing move constructors
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
  - Raw new/delete without ownership documentation
  - Missing virtual destructor on polymorphic class
  - Signed integer overflow in arithmetic
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/isocpp/CppCoreGuidelines
  - https://github.com/llvm/llvm-project
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
Use this skill for tasks related to: c++ review, cpp review, review cpp.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Check for raw owning pointers — prefer unique_ptr/shared_ptr; raw new/delete should be rare and documented

### 2. Step
Review RAII compliance — resources must be managed by destructors; no raw resource handles

### 3. Step
Check for undefined behavior — signed integer overflow, out-of-bounds access, use-after-free

### 4. Step
Review virtual destructor — any class with virtual methods needs a virtual destructor

### 5. Step
Check const correctness — member functions that don't modify state must be const

### 6. Step
Review move semantics — large objects should be moved, not copied; check for missing move constructors

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
No writes — read-only review

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Raw new/delete without ownership documentation | See procedure | Address in review |
| Missing virtual destructor on polymorphic class | See procedure | Address in review |
| Signed integer overflow in arithmetic | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'c++ review'.
**Example B:** Apply this skill when facing 'review cpp' in a complex codebase.
