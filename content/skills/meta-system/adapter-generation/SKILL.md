---
id: meta-system.adapter-generation
name: Host Adapter Generation
version: 1.0.0
domain: meta-system
category: meta-system.adapters
purpose: Generate host adapter bundles for supported environments with low-token boot files, env-var secrets, and validation.
summary: Adapter generation builds Claude, Codex, OpenCode, MCP, Cursor, Windsurf, VS Code, Sourcegraph, and generic bundles from canonical registries.
triggers:
  - adapter generation
  - generate host adapter
  - build host bundles
  - export yes-human adapter
  - adapter pack generation
activation_triggers:
  - build all adapters
  - export host bundle
prerequisites:
  - Registries and route table validate
  - Target host is supported
  - Secrets are referenced by environment variables only
inputs:
  - host_target
  - registry_snapshot
  - adapter_requirements
steps:
  - Select target host or all supported hosts.
  - Generate bundle from canonical registries and route table.
  - Validate required files, boot token cap, env-var secret references, and host-specific safety rules.
  - Check no literal API keys or credentials are present.
  - Report generated files and validation results.
outputs:
  - host_bundle
  - adapter_validation_report
  - generated_file_list
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Boot file stays under 300-token hard cap
  - No literal API keys are present
  - Host-specific required files validate
failure_modes:
  - Hardcoding credentials into generated bundle
  - Diverging from canonical registries
  - Shipping an adapter without cancellation or safety policy
handoffs:
  - meta-system.adapter-generator
  - integrations.mcp-connector-designer
source_references:
  - ref.github.meta-system.adapter-generation.2026-06-03
  - https://github.com/modelcontextprotocol/servers
allowed_agents:
  - meta-system.adapter-generator
status: active
budget_band: standard
rollback:
  - Delete generated adapter bundle
  - Restore previous adapter artifact from git
validators:
  - skill.validator
  - host_bundle_validation
---

## Procedure
1. Confirm target host and adapter requirements.
2. Generate bundle from canonical yes-human registries.
3. Validate boot token cap, required files, env-var secret references, and host safety behavior.
4. Check for literal credentials.
5. Report generated files and validation status.
