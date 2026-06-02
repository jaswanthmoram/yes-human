---
id: engineering.documentation-update
name: Documentation Sync with Code
version: 1.0.0
domain: engineering
category: engineering.docs
purpose: Keep documentation synchronized with code changes to ensure accuracy and completeness.
summary: Identifies documentation gaps after code changes and updates docs to reflect current implementation.
triggers:
  - update documentation
  - docs are outdated
  - sync docs with code
  - documentation needs update
  - update README
activation_triggers:
  - update the docs
  - documentation is wrong
  - fix the docs
prerequisites:
  - access to code changes
  - existing documentation structure
inputs:
  - code_changes
  - existing_documentation
  - documentation_format (markdown, jsdoc, etc.)
steps:
  - Identify code changes that affect documentation
  - Review existing documentation for affected areas
  - Update API documentation (parameters, return values, examples)
  - Update README if setup or usage changed
  - Update inline code comments for complex logic
  - Add or update code examples
  - Verify all links and references are valid
  - Run documentation linter if available
outputs:
  - updated_documentation
  - documentation_diff
  - validation_results
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly (run doc linter, check links)
quality_gates:
  - All code changes reflected in docs
  - Examples are accurate and runnable
  - No broken links
  - Consistent terminology
failure_modes:
  - Missing documentation for new features
  - Outdated examples that don't work
  - Inconsistent terminology
  - Broken links or references
handoffs:
  - engineering.code-reviewer (to review doc changes)
  - design-content.technical-writer (for major doc rewrites)
source_references:
  - ref.github.documentation-best-practices.2026-06-01
allowed_agents:
  - engineering.docs-updater
  - engineering.dev-workflow
allowed_workflows:
  - engineering.docs-update
status: active
budget_band: standard
rollback:
  - Revert documentation changes using version control
validators:
  - skill.validator
---

## Trigger
Use this skill when code changes require documentation updates, or when documentation is reported as outdated.

## Prerequisites
- Access to recent code changes (git diff, PR, or commit list)
- Existing documentation structure
- Understanding of documentation format (Markdown, JSDoc, etc.)

## Steps
1. **Identify Affected Documentation**:
   - Check git diff for changed files
   - Identify public APIs that changed
   - Check for new features or breaking changes
   - Review CHANGELOG for recent updates
2. **Review Existing Docs**:
   - Read current documentation for affected areas
   - Check for outdated examples
   - Verify parameter descriptions match implementation
3. **Update API Documentation**:
   - Update function signatures if changed
   - Add new parameters with descriptions
   - Update return value descriptions
   - Add or update JSDoc/TSDoc comments
4. **Update README**:
   - Update installation instructions if dependencies changed
   - Update usage examples if API changed
   - Add new features to feature list
   - Update configuration options
5. **Update Inline Comments**:
   - Add comments for complex logic
   - Update comments that no longer match code
   - Remove obsolete comments
6. **Add/Update Examples**:
   - Ensure examples are runnable
   - Add examples for new features
   - Update examples for changed APIs
7. **Validate Documentation**:
   - Check all links are valid
   - Run documentation linter (if available)
   - Verify code examples compile/run
8. **Review and Commit**:
   - Review changes for clarity and completeness
   - Commit with descriptive message

## Verification
- Documentation linter passes (if available)
- All links are valid (404 check)
- Code examples are runnable
- Peer review approved

## Rollback
- Revert documentation changes: `git checkout HEAD~1 <doc-file>`

## Common Failures
- Forgetting to update examples after API changes
- Not checking if code examples still work
- Using inconsistent terminology
- Missing documentation for edge cases
- Broken links to external resources

## Examples
### Updating API Documentation
Input: Function signature changed from `getUser(id)` to `getUser(id, options)`
Output:
- Update JSDoc: Add `options` parameter with description
- Update README: Add example showing options usage
- Update API reference: Document all option fields
- Add example: `getUser(123, { includePosts: true })`
