---
quality_gate: production
id: security.threat-model
name: STRIDE/DREAD Threat Modeling
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: security.threat-modeling
purpose: Perform systematic threat modeling using STRIDE and DREAD frameworks to identify and prioritize security threats.
summary: Guides through identifying threats, vulnerabilities, and attack vectors using industry-standard threat modeling methodologies.
triggers:
  - identify security threats using STRIDE
  - threat model
  - threat modeling
  - identify security threats
  - STRIDE analysis
  - DREAD scoring
  - yes human task
activation_triggers:
  - analyze attack vectors
  - perform threat modeling
  - model threats
  - security threats
  - attack vectors
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - system_architecture
  - data_flows
  - trust_boundaries
  - assets_to_protect
  - target_artifact
  - requirements_or_context
steps:
  - Confirm the requested stride/dread threat modeling outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - threat_list (categorized by STRIDE)
  - dread_scores
  - prioritized_threats
  - mitigation_recommendations
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - filesystem.read (architecture docs)
  - filesystem.write (threat model document)
  - filesystem.read
  - filesystem.write
quality_gates:
  - All STRIDE categories analyzed
  - All threats scored with DREAD
  - Mitigation strategies documented
  - Inputs and assumptions are explicit
  - Recommendations are tied to evidence
  - Output is scoped and actionable
failure_modes:
  - Missing trust boundaries
  - Incomplete STRIDE analysis
  - Not prioritizing threats
  - Vague mitigation strategies
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
  - Cross-domain risk is not escalated
handoffs:
  - security.security-reviewer (for implementation review)
  - security.auth-review (for auth-related threats)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - security.threat-modeler
  - security.security-reviewer
  - moramvenkatasatyajaswanth.master
status: active
budget_band: standard
rollback:
  - No state changes to rollback
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger
Use this skill when a task explicitly matches `security.threat-model` or when the user asks for stride/dread threat modeling support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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
**Example A:** A user asks for stride/dread threat modeling help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes
Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
