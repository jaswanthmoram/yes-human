---
id: manufacturing.predictive-maintenance
name: Predictive Maintenance
version: 1.0.0
domain: manufacturing
category: manufacturing.maintenance
purpose: Implement condition-based and predictive maintenance using sensor data, analytics, and machine learning to anticipate failures.
summary: Predictive maintenance covering condition monitoring, vibration analysis, oil analysis, thermography, and ML-based failure prediction.
triggers:
  - implement predictive maintenance
  - condition monitoring setup
  - vibration analysis
  - predictive maintenance analytics
  - failure prediction model
aliases:
  - predictive maintenance
  - PdM
  - condition-based maintenance
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - sensor_data
  - equipment_condition_data
  - failure_history
  - operating_parameters
outputs:
  - condition_assessment
  - failure_prediction_report
  - maintenance_recommendations
  - monitoring_system_design
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Predictions without validated sensor data
  - Models not trained on actual failure events
  - Missing alarm thresholds and escalation paths
verification:
  - Sensor data validated for accuracy
  - Models trained on labeled failure data
  - Alarm thresholds defined with escalation paths
  - False positive rate documented
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to preventive maintenance schedule if predictive system generates excessive false alarms
validators:
  - skill.validator
---

## Mission
Implement condition-based and predictive maintenance using sensor data, analytics, and machine learning to anticipate failures.

## When To Use
- When implementing condition monitoring systems
- During vibration or oil analysis programs
- When building predictive failure models
- For transitioning from preventive to predictive maintenance

## When Not To Use
- For routine PM scheduling (use preventive-maintenance skill)
- For equipment design changes (use process engineering agent)
- For safety system monitoring (use safety engineering agent)

## Procedure
1. **Assess Equipment Criticality**:
   - Rank equipment by production impact and failure cost
   - Identify candidates for predictive maintenance
   - Prioritize high-criticality, high-cost assets

2. **Select Monitoring Technologies**:
   - Match technology to failure mode (vibration, temperature, oil, ultrasonic)
   - Define sensor placement and sampling frequency
   - Establish baseline condition readings

3. **Define Alarm Thresholds**:
   - Set warning and alarm levels from baseline data
   - Define escalation paths for each alert level
   - Document acceptable false positive rates

4. **Build Predictive Models**:
   - Collect labeled failure data for training
   - Select appropriate ML algorithms (regression, classification)
   - Validate model accuracy against held-out data
   - Deploy models with monitoring and retraining schedules

5. **Integrate with Maintenance Workflow**:
   - Connect alerts to work order system
   - Define maintenance response protocols
   - Track prediction accuracy over time
   - Continuously improve models with new data

## Tool Policy
- Use `filesystem.read` to review sensor data, condition reports, and failure history
- Use `filesystem.write` to produce assessments, monitoring designs, and prediction reports

## Verification
- Sensor data validated for accuracy and completeness
- Predictive models trained on labeled failure events
- Alarm thresholds defined with escalation paths
- False positive rate documented and acceptable

## Failure Modes
- Sensor data not validated before model training
- Models trained without actual failure labels
- Alarm thresholds too sensitive (excessive false alarms)
- Predictions not integrated into maintenance workflow

## Example Routes
- Condition monitoring setup for rotating equipment
- Vibration analysis for motor bearings
- Predictive model for hydraulic system failures

## Source Notes
- Mobley, An Introduction to Predictive Maintenance
- ISO 13373 Condition Monitoring and Diagnostics
- Reference: ref.github.manufacturing.2026-05-31
