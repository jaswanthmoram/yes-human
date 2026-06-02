---
id: education.education-standards
name: Education Standards Alignment
version: 1.0.0
domain: education
category: education.curriculum
purpose: Map curriculum, assessments, and instruction to education standards (Common Core, NGSS, state standards) with gap analysis and compliance reporting.
summary: Standards mapping and alignment analysis across Common Core, NGSS, and state standards with gap identification and compliance checks.
triggers:
  - standards alignment check
  - Common Core mapping
  - NGSS alignment
  - education standards compliance
  - curriculum standards mapping
aliases:
  - standards alignment
  - education standards
negative_keywords:
  - industry standards compliance
  - ISO certification
  - building code standards
inputs:
  - curriculum_or_assessment
  - target_standards
  - grade_level
outputs:
  - alignment_map
  - gap_analysis
  - compliance_report
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Maps standards without depth-of-knowledge alignment
  - Gap analysis misses uncovered standards
  - Compliance report lacks evidence documentation
verification:
  - Depth of knowledge checked
  - All standards accounted for
  - Evidence documented for each mapping
source_references:
  - ref.github.education.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Map curriculum, assessments, and instruction to education standards with gap analysis, depth-of-knowledge alignment, and compliance reporting.

## When To Use
- Aligning curriculum to Common Core or NGSS standards
- Checking assessment alignment to state standards
- Conducting gap analysis for standards coverage
- Preparing compliance documentation for accreditation

## When Not To Use
- Industry standards compliance belongs to engineering domain
- ISO certification belongs to manufacturing domain
- Building code standards belong to facilities domain

## Procedure
1. Identify target standards and grade level.
2. Map curriculum units and lessons to specific standards.
3. Check depth-of-knowledge alignment (Webb's DOK).
4. Identify gaps where standards are not covered.
5. Document evidence of alignment for each mapping.
6. Generate compliance report with coverage percentages.

## Tool Policy
- Use `filesystem.read` to access standards documents and curriculum materials.
- Use `filesystem.write` to save alignment maps and compliance reports.

## Verification
- Depth of knowledge checked for each standard alignment
- All target standards accounted for (covered or gap)
- Evidence documented for each curriculum-to-standard mapping

## Failure Modes
- Mapping standards at surface level without DOK alignment
- Missing uncovered standards in gap analysis
- Compliance reports without supporting evidence documentation

## Example Routes
- "standards alignment check for grade 4 math curriculum"
- "Common Core mapping for ELA units"
- "NGSS alignment for high school biology"

## Source Notes
- Common Core State Standards Initiative
- Next Generation Science Standards (NGSS)
- Webb's Depth of Knowledge framework
- Reference: ref.github.education.2026-05-31
