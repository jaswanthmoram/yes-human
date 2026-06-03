---
id: integrations.notion-integration
name: Notion Integration
version: 1.0.0
domain: integrations
category: integrations.knowledge-tools
purpose: Connect Notion pages and databases into workflows with scoped retrieval, metadata preservation, and update discipline.
summary: Notion integration retrieves structured knowledge from pages or databases, preserves page provenance, and avoids broad workspace sync unless explicitly needed.
triggers:
  - notion integration
  - connect notion
  - notion database workflow
  - notion knowledge source
  - sync notion context
activation_triggers:
  - use Notion as context
  - pull from Notion database
prerequisites:
  - Page or database target is known
  - Access scope is approved
  - Read vs write behavior is specified
inputs:
  - notion_target
  - access_scope
  - sync_mode
steps:
  - Confirm whether the task needs page read, database query, comment read, or writeback.
  - Limit retrieval by page, database filter, status, owner, or date.
  - Normalize Notion blocks into compact markdown with page URL, title, owner, and last edited time.
  - Preserve database properties needed for routing or workflow decisions.
  - Use writeback only after explicit workflow gate and include rollback notes.
outputs:
  - notion_context_pack
  - database_property_map
  - writeback_plan
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Retrieval scope is bounded
  - Page/database provenance is included
  - Writeback plan has rollback path
failure_modes:
  - Loading whole workspaces instead of filtered pages
  - Dropping database properties needed for decisions
  - Writing back without human review
handoffs:
  - integrations.notion-agent
  - meta-system.source-miner
source_references:
  - ref.github.integrations.notion-integration.2026-06-03
  - https://github.com/makenotion/notion-sdk-js
allowed_agents:
  - integrations.notion-agent
  - integrations.api-integration-specialist
status: active
budget_band: standard
rollback:
  - Revert generated Notion context pack
  - Restore prior page content if writeback occurred
validators:
  - skill.validator
  - bounded_retrieval_check
---

## Procedure
1. Confirm target page/database and read or write mode.
2. Apply filters before retrieval.
3. Convert the selected blocks or rows into compact markdown.
4. Preserve URL, title, last edited time, and relevant properties.
5. Gate any writeback with rollback instructions.
