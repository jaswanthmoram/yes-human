---
id: eval-route
name: Routing Evaluation
version: 1.0.0
maps_to:
  kind: workflow
  ref: meta-system.route-evaluation
description: Score all routing fixtures and report top-1 accuracy against thresholds.
---

# /eval-route

Score all routing fixtures and report top-1 accuracy against thresholds.

## Usage

```
/eval-route
```

## Inputs
fixtures_path

## Outputs
accuracy_report
- failing_fixtures

## Workflow
Routes through `yes route` to activate the `meta-system.route-evaluation` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes
- This command is a shim over the `meta-system.route-evaluation` workflow.
- Run `yes route "eval-route" --dry-run` to inspect the routing before execution.
