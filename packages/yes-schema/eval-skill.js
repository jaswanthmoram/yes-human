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

function resolveSkill(prompt, skills) {
  const normalizedPrompt = normalize(prompt);
  const promptWords = new Set(normalizedPrompt.split(' '));
  
  // Try exact trigger match first
  for (const skill of skills) {
    const triggers = [
      ...(skill.triggers || []),
      ...(skill.activation_triggers || [])
    ];
    for (const trigger of triggers) {
      if (normalize(trigger) === normalizedPrompt) {
        return { skill_id: skill.id, match_type: 'exact', confidence: 1.0 };
      }
    }
  }
  
  // Try keyword containment match
  for (const skill of skills) {
    const triggers = [
      ...(skill.triggers || []),
      ...(skill.activation_triggers || [])
    ];
    for (const trigger of triggers) {
      const normalizedTrigger = normalize(trigger);
      if (normalizedPrompt.includes(normalizedTrigger) || normalizedTrigger.includes(normalizedPrompt)) {
        return { skill_id: skill.id, match_type: 'containment', confidence: 0.85 };
      }
    }
  }
  
  // Try word overlap match (at least 50% of trigger words in prompt)
  for (const skill of skills) {
    const triggers = [
      ...(skill.triggers || []),
      ...(skill.activation_triggers || [])
    ];
    for (const trigger of triggers) {
      const triggerWords = normalize(trigger).split(' ');
      const overlap = triggerWords.filter(w => promptWords.has(w)).length;
      if (triggerWords.length > 0 && overlap / triggerWords.length >= 0.5) {
        return { skill_id: skill.id, match_type: 'word_overlap', confidence: 0.7 };
      }
    }
  }
  
  // No match found
  return { skill_id: null, match_type: 'none', confidence: 0 };
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
