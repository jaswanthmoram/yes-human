#!/usr/bin/env node
/**
 * deepen-agents.mjs — Domain-aware dossier generator.
 *
 * Replaces the shallow placeholder bodies emitted by scripts/uplift-agents.mjs
 * ("Apply guidance from: verification pattern 1", "Example A: User asks for ...")
 * with deep, source-grounded, domain-specific dossiers that follow the
 * yes-human "best format":
 *
 *   Mission → Scope (in/out) → Procedure (Phase 1/2/3) → Verification (as checks)
 *   → Failure modes (explained) → Examples (2 worked) → Handoffs (concrete routing)
 *
 * Design principles
 * -----------------
 * 1. NEVER alter YAML keys — only enrich values and the markdown body.
 * 2. Depth is derived from each agent's OWN rich frontmatter (verification,
 *    failure_modes, inputs, outputs, triggers) + per-category knowledge banks
 *    + the mined public sources in references/<domain>/<name>.sources.json.
 * 3. Schema-valid: preserves canonical key order and high-stakes flags.
 *
 * Usage:
 *   node scripts/deepen-agents.mjs --only data-ai     # one top-level domain
 *   node scripts/deepen-agents.mjs                     # all 325
 *   node scripts/deepen-agents.mjs --only data-ai --dry  # print, do not write
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const ONLY = (() => {
  const i = args.indexOf('--only');
  return i >= 0 ? args[i + 1] : null;
})();
const DRY = args.includes('--dry');
const HIGH_STAKES = new Set(['finance', 'legal-compliance', 'hr', 'healthcare']);

// Canonical frontmatter key order (schema-aligned). Only emitted if present.
const KEY_ORDER = [
  'id',
  'name',
  'version',
  'status',
  'category',
  'kind',
  'summary',
  'triggers',
  'aliases',
  'negative_keywords',
  'inputs',
  'outputs',
  'allowed_tools',
  'required_skills',
  'budget_band',
  'max_context_tokens',
  'failure_modes',
  'verification',
  'requires_disclaimer',
  'human_review_gate',
  'source_references',
  'quality_gate'
];

// ---------------------------------------------------------------------------
// Per-category knowledge banks (18 top-level domains).
// negPool: cross-domain exclusions used to top up negative_keywords to >=4.
// method:  one short clause naming the domain's working method (Phase 2 flavor).
// ---------------------------------------------------------------------------
const CATEGORY = {
  'data-ai': {
    negPool: [
      'contract review',
      'revenue forecasting',
      'ui/ux visual design',
      'brand copywriting',
      'payroll processing'
    ],
    method: 'establish a measurable baseline before optimizing, and isolate evaluation data from training data'
  },
  'design-content': {
    negPool: [
      'model training',
      'database schema migration',
      'financial forecasting',
      'legal contract review',
      'infrastructure provisioning'
    ],
    method:
      'ground decisions in user needs and accessibility, and validate against the design system rather than personal taste'
  },
  education: {
    negPool: [
      'production deployment',
      'financial audit',
      'legal contract review',
      'infrastructure provisioning',
      'model training'
    ],
    method:
      'define learning objectives first, then align assessment and content to those objectives (constructive alignment)'
  },
  engineering: {
    negPool: ['legal contract review', 'financial forecasting', 'marketing copy', 'payroll processing', 'brand design'],
    method:
      'state trade-offs explicitly, respect existing system constraints, and avoid over-engineering for hypothetical scale'
  },
  finance: {
    negPool: [
      'software deployment',
      'model training',
      'ui/ux design',
      'marketing campaign',
      'infrastructure provisioning'
    ],
    method:
      'tie every number to a source document, apply the controlling accounting standard, and keep an auditable trail'
  },
  healthcare: {
    negPool: ['software deployment', 'marketing campaign', 'financial forecasting', 'ui/ux design', 'model training'],
    method: 'stay within evidence and guidelines, protect PHI, and never substitute for licensed clinical judgement'
  },
  hr: {
    negPool: [
      'software deployment',
      'model training',
      'financial forecasting',
      'infrastructure provisioning',
      'marketing copy'
    ],
    method:
      'apply policy consistently, protect employee privacy, and flag anything requiring legal or leadership review'
  },
  integrations: {
    negPool: [
      'financial forecasting',
      'legal contract review',
      'marketing copy',
      'clinical advice',
      'payroll processing'
    ],
    method:
      'read the provider contract (API/SDK/schema) first, handle auth and rate limits, and fail safe on partial responses'
  },
  'legal-compliance': {
    negPool: [
      'software deployment',
      'model training',
      'marketing campaign',
      'infrastructure provisioning',
      'ui/ux design'
    ],
    method:
      'identify the controlling regulation/clause, separate analysis from advice, and escalate ambiguous risk to counsel'
  },
  manufacturing: {
    negPool: ['marketing copy', 'legal contract review', 'model training', 'ui/ux design', 'financial audit'],
    method: 'respect physical constraints and safety standards, and validate against process capability data'
  },
  marketing: {
    negPool: [
      'model training',
      'database schema migration',
      'legal contract review',
      'infrastructure provisioning',
      'payroll processing'
    ],
    method:
      'start from audience and positioning, tie creative to a measurable funnel metric, and respect brand guidelines'
  },
  'meta-system': {
    negPool: [
      'financial forecasting',
      'clinical advice',
      'legal contract review',
      'marketing campaign',
      'payroll processing'
    ],
    method: 'treat routing, evaluation, and promotion as evidence-gated decisions with explicit thresholds'
  },
  platform: {
    negPool: ['marketing copy', 'legal contract review', 'financial forecasting', 'clinical advice', 'brand design'],
    method: 'design for reliability and least-privilege, and verify rollback paths before shipping changes'
  },
  'product-business': {
    negPool: [
      'model training',
      'infrastructure provisioning',
      'legal contract drafting',
      'database schema migration',
      'payroll processing'
    ],
    method:
      'anchor on the user problem and a success metric before proposing solutions, and state assumptions explicitly'
  },
  research: {
    negPool: [
      'production deployment',
      'financial audit',
      'legal contract review',
      'marketing campaign',
      'infrastructure provisioning'
    ],
    method: 'distinguish evidence strength, cite primary sources, and separate established findings from speculation'
  },
  sales: {
    negPool: [
      'model training',
      'infrastructure provisioning',
      'legal contract drafting',
      'clinical advice',
      'database schema migration'
    ],
    method: 'qualify against an explicit framework, tie next steps to buyer signals, and keep CRM state truthful'
  },
  security: {
    negPool: ['marketing copy', 'financial forecasting', 'ui/ux design', 'payroll processing', 'brand design'],
    method: 'reason from a threat model, prefer defense-in-depth, and never weaken controls for convenience'
  },
  'startup-ops': {
    negPool: [
      'model training',
      'clinical advice',
      'infrastructure provisioning',
      'database schema migration',
      'brand design'
    ],
    method:
      'optimize for speed-with-reversibility, keep a paper trail, and flag legal/finance items for specialist review'
  }
};

// Map a negative keyword to a likely escalation domain for concrete handoffs.
const NEG_TARGET = [
  [/contract|legal|nda|compliance|regulat|gdpr|hipaa/i, 'legal-compliance.master'],
  [/financ|revenue|forecast|budget|payroll|expense|tax|audit/i, 'finance.master'],
  [/payroll|employee|hiring|recruit|onboarding|hr\b/i, 'hr.master'],
  [/marketing|campaign|brand|copywrit|seo|content strategy/i, 'marketing.master'],
  [/ui\/ux|ux|visual design|frontend|dashboard design/i, 'design-content.master'],
  [/model training|fine.?tun|inference|rag|embedding|ml\b/i, 'data-ai.master'],
  [/deploy|infrastructure|kubernetes|provision|ci\/cd/i, 'platform.master'],
  [/security|threat|vulnerab|pentest|exploit/i, 'security.master'],
  [/clinical|patient|diagnos|phi\b/i, 'healthcare.master'],
  [/product roadmap|market research|business analytics/i, 'product-business.master']
];

// ---------------------------------------------------------------------------
// Per-agent overrides for agents whose frontmatter is placeholder-generic.
// Fills inputs/outputs/verification/failure_modes/negative_keywords with real
// domain content so generated bodies are concrete, not hollow.
// ---------------------------------------------------------------------------
const OVERRIDES = {
  'data-ai.analytics-engineer': {
    negative_keywords: ['model training', 'frontend design', 'legal review', 'financial forecast'],
    inputs: ['source_tables', 'metric_definitions', 'freshness_sla'],
    outputs: ['dbt_model_design', 'metrics_layer_spec', 'test_and_documentation_plan'],
    verification: ['incremental_strategy_justified', 'tests_and_docs_present', 'metric_definitions_single_source'],
    failure_modes: [
      'ships models without tests or documentation',
      'duplicates metric definitions across models instead of a single source of truth',
      'ignores incremental model strategy for large tables, causing full-refresh cost blowups'
    ]
  }
};

// ---------------------------------------------------------------------------
// Frontmatter parse / serialize (matches compile.js's line-based parser).
// ---------------------------------------------------------------------------
function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n/);
  if (!m) return { fm: {}, body: content, hadFm: false };
  const fm = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (line.startsWith('  - ') || line.startsWith('- ')) {
      const v = line
        .replace(/^(\s*-?\s*)/, '')
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (key && Array.isArray(fm[key])) fm[key].push(v);
      continue;
    }
    const cm = line.match(/^([^:]+):\s*(.*)$/);
    if (!cm) continue;
    key = cm[1].trim();
    const val = cm[2].trim();
    if (val === '' || val === '[]') fm[key] = [];
    else if (val === 'true') fm[key] = true;
    else if (val === 'false') fm[key] = false;
    else fm[key] = val.replace(/^['"]|['"]$/g, '');
  }
  return { fm, body: content.slice(m[0].length), hadFm: true };
}

function serializeFrontmatter(fm) {
  let out = '---\n';
  for (const k of KEY_ORDER) {
    if (fm[k] === undefined) continue;
    const v = fm[k];
    if (Array.isArray(v)) {
      out += v.length ? `${k}:\n` + v.map((x) => `  - ${x}`).join('\n') + '\n' : `${k}: []\n`;
    } else if (typeof v === 'boolean') {
      out += `${k}: ${v}\n`;
    } else {
      out += `${k}: ${v}\n`;
    }
  }
  return out + '---\n';
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------
function humanize(token) {
  // Replace snake_case underscores with spaces, but preserve hyphens so
  // "cherry-picked" / "non-deterministic" / "four-fifths" stay intact.
  return String(token).replace(/_+/g, ' ').trim();
}

// Render a verification token as a clean checklist label (noun phrase, capitalized).
// e.g. `thresholds_set_before_results` -> "Thresholds set before results".
// Noun-phrase form sidesteps is/are agreement entirely.
function verifToCheck(token) {
  const h = humanize(token);
  return h.charAt(0).toUpperCase() + h.slice(1);
}

// Keyword set for pairing failure modes to verification items.
const STOP = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'of',
  'to',
  'in',
  'on',
  'for',
  'without',
  'with',
  'is',
  'are',
  'before',
  'after',
  'into',
  'that',
  'not',
  'no'
]);
function keywords(s) {
  return new Set(
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w))
  );
}
function pairFailureToVerif(failure, verifs) {
  const fk = keywords(failure);
  let best = null,
    bestScore = 0;
  for (const v of verifs) {
    const vk = keywords(v);
    let score = 0;
    for (const w of fk) if (vk.has(w)) score++;
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return bestScore > 0 ? best : null;
}

function negTarget(neg) {
  for (const [re, target] of NEG_TARGET) if (re.test(neg)) return target;
  return null;
}

// Extract up to `n` clean { name, url } source citations from a dossier.
function sourceCitations(dossier, n = 3) {
  if (!dossier?.sources) return [];
  const out = [];
  for (const s of dossier.sources) {
    const usedFor = (s.used_for || [])[0] || '';
    let name = usedFor
      .replace(/^[^:]+:\s*/, '')
      .replace(/\s+patterns and (workflow )?references?$/i, '')
      .trim();
    if (!name) {
      try {
        name = new URL(s.url).hostname.replace(/^www\./, '');
      } catch {
        name = s.url;
      }
    }
    if (name && !/^verification pattern/i.test(name)) {
      out.push({ name, url: s.url });
      if (out.length >= n) break;
    }
  }
  return out;
}

