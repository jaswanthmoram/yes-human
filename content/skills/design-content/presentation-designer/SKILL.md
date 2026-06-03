---
quality_gate: production
id: design-content.presentation-designer
name: Presentation Design and Narrative
version: 1.0.0
domain: design-content
category: design-content.presentation
purpose: Design clear slide narratives, visual hierarchy, layout systems, and speaker-ready presentation structure.
summary: Presentation design turns raw content into a deck with a coherent storyline, scannable slides, consistent visual system, and clear audience action.
triggers:
  - presentation design
  - presentation designer task
  - pitch deck design
  - slide deck redesign
  - investor deck structure
activation_triggers:
  - design this deck
  - improve these slides
prerequisites:
  - Audience and presentation goal are known
  - Source content or outline is available
  - Brand assets or visual constraints are available when applicable
inputs:
  - slide_outline
  - audience_context
  - brand_assets
  - delivery_format
steps:
  - Define audience, objective, time limit, and desired decision or action.
  - Build a storyline with one idea per slide and a clear arc: context, tension, answer, proof, ask.
  - Convert dense content into slide-level headlines, supporting evidence, and visuals.
  - Apply layout hierarchy: title, key visual, data, annotation, and footer metadata.
  - Check consistency of typography, spacing, color, chart labels, and image treatment.
  - Produce speaker notes or talk track where needed.
outputs:
  - deck_structure
  - slide_redesign_notes
  - visual_system_guidance
  - speaker_notes
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Every slide has one main message
  - Visual hierarchy supports scanning
  - Charts and claims are labeled with source or assumption
failure_modes:
  - Making decorative slides without narrative logic
  - Overloading slides with text
  - Using charts without clear takeaway
handoffs:
  - design-content.presentation-designer
  - design-content.brand-designer
source_references:
  - ref.github.design-content.presentation-designer.2026-06-02
  - https://github.com/Slidevjs/slidev
allowed_agents:
  - design-content.presentation-designer
status: active
budget_band: standard
rollback:
  - Revert deck notes or generated slide artifacts
validators:
  - skill.validator
  - slide_message_check
---

## Procedure
1. Clarify audience, goal, timing, and desired decision.
2. Turn content into a storyline and slide map.
3. Rewrite each slide title as a takeaway.
4. Design visual hierarchy and remove nonessential content.
5. Verify consistency, accessibility, chart labeling, and speaker flow.

## Verification
- Each slide has one takeaway.
- The deck can be understood by scanning headlines.
- Any claim or chart includes a source or assumption.
