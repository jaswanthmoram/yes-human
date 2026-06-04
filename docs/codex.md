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

## Plugin Registry

`registry/codex-plugins.json` includes yes-human itself as `codex.yes-human`, alongside imported Codex plugin metadata. The entry keeps activation lazy and points back to the OSS core registries instead of duplicating the 325-agent catalog inside the Codex plugin list.
