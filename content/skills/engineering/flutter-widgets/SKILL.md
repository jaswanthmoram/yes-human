---
id: engineering.flutter-widgets
name: Flutter Widget Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Flutter widget patterns including stateless/stateful widgets, state management, custom painters, and responsive layouts.
triggers:
  - flutter widgets
  - flutter state
  - flutter layout
  - statefulwidget
  - flutter provider
  - flutter riverpod
  - flutter custom painter
aliases:
  - flutter ui patterns
  - dart widgets
  - flutter state management
negative_keywords:
  - react native
  - swiftui
  - android xml
  - ionic
inputs:
  - widget_requirements
  - state_management_approach (Provider, Riverpod, BLoC, etc.)
  - target_platforms (optional)
outputs:
  - widget_implementation
  - state_management_code
  - layout_structure
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Unnecessary setState calls causing rebuilds
  - Widget tree too deep causing performance issues
  - State management anti-patterns
  - Layout overflow errors on different screen sizes
verification:
  - Widgets render without layout overflow
  - State updates trigger minimal rebuilds
  - Widget tests pass
  - No unnecessary setState calls
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous widget implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Flutter widget patterns, ensuring efficient state management, performant widget trees, and responsive layouts across platforms.

## When To Use
- Building Flutter UI with stateless and stateful widgets
- Implementing state management with Provider, Riverpod, or BLoC
- Creating custom widgets and painters
- Building responsive layouts for multiple screen sizes
- Optimizing widget rebuild performance

## When Not To Use
- Non-Flutter mobile frameworks (React Native, SwiftUI)
- Backend Dart code without UI
- Simple command-line Dart applications
- Web-only projects not using Flutter Web

## Procedure
1. **Choose Widget Type**: Use StatelessWidget for static UI, StatefulWidget for interactive UI with local state.
2. **Design Widget Tree**: Keep widget trees shallow by extracting sub-widgets into separate classes and using const constructors.
3. **Implement State Management**: Choose appropriate approach (Provider for simple, Riverpod for advanced, BLoC for complex business logic).
4. **Build Responsive Layouts**: Use LayoutBuilder, MediaQuery, and Flex widgets for adaptive layouts across screen sizes.
5. **Create Custom Widgets**: Build reusable widgets with configurable parameters, implement custom painters for complex graphics.
6. **Optimize Performance**: Use const constructors, shouldRebuild, RepaintBoundary, and avoid rebuilding entire trees.
7. **Handle Platform Differences**: Use Platform.isIOS/Platform.isAndroid for platform-specific UI, apply Cupertino widgets for iOS style.

## Tool Policy
- Use `filesystem.read` to inspect existing Flutter widget code
- Use `filesystem.write` to create or update widget implementations
- Use `code_graph.query` to trace widget hierarchy and state flow

## Verification
- Run `flutter test` to verify widget tests pass
- Run `flutter analyze` for static analysis
- Use Flutter DevTools to check widget rebuild counts
- Test on multiple screen sizes and orientations

## Failure Modes
- **Excessive Rebuilds**: Calling setState too broadly rebuilds entire widget tree; scope state to smallest widget
- **Layout Overflow**: Not handling small screens; use Expanded, Flexible, or SingleChildScrollView
- **State Anti-patterns**: Managing global state in StatefulWidget; use proper state management solutions
- **Const Missing**: Not using const constructors causes unnecessary widget recreation
- **Painter Leaks**: Custom painters not disposing resources; implement dispose() properly

## Example Routes
- `yes route "create flutter custom widget"` -> engineering.flutter-widgets
- `yes route "implement riverpod state management"` -> engineering.flutter-widgets
- `yes route "fix flutter layout overflow"` -> engineering.flutter-widgets

## Source Notes
- Flutter widget documentation: https://docs.flutter.dev/ui/widgets
- Flutter GitHub repository: github.com/flutter/flutter (167k+ stars)
- Riverpod documentation: riverpod.dev
- Reference dossier: ref.github.engineering.2026-05-31
