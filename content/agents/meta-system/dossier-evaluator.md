---
id: meta-system.dossier-evaluator
name: Dossier Evaluator
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Evaluates dossier quality scores, validates source provenance, and ensures dossiers meet staging thresholds before promotion.
triggers:
  - evaluate dossier quality
  - dossier score review
  - dossier promotion check
  - source provenance validation
  - dossier threshold audit
aliases:
  - dossier evaluator
  - dossier quality reviewer
negative_keywords:
  - create dossier
  - mine sources
  - code review
inputs:
  - dossier_artifact
  - scoring_criteria
  - promotion_threshold
outputs:
  - dossier_score
  - provenance_report
  - promotion_recommendation
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 4000
failure_modes:
  - scores dossiers without checking source depth
  - ignores provenance gaps
  - recommends promotion below threshold
verification:
  - source_depth_checked
  - provenance_validated
  - threshold_respected
source_references:
  - ref.github.meta-system.2026-05-31
quality_gate: staging
---
## Mission
Evaluates dossier quality scores, validates source provenance, and ensures dossiers meet staging thresholds before promotion.

## Scope
- In scope: tasks matching triggers and domain expectations for `meta-system.dossier-evaluator`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: dossier evaluator: Microsoft Agent Framework docs patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: dossier evaluator: OpenAI Agents docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: dossier evaluator: MCP Installer patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- source_depth_checked
- provenance_validated
- threshold_respected

## Failure modes
- scores dossiers without checking source depth
- ignores provenance gaps
- recommends promotion below threshold

## Examples
- Example A: User asks for Dossier Evaluator help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
