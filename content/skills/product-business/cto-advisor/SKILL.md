---
quality_gate: production
id: product-business.cto-advisor
name: CTO Advisory and Technology Strategy
version: 1.0.0
domain: product-business
category: product-business.strategy
purpose: Provide CTO-level guidance on technology strategy, engineering org design, build-vs-buy decisions, and technical debt prioritization.
summary: CTO advisory covers: technology strategy alignment with business goals, engineering team structure, build-vs-buy decisions, technical debt prioritization, vendor assessment, and communicating technical risk to the board.
triggers:
  - cto advisory session
  - technology strategy
  - tech org design
  - engineering leadership strategy
  - technology roadmap
activation_triggers:
  - we need to define our technology strategy
  - should we build or buy this
prerequisites:
  - Current technology stack and team structure understood
  - Business goals for the next 12-18 months defined
inputs:
  - technology_stack
  - team_structure
  - business_goals
steps:
  - Align technology strategy to business goals — every major technical investment must map to a business outcome
  - Assess build-vs-buy: build for core differentiating capability, buy/integrate for commodity infrastructure
  - Audit technical debt: categorize by business risk (high-risk blocking growth vs low-risk tolerable)
  - Design engineering org: matrix vs functional vs product-aligned squads — match to product development stage
  - Define the technology north star: what does the ideal architecture look like in 2-3 years?
  - Prepare board communication on technical risks and investments
outputs:
  - technology_strategy_doc
  - build_vs_buy_analysis
  - tech_debt_prioritization
  - org_design_recommendation
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Technology strategy tied to specific business outcomes
  - Build-vs-buy analysis includes TCO comparison
  - Tech debt items scored by business risk
failure_modes:
  - Technology for its own sake — not tied to business outcome
  - Under-investing in platform when product-market fit is found
  - Over-investing in scalability before product-market fit
handoffs:
  - engineering.architect (for architecture decisions)
  - platform.devops-engineer (for infrastructure execution)
source_references:
  - https://github.com/garrytan/gstack
  - https://github.com/PostHog/posthog
allowed_agents:
  - product-business.master
  - engineering.architect
status: active
budget_band: expanded
rollback:
  - Strategy documents — no system changes to revert
validators:
  - skill.validator
---

## Trigger

Use for technology strategy, org design decisions, build-vs-buy analysis, or technical communication to board/investors.

## Prerequisites

- Current tech stack and team structure documented
- Business goals defined for planning horizon

## Steps

### 1. Map Tech to Business

Every major technical investment must answer: "What business outcome does this enable?" If you can't answer, it's not a priority.

### 2. Build vs Buy

Build: core differentiating capability (your secret sauce). Buy/SaaS: commodity infrastructure (auth, billing, email). Build total cost of ownership includes: engineering time, maintenance, opportunity cost.

### 3. Prioritize Tech Debt

Score each item: business risk (1-5) × engineering effort (1-5). Attack high-risk items first. Low-risk tolerable debt is not a priority.

### 4. Design the Org

Pre-PMF: generalist engineers in a feature team. Post-PMF: product-aligned squads with embedded platform team. Scale: platform team becomes a foundation team.

### 5. Define North Star Architecture

3-year target architecture in one diagram. Today → milestones → north star. Don't migrate without a destination.

### 6. Prepare Board Communication

Technical risk is a board-level concern. Communicate: "Our current architecture can support X users. To support 10X, we need Y investment by Q3."

## Verification

- [ ] Tech strategy tied to business outcomes
- [ ] Build-vs-buy includes TCO
- [ ] Tech debt scored by business risk
- [ ] Board communication clear and non-jargon

## Rollback

Strategy documents — no system changes.

## Common Failures

| Failure                   | Cause                     | Fix                                           |
| ------------------------- | ------------------------- | --------------------------------------------- |
| Technology vanity project | Not tied to business goal | Require business outcome for every investment |
| Premature optimization    | Scaling before PMF        | Fix correctness before scalability            |
| No north star             | Reactive architecture     | Define 2-3yr target state                     |

## Examples

**Example A:** Build-vs-buy: auth system — buy (Auth0) to focus engineering on core product.
**Example B:** Post-Series A: migrate from monolith to modular monolith (not microservices yet) to enable team scaling.
