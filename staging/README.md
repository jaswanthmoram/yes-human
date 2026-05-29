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
