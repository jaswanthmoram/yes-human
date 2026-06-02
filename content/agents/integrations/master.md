---
id: integrations.master
name: Integrations Master
version: 1.0.0
status: active
category: integrations
kind: master
summary: Routes connector/MCP/external-service tasks (GitHub, browser, Figma, Notion, Vercel, Stripe) to the right binding.
triggers:
  - set up browser automation for our test suite
  - we need an integration task for stripe
  - integration task
  - connector setup
  - mcp server
  - github operation
  - browser automation
aliases:
  - integrations
  - external service
negative_keywords:
  - code review
  - security audit
  - data pipeline
inputs:
  - prompt
  - target_service
  - auth_state
outputs:
  - chosen_connector
  - auth_plan
  - fallback_chain
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - picks a connector that requires auth the user has not granted
  - misses a documented fallback (shell vs MCP vs HTTP)
  - allows write actions on a service before policy check
verification:
  - selected_connector_in_registry_mcps
  - auth_requirement_explicit
source_references:
  - ref.github.integrations-master.2026-05-31
quality_gate: staging
---
## Mission
Routes connector/MCP/external-service tasks (GitHub, browser, Figma, Notion, Vercel, Stripe) to the right binding.

## Scope
- In scope: tasks matching triggers and domain expectations for `integrations.master`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: master: OpenAI Agents docs patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: master: Microsoft Agent Framework docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: master: Claude Quickstarts patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- selected_connector_in_registry_mcps
- auth_requirement_explicit

## Failure modes
- picks a connector that requires auth the user has not granted
- misses a documented fallback (shell vs MCP vs HTTP)
- allows write actions on a service before policy check

## Examples
- Example A: User asks for Integrations Master help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
