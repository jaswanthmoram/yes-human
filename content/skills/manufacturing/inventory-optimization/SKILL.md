---
id: manufacturing.inventory-optimization
name: Inventory Optimization
version: 1.0.0
domain: manufacturing
category: manufacturing.supply_chain
purpose: Optimize inventory levels across the supply chain to balance service levels, carrying costs, and working capital.
summary: Inventory optimization covering safety stock calculation, reorder point design, multi-echelon optimization, and ABC analysis.
triggers:
  - optimize inventory levels
  - safety stock calculation
  - reorder point design
  - multi-echelon inventory optimization
  - ABC inventory analysis
aliases:
  - inventory optimization
  - stock optimization
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - demand_data
  - lead_time_data
  - cost_parameters
  - service_level_targets
outputs:
  - inventory_policy
  - safety_stock_recommendations
  - reorder_point_schedule
  - cost_service_tradeoff_analysis
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Safety stock without demand variability analysis
  - Reorder points without lead time validation
  - Missing cost-service tradeoff analysis
verification:
  - Demand variability quantified
  - Lead times validated with suppliers
  - Cost-service tradeoffs documented
  - ABC classification applied
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert inventory policies if service levels drop below targets
validators:
  - skill.validator
---

## Mission
Optimize inventory levels across the supply chain to balance service levels, carrying costs, and working capital.

## When To Use
- When setting or revising safety stock levels
- During reorder point design or review
- For multi-echelon inventory optimization
- When conducting ABC inventory classification

## When Not To Use
- For warehouse layout design (use industrial engineering agent)
- For demand forecasting (use production-planning skill)
- For financial inventory valuation (use finance)

## Procedure
1. **Classify Inventory (ABC Analysis)**:
   - Rank SKUs by annual usage value
   - Classify into A (top 20%), B (next 30%), C (remaining 50%)
   - Assign differentiated policies by class

2. **Calculate Safety Stock**:
   - Analyze demand variability (standard deviation)
   - Measure lead time variability
   - Apply service level factor (z-score)
   - Calculate safety stock for each SKU

3. **Design Reorder Points**:
   - Calculate lead time demand
   - Add safety stock to set reorder points
   - Determine economic order quantities (EOQ)
   - Validate with supplier lead time commitments

4. **Optimize Multi-Echelon**:
   - Map inventory positions across network
   - Identify decoupling points and buffer locations
   - Optimize total network inventory investment
   - Balance local vs centralized stocking

5. **Analyze Tradeoffs**:
   - Model cost vs service level curves
   - Quantify working capital impact
   - Recommend policy changes with ROI

## Tool Policy
- Use `filesystem.read` to review demand data, lead times, and cost parameters
- Use `filesystem.write` to produce inventory policies and optimization reports

## Verification
- Demand variability quantified for each SKU class
- Lead times validated against actual supplier performance
- Cost-service tradeoffs documented with recommendations
- ABC classification applied to differentiate policies

## Failure Modes
- Safety stock calculated without variability data
- Reorder points based on theoretical not actual lead times
- Missing cost-service tradeoff analysis
- Not differentiating policies by ABC class

## Example Routes
- Safety stock recalculation for A-class items
- Multi-echelon optimization for distribution network
- ABC analysis and policy differentiation

## Source Notes
- Silver, Pyke & Thomas, Inventory and Production Management
- APICS CPIM Body of Knowledge
- Reference: ref.github.manufacturing.2026-05-31
