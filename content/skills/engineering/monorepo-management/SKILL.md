---
id: engineering.monorepo-management
name: Monorepo Tooling and Patterns
version: 1.0.0
domain: engineering
category: engineering.architecture
purpose: Design, implement, and maintain monorepo structures using modern tooling for scalable multi-package development.
summary: Guide to monorepo architecture patterns, tooling selection (Turborepo, Nx, Bazel, Lerna), dependency management, and build orchestration.
triggers:
  - monorepo setup
  - monorepo tooling
  - turborepo
  - nx workspace
  - bazel build
  - multi-package repo
  - workspace management
aliases:
  - monorepo
  - workspace
  - multi-package
negative_keywords:
  - microservices architecture
  - single package
  - deployment
inputs:
  - repo_structure (existing or planned)
  - package_count
  - build_system (npm, yarn, pnpm)
  - tooling_preference (optional)
outputs:
  - monorepo_structure
  - tooling_configuration
  - dependency_graph
  - build_pipeline
allowed_tools:
  - shell.readonly (inspect repo structure, run builds)
  - shell.write (install tooling, configure workspaces)
  - filesystem.read (read configs, package.json files)
  - filesystem.write (create configs, update workspaces)
required_skills:
  - engineering.git-workflow
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Circular dependencies between packages
  - Slow builds from not using incremental caching
  - Overly coupled packages defeating monorepo benefits
  - Tooling configuration drift across packages
verification:
  - All packages build successfully
  - Dependency graph has no cycles
  - Incremental builds skip unchanged packages
  - CI pipeline builds only affected packages
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert tooling configuration changes via version control
validators:
  - skill.validator
---

## Mission
Establish a well-structured, performant monorepo that enables independent package development with shared tooling, consistent builds, and efficient CI/CD.

## When To Use
- Setting up a new project with multiple related packages
- Migrating multiple repositories into a single monorepo
- Experiencing slow builds or inconsistent tooling across packages
- Needing shared dependencies, configs, or utilities across packages
- Scaling a team that works on interconnected libraries and applications

## When Not To Use
- Single-package projects with no foreseeable multi-package needs
- Packages with vastly different release cadences and no shared code
- Teams that need fully independent deployment pipelines per service
- When the organization mandates separate repositories for compliance

## Procedure
1. **Assess Current Structure**: Analyze existing packages, their dependencies, and build requirements to determine monorepo suitability.
2. **Choose Tooling**:
   - **Turborepo**: Lightweight, fast, great for npm/pnpm workspaces with incremental builds
   - **Nx**: Feature-rich, supports multiple languages, powerful dependency graph and code generation
   - **Bazel**: Best for very large repos with hermetic builds and multi-language support
   - **Lerna**: Package publishing and versioning (often combined with Turborepo or Nx)
3. **Define Workspace Structure**:
   ```
   packages/       # shared libraries
   apps/           # applications
   tools/          # build scripts, linters
   configs/        # shared configs (tsconfig, eslint)
   ```
4. **Configure Workspaces**: Set up package manager workspaces (npm/yarn/pnpm) to link local packages.
5. **Set Up Build Pipeline**: Configure task orchestration with dependency-aware build ordering and caching.
6. **Establish Dependency Rules**: Define and enforce boundaries between packages (e.g., apps can depend on packages, but not vice versa).
7. **Configure CI for Affected Builds**: Set up CI to build and test only packages affected by changes using tooling graph analysis.

## Tool Policy
- Use `shell.readonly` for inspecting structure and running analysis
- Use `shell.write` for installing tooling and configuring workspaces
- Use `filesystem.read` and `filesystem.write` for configuration files
- Always verify builds after configuration changes

## Verification
- `turbo build` (or equivalent) succeeds for all packages
- `turbo build --filter=<package>` builds only the affected package and its dependencies
- Dependency graph visualization shows no circular dependencies
- CI pipeline completes in reasonable time with affected-only builds

## Failure Modes
- **Circular dependencies**: Package A depends on B which depends on A. Mitigation: use dependency graph tools to detect and refactor.
- **Build cache invalidation**: Stale caches cause incorrect builds. Mitigation: configure proper cache keys based on file hashes.
- **Dependency hoisting issues**: Wrong versions hoisted to root. Mitigation: use pnpm for strict dependency isolation or configure nohoist.
- **Slow CI**: Building all packages on every PR. Mitigation: use affected-only builds with proper change detection.

## Example Routes
- "set up a Turborepo for our React app and shared UI library" -> Turborepo with pnpm workspaces, shared tsconfig, and incremental builds
- "migrate 5 repos into one monorepo" -> Nx workspace setup with package extraction, dependency remapping, and CI migration
- "our monorepo builds take 30 minutes" -> Turborepo caching, affected-only CI, and parallel task execution

## Source Notes
- Based on official Turborepo, Nx, and Bazel documentation
- Patterns from large-scale monorepo implementations (Google, Meta, Vercel)
- Reference: ref.github.engineering.2026-05-31
