#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname);
const skillsRoot = path.join(repoRoot, 'content', 'skills');

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, acc);
    } else if (entry.name === 'SKILL.md') {
      acc.push(fullPath);
    }
  }
  return acc;
}

function splitFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n/);
  return {
    frontmatter: match ? match[1] : '',
    body: match ? text.slice(match[0].length) : text
  };
}

function listCount(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\r?\\n((?:\\s+- .*\\r?\\n?)+)`, 'm'));
  return match ? (match[1].match(/^\s+- /gm) || []).length : 0;
}

function sourceReferenceBlock(frontmatter) {
  return frontmatter.match(/^source_references:\s*\r?\n((?:\s+- .*\r?\n?)+)/m)?.[1] || '';
}

function scoreSkill(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = splitFrontmatter(text);
  const references = sourceReferenceBlock(frontmatter);
  const reasons = [];
  let score = 0;

  if (body.trim().length > 800) score += 2;
  else reasons.push(`body_length=${body.trim().length}`);

  const steps = listCount(frontmatter, 'steps');
  if (steps > 5) score += 2;
  else reasons.push(`steps=${steps}`);

  if (/github\.com\//.test(references) && !/ref\.github\.ecc\.2026-05-29/.test(references)) score += 2;
  else reasons.push('missing_real_github_source_reference');

  if (listCount(frontmatter, 'prerequisites') > 0 && !/task_context/.test(frontmatter)) score += 1;
  else reasons.push('generic_or_missing_prerequisites');

  if (/^rollback:/m.test(frontmatter) || /no_write/i.test(frontmatter)) score += 1;
  else reasons.push('missing_rollback');

  if (/^## Verification/m.test(body)) score += 1;
  else reasons.push('missing_verification_section');

  if (/github\.com\//.test(text) && !/github\.com\/affaan-m\/ECC/.test(text)) score += 1;
  else reasons.push('missing_non_ecc_github_citation');

  return { file: path.relative(repoRoot, filePath), score, reasons };
}

const failures = walk(skillsRoot)
  .map(scoreSkill)
  .filter((result) => result.score < 8)
  .sort((a, b) => a.score - b.score || a.file.localeCompare(b.file));

if (failures.length) {
  console.error(`Found ${failures.length} stub or near-stub skills:`);
  for (const failure of failures) {
    console.error(`${failure.score}/10 ${failure.file} (${failure.reasons.join(', ')})`);
  }
  process.exit(1);
}

console.log('✓ No stub skills detected.');
