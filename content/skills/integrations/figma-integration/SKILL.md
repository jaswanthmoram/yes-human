---
id: integrations.figma-integration
name: Figma Integration
version: 1.0.0
domain: integrations
category: integrations.design-tools
purpose: Connect Figma context into agent workflows with scoped access, asset extraction, and design-to-code handoff rules.
summary: Figma integration work defines how to read design files, extract tokens and assets, preserve provenance, and hand off implementation-ready context.
triggers:
  - figma integration
  - connect figma
  - figma design context
  - design to code integration
  - extract figma assets
activation_triggers:
  - use Figma as a source
  - wire Figma into workflow
prerequisites:
  - Figma file or node URL is available
  - Access permissions are confirmed
  - Desired output type is defined
inputs:
  - figma_url
  - access_scope
  - target_output
steps:
  - Validate access scope and avoid requesting broad workspace permissions when file scope is enough.
  - Identify frames, components, tokens, assets, and annotations required for the task.
  - Extract only bounded context needed for the route or workflow.
  - Preserve provenance by recording file, node, timestamp, and extraction method.
  - Hand off implementation notes to design-content or engineering agents as appropriate.
outputs:
  - figma_context_pack
  - asset_manifest
  - implementation_notes
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Access scope is minimal
  - Node/file provenance is recorded
  - Extracted context is bounded and task-specific
failure_modes:
  - Pulling entire design files into context
  - Losing node-level provenance
  - Treating screenshots as exact specs without inspection
handoffs:
  - design-content.ui-designer
  - engineering.frontend-react
source_references:
  - ref.github.integrations.figma-integration.2026-06-03
  - https://github.com/figma/plugin-samples
allowed_agents:
  - integrations.figma-agent
  - integrations.api-integration-specialist
status: active
budget_band: standard
rollback:
  - Delete generated Figma context pack
validators:
  - skill.validator
  - provenance_recorded
---

## Procedure
1. Confirm the Figma URL, permission scope, and desired output.
2. Select only the frames, components, tokens, or assets needed.
3. Extract bounded context and record provenance.
4. Convert design details into implementation notes or asset manifests.
5. Hand off to the right design or engineering agent.
