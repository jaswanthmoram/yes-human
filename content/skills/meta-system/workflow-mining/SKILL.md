---
id: meta-system.workflow-mining
name: Workflow Mining
version: 1.0.0
domain: meta-system
category: meta-system.learning
purpose: Mine repeated traces and successful task patterns into staged workflow candidates without mutating production directly.
summary: Workflow mining finds repeated routes, tool sequences, failures, and success patterns, then stages bounded workflow candidates for review.
triggers:
  - workflow mining
  - mine workflow
  - generate workflow candidate
  - repeated task pattern
  - workflow suggestion
activation_triggers:
  - create workflow from repeated tasks
  - mine traces for workflow ideas
prerequisites:
  - Trace or feedback data is available
  - Learning policy allows staging
  - Production mutation gate is enforced
inputs:
  - trace_data
  - feedback_records
  - learning_policy
steps:
  - Cluster repeated task patterns by route, inputs, tools, and outcome.
  - Identify stable successful sequences and common failure recoveries.
  - Draft workflow candidates with triggers, steps, tools, success criteria, rollback, and source references.
  - Stage candidates for human review instead of writing production registries directly.
  - Run workflow validation before promotion.
outputs:
  - workflow_candidate
  - mining_report
  - review_queue_entry
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Candidate is staged, not auto-promoted
  - Inputs, outputs, rollback, and success criteria are present
  - Source traces are summarized without leaking raw sensitive text
failure_modes:
  - Promoting noisy one-off traces
  - Capturing sensitive raw task text
  - Creating workflows without rollback
handoffs:
  - meta-system.workflow-miner
  - meta-system.workflow-architect
source_references:
  - ref.github.meta-system.workflow-mining.2026-06-03
  - https://github.com/temporalio/samples-typescript
allowed_agents:
  - meta-system.workflow-miner
status: active
budget_band: standard
rollback:
  - Delete staged workflow candidate
validators:
  - skill.validator
  - staging_only_check
---

## Procedure
1. Cluster traces by task family, route, tool sequence, and outcome.
2. Select patterns with repeated success and clear boundaries.
3. Draft workflow candidate with rollback and verification.
4. Stage for review without production mutation.
5. Validate candidate before promotion.
