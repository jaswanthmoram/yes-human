---
id: engineering.code-generation
name: Code Generation and Scaffolding
version: 1.0.0
domain: engineering
category: engineering.productivity
purpose: Generate boilerplate code, scaffolding, and repetitive code structures using templates, generators, and code generation tools.
summary: Systematic approach to code generation using templates, AST-based generators, and scaffolding tools to eliminate repetitive coding tasks.
triggers:
  - generate code
  - scaffold project
  - boilerplate
  - code template
  - create boilerplate
  - generate CRUD
  - scaffolding
aliases:
  - scaffold
  - boilerplate
  - code gen
negative_keywords:
  - AI code generation
  - manual coding
  - code review
inputs:
  - generation_type (project, module, component, CRUD, API)
  - framework (react, nextjs, express, django, etc.)
  - template_source (optional)
  - naming_convention (optional)
outputs:
  - generated_files
  - file_structure
  - setup_instructions
  - next_steps
allowed_tools:
  - shell.readonly (inspect project structure, check generators)
  - shell.write (run generators, install dependencies)
  - filesystem.read (read templates, existing code patterns)
  - filesystem.write (create generated files)
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Generated code not matching project conventions
  - Template drift causing outdated scaffolding
  - Over-generation creating unnecessary files
  - Generated code with hardcoded values or placeholders
verification:
  - Generated code compiles and passes linting
  - File structure matches project conventions
  - No hardcoded secrets, URLs, or placeholder values remain
  - Generated tests pass
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Delete generated files via version control (git clean or revert)
validators:
  - skill.validator
---

## Mission
Eliminate repetitive coding tasks by generating boilerplate, scaffolding, and structured code using templates and generators that follow project conventions.

## When To Use
- Starting a new project, module, or component that follows established patterns
- Generating CRUD operations, API endpoints, or database models
- Creating repetitive structures (forms, tables, routes) with consistent patterns
- Bootstrapping test files that mirror source file structure
- Setting up configuration files for new environments or services

## When Not To Use
- When the code requires novel logic that cannot be templated
- When the project has no established patterns to generate from
- When hand-written code would be simpler and more maintainable
- When generating code that requires deep domain-specific customization
- For one-off scripts or throwaway code

## Procedure
1. **Analyze Existing Patterns**: Study the project's existing code structure, naming conventions, and file organization to ensure generated code is consistent.
2. **Select Generation Approach**:
   - **Template-based**: String templates with variable substitution (Handlebars, EJS, Jinja)
   - **Generator tools**: Framework-specific generators (create-react-app, nest generate, rails generate)
   - **AST-based**: Programmatic code generation using abstract syntax trees (jscodeshift, ts-morph)
   - **Snippet-based**: IDE snippets for small, repeated code blocks
3. **Define Template Variables**: Identify what needs to be parameterized (names, types, paths, configurations).
4. **Generate Code**: Run the generator or apply templates, creating files in the correct locations.
5. **Post-Process**: Replace placeholders, update imports, register new modules in index files, and wire up routing.
6. **Validate Output**: Run linting, type checking, and tests on generated code to ensure correctness.
7. **Document**: Record the generation command and any manual steps needed after generation.

## Tool Policy
- Use `shell.readonly` to inspect project structure before generation
- Use `shell.write` to run generators and install dependencies
- Use `filesystem.read` to study existing patterns and templates
- Use `filesystem.write` to create generated files
- Always verify generated code compiles and passes tests

## Verification
- Generated code passes `lint`, `typecheck`, and `test` commands
- File structure follows project conventions
- All imports resolve correctly
- No TODO or placeholder comments remain in production code
- Generated tests cover the generated code paths

## Failure Modes
- **Convention mismatch**: Generated code uses different patterns than the rest of the project. Mitigation: study existing code before generating, use project-specific templates.
- **Stale templates**: Templates produce outdated code after framework upgrades. Mitigation: version templates and update them with framework releases.
- **Over-generation**: Creating files that are never used. Mitigation: generate only what is needed, delete unused generated files.
- **Security issues**: Generated code includes hardcoded secrets or insecure defaults. Mitigation: use environment variables, never embed secrets in templates.

## Example Routes
- "scaffold a new Express API endpoint" -> Generate route, controller, validation, and test files following existing patterns
- "create a React component with tests" -> Generate component file, styles, test file, and story file
- "generate CRUD for a database model" -> Generate model, migration, controller, routes, validation, and tests
- "set up a new microservice" -> Scaffold project structure with Dockerfile, CI config, health check, and README

## Source Notes
- Based on popular code generation tools (Yeoman, Plop, Hygen, Nest CLI)
- Patterns from framework-specific generators (Rails, Django, Spring)
- Reference: ref.github.engineering.2026-05-31
