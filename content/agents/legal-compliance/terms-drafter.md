---
id: legal-compliance.terms-drafter
name: Terms Drafter
version: 1.0.0
status: active
category: legal-compliance
kind: specialist
summary: Drafts terms structure; not legal advice.
triggers:
  - terms of service
  - terms drafter task
  - terms drafter saas terms update
  - terms drafter limitation of liability clause
  - terms drafter data processing addendum
  - terms drafter acceptance mechanism review
aliases:
  - terms-drafter
negative_keywords: []
inputs:
  - task_context
outputs:
  - specialist_output
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - scope drift
verification:
  - output_matches_request
source_references:
  - ref.github.legal-compliance.terms-drafter.2026-06-02
quality_gate: staging
requires_disclaimer: true
human_review_gate: true
---
## Mission
Drafts terms structure; not legal advice.

## Scope
- In scope: tasks matching triggers and domain expectations for `legal-compliance.terms-drafter`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: terms drafter: Claude Dev Tools patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: terms drafter: MCP Compass patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: terms drafter: MCP Installer patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- output_matches_request

## Failure modes
- scope drift

## Examples
- Example A: User asks for Terms Drafter help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
