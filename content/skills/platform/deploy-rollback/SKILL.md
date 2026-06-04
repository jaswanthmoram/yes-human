---
quality_gate: production
id: platform.deploy-rollback
name: Safe Deployment Rollback
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: platform.release-engineering
purpose: Safely rollback failed deployments while minimizing downtime and data loss.
summary: Systematic approach to rolling back deployments including verification, data considerations, and communication.
triggers:
  - undo production release
  - rollback deployment
  - revert deployment
  - deployment failed
  - undo release
  - emergency rollback
  - yes human task
activation_triggers:
  - revert Kubernetes deployment
  - rollback
  - revert release
  - undo deploy
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - current_deployment
  - previous_stable_version
  - rollback_reason
  - data_changes_since_deploy (optional)
  - target_artifact
  - requirements_or_context
steps:
  - Confirm the requested safe deployment rollback outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - rollback_plan
  - rollback_execution_log
  - verification_results
  - post_rollback_report
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - shell.readonly (check status, logs)
  - shell.write (execute rollback commands)
  - filesystem.read (configs, logs)
  - filesystem.read
  - filesystem.write
quality_gates:
  - Rollback reason verified
  - Data impact assessed
  - Rollback successful
  - System stable post-rollback
  - Inputs and assumptions are explicit
  - Recommendations are tied to evidence
failure_modes:
  - Rolling back without verifying it's necessary
  - Not considering data migrations
  - Incomplete rollback (partial state)
  - Not monitoring after rollback
  - Not documenting root cause
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
handoffs:
  - platform.incident-responder (if rollback due to incident)
  - platform.devops-engineer (for infrastructure rollback)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - platform.release-manager
  - platform.devops-engineer
  - moramvenkatasatyajaswanth.master
status: active
budget_band: standard
rollback:
  - Re-deploy the rolled-back version if rollback itself failed
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger

Use this skill when a task explicitly matches `platform.deploy-rollback` or when the user asks for safe deployment rollback support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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

| Failure                    | Cause                                     | Fix                                                  |
| -------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| Generic advice             | Missing artifact or context               | Ask for the concrete source, then rerun the checks   |
| Unsupported recommendation | Evidence was not separated from inference | Add citations, confidence, and assumptions           |
| Scope drift                | Task spans multiple domains               | Handoff to the appropriate domain master or workflow |

## Examples

**Example A:** A user asks for safe deployment rollback help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes

Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
