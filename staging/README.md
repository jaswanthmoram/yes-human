# Staging

Reference and migration content lives here before normalization and promotion.

| Lane | Purpose |
|------|---------|
| `incoming/` | External reference copies (e.g. ECC). Gitignored by default. |
| `internal/` | Prior systems (e.g. jas-human) awaiting migration inventory. |
| `normalized/` | Schema-validated, deduped artifacts. |
| `reviewed/` | Human or eval-approved candidates. |
| `promoted/` | Ready to copy into `content/` and registries. |
| `rejected/` | Failed license, provenance, or quality gates. |

## OSS absorption operator flow (Phase 10)

1. Stage: `node -e "import('./packages/yes-absorber/index.js').then(m=>m.stage('https://github.com/anthropics/skills'))"`
   Or copy into `staging/incoming/<slug>/` and run license extract manually.
2. Review manifest under `staging/normalized/<slug>/manifest.json`.
3. Promote only after `registry/license-registry.json` allows the license.
4. Apply writes rollback under `staging/rollback/` before touching `content/`.

Example slice (no live apply): `staging/normalized/anthropics-skills/manifest.json`.
