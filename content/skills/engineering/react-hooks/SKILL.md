---
id: engineering.react-hooks
name: React Hooks Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide React hooks patterns including useState, useEffect, useReducer, custom hooks, and performance optimization with useMemo and useCallback.
triggers:
  - fix stale closure in useEffect with async function
  - react hooks
  - useState pattern
  - useEffect cleanup
  - custom hook
  - useReducer
  - react performance hooks
  - useMemo useCallback
aliases:
  - hooks patterns
  - react hook best practices
  - custom hooks
negative_keywords:
  - class components
  - angular
  - vue
  - svelte
inputs:
  - component_code
  - hook_requirements
  - performance_constraints (optional)
outputs:
  - hook_implementation
  - custom_hook_code
  - performance_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - Stale closures in useEffect
  - Missing dependency array items
  - Infinite re-render loops
  - Overusing useMemo/useCallback prematurely
verification:
  - All hooks follow rules of hooks
  - No ESLint exhaustive-deps warnings
  - Component renders without infinite loops
  - Custom hooks are testable in isolation
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert hook changes to previous implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on React hooks patterns, ensuring correct usage of built-in hooks, well-designed custom hooks, and optimal performance through memoization strategies.

## When To Use
- Building React functional components with state and side effects
- Creating reusable custom hooks for shared logic
- Optimizing component re-renders with useMemo and useCallback
- Migrating class component lifecycle to hooks
- Debugging stale closures or infinite render loops

## When Not To Use
- Working with class components (use lifecycle methods instead)
- Non-React frameworks (Vue, Angular, Svelte)
- Server-side only code without React components
- Simple presentational components that need no state

## Procedure
1. **Analyze Requirements**: Identify state needs, side effects, and shared logic that could be extracted into custom hooks.
2. **Select Hook Strategy**: Choose between useState for simple state, useReducer for complex state transitions, and useContext for shared state.
3. **Implement Side Effects**: Write useEffect with proper dependency arrays and cleanup functions. Avoid common pitfalls like stale closures.
4. **Extract Custom Hooks**: Create custom hooks following the `use` prefix convention, encapsulating related state and effects.
5. **Optimize Performance**: Apply useMemo for expensive computations and useCallback for stable function references passed to child components.
6. **Handle Edge Cases**: Address race conditions in async effects, implement abort controllers, and handle component unmounting.
7. **Verify Correctness**: Run ESLint with exhaustive-deps rule, test for infinite loops, and validate hook behavior under re-renders.

## Tool Policy
- Use `filesystem.read` to inspect existing component code
- Use `filesystem.write` to create or update hook implementations
- Use `code_graph.query` to trace hook usage across the codebase

## Verification
- Run `npx eslint --ext .jsx,.tsx` to check for hooks rule violations
- Run `npm test` to verify component behavior
- Manually test component mounting, updating, and unmounting
- Check React DevTools Profiler for unnecessary re-renders

## Failure Modes
- **Stale Closures**: useEffect captures outdated variable references; fix by adding dependencies or using functional updates
- **Missing Dependencies**: ESLint exhaustive-deps warnings indicate incomplete dependency arrays
- **Infinite Loops**: useEffect that sets state triggering itself; fix by adding conditions or using useRef
- **Premature Optimization**: Wrapping everything in useMemo/useCallback adds overhead; profile first
- **Rules of Hooks Violations**: Calling hooks conditionally or in loops; always call at top level

## Example Routes
- `yes route "implement useReducer for form state"` -> engineering.react-hooks
- `yes route "create custom useFetch hook"` -> engineering.react-hooks
- `yes route "fix infinite re-render in useEffect"` -> engineering.react-hooks

## Source Notes
- React official documentation: https://react.dev/reference/react/hooks
- Patterns from react-hooks/exhaustive-deps ESLint plugin
- Community patterns from github.com/streamich/react-use (19k+ stars)
- Reference dossier: ref.github.engineering.2026-05-31
