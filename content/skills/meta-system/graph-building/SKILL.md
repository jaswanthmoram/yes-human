---
id: meta-system.graph-building
name: Graph Building
version: 1.0.0
domain: meta-system
category: meta-system.graph
purpose: Build or refresh route, alias, workflow, code, and knowledge graphs without increasing startup token load.
summary: Graph building compiles registries and indexes into compact route tables and optional retrieval graphs while preserving lazy loading.
triggers:
  - graph building
  - build route graph
  - rebuild yes graph
  - graph index refresh
  - code graph build
activation_triggers:
  - rebuild graph indexes
  - refresh routing graph
prerequisites:
  - Registry source files are valid
  - Compile command is available
  - Generated indexes are allowed to change
inputs:
  - registry_sources
  - graph_targets
  - validation_requirements
steps:
  - Identify target graph: hot route table, aliases, workflow cache, SQLite code graph, or knowledge graph.
  - Compile from canonical content and registry sources rather than hand-editing generated output.
  - Check collisions, stale route IDs, missing targets, and hot-route size limits.
  - Run validation and route fixtures after graph generation.
  - Report changed graph files and any collisions that were kept or rejected.
outputs:
  - graph_build_report
  - updated_graph_indexes
  - collision_notes
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Generated graph references resolve
  - Hot route table remains under cap
  - Validation and route eval pass
failure_modes:
  - Hand-editing generated indexes
  - Keeping stale route IDs
  - Increasing startup context by embedding full registries
handoffs:
  - meta-system.graph-builder
  - meta-system.eval-runner
source_references:
  - ref.github.meta-system.graph-building.2026-06-03
  - https://github.com/graphology/graphology
allowed_agents:
  - meta-system.graph-builder
status: active
budget_band: standard
rollback:
  - Restore previous generated graph indexes from git
validators:
  - skill.validator
  - graph_references_resolve
---

## Procedure
1. Determine which graph artifacts need refresh.
2. Compile from canonical content and registry files.
3. Check collisions and missing references.
4. Run validation and route eval.
5. Report changed artifacts and residual risks.
