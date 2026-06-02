---
id: engineering.svelte-stores
name: Svelte Stores and Reactivity
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Svelte stores and reactivity patterns including writable, readable, derived stores, and Svelte 5 runes.
triggers:
  - svelte stores
  - svelte reactivity
  - svelte writable
  - svelte derived
  - svelte 5 runes
  - svelte state management
  - svelte runatics
aliases:
  - svelte store patterns
  - svelte5 runes
  - svelte state
negative_keywords:
  - react
  - vue
  - angular
  - svelte 3 only
inputs:
  - state_requirements
  - svelte_version
  - store_complexity (optional)
outputs:
  - store_implementation
  - reactivity_pattern_code
  - rune_migration_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - Memory leaks from unsubscribed stores
  - Circular derived store dependencies
  - Race conditions in async store updates
  - Overusing global stores for local state
verification:
  - All store subscriptions cleaned up
  - No circular derived store chains
  - Store values update correctly
  - Svelte 5 runes used appropriately
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to component-local state if stores are over-engineered
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Svelte stores and reactivity patterns, ensuring correct store usage, proper subscription management, and smooth adoption of Svelte 5 runes.

## When To Use
- Building Svelte applications with shared state
- Creating custom stores for complex state logic
- Implementing derived stores for computed values
- Migrating to Svelte 5 runes ($state, $derived, $effect)
- Managing cross-component state without prop drilling

## When Not To Use
- Simple component-local state (use let variables)
- Non-Svelte frameworks
- Svelte 3 projects without store requirements
- Server-side only SvelteKit code without client state

## Procedure
1. **Assess State Scope**: Determine if state is local (let), shared (stores), or global (context/stores).
2. **Create Writable Stores**: Use writable() for mutable shared state with set() and update() methods.
3. **Build Derived Stores**: Use derived() for computed values that automatically update when source stores change.
4. **Implement Custom Stores**: Create custom store functions that return store contracts (subscribe, set, update).
5. **Manage Subscriptions**: Use $store auto-subscription syntax in components, or manual subscribe/unsubscribe in scripts.
6. **Adopt Svelte 5 Runes**: Use $state for reactive variables, $derived for computed values, $effect for side effects.
7. **Handle Async Stores**: Implement async store patterns with proper loading states and error handling.

## Tool Policy
- Use `filesystem.read` to inspect existing Svelte component and store code
- Use `filesystem.write` to create or update store implementations
- Use `code_graph.query` to trace store subscriptions across the codebase

## Verification
- Run `npx svelte-check` for type and reactivity checking
- Run `npm test` with Svelte testing library
- Verify no memory leaks from unsubscribed stores
- Test store updates in Svelte DevTools

## Failure Modes
- **Subscription Leaks**: Manual subscriptions without cleanup cause memory leaks; prefer $store syntax
- **Circular Derived**: Derived stores depending on each other create infinite update loops
- **Async Race Conditions**: Store updates from async operations arriving out of order; use abort controllers
- **Over-globalization**: Using stores for everything including local state; prefer component-local state when possible
- **Rune Confusion**: Mixing Svelte 4 stores with Svelte 5 runes inconsistently; plan migration strategy

## Example Routes
- `yes route "create svelte custom store"` -> engineering.svelte-stores
- `yes route "migrate to svelte 5 runes"` -> engineering.svelte-stores
- `yes route "fix svelte store memory leak"` -> engineering.svelte-stores

## Source Notes
- Svelte stores documentation: https://svelte.dev/docs/svelte-store
- Svelte 5 runes RFC: https://svelte.dev/blog/runes
- Svelte GitHub repository: github.com/sveltejs/svelte (82k+ stars)
- Reference dossier: ref.github.engineering.2026-05-31
