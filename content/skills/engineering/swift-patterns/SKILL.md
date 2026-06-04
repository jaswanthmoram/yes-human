---
quality_gate: production
id: engineering.swift-patterns
name: Swift Code Review Patterns
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Review Swift code for optional safety, actor isolation, and SwiftUI lifecycle correctness.
summary: Swift Code Review Patterns skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - swift review
  - swift code review
  - review swift
  - swift code audit
  - swiftui review
activation_triggers:
  - how do I swift review
  - help me with swift code review
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Check optional handling — avoid force unwrap (!); use guard let or if let with meaningful fallback
  - Review actor isolation — Swift 6 strict concurrency requires explicit actor boundaries; check @MainActor usage
  - Check retain cycles — closures capturing self must use [weak self] or [unowned self] appropriately
  - Review SwiftUI view lifecycle — @StateObject for owned objects, @ObservedObject for injected; don't mix them
  - Check async/await usage — never call async functions in init() without Task {}; Task must be cancelled on disappear
  - Review Codable conformance — custom CodingKeys must cover all cases; missing keys cause runtime crashes
outputs:
  - completed_output
  - review_or_analysis_report
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Output addresses all required criteria
  - Sources cited where patterns were drawn from
  - No hallucinated APIs or non-existent patterns
failure_modes:
  - Force unwrap without justification
  - Missing [weak self] in closure capturing self
  - @StateObject used for injected objects
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/apple/swift
  - https://github.com/nicklockwood/SwiftFormat
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - No writes — read-only review
validators:
  - skill.validator
---

## Trigger

Use this skill for tasks related to: swift review, swift code review, review swift.

## Prerequisites

- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step

Check optional handling — avoid force unwrap (!); use guard let or if let with meaningful fallback

### 2. Step

Review actor isolation — Swift 6 strict concurrency requires explicit actor boundaries; check @MainActor usage

### 3. Step

Check retain cycles — closures capturing self must use [weak self] or [unowned self] appropriately

### 4. Step

Review SwiftUI view lifecycle — @StateObject for owned objects, @ObservedObject for injected; don't mix them

### 5. Step

Check async/await usage — never call async functions in init() without Task {}; Task must be cancelled on disappear

### 6. Step

Review Codable conformance — custom CodingKeys must cover all cases; missing keys cause runtime crashes

## Verification

- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback

No writes — read-only review

## Common Failures

| Failure                                       | Cause         | Fix               |
| --------------------------------------------- | ------------- | ----------------- |
| Force unwrap without justification            | See procedure | Address in review |
| Missing [weak self] in closure capturing self | See procedure | Address in review |
| @StateObject used for injected objects        | See procedure | Address in review |

## Examples

**Example A:** Apply this skill to a typical instance of 'swift review'.
**Example B:** Apply this skill when facing 'review swift' in a complex codebase.
