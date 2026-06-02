---
id: data-ai.data-cleaning
name: Data Cleaning
version: 1.0.0
domain: data-ai
category: data-ai.data-preparation
purpose: Clean and preprocess raw data by handling missing values, outliers, duplicates, and inconsistencies.
summary: Systematic approach to data quality improvement including missing value imputation, outlier detection, and deduplication.
triggers:
  - clean dataset
  - handle missing values
  - remove duplicates
  - data preprocessing
  - data quality improvement
activation_triggers:
  - data cleaning
  - missing value imputation
  - deduplication
prerequisites:
  - raw dataset
  - understanding of data schema
inputs:
  - raw_dataset
  - schema_definition
  - cleaning_rules (optional)
steps:
  - Profile dataset for quality issues
  - Identify and handle missing values
  - Detect and treat outliers
  - Remove or merge duplicate records
  - Standardize formats and encodings
  - Validate cleaned data against schema
  - Document all transformations applied
outputs:
  - cleaned_dataset
  - cleaning_report
  - transformation_log
tools:
  - shell.readonly (run cleaning scripts)
  - filesystem.read (raw data)
  - filesystem.write (cleaned data)
quality_gates:
  - Missing values handled appropriately
  - Outliers documented
  - Duplicates removed
  - Schema validated
failure_modes:
  - Dropping rows without analyzing missingness pattern
  - Removing valid outliers without justification
  - Not documenting transformations
handoffs:
  - data-ai.data-engineer (for pipeline integration)
  - data-ai.feature-engineering (for next step)
source_references:
  - ref.github.data-ai.data-cleaning.2026-05-31
allowed_agents:
  - data-ai.data-scientist
  - data-ai.data-engineer
  - data-ai.data-analyst
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Retain raw dataset copy
validators:
  - skill.validator
---

## Trigger
Use this skill when cleaning raw data, handling missing values, removing duplicates, or improving data quality.

## Prerequisites
- Raw dataset available for processing
- Schema or data dictionary defined
- Understanding of downstream use case

## Steps
1. **Profile Dataset**: Compute completeness, uniqueness, validity metrics per column.
2. **Handle Missing Values**: Choose strategy per column (drop, impute, flag) based on missingness pattern (MCAR, MAR, MNAR).
3. **Detect Outliers**: Use IQR, Z-score, or domain rules; decide to cap, transform, or remove.
4. **Remove Duplicates**: Identify exact and fuzzy duplicates; merge or remove.
5. **Standardize Formats**: Normalize dates, encodings, units, and categorical values.
6. **Validate**: Check cleaned data against schema constraints and business rules.
7. **Document**: Log all transformations with rationale for reproducibility.

## Verification
- Missing values handled with documented strategy
- Outliers treated with justification
- Duplicates resolved
- Schema validation passes

## Rollback
- Retain original raw dataset; cleaning is re-runnable

## Common Failures
- Dropping missing rows without analyzing pattern
- Removing valid outliers without domain justification
- Not logging transformations (irreproducible)
- Ignoring encoding issues in text columns

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
