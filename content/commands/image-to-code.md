---
id: image-to-code
name: UI Image to Code
version: 1.0.0
maps_to:
  kind: workflow
  ref: design-content.image-to-ui-code
description: Deconstruct screenshot, annotate subcomponents using parallel subagents, and generate frontend code.
---

# /image-to-code

Decompose a screenshot into components, run parallel annotation passes via multiple specialist subagents (2-5), and generate responsive web UI code.

## Usage

```
/image-to-code <image_path> [--target <framework>]
```

## Inputs

- `image_path` (required): Absolute path to the UI screenshot image.
- `target_framework` (optional): html/css, react/tailwind, nextjs/scss.

## Outputs

- `component_annotations`: JSON mapping the component layout coordinate boundaries.
- `generated_code`: CSS/HTML code structure matching visual appearance of the screenshot.

## Workflow

Routes through `yes route` to activate the `design-content.image-to-ui-code` workflow.
All policy gates (pre-route, pre-write, post-tool, on-task-complete) apply.
