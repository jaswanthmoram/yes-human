---
id: engineering.snapshot-testing
name: Snapshot Testing Best Practices
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Use snapshot tests correctly — as regression detectors for stable output, not as lazy test shortcuts.
summary: Snapshot testing captures rendered output (UI components, serialized objects, API responses) and fails when it changes unexpectedly. The skill covers when to use snapshots, how to write meaningful ones, and how to avoid the anti-patterns that make snapshot tests useless.
triggers:
  - snapshot test
  - jest snapshot
  - component snapshot
  - toMatchSnapshot
  - snapshot regression test
activation_triggers:
  - how do I snapshot test a component
  - snapshot tests keep failing after minor changes
prerequisites:
  - Jest or Vitest configured
  - component or output to snapshot is stable (not using Date.now() or random IDs)
inputs:
  - component_or_function
  - test_framework
steps:
  - Identify what deserves a snapshot — stable rendered output, not volatile data like dates or IDs
  - Use inline snapshots (toMatchInlineSnapshot) for small, readable outputs; file snapshots for large structures
  - Strip non-deterministic values before snapshotting (mock Date, replace UUIDs with stable placeholders)
  - Write a descriptive test name — the snapshot should be self-documenting
  - On snapshot failures, review the diff carefully — only update (--updateSnapshot) when the change is intentional
  - Commit snapshot files to version control; treat them as code not build artifacts
outputs:
  - snapshot_file
  - updated_snapshot
  - diff_review_report
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - All snapshots are deterministic (no timestamps, random IDs)
  - Inline snapshots used for outputs under 20 lines
  - Snapshot update PRs include explicit description of what changed and why
failure_modes:
  - Snapshots updated blindly with --updateSnapshot without reviewing diff
  - Snapshot files gitignored — defeating the regression purpose
  - Large complex snapshots that make diffs unreadable
handoffs:
  - engineering.code-reviewer (to review snapshot updates)
source_references:
  - https://github.com/facebook/jest
  - https://github.com/nicolo-ribaudo/jest-clean-console-reporter
allowed_agents:
  - engineering.tdd-guide
  - engineering.code-reviewer
status: active
budget_band: micro
rollback:
  - Revert snapshot file to previous committed version
  - Delete auto-generated snapshot file and regenerate from correct state
validators:
  - skill.validator
---
## Trigger
Use when you need to detect unintended changes in component rendering, serialized objects, or CLI output.

## Prerequisites
- Jest/Vitest installed
- Output is deterministic (no random values, timestamps, or UUIDs without mocking)

## Steps

### 1. Choose Snapshot Target
Good candidates: React component trees, serialized config objects, CLI help text, API response shapes (with IDs mocked). Bad candidates: anything with timestamps, random IDs, or dynamic data.

### 2. Mock Non-Deterministic Values
Mock `Date.now()`, `Math.random()`, UUID generators. Replace with fixed values before snapshotting.

### 3. Write the Snapshot Test
Use `toMatchInlineSnapshot()` for small outputs — they live in the test file and are always visible. Use file snapshots for large structures only.

### 4. Review First Snapshot
When creating for the first time, run once to generate, then read the snapshot. If it looks wrong, fix the component — don't accept a wrong snapshot.

### 5. Handle Updates
When the snapshot changes intentionally (new feature, design change), run `jest --updateSnapshot`, read the diff, write a meaningful commit message explaining the change.

### 6. CI Configuration
Never auto-update snapshots in CI. Fail on any snapshot mismatch. Updates must be explicit developer decisions.

## Verification
- [ ] All snapshots deterministic
- [ ] Snapshot files committed to git
- [ ] No --updateSnapshot in CI config

## Rollback
`git checkout -- src/__snapshots__/` to restore previous snapshots.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Snapshots always fail in CI | Timestamps in output | Mock Date.now() |
| 5000-line snapshot diffs | Snapshotting entire app tree | Use shallow rendering |
| Snapshots updated without review | --updateSnapshot in CI | Remove from CI |

## Examples
**Example A:** Button component snapshot captures rendered HTML — fails when classname changes.
**Example B:** Config serializer snapshot detects when a new required field is added to output.
