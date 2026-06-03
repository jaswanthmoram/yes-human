---
quality_gate: production
id: engineering.svelte-stores
name: Svelte Stores and Reactivity
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: engineering.frameworks
purpose: Execute svelte stores and reactivity work with evidence, verification, and clear handoff rules.
summary: Svelte Stores And Reactivity provides a repeatable operating procedure for task tasks. It defines inputs, checks, outputs, rollback behavior, and escalation paths so routed agents produce useful work rather than generic advice.
triggers:
  - fix memory leak from unsubscribed Svelte store
  - create a custom Svelte store with async data
  - svelte stores
  - svelte reactivity
  - svelte writable
  - svelte derived
  - svelte 5 runes
activation_triggers:
  - migrate Svelte 4 stores to Svelte 5 runes
  - help me with svelte stores and reactivity
  - review svelte stores and reactivity work
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - state_requirements
  - svelte_version
  - store_complexity (optional)
  - target_artifact
  - requirements_or_context
  - constraints_and_risks
steps:
  - Confirm the requested svelte stores and reactivity outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - store_implementation
  - reactivity_pattern_code
  - rune_migration_guide
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Inputs and assumptions are explicit
  - Recommendations are tied to evidence
  - Output is scoped and actionable
failure_modes:
  - Memory leaks from unsubscribed stores
  - Circular derived store dependencies
  - Race conditions in async store updates
  - Overusing global stores for local state
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
  - Cross-domain risk is not escalated
handoffs:
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - moramvenkatasatyajaswanth.master
status: active
budget_band: micro
rollback:
  - Revert to component-local state if stores are over-engineered
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger
Use this skill when a task explicitly matches `engineering.svelte-stores` or when the user asks for svelte stores and reactivity support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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
**Example A:** A user asks for svelte stores and reactivity help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes
Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
