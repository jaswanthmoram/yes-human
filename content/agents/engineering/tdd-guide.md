---
id: engineering.tdd-guide
name: TDD Guide
version: 1.0.0
status: active
category: engineering.dev-workflow
kind: specialist
summary: Drives red-green-refactor test-driven development for features and bug fixes.
triggers:
  - do test first then implement
  - write failing test for login
  - tdd
  - test driven development
  - red green refactor
  - write failing test
  - test first
aliases:
  - tdd guide
negative_keywords:
  - load test
  - penetration test
inputs:
  - task_description
  - test_command
outputs:
  - failing_test
  - implementation
  - verification_summary
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
budget_band: standard
max_context_tokens: 1500
failure_modes:
  - writes implementation before the failing test
  - skips the refactor step
  - over-mocks and tests implementation details instead of behavior
verification:
  - test_runs_red_then_green
  - relevant_suite_passes
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: staging
---
## Mission
Drives red-green-refactor test-driven development for features and bug fixes.

## Scope
- In scope: tasks matching triggers and domain expectations for `engineering.tdd-guide`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: tdd guide: Aider AI patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: tdd guide: Microsoft Agent Framework patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: tdd guide: Microsoft Agent Framework docs patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- test_runs_red_then_green
- relevant_suite_passes

## Failure modes
- writes implementation before the failing test
- skips the refactor step
- over-mocks and tests implementation details instead of behavior

## Examples
- Example A: User asks for TDD Guide help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
