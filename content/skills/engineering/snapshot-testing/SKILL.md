---
id: engineering.snapshot-testing
name: Snapshot Testing Patterns
description: Implement and maintain snapshot tests for UI components, serialized data, and API responses with effective update strategies.
triggers:
  - snapshot testing
  - snapshot test
  - visual regression
  - snapshot update
  - component snapshot
  - serialized output test
  - snapshot diff
aliases:
  - snapshot test
  - visual snapshot
  - output snapshot
negative_keywords:
  - visual testing
  - screenshot testing
  - pixel comparison
  - e2e testing
inputs:
  - components_or_outputs
  - existing_snapshots (optional)
  - rendering_context (optional)
  - snapshot_config (optional)
outputs:
  - snapshot_files
  - snapshot_test_cases
  - update_strategy
  - snapshot_health_report
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 6000
failure_modes:
  - Blindly updating snapshots without reviewing diffs
  - Snapshot tests that capture implementation details instead of behavior
  - Large snapshot files that are hard to review in PRs
  - Non-deterministic snapshots from dynamic content
verification:
  - Snapshots are deterministic across runs
  - Snapshot diffs in PRs are reviewed for unintended changes
  - Snapshot size is reasonable for code review
  - No dynamic content (timestamps, UUIDs) in snapshots
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Implement effective snapshot testing strategies that catch unintended changes while maintaining manageable snapshot files and clear update workflows.

## When To Use
- Testing UI component rendering output
- Verifying serialized data structures (JSON, XML) remain stable
- Catching unintended changes in API response shapes
- Testing complex string output (emails, reports, CLI output)
- Regression testing for refactoring without changing behavior

## When Not To Use
- Visual/pixel-level screenshot comparison (use visual testing tools)
- E2E testing of user flows
- Testing highly dynamic content that changes every render
- Performance benchmarking

## Procedure
1. **Identify Snapshot Targets**: Determine which components, outputs, or data structures benefit from snapshot testing. Prioritize stable, complex outputs over simple ones.
2. **Configure Snapshot Settings**: Set up snapshot serializer for clean output. Configure snapshot file location and naming. Set up custom serializers to exclude dynamic values.
3. **Write Snapshot Tests**: Create tests that render or serialize the target and compare against stored snapshot. Use descriptive test names. Include setup context in test description.
4. **Handle Dynamic Content**: Replace timestamps, UUIDs, and random values with stable placeholders. Use custom serializers for known dynamic fields.
5. **Review Snapshot Diffs**: On snapshot update, review every line of the diff. Understand why each change occurred. Reject updates that capture unintended changes.
6. **Manage Snapshot Size**: Use shallow rendering for component snapshots. Split large snapshots into focused sub-snapshots. Consider inline snapshots for small outputs.
7. **Establish Update Workflow**: Require snapshot updates in PRs with diff review. Never auto-update snapshots in CI. Document snapshot update process for the team.

## Tool Policy
- Use filesystem.read/write for snapshot files and test code
- Use shell.readonly to run snapshot tests and generate diffs
- Use code_graph.query to trace component dependencies affecting snapshots
- Follow Jest/Vitest snapshot conventions for the project

## Verification
- Snapshot tests are deterministic (same input produces same snapshot)
- No dynamic content appears in snapshot files
- Snapshot diffs are reviewed in every PR that modifies them
- Snapshot file sizes are reasonable for code review

## Failure Modes
- Running `--updateSnapshot` without reviewing the diff
- Snapshots that capture internal state instead of rendered output
- Non-deterministic snapshots from Date.now() or Math.random()
- Snapshot files growing too large to review effectively

## Example Routes
- `add snapshot tests for components` -> engineering.snapshot-testing
- `snapshot test failed, what changed` -> engineering.snapshot-testing
- `set up snapshot testing` -> engineering.snapshot-testing

## Source Notes
Snapshot testing patterns from Jest documentation, Testing Library best practices, and component testing strategies. Serializer patterns from jest-serializer and custom serializer documentation. Reference dossier: `ref.github.engineering.2026-05-31`.
