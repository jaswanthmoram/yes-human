---
id: engineering.git-workflow
name: Branch Strategy and Commit Discipline
version: 1.0.0
domain: engineering
category: engineering.dev-workflow
purpose: Implement effective Git workflows with proper branching strategies and commit discipline.
summary: Guides through branch management, commit message conventions, and merge strategies for clean history.
triggers:
  - what branching strategy should we use
  - git workflow
  - branch strategy
  - commit message
  - merge strategy
  - git best practices
activation_triggers:
  - how to branch
  - commit convention
  - git flow
prerequisites:
  - Git installed and configured
  - access to repository
inputs:
  - repository_type (monorepo, multi-repo)
  - team_size
  - release_frequency
  - existing_workflow (optional)
steps:
  - Choose appropriate branching strategy (Git Flow, GitHub Flow, Trunk-Based)
  - Define branch naming conventions
  - Establish commit message format (Conventional Commits, etc.)
  - Set up branch protection rules
  - Define merge strategy (merge commit, squash, rebase)
  - Configure CI/CD to work with branch strategy
  - Document the workflow for the team
outputs:
  - branching_strategy
  - commit_convention
  - merge_strategy
  - workflow_documentation
tools:
  - shell.readonly (git commands)
  - filesystem.write (documentation)
quality_gates:
  - Clear branch naming convention
  - Consistent commit messages
  - Protected main/master branch
  - Documented workflow
failure_modes:
  - Inconsistent branch naming
  - Poor commit messages ("fix stuff")
  - Merge conflicts from long-lived branches
  - No branch protection on main
handoffs:
  - platform.ci-cd-engineer (to configure CI for branches)
  - engineering.dev-workflow (for workflow enforcement)
source_references:
  - ref.github.git-workflow-best-practices.2026-06-01
allowed_agents:
  - engineering.dev-workflow
  - engineering.master
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback (documentation only)
validators:
  - skill.validator
---

## Trigger
Use this skill when setting up Git workflows, defining branching strategies, or establishing commit conventions.

## Prerequisites
- Git installed and configured
- Access to the repository
- Understanding of team size and release frequency

## Steps
1. **Choose Branching Strategy**:
   - **Git Flow**: For projects with scheduled releases (develop, feature, release, hotfix branches)
   - **GitHub Flow**: For continuous deployment (main + feature branches)
   - **Trunk-Based Development**: For high-frequency releases (main + short-lived feature branches)
2. **Define Branch Naming**:
   - Feature branches: `feature/<description>` or `feat/<ticket>-<description>`
   - Bug fixes: `fix/<description>` or `bugfix/<ticket>-<description>`
   - Hotfixes: `hotfix/<description>`
   - Use lowercase and hyphens: `feature/add-user-auth` not `feature/AddUserAuth`
3. **Establish Commit Convention**:
   - **Conventional Commits**: `type(scope): description`
     - `feat: add user authentication`
     - `fix: resolve login timeout issue`
     - `docs: update API documentation`
     - `refactor: extract validation logic`
     - `test: add unit tests for auth module`
   - Keep commits atomic (one logical change per commit)
   - Write imperative mood: "add feature" not "added feature"
4. **Set Up Branch Protection**:
   - Protect main/master branch
   - Require pull request reviews
   - Require status checks to pass
   - Prevent force pushes
5. **Define Merge Strategy**:
   - **Merge Commit**: Preserves full history (good for Git Flow)
   - **Squash Merge**: Clean linear history (good for GitHub Flow)
   - **Rebase**: Linear history without merge commits (requires force push)
6. **Configure CI/CD**:
   - Run tests on all branches
   - Deploy from main/master only (or release branches)
   - Require CI to pass before merge
7. **Document the Workflow**:
   - Create CONTRIBUTING.md
   - Include examples of good commit messages
   - Document the review process

## Verification
- Branch protection rules are active
- CI runs on all branches
- Team follows commit convention
- No force pushes to protected branches

## Rollback
- No state changes; this is a configuration and documentation skill

## Common Failures
- Long-lived feature branches that accumulate merge conflicts
- Poor commit messages that don't explain "why"
- No branch protection on main branch
- Inconsistent naming conventions across team
- Merging without code review

## Examples
### Setting Up GitHub Flow
Input: Small team, continuous deployment
Output:
- Branching: main + feature branches
- Naming: `feature/<description>` (e.g., `feature/add-search`)
- Commits: Conventional Commits format
- Merge: Squash merge to keep linear history
- Protection: Require 1 review + CI pass
- CI: Run tests on all branches, deploy from main

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
