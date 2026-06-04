# Codex Exporter Example

This example demonstrates how to export `yes-human` pack registries into configuration surfaces compatible with the Microsoft Codex system.

---

## Synchronization Command

To compile and export the workflows, run:

```bash
# Run export command targeting this folder
npx yes export codex ./examples/codex-export-example
```

This reads the active workflows and creates:
- `AGENTS.md` (task index map)
- `.codex/skills/code-review/SKILL.md`
- `.codex/skills/bug-fix/SKILL.md`
- `.codex/skills/security-review/SKILL.md`
- `.codex/skills/test-generator/SKILL.md`

## File Tree Example
```
.
├── AGENTS.md
└── .codex/
    └── skills/
        ├── bug-fix/
        │   └── SKILL.md
        ├── code-review/
        │   └── SKILL.md
        ├── security-review/
        │   └── SKILL.md
        └── test-generator/
            └── SKILL.md
```

## How to Use in Codex

Codex parses the `.codex/` directory in your workspace. 
* It reads the `SKILL.md` definitions to learn what skills it has and how to run their steps.
* It uses the `AGENTS.md` as a routing lookup surface to match user commands.
* Whenever a developer asks Codex to execute a task, it refers to these definitions to formulate clean, formatted outputs conforming to the rules specified under `Safety/Quality Rules`.
