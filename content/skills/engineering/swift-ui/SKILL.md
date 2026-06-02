---
id: engineering.swift-ui
name: SwiftUI Component Development
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide SwiftUI component development including view composition, state management, animations, and platform-adaptive layouts.
triggers:
  - swiftui
  - swift ui
  - ios view
  - swiftui state
  - swiftui layout
  - swiftui animation
  - swift component
aliases:
  - swift ui patterns
  - ios swiftui
  - swift views
negative_keywords:
  - uikit
  - storyboard
  - android
  - flutter
inputs:
  - ui_requirements
  - target_platforms (iOS, macOS, watchOS, tvOS)
  - design_spec (optional)
outputs:
  - swiftui_view_code
  - state_management_pattern
  - layout_implementation
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - View body complexity causing slow compilation
  - State ownership confusion between @State, @Binding, @ObservedObject
  - Layout issues with GeometryReader misuse
  - Animation glitches from improper state transitions
verification:
  - Views compile within reasonable time
  - State flows correctly through view hierarchy
  - Previews render correctly for all configurations
  - Accessibility modifiers applied
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous view implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on SwiftUI component development, ensuring correct state management, efficient view composition, and platform-adaptive layouts.

## When To Use
- Building iOS/macOS/watchOS/tvOS UI with SwiftUI
- Implementing complex view hierarchies with state management
- Creating reusable SwiftUI components and view modifiers
- Migrating from UIKit to SwiftUI
- Implementing animations and transitions

## When Not To Use
- UIKit-only projects without SwiftUI support
- Android or cross-platform mobile development
- Simple UIKit storyboard-based interfaces
- Backend or server-side Swift code

## Procedure
1. **Define View Structure**: Break UI into small, composable views. Each view should have a single responsibility.
2. **Choose State Strategy**: Select appropriate property wrapper: @State for local, @Binding for parent-owned, @ObservedObject/@StateObject for shared models, @EnvironmentObject for app-wide state.
3. **Implement Layout**: Use stacks (VStack, HStack, ZStack), Grid, and custom layouts. Apply GeometryReader sparingly.
4. **Add Interactivity**: Implement gestures, navigation, and user input with proper state binding.
5. **Apply Styling**: Create custom ViewModifiers and ButtonStyles for consistent theming across the app.
6. **Handle Animations**: Use withAnimation, .animation modifier, and matchedGeometryEffect for smooth transitions.
7. **Optimize Performance**: Use LazyVStack/LazyHStack for large lists, Equatable views to prevent unnecessary redraws, and task modifier for async work.

## Tool Policy
- Use `filesystem.read` to inspect existing SwiftUI view code
- Use `filesystem.write` to create or update view implementations
- Use `code_graph.query` to trace view hierarchy and state flow

## Verification
- Build and run Xcode previews for all configurations
- Run `xcodebuild test` to verify UI tests pass
- Test on multiple device sizes and orientations
- Verify accessibility with Xcode Accessibility Inspector

## Failure Modes
- **Slow Compilation**: Complex view bodies with many modifiers; extract subviews to reduce type-checking time
- **State Confusion**: Using @ObservedObject when @StateObject is needed, causing data loss on view recreation
- **Layout Breakage**: GeometryReader consuming all available space; use containerRelativeFrame or fixed frames
- **Animation Issues**: Animating non-animatable properties or missing animation values
- **Preview Failures**: Missing dependencies in preview providers; use mock data and environment injection

## Example Routes
- `yes route "build swiftui navigation"` -> engineering.swift-ui
- `yes route "create reusable swiftui component"` -> engineering.swift-ui
- `yes route "fix swiftui animation"` -> engineering.swift-ui

## Source Notes
- Apple SwiftUI documentation: https://developer.apple.com/documentation/swiftui
- Apple SwiftUI tutorials and sample code
- Community patterns from github.com/onmyway133/SwiftUI (curated examples)
- Reference dossier: ref.github.engineering.2026-05-31
