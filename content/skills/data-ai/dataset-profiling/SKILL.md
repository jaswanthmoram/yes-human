---
id: data-ai.dataset-profiling
name: Dataset Quality Assessment
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: data-ai.data-engineering
purpose: Execute dataset quality assessment work with evidence, verification, and clear handoff rules.
summary: Systematic approach to analyzing dataset characteristics including distributions, missing values, outliers, and biases.
triggers:
  - analyze data distribution
  - profile dataset
  - assess data quality
  - check dataset
  - data quality analysis
  - dataset statistics
  - yes human task
activation_triggers:
  - data profiling
  - dataset analysis
  - quality check
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - dataset_path
  - data_schema (optional)
  - quality_requirements (optional)
  - target_artifact
  - requirements_or_context
  - constraints_and_risks
steps:
  - Confirm the requested dataset quality assessment outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - dataset_statistics
  - quality_metrics
  - data_issues
  - quality_report
  - recommendations
  - review_or_analysis_report
tools:
  - shell.readonly (run profiling scripts)
  - filesystem.read (dataset)
  - filesystem.write (report)
  - filesystem.read
  - filesystem.write
quality_gates:
  - All quality metrics calculated
  - Issues documented
  - Recommendations actionable
  - Report complete
  - Inputs and assumptions are explicit
  - Recommendations are tied to evidence
failure_modes:
  - Missing critical quality issues
  - Not checking for data leakage
  - Ignoring class imbalance
  - Not identifying biases
  - Vague recommendations
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
handoffs:
  - data-ai.rag-engineer (for RAG dataset issues)
  - data-ai.ml-engineer (for ML dataset issues)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - data-ai.data-engineer
  - data-ai.ml-engineer
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
Use this skill when a task explicitly matches `data-ai.dataset-profiling` or when the user asks for dataset quality assessment support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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
**Example A:** A user asks for dataset quality assessment help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes
Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
