# Antigravity Export Guide

The Antigravity adapter exports yes-human workflows into unified `agents.md`, skills files, and workflow checklist files.

## Usage

Export using the CLI:

```bash
yes export antigravity ./output-directory
```

This generates:
* `agents.md` (Agent specifications)
* `skills/code-review/SKILL.md`
* `skills/bug-fix/SKILL.md`
* `skills/feature-builder/SKILL.md`
* `skills/repo-analyzer/SKILL.md`
* `skills/security-review/SKILL.md`
* `workflows/feature-build.md`
* `workflows/test-and-validate.md`
* `workflows/debug-and-fix.md`
