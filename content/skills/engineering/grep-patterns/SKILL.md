---
id: engineering.grep-patterns
name: Advanced Grep and Search Patterns
version: 1.0.0
domain: engineering
category: engineering.search
purpose: Use advanced grep, ripgrep, and search patterns to efficiently find code, patterns, and anomalies across large codebases.
summary: Comprehensive guide to regex patterns, search tool selection, and multi-file search strategies for codebase exploration.
triggers:
  - search for all usages of this function
  - grep pattern
  - search codebase
  - find in files
  - regex search
  - ripgrep
  - code search
  - find occurrences
aliases:
  - grep
  - search
  - find code
negative_keywords:
  - code generation
  - refactoring
  - documentation
inputs:
  - search_pattern
  - file_glob (optional)
  - search_scope (optional)
  - case_sensitivity (optional, default: smart)
outputs:
  - matching_files_with_lines
  - match_count
  - pattern_analysis
  - suggested_refinements
allowed_tools:
  - shell.readonly (grep, rg, ag, find)
  - filesystem.read (inspect matched files)
required_skills: []
budget_band: micro
max_context_tokens: 3000
failure_modes:
  - Overly broad patterns returning thousands of false positives
  - Missing matches due to incorrect regex escaping
  - Searching binary or generated files wasting time
  - Not scoping search to relevant file types
verification:
  - Search returns expected matches with correct line numbers
  - Pattern matches known examples correctly
  - No false negatives on test cases
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback (read-only search)
validators:
  - skill.validator
---

## Mission
Provide efficient, precise codebase search using the right tool and pattern for the job, minimizing noise and maximizing relevant results.

## When To Use
- Searching for specific code patterns, function calls, or variable usage
- Finding all occurrences of a string, regex pattern, or anti-pattern
- Exploring unfamiliar codebases to understand structure
- Auditing code for security issues or deprecated API usage
- Locating TODO/FIXME/HACK comments across a project

## When Not To Use
- When you need to understand code semantics (use a code graph or IDE instead)
- When searching for structural patterns like "all classes that extend X" (use AST tools)
- When the codebase is small enough to browse manually
- When you need cross-reference analysis beyond text matching

## Procedure
1. **Choose the Right Tool**:
   - `rg` (ripgrep): Fastest, respects .gitignore, default for most searches
   - `grep -r`: Universal fallback, available everywhere
   - `ag` (The Silver Searcher): Good alternative to ripgrep
   - `git grep`: Searches only tracked files, fast for git repos
2. **Define the Pattern**:
   - Literal search: `rg "functionName"` (fast, no regex)
   - Regex search: `rg "fn\s+\w+\(.*\)"` (flexible, slower)
   - Fixed string: `rg -F "exact.string.match"` (fastest for literals with dots)
3. **Scope the Search**:
   - File type: `rg -t js "pattern"` (JavaScript only)
   - Glob: `rg -g "*.ts" "pattern"` (TypeScript files)
   - Directory: `rg "pattern" src/` (specific directory)
   - Exclude: `rg --glob "!node_modules" "pattern"`
4. **Refine Results**:
   - Context lines: `rg -C 3 "pattern"` (3 lines before/after)
   - File names only: `rg -l "pattern"` (list matching files)
   - Count: `rg -c "pattern"` (count matches per file)
   - Case insensitive: `rg -i "pattern"`
5. **Multi-Pattern Search**:
   - OR patterns: `rg "pattern1|pattern2"`
   - Multiple flags: `rg -e "pattern1" -e "pattern2"`
   - AND (sequential): `rg "pattern1" | xargs rg "pattern2"`
6. **Validate Results**: Spot-check matches to confirm the pattern is correct and not producing false positives.
7. **Iterate**: Refine the pattern based on results, narrowing or broadening as needed.

## Tool Policy
- Use `shell.readonly` for all search commands (grep, rg, ag, git grep)
- Use `filesystem.read` to inspect matched files for context
- Never modify files during a search operation

## Verification
- Pattern matches known test cases (positive and negative)
- Results are scoped to relevant files (no binary, generated, or vendor files)
- Match count is reasonable for the expected pattern frequency

## Failure Modes
- **Catastrophic backtracking**: Complex regex patterns can hang. Mitigation: use simple patterns first, test regex on small input.
- **Encoding issues**: Binary files or non-UTF-8 files may cause errors. Mitigation: use `--text` flag or exclude binary files.
- **Symlink loops**: Following symlinks can cause infinite recursion. Mitigation: use `--no-follow` or ripgrep's default behavior.
- **Too many results**: Broad patterns flood output. Mitigation: scope by file type, directory, or use `-l` for file list first.

## Example Routes
- "find all uses of deprecated API" -> `rg "oldFunction\(" -t js` with context lines
- "where is this config value used" -> `rg -F "CONFIG_KEY" -l` then inspect each file
- "find all TODO comments" -> `rg "TODO|FIXME|HACK" -t ts -t js` with file grouping
- "search for potential SQL injection" -> `rg "query\(.*\+.*\)" -t py` with context

## Source Notes
- Patterns based on ripgrep and GNU grep documentation
- Search strategies adapted from engineering codebase exploration workflows
- Reference: ref.github.engineering.2026-05-31