function code(x) {
  return '`' + x + '`';
}

// ---------------------------------------------------------------------------
// Body builder — the deep, domain-aware dossier.
// ---------------------------------------------------------------------------
function buildBody(fm, dossier, bank) {
  const name = fm.name || fm.id;
  const domain = fm.id.split('.')[0];
  const isMaster = fm.kind === 'master';
  const inputs = fm.inputs || [];
  const outputs = fm.outputs || [];
  const triggers = fm.triggers || [];
  const verifs = fm.verification || [];
  const fails = fm.failure_modes || [];
  const negs = fm.negative_keywords || [];
  const cites = sourceCitations(dossier, 3);
  const firstInput = inputs[0];
  const firstOutput = outputs[0] || 'the requested deliverable';

  // ---- Mission ----
  const roleSentence = isMaster
    ? 'routes work to the correct specialist and composes their outputs into one coherent deliverable'
    : 'owns a single, well-bounded slice of work';
  const methodSentence = isMaster ? '' : ` Its working method: ${bank.method}.`;
  const mission = `${fm.summary}\n\nAs the **${name}** ${isMaster ? 'orchestrator' : 'specialist'} in the ${code(domain)} domain, this agent ${roleSentence}.${methodSentence} It is invoked when a request matches its triggers (e.g. ${triggers
    .slice(0, 3)
    .map((t) => `_${t}_`)
    .join(', ')}) and declines work that belongs to a sibling specialist.`;

  // ---- Scope ----
  const inScope =
    triggers
      .slice(0, 5)
      .map((t) => `- ${t}`)
      .join('\n') || `- Tasks matching the domain expectations for ${code(fm.id)}.`;
  const outScope = (negs.length ? negs : ['unrelated domains'])
    .map((nk) => {
      const tgt = negTarget(nk);
      return `- **${nk}**${tgt ? ` → hand off to ${code(tgt)}` : ' (out of domain)'}`;
    })
    .join('\n');

  // ---- Procedure: Phase 1 (Context & Constraint Analysis) ----
  const inputList = inputs.length ? inputs.map(code).join(', ') : '(none declared)';
  const p1 = [
    `1. **Verify inputs.** Confirm the required inputs are present: ${inputList}.` +
      (firstInput
        ? ` If ${code(firstInput)} is missing or ambiguous, stop and ask for it — the task cannot be correctly scoped without it.`
        : ''),
    `2. **Set boundaries.** This agent owns ${code(fm.id)}; it does **not** handle ${negs.length ? negs.slice(0, 3).join(', ') : 'work outside its triggers'}. If the request is mostly out-of-scope, route per **Handoffs** instead of partially answering.`,
    `3. **Name the deliverables.** State the target outputs up front: ${outputs.length ? outputs.map(code).join(', ') : code('specialist_output')}. Everything in Phase 3 must trace back to one of these.`
  ].join('\n');

  // ---- Procedure: Phase 2 (Deep Thinking & Planning) ----
  let step = 4;
  const planLines = [];
  if (isMaster) {
    planLines.push(
      `${step++}. **Classify the request** and pick exactly one specialist whose triggers match most precisely; do not fan out to every specialist.`
    );
    planLines.push(`${step++}. **Plan the delegation**: ${bank.method}.`);
  } else {
    planLines.push(`${step++}. **Model the solution** before producing it: ${bank.method}.`);
    // Promote verification items into planning intents (these are domain-specific).
    for (const v of verifs.slice(0, 3)) {
      planLines.push(`${step++}. Design so the plan can satisfy the Verification gate **${humanize(v)}**.`);
    }
  }
  if (cites.length) {
    planLines.push(
      `${step++}. **Consult source patterns** (patterns only, never copy): ${cites.map((c) => `[${c.name}](${c.url})`).join(', ')}.`
    );
  }
  const p2 = planLines.join('\n');

  // ---- Procedure: Phase 3 (Implementation & Validation) ----
  const p3 = [
    `${step}. **Produce ${firstOutput}** as clean, modular output — structured, skimmable, and limited to the declared deliverables.`,
    `${step + 1}. **Run the Verification checklist** below. Do not report the task complete until every item passes; if one cannot pass, say so explicitly and state the gap.`,
    `${step + 2}. **Surface residual risk** by naming which Failure modes were most relevant and how they were avoided.`
  ].join('\n');

  // ---- Verification (as concrete checks) ----
  const verifChecks = (verifs.length ? verifs : ['output_matches_request'])
    .map((v) => `- [ ] ${verifToCheck(v)}.`)
    .join('\n');

  // ---- Failure modes (explained, paired to verification) ----
  const failExpl = (fails.length ? fails : ['scope drift into adjacent domains'])
    .map((f) => {
      const paired = pairFailureToVerif(f, verifs);
      let label = humanize(f).replace(/\.$/, '');
      label = label.charAt(0).toUpperCase() + label.slice(1);
      const guard = paired
        ? ` _Prevented by the check_ **${humanize(paired)}**.`
        : ' _Prevented by re-reading Scope and running the full Verification checklist._';
      return `- **${label}.**${guard}`;
    })
    .join('\n');

  // ---- Examples (2 worked) ----
  const exTrigger = triggers[0] || `${humanize(fm.id.split('.').slice(1).join(' '))} task`;
  const exampleA = `### Example A — well-scoped request
**User:** "${exTrigger}"${firstInput ? `, providing ${code(firstInput)}` : ''}.

**${name} responds:**
1. Restates scope and confirms it is in-domain (not ${negs[0] || 'an adjacent domain'}).
2. Works through Phase 1→3${
    verifs.length
      ? `, explicitly satisfying ${verifs
          .slice(0, 2)
          .map((v) => code(v))
          .join(' and ')}`
      : ''
  }.
3. Returns ${outputs.length ? outputs.map(code).join(' + ') : code('specialist_output')} as a structured deliverable, then ticks the Verification checklist.`;

  const exampleB = `### Example B — incomplete context
**User:** asks for help but omits ${firstInput ? code(firstInput) : 'a required input'}.

**${name} responds:** asks one targeted question to obtain ${firstInput ? code(firstInput) : 'the missing input'}, states any assumptions explicitly, then proceeds to produce ${code(firstOutput)} with those assumptions flagged — rather than guessing silently.`;

  // ---- Handoffs (concrete routing) ----
  const handoffTargets = [...new Set(negs.map(negTarget).filter(Boolean))].filter((t) => t !== `${domain}.master`);
  const handoffLines = [
    isMaster
      ? `- A request that fits one specialist → delegate to that specialist directly.`
      : `- Work that spans multiple specialists → escalate to ${code(`${domain}.master`)}.`
  ];
  for (const t of handoffTargets.slice(0, 3))
    handoffLines.push(`- Adjacent request matching its exclusions → route to ${code(t)}.`);
  handoffLines.push(`- No clear specialist fit → ${code('meta-system.supreme-router')}.`);
  if (fm.human_review_gate)
    handoffLines.push(`- ⚠️ High-stakes domain: outputs require human review and carry a disclaimer before action.`);
  const handoffs = handoffLines.join('\n');

  return `## Mission
${mission}

## Scope
**In scope**
${inScope}

**Out of scope**
${outScope}

## Procedure

### Phase 1 — Context & Constraint Analysis
${p1}

### Phase 2 — Deep Thinking & Planning
${p2}

### Phase 3 — Implementation & Validation
${p3}

## Verification
${verifChecks}

## Failure modes
${failExpl}

## Examples
${exampleA}

${exampleB}

## Handoffs
${handoffs}
`;
}

