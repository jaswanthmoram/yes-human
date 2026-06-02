---
id: engineering.git-bisect
name: Git Bisect Bug Hunting
version: 1.0.0
domain: engineering
category: engineering.debugging
purpose: Use git bisect to efficiently locate the commit that introduced a bug or regression.
summary: Systematic binary search through git history to pinpoint the exact commit that introduced a defect.
triggers:
  - git bisect
  - find bug commit
  - when did this break
  - regression hunt
  - which commit broke it
  - binary search commits
  - locate breaking commit
aliases:
  - bisect
  - bug hunt
  - regression search
negative_keywords:
  - build failure
  - test triage
  - code review
inputs:
  - known_good_commit
  - known_bad_commit
  - test_command (optional)
  - reproduction_steps (optional)
outputs:
  - offending_commit
  - commit_author
  - commit_message
  - fix_recommendation
allowed_tools:
  - shell.readonly (git bisect, git log, git show)
  - filesystem.read (inspect changed files)
required_skills:
  - engineering.git-workflow
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - Selecting wrong good/bad boundary commits
  - Non-deterministic bugs producing false results
  - Skipping commits that fail to build
  - Not automating the test for reproducibility
verification:
  - Bisect identifies a single commit
  - Reverting or fixing that commit resolves the issue
  - Test command passes on good commit and fails on bad
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - git bisect reset returns to original branch state
validators:
  - skill.validator
---

## Mission
Efficiently locate the exact commit that introduced a bug using git bisect's binary search, reducing a potentially large search space to a single offending commit in logarithmic steps.

## When To Use
- A regression has been identified and the introducing commit is unknown
- Tests pass on an older version but fail on current HEAD
- You need to find when a specific behavior changed
- The commit range is large (dozens to hundreds of commits)

## When Not To Use
- The bug is non-deterministic or flaky (bisect results will be unreliable)
- You already know which commit caused the issue
- The codebase has been heavily refactored making old commits unbuildable
- The bug was introduced by an external dependency change, not a code commit

## Procedure
1. **Identify Boundary Commits**: Find a known-good commit where the bug does not exist and a known-bad commit (usually HEAD) where it does.
   ```
   git log --oneline -20
   ```
2. **Start Bisect**: Initialize git bisect with the bad and good commits.
   ```
   git bisect start
   git bisect bad <bad-commit>
   git bisect good <good-commit>
   ```
3. **Test the Midpoint**: Git checks out the midpoint commit. Run your test or reproduction steps to determine if it is good or bad.
4. **Mark and Continue**: Mark the commit as good or bad. Git will narrow the range.
   ```
   git bisect good  # or: git bisect bad
   ```
5. **Automate with Run** (preferred): Use `git bisect run` with a test script for automated binary search.
   ```
   git bisect run ./test-script.sh
   ```
6. **Identify the Commit**: When bisect completes, it reports the first bad commit with author, date, and message.
7. **Reset**: Always clean up after bisect.
   ```
   git bisect reset
   ```

## Tool Policy
- Use `shell.readonly` for all git commands (bisect does not modify tracked files)
- Use `filesystem.read` to inspect files at midpoint commits
- Never force-push or modify history during a bisect session

## Verification
- `git bisect log` shows a clean binary search path
- The identified commit, when reverted, resolves the bug
- The test script used with `git bisect run` exits 0 on good and non-zero on bad

## Failure Modes
- **Flaky bugs**: Non-deterministic failures produce inconsistent good/bad markings. Mitigation: run the test multiple times per commit or use `git bisect skip`.
- **Unbuildable commits**: Midpoint commits may not compile. Mitigation: use `git bisect skip` for unbuildable commits or write a test script that handles build failures.
- **Wrong boundaries**: If the "good" commit already has the bug, bisect will not find it. Mitigation: verify both boundary commits before starting.

## Example Routes
- "find which commit broke the login page" -> `git bisect` with HEAD as bad and last known working tag as good
- "when did the performance regression happen" -> `git bisect run` with a benchmark script that exits non-zero above a threshold
- "this test used to pass last month" -> `git bisect` with current HEAD bad and a commit from last month as good

## Source Notes
- Based on official Git documentation for `git bisect`
- Patterns adapted from engineering debugging workflows
- Reference: ref.github.engineering.2026-05-31
