# IDE & Tooling Adapters

`yes-human` contains adapters to bridge local workflow registries directly to AI coding engines, including Microsoft Codex and the Antigravity SDK.

---

## What Exporters Do

Because AI coding tools rely on structured markdown documentation and instruction folders (often referred to as "skills" or "agents") to understand their capabilities, maintaining these definitions by hand can lead to sync drift. 

Exporters take the compiled JS `PackDefinition` list and write structured config folders, ensuring that your local router configuration is identical to what your IDE AI coding agent sees.

---

## Codex Export

The Codex exporter generates specialized system manifests for Codex workspaces.

### Execution Command
```bash
npx yes export codex ./workspace-dir
```

### Generated File Structure
```
workspace-dir/
├── AGENTS.md
└── .codex/
    └── skills/
        ├── code-review/
        │   └── SKILL.md
        ├── bug-fix/
        │   └── SKILL.md
        ├── security-review/
        │   └── SKILL.md
        └── test-generator/
            └── SKILL.md
```

### Section Headers in SKILL.md
Each generated `SKILL.md` file contains the exact keys:
1. **Purpose**: Goals of the skill.
2. **When to Use**: Target trigger intent.
3. **Workflow Steps**: Bulleted execution sequence.
4. **Input Expectations**: Expected context boundaries.
5. **Output Expectations**: Expected drop-in formats.
6. **Testing/Checklist**: Verification tasks for the developer.
7. **Safety/Quality Rules**: Instructions to redact credentials and avoid placeholders.

---

## Antigravity Export

The Antigravity exporter generates a complete agentic team configuration surface.

### Execution Command
```bash
npx yes export antigravity ./workspace-dir
```

### Generated File Structure
```
workspace-dir/
├── agents.md
├── skills/
│   ├── code-review/
│   │   └── SKILL.md
│   ├── bug-fix/
│   │   └── SKILL.md
│   ├── feature-builder/
│   │   └── SKILL.md
│   ├── repo-analyzer/
│   │   └── SKILL.md
│   └── security-review/
│       └── SKILL.md
└── workflows/
    ├── feature-build.md
    ├── test-and-validate.md
    └── debug-and-fix.md
```

* **`agents.md`**: Defines team structures (Reviewer, Builder, Architect, Tester, Security Reviewer).
* **`skills/`**: Capability markdown docs for each designated team member.
* **`workflows/`**: Linear completion checklists and checkpoints.

---

## Limitations

1. **Static Synchronization**: Exporters do not run continuously in the background. If you add a new workflow, you must re-run the `export` command to synchronize definitions.
2. **One-Way Direction**: Exporters are strictly one-way (JS code -> Markdown configs). Manual edits made inside the exported `SKILL.md` files will be overwritten the next time `npx yes export` is invoked.
3. **LLM Vision Alerting**: While files are written locally, embedded images cannot be transcribed to markdown text. If a workflow includes image references, Codex/Antigravity will require vision-capable models to review them.
