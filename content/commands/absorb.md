---
id: absorb
name: Source Absorb
version: 1.0.0
maps_to:
  kind: workflow
  ref: meta-system.source-mine-and-dossier
description: Stage an external source through the license gate and produce a dossier.
---

# /absorb

Stage an external source through the license gate and produce a dossier.

## Usage

```
/absorb
```

## Inputs

source_url_or_path

## Outputs

staged_manifest

- dossier_template

## Workflow

Routes through `yes route` to activate the `meta-system.source-mine-and-dossier` workflow.
All policy gates (pre-route, pre-tool, pre-write) apply.

## Notes

- This command is a shim over the `meta-system.source-mine-and-dossier` workflow.
- Run `yes route "absorb" --dry-run` to inspect the routing before execution.
