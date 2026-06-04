# Codex Export Guide

The Codex adapter exports yes-human workflows to `.codex/skills/` markdown specifications, helping Codex AI tools remain aligned with standard developer instructions.

## Usage

Export using the CLI:

```bash
yes export codex ./output-directory
```

This generates:
* `AGENTS.md` (Workflow dispatcher and prompt trigger mappings)
* `.codex/skills/code-review/SKILL.md`
* `.codex/skills/bug-fix/SKILL.md`
* `.codex/skills/security-review/SKILL.md`
* `.codex/skills/test-generator/SKILL.md`
