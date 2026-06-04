---
id: cost-report
name: Cost and Token Report
version: 1.0.0
maps_to:
  kind: workflow
  ref: meta-system.cost-controller
description: Check startup token budget and context-pack sizes for all budget bands.
---

# /cost-report

Check startup token budget and context-pack sizes for all budget bands.

## Usage

```
/cost-report
```

## Inputs

registry_paths

## Outputs

token_report

- budget_compliance

## Workflow

Routes through `yes route` to activate the `meta-system.cost-controller` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes

- This command is a shim over the `meta-system.cost-controller` workflow.
- Run `yes route "cost-report" --dry-run` to inspect the routing before execution.
