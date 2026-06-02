---
id: engineering.ide-shortcuts
name: IDE Productivity Shortcuts
version: 1.0.0
domain: engineering
category: engineering.productivity
purpose: Maximize developer productivity through effective use of IDE shortcuts, commands, and productivity features.
summary: Comprehensive reference for VS Code, JetBrains, and Vim/Neovim shortcuts, multi-cursor editing, navigation, and refactoring commands.
triggers:
  - IDE shortcuts
  - keyboard shortcut
  - VS Code tips
  - JetBrains shortcuts
  - editor productivity
  - vim motions
  - multi cursor
aliases:
  - shortcuts
  - hotkeys
  - keybindings
negative_keywords:
  - code generation
  - debugging
  - deployment
inputs:
  - ide_type (vscode, jetbrains, vim, neovim)
  - task_category (navigation, editing, refactoring, debugging)
  - language (optional)
outputs:
  - shortcut_reference
  - workflow_optimization
  - custom_keybinding_suggestions
allowed_tools:
  - filesystem.read (read keybinding configs)
  - filesystem.write (write custom keybindings)
required_skills: []
budget_band: micro
max_context_tokens: 3000
failure_modes:
  - Shortcut conflicts with OS or other extensions
  - Muscle memory interference between different IDEs
  - Custom keybindings not syncing across machines
  - Extension overriding default shortcuts
verification:
  - Shortcuts perform expected actions in the target IDE
  - No conflicts with existing keybindings
  - Custom keybindings are properly saved and synced
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert keybinding changes via IDE settings or version control
validators:
  - skill.validator
---

## Mission
Accelerate development workflow by leveraging IDE shortcuts and features that eliminate mouse usage and repetitive actions.

## When To Use
- Setting up a new development environment and wanting efficient keybindings
- Learning a new IDE or editor
- Optimizing repetitive editing tasks (multi-cursor, snippets)
- Improving code navigation speed (go to definition, find references)
- Creating custom keybindings for frequently used commands

## When Not To Use
- When the task requires visual interaction (design tools, GUI debuggers)
- When working in a terminal-only environment without an IDE
- When the team uses diverse IDEs and standardization is not feasible
- When learning the basics of a programming language (focus on concepts first)

## Procedure
1. **Identify Target IDE**: Determine which editor the developer uses (VS Code, JetBrains, Vim/Neovim) and their current proficiency level.
2. **Audit Current Workflow**: Identify the most frequent actions (navigation, editing, running tests) that could benefit from shortcuts.
3. **Map Essential Shortcuts**:
   - **Navigation**: Go to file (`Ctrl+P`), go to symbol (`Ctrl+Shift+O`), go to definition (`F12`), find references (`Shift+F12`)
   - **Editing**: Multi-cursor (`Ctrl+D`), move line (`Alt+Up/Down`), duplicate line (`Shift+Alt+Down`), toggle comment (`Ctrl+/`)
   - **Refactoring**: Rename symbol (`F2`), extract method, quick fix (`Ctrl+.`)
   - **Search**: Find in files (`Ctrl+Shift+F`), regex search, replace across files
4. **Configure Custom Keybindings**: Create or update keybinding configurations for project-specific commands.
5. **Set Up Snippets**: Define code snippets for frequently typed patterns (boilerplate, test templates, API calls).
6. **Practice Key Sequences**: Build muscle memory through deliberate practice of the most impactful shortcuts.
7. **Sync Across Machines**: Configure settings sync or version-controlled keybinding files for consistency.

## Tool Policy
- Use `filesystem.read` to inspect existing keybinding configurations
- Use `filesystem.write` to create or update custom keybinding files
- Never modify IDE extensions or system-level configurations without explicit request

## Verification
- Shortcuts execute the intended commands without conflicts
- Custom keybindings are loaded and active in the IDE
- Developer can perform target actions without mouse usage

## Failure Modes
- **Keybinding conflicts**: Extensions or OS shortcuts override IDE shortcuts. Mitigation: check for conflicts in IDE keybinding UI and reassign.
- **Sync issues**: Custom keybindings not transferring to other machines. Mitigation: use IDE settings sync or store keybindings in dotfiles.
- **Over-customization**: Too many custom bindings create confusion. Mitigation: start with defaults, customize only high-frequency actions.

## Example Routes
- "set up VS Code for TypeScript development" -> Essential shortcuts for navigation, refactoring, and debugging TypeScript
- "I keep using the mouse to switch files" -> File navigation shortcuts: `Ctrl+P`, `Ctrl+Tab`, breadcrumbs
- "how do I edit multiple lines at once" -> Multi-cursor: `Ctrl+D` (select next), `Ctrl+Shift+L` (select all), `Alt+Click` (add cursor)

## Source Notes
- Based on official VS Code, JetBrains, and Neovim documentation
- Productivity patterns from engineering workflow optimization guides
- Reference: ref.github.engineering.2026-05-31
