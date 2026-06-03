---
quality_gate: production
id: engineering.python-patterns
name: Python Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Python code for idiomatic usage, type hints, and common anti-patterns.
summary: Python Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - python review
  - python code review
  - review python
  - python code audit
  - py file review
activation_triggers:
  - how do I python review
  - help me with python code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check type hints on all public functions — PEP 484; use mypy or pyright for verification
  - Review mutable default arguments — def f(x=[]) is a classic Python gotcha; use None and assign in body
  - Check exception handling — bare except: catches everything including SystemExit; always except SpecificException
  - Review f-string usage — prefer over .format() and % formatting for readability
  - Check for resource management — file handles and connections must use context managers (with statement)
  - Verify async code — async functions must be awaited; never call asyncio.run() inside an async context
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
  - Mutable default arguments approved without comment
  - Bare except: blocks approved
  - Missing type hints on public API
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/psf/black
  - https://github.com/PyCQA/flake8
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
Use this skill for tasks related to: python review, python code review, review python.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Check type hints on all public functions — PEP 484; use mypy or pyright for verification

### 2. Step
Review mutable default arguments — def f(x=[]) is a classic Python gotcha; use None and assign in body

### 3. Step
Check exception handling — bare except: catches everything including SystemExit; always except SpecificException

### 4. Step
Review f-string usage — prefer over .format() and % formatting for readability

### 5. Step
Check for resource management — file handles and connections must use context managers (with statement)

### 6. Step
Verify async code — async functions must be awaited; never call asyncio.run() inside an async context

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
No writes — read-only review

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Mutable default arguments approved without comment | See procedure | Address in review |
| Bare except: blocks approved | See procedure | Address in review |
| Missing type hints on public API | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'python review'.
**Example B:** Apply this skill when facing 'review python' in a complex codebase.
