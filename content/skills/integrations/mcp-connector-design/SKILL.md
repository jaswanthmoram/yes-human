---
id: integrations.mcp-connector-design
name: MCP Connector Design
version: 1.0.0
domain: integrations
category: integrations.mcp
purpose: Design MCP connectors with minimal permissions, stable tool schemas, provenance, error handling, and safe host behavior.
summary: MCP connector design defines tools, resources, authentication, capability boundaries, audit trails, and host-specific safety behavior for agent use.
triggers:
  - mcp connector design
  - design mcp connector
  - mcp server integration
  - connector tool schema
  - mcp capability design
activation_triggers:
  - create an MCP connector
  - design connector tools
prerequisites:
  - Target service API is known
  - Authentication model is understood
  - Required capabilities are scoped
inputs:
  - service_api
  - auth_model
  - capability_scope
  - host_requirements
steps:
  - Define connector purpose, trusted boundary, user data touched, and host assumptions.
  - Design small, stable tool schemas with explicit inputs, outputs, errors, and timeouts.
  - Separate read tools from write tools and require gates for destructive or external writes.
  - Add provenance, audit logging, retry behavior, and rate-limit handling.
  - Document install, env vars, scopes, and rollback procedure.
outputs:
  - mcp_connector_spec
  - tool_schema_set
  - permission_model
  - safety_and_audit_plan
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Tool schemas are bounded and typed
  - Permissions are minimal
  - Write actions have gates and rollback notes
failure_modes:
  - Broad OAuth scopes without need
  - Tools returning unbounded payloads
  - No audit trail for external writes
handoffs:
  - integrations.mcp-connector-designer
  - meta-system.adapter-generator
source_references:
  - ref.github.integrations.mcp-connector-design.2026-06-03
  - https://github.com/modelcontextprotocol/servers
allowed_agents:
  - integrations.mcp-connector-designer
  - integrations.api-gateway-architect
status: active
budget_band: standard
rollback:
  - Revert connector spec
  - Remove generated connector files
validators:
  - skill.validator
  - permission_scope_check
---

## Procedure
1. Scope the connector to the smallest useful capability set.
2. Define typed tools, resources, errors, and timeouts.
3. Separate read and write paths with gates for writes.
4. Add provenance, audit, retries, and rate-limit behavior.
5. Document env vars, install steps, and rollback.
