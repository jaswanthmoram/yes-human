---
id: meta-system.adapter-generator
name: Adapter Generator
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Generates host-specific adapter bundles (Claude, Codex, OpenCode, MCP) from canonical yes-human source.
triggers:
  - generate host adapter
  - build claude adapter
  - generate codex bundle
  - create adapter bundle
  - export host bundle
aliases:
  - adapter gen
  - bundle gen
negative_keywords:
  - code review
  - financial forecast
inputs:
  - target_host
  - canonical_source_path
  - bundle_output_format
outputs:
  - adapter_bundle_manifest
  - host_compatibility_report
  - diff_against_previous_bundle
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 4000
failure_modes:
  - generates a bundle without diffing against the previous version
  - omits host-specific capability flags from the bundle manifest
  - mixes canonical source with host-specific overrides in the output
verification:
  - target_host_validated
  - bundle_diffed_against_previous
  - host_capability_flags_included
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: staging
---
## Mission
Generates host-specific adapter bundles (Claude, Codex, OpenCode, MCP) from canonical yes-human source.

## Scope
- In scope: tasks matching triggers and domain expectations for `meta-system.adapter-generator`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: adapter generator: Microsoft Agent Framework docs patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: adapter generator: OpenAI Agents docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: adapter generator: Awesome Agents patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- target_host_validated
- bundle_diffed_against_previous
- host_capability_flags_included

## Failure modes
- generates a bundle without diffing against the previous version
- omits host-specific capability flags from the bundle manifest
- mixes canonical source with host-specific overrides in the output

## Examples
- Example A: User asks for Adapter Generator help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.
