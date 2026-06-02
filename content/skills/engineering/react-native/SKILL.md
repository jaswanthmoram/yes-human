---
id: engineering.react-native
name: React Native Component Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide React Native component patterns including native modules, navigation, performance optimization, and cross-platform styling.
triggers:
  - react native
  - react native component
  - react native navigation
  - react native performance
  - expo
  - react native bridge
  - react native styling
aliases:
  - rn patterns
  - react native ui
  - expo patterns
negative_keywords:
  - flutter
  - swiftui
  - ionic
  - web only react
inputs:
  - component_requirements
  - platform_targets (iOS, Android)
  - navigation_structure (optional)
outputs:
  - rn_component_code
  - navigation_implementation
  - performance_optimization_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Bridge overhead causing jank
  - Memory leaks from native module listeners
  - Navigation state not persisting correctly
  - Platform-specific code not properly separated
verification:
  - Components render at 60fps on target devices
  - No memory leaks from event listeners
  - Navigation works correctly on both platforms
  - Platform-specific code properly guarded
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous component implementation
validators:
  - skill.validator
---

## Mission
Provide expert guidance on React Native component patterns, ensuring performant cross-platform UI, proper native module integration, and platform-adaptive behavior.

## When To Use
- Building React Native applications for iOS and Android
- Implementing cross-platform components with platform-specific behavior
- Setting up navigation with React Navigation or Expo Router
- Optimizing React Native performance (bridge, new architecture)
- Integrating native modules and APIs

## When Not To Use
- Web-only React applications
- Flutter or other cross-platform frameworks
- Native-only iOS (SwiftUI) or Android (Kotlin) development
- Server-side React rendering without mobile targets

## Procedure
1. **Design Component Architecture**: Create reusable components with platform-specific variants using Platform.select and .ios.tsx/.android.tsx files.
2. **Implement Navigation**: Set up React Navigation or Expo Router with typed routes, deep linking, and state persistence.
3. **Optimize Lists**: Use FlatList/SectionList with proper keyExtractor, getItemLayout, and windowSize for smooth scrolling.
4. **Handle Native Modules**: Integrate native APIs through TurboModules (new architecture) or NativeModules bridge.
5. **Style Cross-Platform**: Use StyleSheet with platform-specific styles, apply useWindowDimensions for responsive layouts.
6. **Manage State**: Apply React hooks patterns adapted for mobile (useFocusEffect, useBackHandler).
7. **Profile Performance**: Use Flipper, React DevTools Profiler, and systrace to identify and fix performance bottlenecks.

## Tool Policy
- Use `filesystem.read` to inspect existing React Native component code
- Use `filesystem.write` to create or update component implementations
- Use `code_graph.query` to trace component and navigation structure

## Verification
- Run `npx react-native run-ios` and `run-android` to verify both platforms
- Run `npx jest` for component tests
- Profile with Flipper for frame rate and memory usage
- Test on physical devices for real-world performance

## Failure Modes
- **Bridge Bottleneck**: Heavy JS-to-native communication causing frame drops; batch operations or use new architecture
- **Memory Leaks**: Event listeners and timers not cleaned up on unmount; use useEffect cleanup
- **Navigation Issues**: State not persisting across app restarts; implement state persistence with AsyncStorage
- **Platform Bugs**: Code working on one platform but not the other; test both platforms in CI
- **New Architecture Migration**: Fabric/TurboModules breaking existing native modules; plan gradual migration

## Example Routes
- `yes route "create react native component"` -> engineering.react-native
- `yes route "set up react navigation"` -> engineering.react-native
- `yes route "optimize react native list performance"` -> engineering.react-native

## Source Notes
- React Native documentation: https://reactnative.dev/docs
- React Navigation: https://reactnavigation.org/docs
- React Native GitHub: github.com/facebook/react-native (122k+ stars)
- Expo documentation: https://docs.expo.dev
- Reference dossier: ref.github.engineering.2026-05-31
