---
id: review
name: Code Review with Security
version: 1.0.0
maps_to:
  kind: workflow
  ref: engineering.code-review-with-security
description: Review changed code for quality and security issues in parallel.
---

# /review

Review changed code for quality and security issues in parallel.

## Usage

```
/review
```

## Inputs
changed_files
- diff

## Outputs
findings
- severity_ordered_report
- test_gaps

## Workflow
Routes through `yes route` to activate the `engineering.code-review-with-security` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes
- This command is a shim over the `engineering.code-review-with-security` workflow.
- Run `yes route "review" --dry-run` to inspect the routing before execution.
