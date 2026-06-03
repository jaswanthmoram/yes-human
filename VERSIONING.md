# Versioning Policy

Yes-human follows [Semantic Versioning](https://semver.org/) (semver) for all releases.

## Version Format

`MAJOR.MINOR.PATCH`

- **MAJOR** — Breaking changes to the routing schema, registry format, hook contract, or host bundle structure.
- **MINOR** — New agents, skills, workflows, routes, host targets, or backward-compatible CLI features.
- **PATCH** — Bug fixes, documentation corrections, dependency updates, and non-breaking improvements.

## Pre-release Versions

Pre-release versions use the format `MAJOR.MINOR.PATCH-alpha.N` or `MAJOR.MINOR.PATCH-beta.N`.

## What Counts As A Breaking Change

- Changing the JSON schema for agents, skills, workflows, or routes in a way that invalidates existing content.
- Removing or renaming a CLI command or flag.
- Changing the hook contract (inputs/outputs) in a way that breaks existing hooks.
- Changing the host bundle structure in a way that breaks existing adapters.

## Release Process

1. Update `CHANGELOG.md` with the new version entry.
2. Bump the version in `package.json`.
3. Run the full verification gate.
4. Create a git tag: `git tag v2.X.0`.
5. Push the tag: `git push origin v2.X.0`.
6. The release workflow creates a GitHub Release automatically.

## Content Versioning

Individual agents, skills, and workflows carry their own `version` field in frontmatter. Content versions are independent of the project version and follow semver within each artifact.