// ---------------------------------------------------------------------------
// Frontmatter enrichment (values only; keys untouched).
// ---------------------------------------------------------------------------
function enrichFrontmatter(fm, bank) {
  const override = OVERRIDES[fm.id] || {};
  for (const [k, v] of Object.entries(override)) {
    // Only apply override when the existing value is generic/empty.
    const cur = fm[k];
    const isGeneric =
      !cur ||
      (Array.isArray(cur) &&
        (cur.length === 0 ||
          cur.join() === 'output_matches_request' ||
          cur.join() === 'scope drift' ||
          cur.join() === 'task_context' ||
          cur.join() === 'specialist_output'));
    if (isGeneric) fm[k] = v;
  }

  // Ensure 3–5 specific negative keywords.
  fm.negative_keywords = fm.negative_keywords || [];
  const own = new Set([
    ...(fm.triggers || []).join(' ').toLowerCase().split(/\s+/),
    ...(fm.aliases || []).join(' ').toLowerCase().split(/\s+/)
  ]);
  for (const cand of bank.negPool) {
    if (fm.negative_keywords.length >= 4) break;
    const collides = cand
      .toLowerCase()
      .split(/\s+/)
      .some((w) => own.has(w));
    if (!collides && !fm.negative_keywords.includes(cand)) fm.negative_keywords.push(cand);
  }

  // High-stakes domains always carry review gates.
  const domain = fm.id.split('.')[0];
  if (HIGH_STAKES.has(domain)) {
    fm.requires_disclaimer = true;
    fm.human_review_gate = true;
  }
  return fm;
}

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------
function loadDossier(agentId) {
  const [d, ...rest] = agentId.split('.');
  const p = path.join(repoRoot, 'references', d, `${rest.join('.')}.sources.json`);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { fm, hadFm } = parseFrontmatter(raw);
  if (!hadFm || !fm.id) return { skipped: true, reason: 'no frontmatter/id' };
  const domain = fm.id.split('.')[0];
  const bank = CATEGORY[domain] || CATEGORY['meta-system'];
  enrichFrontmatter(fm, bank);
  const dossier = loadDossier(fm.id);
  const body = buildBody(fm, dossier, bank);
  const next = serializeFrontmatter(fm) + body;
  if (DRY) return { dry: true, content: next };
  fs.writeFileSync(filePath, next);
  return { written: true };
}

const agentsDir = path.join(repoRoot, 'content/agents');
let written = 0,
  skipped = 0;
for (const domainDir of fs.readdirSync(agentsDir)) {
  const dir = path.join(agentsDir, domainDir);
  if (!fs.statSync(dir).isDirectory()) continue;
  if (ONLY && domainDir !== ONLY) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const res = processFile(path.join(dir, f));
    if (res.written) written++;
    else if (res.skipped) skipped++;
    if (res.dry) {
      console.log(`\n\n##### ${path.relative(repoRoot, path.join(dir, f))} #####\n`);
      console.log(res.content);
    }
  }
}
if (!DRY)
  console.log(`deepen-agents: wrote ${written} agent dossiers${ONLY ? ` in '${ONLY}'` : ''}, skipped ${skipped}.`);
