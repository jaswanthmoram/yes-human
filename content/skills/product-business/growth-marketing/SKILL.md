---
id: product-business.growth-marketing
name: Growth Marketing and Experimentation
version: 1.0.0
domain: product-business
category: product-business.growth
purpose: Design and analyze growth experiments across the AARRR funnel with metric-backed hypotheses and pre-registered thresholds.
summary: Growth marketing is hypothesis-driven experimentation across acquisition, activation, retention, referral, and revenue. This skill covers: hypothesis formation, experiment design, sample size calculation, analysis, and decision-making without threshold-fishing.
triggers:
  - growth marketing strategy
  - growth experiment design
  - user acquisition plan
  - viral growth loop
  - growth hacking
activation_triggers:
  - how do we grow faster
  - we need a growth experiment
prerequisites:
  - Analytics tool in place (PostHog, Mixpanel, Amplitude)
  - Baseline metrics available
  - Growth lever identified (acquisition, activation, retention, referral, or revenue)
inputs:
  - current_funnel_metrics
  - growth_hypothesis
  - available_traffic
steps:
  - Choose the growth lever based on the biggest funnel drop-off (measure before guessing)
  - Formulate a falsifiable hypothesis: "By changing X, we expect Y to improve by Z% because of W"
  - Calculate minimum detectable effect and required sample size before running the experiment
  - Pre-register the success metric and threshold — document before seeing results
  - Run the experiment for a full business cycle (min 2 weeks) without peeking or early stopping
  - Analyze results: did we hit the pre-registered threshold? Document learnings regardless of outcome
outputs:
  - experiment_hypothesis
  - experiment_design
  - results_analysis
  - growth_playbook_entry
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Success metric and threshold pre-registered before experiment launch
  - Sample size calculated (not guessed)
  - Experiment runs for a full business cycle
failure_modes:
  - Peeking at results before experiment ends
  - Changing success metric after seeing results
  - Running underpowered experiments
handoffs:
  - product-business.product-manager (for feature roadmap impact)
  - marketing.master (for channel execution)
source_references:
  - https://github.com/PostHog/posthog
  - https://github.com/withastro/astro
allowed_agents:
  - product-business.growth-marketer
status: active
budget_band: standard
rollback:
  - Disable experiment feature flag
  - Revert landing page changes
validators:
  - skill.validator
---
## Trigger
Use when designing a growth experiment, analyzing funnel drop-offs, or developing a systematic growth strategy.

## Prerequisites
- Baseline funnel metrics available
- Analytics tool tracking the funnel
- Traffic volume sufficient for experimentation (min ~100 conversions/week)

## Steps

### 1. Diagnose the Funnel
Don't guess — measure. Where is the biggest drop-off? Acquisition → activation is usually the first bottleneck for early-stage products.

### 2. Form a Hypothesis
"By adding social proof to the signup page, we expect signup conversion to improve by 15% because users need trust signals before committing."

### 3. Calculate Sample Size
Use an A/B test calculator. Input: baseline conversion rate, minimum detectable effect (MDE), power (80%), significance (0.05). Don't run underpowered experiments.

### 4. Pre-Register Everything
Document before launch: primary metric, secondary metrics, MDE, run duration, decision threshold. No moving goalposts.

### 5. Run for Full Cycle
Minimum 2 weeks to capture weekly seasonality. Don't stop early even if it looks good.

### 6. Analyze and Document
Did the primary metric hit the threshold? If yes: ship. If no: document the learning — negative results are valuable. Add to growth playbook.

## Verification
- [ ] Hypothesis falsifiable
- [ ] Sample size pre-calculated
- [ ] Success metric pre-registered
- [ ] Experiment ran full duration

## Rollback
Disable experiment via feature flag.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| P-hacking | Peeking and stopping early | Commit to run duration |
| Inconclusive results | Underpowered experiment | Calculate sample size first |
| No learnings from failures | Results archived | Document every experiment outcome |

## Examples
**Example A:** Activation experiment: add onboarding checklist → 23% improvement in day-7 retention.
**Example B:** Referral loop: add "invite a colleague" to activation email → 8% referral rate (below 15% MDE → learn and iterate).
