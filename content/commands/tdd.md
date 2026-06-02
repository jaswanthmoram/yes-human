---
id: tdd
name: TDD Workflow
version: 1.0.0
maps_to:
  kind: workflow
  ref: engineering.tdd-feature
description: Start a red-green-refactor TDD cycle for a feature or bug fix.
---

# /tdd

Start a red-green-refactor TDD cycle for a feature or bug fix.

## Usage

```
/tdd
```

## Inputs
task_description
- test_command

## Outputs
failing_test
- implementation
- verification_summary

## Workflow
Routes through `yes route` to activate the `engineering.tdd-feature` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes
- This command is a shim over the `engineering.tdd-feature` workflow.
- Run `yes route "tdd" --dry-run` to inspect the routing before execution.
