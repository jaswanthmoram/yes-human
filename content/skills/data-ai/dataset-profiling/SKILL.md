---
id: data-ai.dataset-profiling
name: Dataset Quality Assessment
version: 1.0.0
domain: data-ai
category: data-ai.data-engineering
purpose: Profile datasets to assess quality, completeness, and suitability for ML/AI tasks.
summary: Systematic approach to analyzing dataset characteristics including distributions, missing values, outliers, and biases.
triggers:
  - analyze data distribution
  - profile dataset
  - assess data quality
  - check dataset
  - data quality analysis
  - dataset statistics
activation_triggers:
  - data profiling
  - dataset analysis
  - quality check
prerequisites:
  - access to dataset
  - understanding of data requirements
inputs:
  - dataset_path
  - data_schema (optional)
  - quality_requirements (optional)
steps:
  - Load and inspect dataset structure
  - Calculate basic statistics (count, mean, median, std)
  - Analyze missing values (count, patterns)
  - Check for duplicates
  - Identify outliers
  - Analyze distributions and skewness
  - Check for data leakage
  - Assess class balance (for classification)
  - Identify potential biases
  - Generate data quality report
outputs:
  - dataset_statistics
  - quality_metrics
  - data_issues
  - quality_report
  - recommendations
tools:
  - shell.readonly (run profiling scripts)
  - filesystem.read (dataset)
  - filesystem.write (report)
quality_gates:
  - All quality metrics calculated
  - Issues documented
  - Recommendations actionable
  - Report complete
failure_modes:
  - Missing critical quality issues
  - Not checking for data leakage
  - Ignoring class imbalance
  - Not identifying biases
  - Vague recommendations
handoffs:
  - data-ai.rag-engineer (for RAG dataset issues)
  - data-ai.ml-engineer (for ML dataset issues)
source_references:
  - ref.github.data-quality-best-practices.2026-06-01
allowed_agents:
  - data-ai.data-engineer
  - data-ai.ml-engineer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when assessing dataset quality, profiling data, or checking if a dataset is suitable for ML/AI tasks.

## Prerequisites
- Access to the dataset (CSV, database, etc.)
- Understanding of the data requirements (what the data will be used for)
- Data profiling tools available (pandas, great_expectations, etc.)

## Steps
1. **Load and Inspect Structure**:
   - Load dataset into memory or query database
   - Check number of rows and columns
   - Verify column names and types
   - Sample first/last few rows
   - Check for encoding issues
2. **Calculate Basic Statistics**:
   - **Numeric columns**: count, mean, median, std, min, max, quartiles
   - **Categorical columns**: unique values, most frequent, frequency distribution
   - **Text columns**: average length, vocabulary size
   - **Date columns**: date range, frequency
3. **Analyze Missing Values**:
   - Count missing values per column
   - Calculate % missing
   - Identify patterns (missing together, missing by group)
   - Visualize missing data (heatmap)
   - Assess impact on analysis/model
4. **Check for Duplicates**:
   - Count exact duplicate rows
   - Check for near-duplicates (fuzzy matching)
   - Identify duplicate keys/IDs
   - Assess impact on analysis
5. **Identify Outliers**:
   - Use statistical methods (IQR, Z-score)
   - Visualize with box plots
   - Check for data entry errors
   - Assess if outliers are valid or errors
6. **Analyze Distributions**:
   - Plot histograms for numeric columns
   - Check for skewness and kurtosis
   - Identify multimodal distributions
   - Check for normal distribution (if required)
7. **Check for Data Leakage**:
   - Identify features that contain target information
   - Check for future information in features
   - Verify train/test split doesn't leak
   - Check for ID columns that shouldn't be features
8. **Assess Class Balance** (for classification):
   - Count samples per class
   - Calculate class distribution
   - Identify imbalanced classes
   - Assess impact on model performance
9. **Identify Potential Biases**:
   - Check demographic distributions
   - Look for underrepresented groups
   - Assess geographic/temporal biases
   - Check for proxy variables
10. **Generate Quality Report**:
    - Summary statistics
    - Quality metrics (completeness, uniqueness, consistency)
    - Identified issues with severity
    - Recommendations for improvement
    - Suitability assessment for intended use

## Verification
- All quality metrics calculated
- Issues documented with severity
- Recommendations are specific and actionable
- Report is complete and clear
- Suitability for intended use assessed

## Rollback
- No state changes; this is an analysis skill

## Common Failures
- Not checking for data leakage (critical for ML)
- Ignoring class imbalance (leads to biased models)
- Not identifying biases (ethical and performance issues)
- Missing patterns in missing data (informative missingness)
- Not checking for duplicates (inflates metrics)
- Vague recommendations ("clean the data")

## Examples
### Profiling a Customer Churn Dataset
Input: CSV with 10,000 customer records, 25 features
Output:
- **Basic Stats**:
  - Rows: 10,000 | Columns: 25
  - Numeric: 15 | Categorical: 8 | Date: 2
- **Missing Values**:
  - `income`: 12% missing (higher for young customers)
  - `churn_reason`: 45% missing (only for churned customers - expected)
- **Duplicates**: 23 exact duplicates found (0.23%)
- **Outliers**:
  - `tenure`: 5 customers with tenure > 100 years (data entry error)
  - `monthly_charges`: 12 customers with $0 charges (free tier)
- **Distributions**:
  - `age`: Right-skewed (median 35, mean 38)
  - `monthly_charges`: Bimodal (peaks at $30 and $70)
- **Data Leakage**:
  - `churn_date` contains target information (must exclude)
- **Class Balance**:
  - Churned: 27% | Retained: 73% (moderate imbalance)
- **Biases**:
  - Underrepresented: customers > 70 years old (2%)
  - Geographic bias: 85% from urban areas
- **Recommendations**:
  1. Remove 23 duplicate rows
  2. Fix tenure outliers (cap at 50 years or investigate)
  3. Exclude `churn_date` from features (data leakage)
  4. Consider oversampling churned class or using class weights
  5. Impute missing income with median by age group
  6. Document demographic biases for model fairness assessment

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
