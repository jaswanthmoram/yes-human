---
id: manufacturing.supply-chain-management
name: Supply Chain Management
version: 1.0.0
domain: manufacturing
category: manufacturing.supply_chain
purpose: Analyze and optimize end-to-end supply chain performance including sourcing, logistics, and supplier management.
summary: Supply chain management covering supplier evaluation, logistics optimization, risk management, and network design.
triggers:
  - supply chain optimization
  - supplier evaluation
  - logistics network design
  - supply chain risk assessment
  - sourcing strategy review
aliases:
  - supply chain management
  - SCM
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - supply_chain_data
  - supplier_performance
  - logistics_metrics
  - demand_patterns
outputs:
  - supply_chain_analysis
  - supplier_scorecard
  - logistics_optimization_plan
  - risk_mitigation_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Analysis without end-to-end visibility
  - Supplier evaluation without quantitative metrics
  - Risk assessment without mitigation actions
verification:
  - End-to-end supply chain mapped
  - Supplier scorecards with quantitative metrics
  - Risk mitigation actions defined and prioritized
  - Logistics costs quantified by segment
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert sourcing changes if supplier transitions cause disruptions
validators:
  - skill.validator
---

## Mission
Analyze and optimize end-to-end supply chain performance including sourcing, logistics, and supplier management.

## When To Use
- When evaluating or qualifying suppliers
- During logistics network design or optimization
- For supply chain risk assessments
- When developing sourcing strategies

## When Not To Use
- For contract negotiations (use legal-compliance)
- For inventory policy design (use inventory-optimization skill)
- For production scheduling (use production-planning skill)

## Procedure
1. **Map Supply Chain Network**:
   - Document tier-1 and tier-2 supplier relationships
   - Map material flow from source to delivery
   - Identify lead times and logistics corridors

2. **Evaluate Suppliers**:
   - Create supplier scorecards (quality, delivery, cost, responsiveness)
   - Benchmark against industry standards
   - Identify single-source and sole-source risks

3. **Optimize Logistics**:
   - Analyze transportation costs by mode and lane
   - Evaluate warehouse and distribution center placement
   - Model total landed cost for sourcing alternatives

4. **Assess Risks**:
   - Identify geopolitical, natural disaster, and capacity risks
   - Quantify probability and impact for each risk
   - Develop mitigation strategies (dual sourcing, safety stock, etc.)

5. **Develop Strategy**:
   - Recommend sourcing and logistics improvements
   - Prioritize by ROI and implementation complexity
   - Create phased implementation roadmap

## Tool Policy
- Use `filesystem.read` to review supply chain data, supplier reports, and logistics metrics
- Use `filesystem.write` to produce analyses, scorecards, and optimization plans

## Verification
- Supply chain network mapped end-to-end
- Supplier scorecards include quantitative metrics
- Risk mitigation actions defined with owners
- Logistics costs quantified by segment and mode

## Failure Modes
- Analysis without end-to-end supply chain visibility
- Supplier evaluation based on qualitative impressions only
- Risk assessment without actionable mitigation plans
- Missing total landed cost analysis

## Example Routes
- Supplier evaluation for critical component
- Logistics network optimization for North America
- Supply chain risk assessment for semiconductor sourcing

## Source Notes
- Chopra & Meindl, Supply Chain Management
- APICS CSCP Body of Knowledge
- Reference: ref.github.manufacturing.2026-05-31
