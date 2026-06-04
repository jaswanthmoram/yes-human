# Changelog & Versioning

All package exports and routing schemas follow semantic versioning standards.

## [2.4.0] - 2026-06-04
### Added
* Refactored workspace packages `@yes-human/core`, `@yes-human/runtime`, `@yes-human/packs`, `@yes-human/adapters`, `@yes-human/cli`, and `@yes-human/doc-tools` into strict TS packages.
* Added `default-pack` containing exactly 10 workflows to optimize token context size during startup.
* Introduced benchmarking commands (`yes bench`).
* Integrated Codex and Antigravity exporters.
* Created React local application example.
* Removed Python dependencies from the default core install path.
