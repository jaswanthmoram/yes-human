---
id: engineering.refactor-planning
name: Refactoring Strategy and Execution
version: 1.0.0
domain: engineering
category: engineering.refactoring
purpose: Plan and execute code refactoring to improve maintainability without changing behavior.
summary: Guides through identifying refactoring opportunities, planning safe refactoring steps, and verifying behavior preservation.
triggers:
  - refactor code structure
  - improve code organization
  - code cleanup and refactoring
  - reduce technical debt in code
  - restructure code architecture
activation_triggers:
  - refactor this
  - clean up the code
  - make it cleaner
prerequisites:
  - comprehensive test suite
  - understanding of current code structure
inputs:
  - code_to_refactor
  - refactoring_goals
  - test_coverage_status
steps:
  - Identify code smells and refactoring opportunities
  - Ensure adequate test coverage before refactoring
  - Plan refactoring steps (small, incremental changes)
  - Apply refactoring patterns (extract method, rename, etc.)
  - Run tests after each refactoring step
  - Verify behavior is preserved
  - Document changes
outputs:
  - refactoring_plan
  - refactored_code
  - test_results
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly (run tests)
  - code_graph.query
quality_gates:
  - All tests pass after refactoring
  - No behavior changes
  - Code complexity reduced
failure_modes:
  - Changing behavior during refactoring
  - Not running tests after changes
  - Making too many changes at once
  - Not having adequate test coverage
handoffs:
  - engineering.testing-unit (to add tests if coverage is low)
  - engineering.code-reviewer (to review refactored code)
source_references:
  - ref.github.refactoring-patterns.2026-06-01
allowed_agents:
  - engineering.refactoring
  - engineering.code-quality
allowed_workflows:
  - engineering.refactoring-campaign
status: active
budget_band: standard
rollback:
  - Revert to previous version using version control
validators:
  - skill.validator
---

## Trigger
Use this skill when improving code structure, reducing technical debt, or cleaning up code without changing functionality.

## Prerequisites
- Comprehensive test suite (or ability to add tests)
- Version control for easy rollback
- Understanding of current code structure

## Steps
1. **Identify Code Smells**:
   - Long methods (>50 lines)
   - Large classes (>500 lines)
   - Duplicated code
   - Complex conditionals
   - Poor naming
   - High coupling
2. **Ensure Test Coverage**:
   - Run existing tests to establish baseline
   - Add tests for uncovered critical paths
   - Verify all tests pass before starting
3. **Plan Refactoring Steps**:
   - Break into small, incremental changes
   - Each step should be independently testable
   - Prioritize by impact and risk
4. **Apply Refactoring Patterns**:
   - Extract Method: Break long methods into smaller ones
   - Rename: Improve variable/function names
   - Extract Class: Split large classes
   - Replace Conditional with Polymorphism
   - Introduce Parameter Object
5. **Test After Each Step**:
   - Run full test suite after each refactoring
   - Fix any failures immediately
   - Do not proceed if tests fail
6. **Verify Behavior**:
   - Compare outputs before and after
   - Run integration tests
   - Manual testing for critical paths
7. **Document Changes**:
   - Update comments if structure changed significantly
   - Document the "why" behind refactoring decisions

## Verification
- All tests pass
- Code complexity metrics improved (cyclomatic complexity, lines of code)
- No behavior changes (verified by tests)
- Code review approved

## Rollback
- Use version control to revert: `git revert <commit>`
- Or checkout previous version: `git checkout HEAD~1 <file>`

## Common Failures
- Refactoring without tests (can't verify behavior preservation)
- Making too many changes at once (hard to debug if tests fail)
- Changing behavior while refactoring (mixing refactoring with bug fixes)
- Not running tests after each step

## Examples
### Refactoring a Long Method
Input: 200-line method with multiple responsibilities
Output:
- Extract validation logic into `validateInput()` method
- Extract processing logic into `processData()` method
- Extract formatting logic into `formatOutput()` method
- Main method now orchestrates: validate → process → format
- All tests still pass
- Cyclomatic complexity reduced from 25 to 8

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
