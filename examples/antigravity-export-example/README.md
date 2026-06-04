# Antigravity Exporter Example

This example demonstrates how to export `yes-human` pack registries into configuration surfaces compatible with the Google Antigravity SDK.

---

## Synchronization Command

To compile and export the workflows, run:

```bash
# Run export command targeting this folder
npx yes export antigravity ./examples/antigravity-export-example
```

This reads the active workflows and creates:
- `agents.md` (team definition mappings)
- `skills/` (role skill markdown files)
- `workflows/` (execution flow templates)

## File Tree Example
```
.
├── agents.md
├── skills/
│   ├── bug-fix/
│   │   └── SKILL.md
│   ├── code-review/
│   │   └── SKILL.md
│   ├── feature-builder/
│   │   └── SKILL.md
│   ├── repo-analyzer/
│   │   └── SKILL.md
│   └── security-review/
│       └── SKILL.md
└── workflows/
    ├── debug-and-fix.md
    ├── feature-build.md
    └── test-and-validate.md
```

## How to Use in Antigravity

Google Antigravity controllers read the `agents.md` file to learn how to structure its autonomous development agents (Reviewer, Builder, Architect).
* The skills under `skills/` configure individual agent prompts.
* The sequential steps under `workflows/` define linear execution checkpoints that the Antigravity controller must fulfill and validate before completing a user-assigned task.
