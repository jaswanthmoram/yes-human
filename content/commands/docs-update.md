---
id: docs-update
name: Documentation Update
version: 1.0.0
maps_to:
  kind: workflow
  ref: engineering.docs-update
description: Reconcile documentation with current code behavior after a change.
---

# /docs-update

Reconcile documentation with current code behavior after a change.

## Usage

```
/docs-update
```

## Inputs
changed_files
- existing_docs

## Outputs
updated_docs
- changelog_note

## Workflow
Routes through `yes route` to activate the `engineering.docs-update` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes
- This command is a shim over the `engineering.docs-update` workflow.
- Run `yes route "docs-update" --dry-run` to inspect the routing before execution.
