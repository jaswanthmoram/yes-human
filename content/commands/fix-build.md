---
id: fix-build
name: Fix Build Error
version: 1.0.0
maps_to:
  kind: workflow
  ref: engineering.fix-build-error
description: Diagnose and fix a build or compilation failure from logs.
---

# /fix-build

Diagnose and fix a build or compilation failure from logs.

## Usage

```
/fix-build
```

## Inputs

build_log

- changed_files

## Outputs

root_cause

- fix_suggestions
- build_result

## Workflow

Routes through `yes route` to activate the `engineering.fix-build-error` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes

- This command is a shim over the `engineering.fix-build-error` workflow.
- Run `yes route "fix-build" --dry-run` to inspect the routing before execution.
