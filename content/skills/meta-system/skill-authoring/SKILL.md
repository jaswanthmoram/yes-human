---
id: meta-system.skill-authoring
name: Skill Authoring and Specification
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: meta-system.authoring
purpose: Author skill definitions with proper triggers, steps, quality gates, and handoff chains.
summary: Systematic approach to authoring skills that meet yes-human registry conventions and quality standards.
triggers:
  - author new skill
  - write skill specification
  - create skill definition
  - skill trigger authoring
  - skill handoff design
  - yes human task
  - skill authoring and specification review
activation_triggers:
  - skill authoring
  - skill spec writing
  - skill definition creation
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - skill_requirement
  - domain_context
  - existing_skills
  - target_artifact
  - requirements_or_context
  - constraints_and_risks
steps:
  - Confirm the requested skill authoring and specification outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - skill_specification
  - trigger_set
  - procedure_guide
  - handoff_chain
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - filesystem.read (read existing skills and registry)
  - filesystem.write (write new skill files)
  - filesystem.read
  - filesystem.write
quality_gates:
  - Requirements analyzed
  - Overlap check complete
  - Triggers validated
  - Quality gates defined
  - Handoffs mapped
  - Inputs and assumptions are explicit
failure_modes:
  - Authoring without overlap check
  - Missing quality gates
  - Undefined handoff chains
  - Incomplete trigger sets
  - Skipping procedure steps
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
handoffs:
  - meta-system.skill-designer (to review skill design)
  - meta-system.fixture-engineer (to create skill fixtures)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - meta-system.skill-designer
  - meta-system.system-architect
  - moramvenkatasatyajaswanth.master
status: active
budget_band: standard
rollback:
  - Revert skill specification
  - Remove authored skill from registry
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger
Use this skill when a task explicitly matches `meta-system.skill-authoring` or when the user asks for skill authoring and specification support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

## Prerequisites
- Confirm the user goal, scope, owner, and deadline.
- Locate the relevant source artifact, policy, dataset, code path, or business context before producing recommendations.
- Identify whether the task touches regulated or high-stakes decisions.

## Steps
### 1. Confirm Scope
Restate the requested outcome, exclusions, and success criteria. If core inputs are missing, list assumptions explicitly and keep the output marked as draft.

### 2. Inventory Evidence
Collect the relevant files, records, metrics, examples, or policies. Prefer project-local sources and cite external patterns only as implementation guidance.

### 3. Apply Domain Checks
Evaluate the work against the key task criteria for this skill: completeness, correctness, risk, maintainability, and user impact. Separate observed facts from inferred recommendations.

### 4. Produce the Artifact
Create the requested report, plan, checklist, implementation notes, or review output in a structure that can be acted on by the owning team. Include owners and next steps when the result implies follow-up work.

### 5. Verify Quality
Run the validators listed in frontmatter, check each quality gate, and review failure modes before finalizing. High-stakes outputs must include a disclaimer and human review gate.

### 6. Handoff or Escalate
Route cross-domain issues to the listed handoff agents. Escalate when the task requires professional judgment, credentials, live system access, or destructive changes outside this skill's scope.

## Verification
- [ ] Inputs, assumptions, and exclusions are stated.
- [ ] At least two source references or local evidence points are reflected in the output.
- [ ] All quality gates in frontmatter have been checked.
- [ ] Rollback or no-write behavior is clear.
- [ ] Human review is marked when domain risk requires it.

## Rollback
This skill should default to no direct production mutation. Revert generated artifacts through git or discard the draft output; if any external state was changed by a paired workflow, record the changed system, owner, timestamp, and restoration step.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Generic advice | Missing artifact or context | Ask for the concrete source, then rerun the checks |
| Unsupported recommendation | Evidence was not separated from inference | Add citations, confidence, and assumptions |
| Scope drift | Task spans multiple domains | Handoff to the appropriate domain master or workflow |

## Examples
**Example A:** A user asks for skill authoring and specification help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes
Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
