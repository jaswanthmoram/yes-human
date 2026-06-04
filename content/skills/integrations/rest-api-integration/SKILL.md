---
quality_gate: production
id: integrations.rest-api-integration
name: REST API Integration
version: 1.0.0
domain: moramvenkatasatyajaswanth
category: integrations.api
purpose: Implement robust REST API client integrations with proper error handling, authentication, and retry logic.
summary: Guides through building REST API clients with connection pooling, request/response transformation, and resilience patterns.
triggers:
  - build rest api client
  - integrate rest endpoint
  - http client setup
  - yes human task
  - rest api integration review
  - rest api integration checklist
  - rest api integration plan
activation_triggers:
  - connect to external api
  - rest client implementation
  - help me with rest api integration
prerequisites:
  - Concrete task artifact or context is available
  - User goal, scope, and success criteria are stated
  - Relevant project constraints are known
inputs:
  - api_base_url
  - auth_method
  - endpoint_specifications
  - target_artifact
  - requirements_or_context
  - constraints_and_risks
steps:
  - Confirm the requested rest api integration outcome, scope, owner, and success criteria
  - Collect relevant task evidence from local project files, user-provided context, or approved sources
  - Compare the evidence against the skill quality gates and domain-specific risk checklist
  - Draft the requested artifact with assumptions, risks, and next actions separated clearly
  - Verify the output against validators, failure modes, and rollback expectations
  - Hand off cross-domain issues to the listed agents or mark human review requirements
outputs:
  - api_client_implementation
  - data_models
  - error_handling_strategy
  - review_or_analysis_report
  - actionable_next_steps
tools:
  - filesystem.write (client code)
  - filesystem.read
  - filesystem.write
quality_gates:
  - All endpoints covered
  - Error handling for all HTTP status codes
  - Retry logic implemented
  - Inputs and assumptions are explicit
  - Recommendations are tied to evidence
  - Output is scoped and actionable
failure_modes:
  - Missing error handling for edge cases
  - Hardcoded configuration values
  - No timeout configuration
  - Missing source context leads to generic output
  - Recommendations are not backed by evidence
  - Cross-domain risk is not escalated
handoffs:
  - integrations.api-authentication (for auth setup)
  - integrations.api-testing (for test coverage)
  - moramvenkatasatyajaswanth.master (for cross-domain or ambiguous task work)
source_references:
  - https://github.com/microsoft/graphrag
  - https://github.com/lastmile-ai/mcp-agent
allowed_agents:
  - integrations.api-integration-specialist
  - integrations.third-party-integrator
  - moramvenkatasatyajaswanth.master
status: active
budget_band: standard
rollback:
  - Revert client configuration changes
  - Discard generated artifact or revert file changes in git
validators:
  - skill.validator
---

## Trigger

Use this skill when a task explicitly matches `integrations.rest-api-integration` or when the user asks for rest api integration support. It is designed for bounded task work where the agent needs concrete inputs, a repeatable procedure, and verification before handoff.

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

**Example A:** A user asks for rest api integration help with a specific file or dataset; apply the six-step procedure and return a concise, evidence-backed artifact.
**Example B:** A user asks for a broad strategy without inputs; produce a scoped checklist, identify missing evidence, and mark recommendations as assumptions until reviewed.

## Source Notes

Reference patterns are drawn from https://github.com/microsoft/graphrag and https://github.com/lastmile-ai/mcp-agent. Use them for process patterns only; do not copy code or policy text unless license and project policy explicitly allow it.
