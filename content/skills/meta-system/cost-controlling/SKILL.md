---
id: meta-system.cost-controlling
name: Cost Controlling
version: 1.0.0
domain: meta-system
category: meta-system.cost
purpose: Control token, tool, connector, and graph-loading costs while preserving task quality.
summary: Cost controlling reviews boot budget, route budget bands, tool fanout, connector calls, and context loading to keep yes-human low-token and lazy-loaded.
triggers:
  - cost controlling
  - token budget review
  - reduce agent cost
  - route cost audit
  - tool cost control
activation_triggers:
  - lower token usage
  - audit routing cost
prerequisites:
  - Cost policy and eval thresholds are available
  - Recent route or workflow data is available
  - Target budget is defined
inputs:
  - cost_policy
  - eval_thresholds
  - route_or_workflow_trace
steps:
  - Measure boot token estimate, route table size, budget bands, and tool call counts.
  - Identify eager-loaded content, repeated tool calls, broad connector fetches, and oversized context packs.
  - Recommend lazy-loading, route narrowing, cache eviction, or budget-band changes.
  - Preserve quality gates and high-stakes review requirements while reducing cost.
  - Run cost eval and route eval after changes.
outputs:
  - cost_audit_report
  - optimization_plan
  - budget_policy_updates
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Boot file stays under hard cap
  - Route accuracy does not regress
  - High-stakes gates are preserved
failure_modes:
  - Reducing cost by removing safety checks
  - Loading large registries at startup
  - Optimizing only one prompt instead of task family behavior
handoffs:
  - meta-system.cost-controller
  - meta-system.eval-runner
source_references:
  - ref.github.meta-system.cost-controlling.2026-06-03
  - https://github.com/BerriAI/litellm
allowed_agents:
  - meta-system.cost-controller
status: active
budget_band: standard
rollback:
  - Restore previous cost policy or registry entry
validators:
  - skill.validator
  - cost_eval_passed
---

## Procedure
1. Measure current boot tokens, route size, budget band, and tool use.
2. Identify avoidable eager loading and broad retrieval.
3. Propose lazy-loading or budget changes with expected impact.
4. Preserve routing quality and safety gates.
5. Run cost and route evaluation.
