---
id: engineering.nextjs-app-router
name: Next.js App Router Patterns
version: 1.0.0
domain: engineering
category: engineering.frameworks
description: Guide Next.js App Router patterns including server components, server actions, layouts, loading states, and data fetching strategies.
triggers:
  - nextjs app router
  - next app directory
  - server components
  - server actions
  - nextjs layout
  - nextjs data fetching
  - app router patterns
aliases:
  - next.js 14 patterns
  - app directory
  - rsc patterns
negative_keywords:
  - pages router
  - getServerSideProps
  - getStaticProps
  - next.js 12
inputs:
  - route_requirements
  - data_fetching_strategy
  - nextjs_version (optional)
outputs:
  - route_structure
  - server_component_code
  - data_fetching_implementation
allowed_tools:
  - filesystem.read
  - filesystem.write
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Client component boundary misplacement
  - Missing Suspense boundaries for streaming
  - Server action security vulnerabilities
  - Incorrect cache invalidation
verification:
  - All server/client boundaries are explicit
  - Loading and error states defined for routes
  - Server actions validate inputs
  - No sensitive data exposed to client components
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to pages router implementation if needed
validators:
  - skill.validator
---

## Mission
Provide expert guidance on Next.js App Router patterns, ensuring correct server/client component boundaries, efficient data fetching, and proper use of server actions and streaming.

## When To Use
- Building Next.js 13+ applications with App Router
- Implementing server components and server actions
- Designing route layouts, loading states, and error boundaries
- Optimizing data fetching with caching and revalidation
- Migrating from Pages Router to App Router

## When Not To Use
- Next.js projects using Pages Router (use getServerSideProps/getStaticProps)
- Non-Next.js React applications
- Static sites without server-side features
- Next.js versions below 13

## Procedure
1. **Plan Route Structure**: Design the app directory hierarchy with route groups, dynamic segments, and parallel routes.
2. **Define Component Boundaries**: Mark client components with 'use client' directive only when needed (interactivity, browser APIs, state).
3. **Implement Data Fetching**: Use async server components for data fetching, apply fetch() with cache and revalidation options.
4. **Create Layouts**: Build nested layouts for shared UI, use templates for per-navigation state reset.
5. **Add Loading and Error States**: Create loading.tsx for Suspense boundaries and error.tsx for error boundaries at route level.
6. **Implement Server Actions**: Create server actions with 'use server' directive, validate inputs, and handle mutations.
7. **Optimize Performance**: Apply streaming with Suspense, use parallel routes for independent loading, implement partial prerendering.

## Tool Policy
- Use `filesystem.read` to inspect existing Next.js route code
- Use `filesystem.write` to create or update route implementations
- Use `code_graph.query` to trace component boundaries and data flow

## Verification
- Run `next build` to verify production build succeeds
- Run `next lint` to check for App Router best practices
- Test streaming and loading states in development
- Verify server actions handle errors gracefully

## Failure Modes
- **Client Boundary Issues**: Forgetting 'use client' on interactive components or over-marking components as client
- **Missing Suspense**: No loading.tsx causing full-page loading states instead of streaming
- **Server Action Security**: Not validating inputs in server actions, leading to injection vulnerabilities
- **Cache Staleness**: Not revalidating cached data after mutations; use revalidatePath/revalidateTag
- **Bundle Bloat**: Importing heavy libraries in server components that get sent to client

## Example Routes
- `yes route "create nextjs app router layout"` -> engineering.nextjs-app-router
- `yes route "implement server action for form"` -> engineering.nextjs-app-router
- `yes route "add streaming to nextjs page"` -> engineering.nextjs-app-router

## Source Notes
- Next.js App Router documentation: https://nextjs.org/docs/app
- Next.js GitHub repository: github.com/vercel/next.js (128k+ stars)
- Vercel blog posts on App Router patterns
- Reference dossier: ref.github.engineering.2026-05-31
