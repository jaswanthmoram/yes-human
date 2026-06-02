---
id: meta-system.agent-architecture
name: Agent Architecture Design and Review
version: 1.0.0
domain: meta-system
category: meta-system.architecture
purpose: Design agent architectures with proper modularity, trigger matrices, and verification gates.
summary: Systematic approach to designing agent architectures that fit the yes-human registry conventions.
triggers:
  - design agent architecture
  - review agent modular structure
  - plan agent trigger matrix
  - architect agent capabilities
  - review agent dependency graph
activation_triggers:
  - agent architecture plan
  - agent structure review
  - agent capability design
prerequisites:
  - agent requirement defined
  - domain context available
  - registry snapshot accessible
inputs:
  - agent_requirement
  - domain_context
  - registry_snapshot
steps:
  - Analyze agent requirement and scope
  - Map agent capabilities to domain needs
  - Design trigger matrix with positive and negative triggers
  - Define input and output contracts
  - Plan verification gates
  - Check overlap with existing agents
  - Design failure modes and recovery
  - Validate budget band and context limits
  - Produce architecture specification
  - Review with quality gates
outputs:
  - architecture_specification
  - trigger_matrix
  - verification_plan
  - overlap_analysis
tools:
  - filesystem.read (read registry and existing agents)
quality_gates:
  - Requirements fully analyzed
  - Trigger matrix validated
  - Overlap check complete
  - Verification gates defined
  - Budget constraints respected
failure_modes:
  - Designing without overlap analysis
  - Missing negative triggers
  - Undefined verification gates
  - Ignoring budget constraints
  - Skipping failure mode design
handoffs:
  - meta-system.agent-designer (to finalize agent spec)
  - meta-system.fixture-engineer (to create test fixtures)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.agent-designer
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert architecture specification
  - Restore previous agent design
validators:
  - skill.validator
---

## Trigger
Use this skill when designing agent architectures, reviewing agent modular structure, or planning agent trigger matrices.

## Prerequisites
- Agent requirement defined
- Domain context available
- Registry snapshot accessible

## Steps
1. **Analyze Requirement**: Break down the agent requirement into capabilities, inputs, and outputs.
2. **Map Capabilities**: Align agent capabilities with domain needs and existing agents.
3. **Design Trigger Matrix**: Create positive triggers and negative keywords to prevent routing conflicts.
4. **Define Contracts**: Specify input and output contracts with types and validation rules.
5. **Plan Verification**: Design verification gates that the agent must pass.
6. **Check Overlap**: Scan existing registry for overlapping agents.
7. **Design Failure Modes**: Enumerate failure modes and recovery strategies.
8. **Validate Budget**: Ensure the agent fits within its budget band and context limits.
9. **Produce Specification**: Write the complete architecture specification.
10. **Review**: Run through quality gates before finalizing.

## Verification
- All quality gates passed
- Trigger matrix validated against registry
- Overlap analysis complete
- Budget constraints respected

## Common Failures
- Designing without checking existing agents
- Missing negative triggers causing routing conflicts
- Undefined verification gates
- Ignoring context token budget

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
