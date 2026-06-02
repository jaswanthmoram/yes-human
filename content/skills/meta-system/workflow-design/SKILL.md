---
id: meta-system.workflow-design
name: Workflow Design and Orchestration
version: 1.0.0
domain: meta-system
category: meta-system.architecture
purpose: Design workflows with proper step sequencing, agent routing, gates, and rollback strategies.
summary: Systematic approach to designing workflows that orchestrate agents effectively within the yes-human system.
triggers:
  - design workflow orchestration
  - plan workflow steps
  - review workflow architecture
  - create workflow specification
  - design workflow rollback
activation_triggers:
  - workflow design plan
  - workflow step planning
  - workflow orchestration review
prerequisites:
  - workflow requirement defined
  - available agents listed
  - domain constraints known
inputs:
  - workflow_requirement
  - available_agents
  - domain_constraints
steps:
  - Analyze workflow requirement and scope
  - Identify required agents for each step
  - Design step sequence with dependencies
  - Define gates between critical steps
  - Plan rollback strategies per step
  - Design input and output contracts
  - Map agent routing for each step
  - Define success criteria
  - Produce workflow specification
  - Validate with quality gates
outputs:
  - workflow_specification
  - step_sequence
  - gate_definitions
  - rollback_strategies
tools:
  - filesystem.read (read existing workflows and agents)
quality_gates:
  - Requirements analyzed
  - Steps properly sequenced
  - Gates defined between critical steps
  - Rollback strategies documented
  - Success criteria measurable
failure_modes:
  - Steps without proper sequencing
  - Missing gate definitions
  - No rollback strategies
  - Circular agent dependencies
  - Undefined success criteria
handoffs:
  - meta-system.workflow-architect (to finalize workflow spec)
  - meta-system.fixture-engineer (to create workflow fixtures)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.workflow-architect
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert workflow specification
  - Restore previous workflow design
validators:
  - skill.validator
---

## Trigger
Use this skill when designing workflow orchestration, planning workflow steps, or reviewing workflow architecture.

## Prerequisites
- Workflow requirement defined
- Available agents listed
- Domain constraints known

## Steps
1. **Analyze Requirement**: Break down the workflow requirement into steps and agent needs.
2. **Identify Agents**: Map each step to the appropriate agent.
3. **Design Sequence**: Order steps with proper dependencies.
4. **Define Gates**: Place quality gates between critical steps.
5. **Plan Rollback**: Design rollback strategies for each step.
6. **Define Contracts**: Specify input and output contracts per step.
7. **Map Routing**: Define agent routing for each step.
8. **Define Success**: Establish measurable success criteria.
9. **Produce Specification**: Write the complete workflow specification.
10. **Validate**: Run through quality gates.

## Verification
- All quality gates passed
- Steps properly sequenced
- Rollback strategies tested
- Success criteria measurable

## Common Failures
- Designing steps without proper sequencing
- Missing gate definitions between steps
- No rollback strategies for failure recovery
