---
id: graph-build
name: Code Graph Build
version: 1.0.0
maps_to:
  kind: workflow
  ref: meta-system.graph-builder
description: Build or refresh the local code graph index for the current repository.
---

# /graph-build

Build or refresh the local code graph index for the current repository.

## Usage

```
/graph-build
```

## Inputs

repo_path

## Outputs

graph_manifest

- stats

## Workflow

Routes through `yes route` to activate the `meta-system.graph-builder` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes

- This command is a shim over the `meta-system.graph-builder` workflow.
- Run `yes route "graph-build" --dry-run` to inspect the routing before execution.
