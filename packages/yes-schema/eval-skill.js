import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function loadSkills() {
  const skillsPath = path.join(repoRoot, 'registry', 'skills.json');
  if (!fs.existsSync(skillsPath)) return [];
  const data = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  return data.items || [];
}

function loadFixtures() {
  const dir = path.join(repoRoot, 'tests', 'fixtures', 'skills');
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.fixtures.json'))) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    for (const fx of data.fixtures || []) out.push({ ...fx, file });
  }
  return out;
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[?!.,;]/g, '')
    .replace(/\s+/g, ' ');
}

function domainHints(prompt) {
  const p = normalize(prompt);
  const hints = [];
  if (/security|owasp|vulnerability|secret|auth|pci|gdpr|iam|penetration|threat|compliance officer|attack/.test(p)) hints.push('security');
  if (/payroll|expense|forecast|budget|financial|invoice|revenue/.test(p)) hints.push('finance');
  if (/legal|contract|nda|terms of service|privacy policy/.test(p)) hints.push('legal-compliance');
  if (/startup|fundraising|founder|pmf|growth hack/.test(p)) hints.push('startup-ops');
  if (/market sizing|product roadmap|prd/.test(p)) hints.push('product-business');
  return hints;
}

function scoreSkillMatch(prompt, skill) {
  const normalizedPrompt = normalize(prompt);
  const promptWords = new Set(normalizedPrompt.split(' ').filter(Boolean));
  const triggers = [...(skill.triggers || []), ...(skill.activation_triggers || [])];
  let best = { confidence: 0, match_type: 'none' };
  const skillDomain = String(skill.id || '').split('.')[0];
  const hints = domainHints(prompt);
  const domainBoost = hints.includes(skillDomain) ? 0.15 : 0;
  for (const trigger of triggers) {
    const nt = normalize(trigger);
    if (!nt) continue;
    if (nt === normalizedPrompt) {
      return { skill_id: skill.id, match_type: 'exact', confidence: 1 + domainBoost };
    }
    if (normalizedPrompt.includes(nt)) {
      const score = 0.85 + nt.length * 0.002 + domainBoost;
      if (score > best.confidence) best = { skill_id: skill.id, match_type: 'containment', confidence: score };
      continue;
    }
    if (nt.includes(normalizedPrompt)) {
      const score = 0.8 + domainBoost;
      if (score > best.confidence) best = { skill_id: skill.id, match_type: 'containment_rev', confidence: score };
      continue;
    }
    const triggerWords = nt.split(' ').filter(Boolean);
    const overlap = triggerWords.filter((w) => promptWords.has(w)).length;
    if (triggerWords.length > 0) {
      const ratio = overlap / triggerWords.length;
      if (ratio >= 0.5) {
        const score = 0.65 + ratio * 0.2 + domainBoost;
        if (score > best.confidence) best = { skill_id: skill.id, match_type: 'word_overlap', confidence: score };
      }
    }
  }
  return best.confidence > 0 ? { skill_id: skill.id, match_type: best.match_type, confidence: best.confidence } : { skill_id: null, match_type: 'none', confidence: 0 };
}

function resolveSkill(prompt, skills) {
  let best = { skill_id: null, match_type: 'none', confidence: 0 };
  for (const skill of skills) {
    const match = scoreSkillMatch(prompt, skill);
    if (match.skill_id && match.confidence > best.confidence) best = match;
  }
  return best;
}

const thresholds = (() => {
  const thresholdsPath = path.join(repoRoot, 'registry', 'eval-thresholds.json');
  if (!fs.existsSync(thresholdsPath)) {
    return { skill_top1_min: 0.95 };
  }
  const data = JSON.parse(fs.readFileSync(thresholdsPath, 'utf8'));
  return data.skill || { skill_top1_min: 0.95 };
})();

const skills = loadSkills();
const fixtures = loadFixtures();

if (fixtures.length === 0) {
  console.error('✗ No skill fixtures found in tests/fixtures/skills/*.fixtures.json');
  process.exit(1);
}

if (skills.length === 0) {
  console.error('✗ No skills found in registry/skills.json');
  process.exit(1);
}

let correct = 0;
const failures = [];

for (const fx of fixtures) {
  const resolved = resolveSkill(fx.prompt, skills);
  const expected = fx.expected_skill;
  
  if (resolved.skill_id === expected) {
    correct++;
  } else {
    failures.push(`"${fx.prompt}" → ${resolved.skill_id || 'null'} (expected ${expected})`);
  }
}

const total = fixtures.length;
const top1 = correct / total;

console.log('--- Skill eval ---');
console.log(`fixtures: ${total}`);
console.log(`skills: ${skills.length}`);
console.log(`top-1 accuracy: ${(top1 * 100).toFixed(1)}% (min ${(thresholds.skill_top1_min ?? 0.95) * 100}%)`);

if (failures.length) {
  console.log('\nmismatches:');
  for (const f of failures) console.log(`  ✗ ${f}`);
}

const ok = top1 >= (thresholds.skill_top1_min ?? 0.95);
console.log(ok ? '\n✓ Skill eval passed.' : '\n✗ Skill eval failed thresholds.');
process.exit(ok ? 0 : 1);
