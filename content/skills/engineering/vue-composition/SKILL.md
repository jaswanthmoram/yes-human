---
id: engineering.vue-composition
name: Vue 3 Composition API Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Vue 3 Composition API patterns including ref, reactive, computed, watch, composables, and script setup syntax.
triggers:
  - fix reactivity loss when destructuring reactive object
  - migrate this options API component to composition API
  - create a useAuth composable in Vue 3
  - vue composition api
  - vue 3 setup
  - composables
  - vue ref reactive
  - script setup
  - vue watch
  - vue 3 patterns
aliases:
  - composition api
  - vue3 patterns
  - composables
negative_keywords:
  - vue 2
  - options api
  - react
  - angular
inputs:
  - component_requirements
  - vue_version
  - state_complexity (optional)
outputs:
  - composition_api_code
  - composable_functions
  - reactivity_pattern_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - Losing reactivity by destructuring reactive objects
  - Forgetting to use .value with ref
  - Memory leaks from unmanaged watchers
  - Mixing Options API and Composition API inconsistently
verification:
  - All refs accessed with .value in script
  - Reactivity maintained through destructuring with toRefs
  - Watchers cleaned up on unmount
  - Composables follow use prefix convention
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to Options API implementation if needed
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Vue 3 Composition API patterns, ensuring correct reactivity usage, well-structured composables, and idiomatic script setup syntax.

## When To Use
- Building Vue 3 components with Composition API
- Creating reusable composables for shared logic
- Migrating from Options API to Composition API
- Implementing complex reactive state management
- Using script setup syntax for cleaner components

## When Not To Use
- Vue 2 projects without Composition API plugin
- Simple components better served by Options API
- Non-Vue frameworks (React, Angular, Svelte)
- Server-side only code without Vue components

## Procedure
1. **Assess State Needs**: Determine whether to use ref for primitives, reactive for objects, or computed for derived state.
2. **Structure with Script Setup**: Use `<script setup>` syntax for concise component definitions with automatic imports.
3. **Implement Reactivity**: Use ref() for primitive values and reactive() for objects. Apply toRefs() when destructuring reactive objects.
4. **Create Composables**: Extract reusable logic into composable functions following the `use` prefix convention (e.g., useAuth, useFetch).
5. **Handle Side Effects**: Use watch() and watchEffect() for reactive side effects with proper cleanup via onScopeDispose.
6. **Manage Lifecycle**: Use onMounted, onUpdated, onUnmounted hooks for component lifecycle management.
7. **Optimize Performance**: Apply shallowRef and shallowReactive for large data structures, use computed for cached derivations.

## Tool Policy
- Use `filesystem.read` to inspect existing Vue component code
- Use `filesystem.write` to create or update composables and components
- Use `code_graph.query` to trace composable usage across the codebase

## Verification
- Run `npx vue-tsc --noEmit` for type checking
- Run `npm test` with Vue Test Utils to verify component behavior
- Check Vue DevTools for reactivity tracking
- Verify no reactivity loss warnings in console

## Failure Modes
- **Reactivity Loss**: Destructuring reactive objects loses reactivity; use toRefs() or access properties directly
- **Missing .value**: Forgetting .value when accessing ref in script (template auto-unwraps)
- **Watcher Leaks**: Creating watchers without cleanup; use onScopeDispose or component-level watchers
- **Circular Dependencies**: Composables importing each other creating circular references
- **Over-composition**: Breaking simple logic into too many composables reducing readability

## Example Routes
- `yes route "create useAuth composable"` -> engineering.vue-composition
- `yes route "migrate options api to composition api"` -> engineering.vue-composition
- `yes route "fix reactivity loss in vue 3"` -> engineering.vue-composition

## Source Notes
- Vue 3 official documentation: https://vuejs.org/guide/extras/composition-api-faq.html
- VueUse composables library: github.com/vueuse/vueuse (19k+ stars)
- Vue 3 RFCs: github.com/vuejs/rfcs
- Reference dossier: ref.github.engineering.2026-05-31
