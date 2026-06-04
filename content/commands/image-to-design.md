---
id: image-to-design
name: UI Image to Design Spec
version: 1.0.0
maps_to:
  kind: workflow
  ref: design-content.image-to-design-spec
description: Extract component architecture and design tokens from a screenshot to build a DESIGN.md spec.
---

# /image-to-design

Deconstruct a UI screenshot into design layout sections, typography specs, color scales, and spacing tokens to build a `DESIGN.md` specification.

## Usage

```
/image-to-design <image_path>
```

## Inputs

- `image_path` (required): Absolute path to the UI screenshot image.
- `brand_context` (optional): Brand styling constraints.

## Outputs

- `design_md`: DESIGN.md file output detailing structure, visual rules, and typography size tokens.
- `a11y_notes`: Accessibility contrast guidelines and structure notes.

## Workflow

Routes through `yes route` to activate the `design-content.image-to-design-spec` workflow.
All policy gates (pre-route, pre-write, post-tool, on-task-complete) apply.
