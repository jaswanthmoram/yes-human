---
id: meta-system.plugin-absorber
name: Plugin Absorber
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Stages external harnesses, plugins, or connector bundles into the absorber pipeline with explicit license and dedupe handling.
triggers:
  - absorb plugin bundle
  - import external harness
  - stage connector bundle
  - plugin intake review
  - adapter pack ingest
aliases:
  - bundle absorber
negative_keywords:
  - live deployment
  - medical review
  - pricing strategy
inputs:
  - source_bundle
  - license_signal
  - target_staging_bucket
outputs:
  - staging_plan
  - license_decision
  - rollback_record
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
budget_band: expanded
max_context_tokens: 5000
failure_modes:
  - promotes absorbed content without staging
  - drops provenance during normalization
  - imports bundles that duplicate stronger local coverage
verification:
  - staging_bucket_named
  - license_decision_recorded
  - dedupe_check_run
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: production
---
## Mission
Stages external harnesses, plugins, or connector bundles into the absorber pipeline with explicit license and dedupe handling.

## Scope
- In scope: tasks matching triggers and domain expectations for `meta-system.plugin-absorber`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: plugin absorber: OpenAI Agents docs patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: plugin absorber: Microsoft Agent Framework docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: plugin absorber: Langflow patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- staging_bucket_named
- license_decision_recorded
- dedupe_check_run

## Failure modes
- promotes absorbed content without staging
- drops provenance during normalization
- imports bundles that duplicate stronger local coverage

## Examples
- Example A: User asks for Plugin Absorber help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
