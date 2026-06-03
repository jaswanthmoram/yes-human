---
quality_gate: production
id: meta-system.route-evaluation
name: Routing Accuracy Testing and Analysis
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: meta-system.evaluation
purpose: Evaluate routing accuracy, identify failures, and improve routing performance.
summary: Systematic approach to running routing evaluations, analyzing failures, and implementing improvements.
triggers:
  - evaluate routing accuracy with fixtures
  - test routing accuracy with test cases
  - run route evaluation script
  - check routing performance metrics
  - analyze routing test failures
  - yes human task
  - routing accuracy testing and analysis review
activation_triggers:
  - routing eval script
  - test route accuracy metrics
  - routing performance evaluation
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - fixture_files
  - evaluation_thresholds
  - baseline_results (optional)
  - target_artifact
  - requirements_or_context
  - constraints_and_risks
steps:
  - Confirm the requested routing accuracy testing and analysis outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - evaluation_report
  - failure_analysis
  - improvement_recommendations
  - updated_routing_config
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - shell.readonly (run evaluation)
  - filesystem.read (load fixtures, results)
  - filesystem.write (save report)
  - filesystem.read
  - filesystem.write
quality_gates:
  - All fixtures evaluated
  - Failures categorized and analyzed
  - Metrics meet thresholds
  - Improvements documented
  - Re-evaluation passes
  - Inputs and assumptions are explicit
failure_modes:
  - Incomplete fixture coverage
  - Not analyzing failures
  - Ignoring edge cases
  - Not comparing to baseline
  - Implementing fixes without re-evaluation
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
handoffs:
  - meta-system.fixture-writing (to add more fixtures)
  - engineering.code-reviewer (to review routing logic)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - meta-system.eval-runner
  - meta-system.supreme-router
  - moramvenkatasatyajaswanth.master
status: active
budget_band: standard
rollback:
  - Revert routing configuration changes
  - Restore previous evaluation results
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger
Use this skill when a task explicitly matches `meta-system.route-evaluation` or when the user asks for routing accuracy testing and analysis support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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
**Example A:** A user asks for routing accuracy testing and analysis help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes
Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
