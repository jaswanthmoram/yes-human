---
id: engineering.angular-signals
name: Angular Signals and Reactivity
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Angular signals and reactivity patterns including signal, computed, effect, and integration with RxJS observables.
triggers:
  - angular signals
  - angular reactivity
  - signal computed effect
  - angular 17 signals
  - angular signal input
  - angular rxjs signals
  - zoneless angular
aliases:
  - signals pattern
  - angular reactivity
  - signal-based components
negative_keywords:
  - zone.js
  - rxjs only
  - react
  - vue
inputs:
  - component_requirements
  - angular_version
  - rxjs_integration (optional)
outputs:
  - signal_component_code
  - reactivity_pattern_guide
  - rxjs_interop_code
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Reading signals outside injection context
  - Circular computed dependencies
  - Effect side effects causing infinite loops
  - Mixing signals and RxJS without proper interop
verification:
  - Signals used within injection context
  - No circular computed dependencies
  - Effects properly cleaned up on destroy
  - RxJS interop uses toSignal/toObservable
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to RxJS-only reactivity implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Angular signals and reactivity patterns, ensuring correct signal usage, proper computed dependencies, and seamless RxJS integration.

## When To Use
- Building Angular 16+ applications with signals
- Implementing fine-grained reactivity without Zone.js
- Creating computed values and reactive effects
- Migrating from RxJS-only patterns to signals
- Building zoneless Angular applications

## When Not To Use
- Angular versions below 16 (signals not available)
- Projects fully committed to RxJS patterns without migration plans
- Non-Angular frameworks
- Simple template-driven forms without reactive state

## Procedure
1. **Define Signals**: Create writable signals with signal() for component state, apply initial values and type annotations.
2. **Create Computed Signals**: Use computed() for derived values that automatically update when dependencies change.
3. **Implement Effects**: Use effect() for side effects like logging, DOM updates, or synchronization with external systems.
4. **Signal Inputs/Outputs**: Replace @Input() with signal inputs (input(), input.required()), use output() for event emitters.
5. **RxJS Interop**: Convert observables to signals with toSignal() and signals to observables with toObservable().
6. **Optimize Change Detection**: Use signal-based components with OnPush or zoneless change detection for performance.
7. **Test Signals**: Test signal behavior with TestBed, verify computed updates, and mock signal values in unit tests.

## Tool Policy
- Use `filesystem.read` to inspect existing Angular component code
- Use `filesystem.write` to create or update signal-based components
- Use `code_graph.query` to trace signal dependencies across the codebase

## Verification
- Run `ng test` to verify signal-based component tests pass
- Run `ng lint` to check for signal best practices
- Verify no circular dependency errors in computed signals
- Test change detection with Angular DevTools

## Failure Modes
- **Injection Context**: Reading or writing signals outside injection context throws errors; use inject() or constructor
- **Circular Computed**: Computed signals depending on each other create infinite loops; restructure dependency graph
- **Effect Loops**: Effects that modify their own dependencies cause infinite loops; use untracked() for writes
- **RxJS Mismatch**: Mixing signal and observable patterns without interop causes missed updates
- **Zone Conflicts**: Using signals with Zone.js change detection can cause double updates; prefer zoneless or OnPush

## Example Routes
- `yes route "convert to angular signals"` -> engineering.angular-signals
- `yes route "create computed signal"` -> engineering.angular-signals
- `yes route "integrate rxjs with signals"` -> engineering.angular-signals

## Source Notes
- Angular Signals documentation: https://angular.dev/guide/signals
- Angular GitHub repository: github.com/angular/angular (98k+ stars)
- Angular RFC for signals proposal
- Reference dossier: ref.github.engineering.2026-05-31
