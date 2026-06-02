---
id: research.research-collaboration
name: Research Collaboration
version: 1.0.0
category: research.management
summary: Facilitates research collaboration with team coordination, authorship agreements, communication protocols, and shared workspace setup.
triggers:
  - research collaboration setup
  - team coordination planning
  - authorship agreement drafting
  - research communication protocol
  - multi-site study coordination
prerequisites:
  - collaboration_partners_identified
steps:
  - define roles and responsibilities
  - establish authorship criteria and order
  - create communication and meeting protocols
  - set up shared workspace and version control
  - document data sharing and IP agreements
outputs:
  - collaboration_agreement
  - communication_plan
  - workspace_configuration
budget_band: standard
rollback:
  - archive agreement drafts
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task involves setting up or managing a multi-person or multi-site research collaboration.

## Prerequisites
- Collaboration partners identified and willing to participate.
- A shared research objective agreed upon by all parties.

## Steps
1. Define roles and responsibilities for each team member or site.
2. Establish authorship criteria and order using recognized standards (e.g., ICMJE).
3. Create communication protocols including meeting schedules and tools.
4. Set up shared workspaces with version control and access management.
5. Document data sharing agreements and intellectual property arrangements.

## Verification
- All partners have signed the collaboration agreement.
- Shared workspace is configured with appropriate access controls.

## Rollback
- Archive agreement drafts and negotiation records.

## Common Failures
- Unclear authorship expectations leading to disputes.
- Incompatible data management practices across sites.

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs
