import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function estimateTokens(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter(Boolean);
  let tokens = 0;
  for (const word of words) {
    const specialChars = word.match(/[{}[\]()=+\-*/&|!><;,.]/g);
    const specialCount = specialChars ? specialChars.length : 0;
    const cleanWord = word.replace(/[{}[\]()=+\-*/&|!><;,.]/g, '');
    if (cleanWord.length > 0) {
      tokens += Math.max(1, Math.ceil(cleanWord.length / 4));
    }
    tokens += specialCount;
  }
  return tokens;
}

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const manifest = JSON.parse(readText('yes-human.plugin.json'));
const thresholds = JSON.parse(readText('registry/eval-thresholds.json'));
const bootText = readText(manifest.startup.boot_file);
const bootTokens = estimateTokens(bootText);

console.log(`Boot file: ${manifest.startup.boot_file}`);
console.log(`Estimated tokens: ${bootTokens}`);
console.log(`Target: ${thresholds.startup_tokens.target}`);
console.log(`Hard cap: ${thresholds.startup_tokens.hard_cap}`);

let ok = true;
if (bootTokens > thresholds.startup_tokens.hard_cap) {
  console.error(`✗ Boot file exceeds hard cap (${bootTokens} > ${thresholds.startup_tokens.hard_cap})`);
  ok = false;
} else if (bootTokens > thresholds.startup_tokens.target) {
  console.log(`⚠ Boot file above target but within hard cap`);
} else {
  console.log('✓ Boot file within target token budget');
}

const forbiddenSnippets = ['agents.json', 'skills.json', 'workflows.json', 'categories.json'];
for (const snippet of forbiddenSnippets) {
  if (bootText.includes(snippet)) {
    console.error(`✗ Boot file must not reference full registry at startup: ${snippet}`);
    ok = false;
  }
}

if (ok) {
  console.log('✓ Boot file avoids forbidden startup registry references');
}

process.exit(ok ? 0 : 1);
