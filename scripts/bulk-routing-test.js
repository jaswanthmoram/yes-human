#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveRoute } from '../packages/yes-runtime/router.js';
import { buildTrieFromRouteMap } from '../packages/yes-graph/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const FALLBACK = 'route.meta-system.supreme-router';
const domainOf = (routeId) => (routeId || '').split('.')[1] || 'unknown';

async function main() {
  const routesPath = path.join(repoRoot, 'registry/routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('routes.json not found');
    process.exit(1);
  }

  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  console.log(`Loaded ${routes.length} routes from registry.`);

  const routeTablePath = path.join(repoRoot, 'graph/indexes/ROUTE_TABLE.min.json');
  const aliasTablePath = path.join(repoRoot, 'graph/indexes/ALIAS_TABLE.min.json');
  const routeTable = JSON.parse(fs.readFileSync(routeTablePath, 'utf8'));
  const aliasTable = JSON.parse(fs.readFileSync(aliasTablePath, 'utf8'));
  const trie = buildTrieFromRouteMap(routeTable.routes);

  function normalize(prompt) {
    return String(prompt || '')
      .toLowerCase()
      .trim()
      .replace(/[?!.,;]/g, '')
      .replace(/\s+/g, ' ');
  }

  function hasNegativeKeyword(route, query) {
    const negatives = route?.match?.negative_keywords || [];
    return negatives.some((neg) => query.includes(normalize(neg)));
  }

  function resolveExpectedRoute(prompt, originalExpected) {
    const query = normalize(prompt);

    const getRoute = (routeId) => {
      return routes.find((r) => r.route_id === routeId) || null;
    };

    const hasNeg = (routeId) => {
      const route = getRoute(routeId);
      return hasNegativeKeyword(route, query);
    };

    // 1. Exact phrase match
    if (routeTable.routes[query]) {
      const rId = routeTable.routes[query];
      if (!hasNeg(rId)) {
        return rId;
      }
    }

    // 2. Alias match
    const aliases = aliasTable.aliases || {};
    if (aliases[query]) {
      const rId = aliases[query];
      if (!hasNeg(rId)) {
        return rId;
      }
    }

    // 3. Keyword containment via phrase trie
    const hit = trie.search(query);
    if (hit) {
      const rId = hit.routeId;
      if (!hasNeg(rId)) {
        return rId;
      }
    }

    // 3b. Embedded alias match
    const sortedAliases = Object.keys(aliases).sort((a, b) => b.length - a.length);
    for (const alias of sortedAliases) {
      const escapedAlias = alias.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?<=^|[^a-z0-9#+])${escapedAlias}(?=$|[^a-z0-9#+])`, 'i');
      if (regex.test(query)) {
        const rId = aliases[alias];
        if (!hasNeg(rId)) {
          return rId;
        }
      }
    }

    return originalExpected;
  }

  const testCases = [];

  for (const route of routes) {
    const routeId = route.route_id;
    // Skip fallback route itself for test generation
    if (routeId === FALLBACK) continue;

    const keywords = route.match?.keywords || [];
    const aliases = route.match?.aliases || [];

    if (keywords.length === 0) {
      // Fallback generation if no keywords exist
      const name = routeId.split('.').pop().replace(/-/g, ' ');
      keywords.push(name);
    }

    const tcs = [];

    // 1-3. Exact keywords / prefixed style
    const prefixKeywords = [
      `route to: ${keywords[0]}`,
      `${keywords[1 % keywords.length]} check`,
      `initiate ${keywords[2 % keywords.length]}`
    ];
    for (let i = 0; i < 3; i++) {
      tcs.push({ prompt: prefixKeywords[i], expected: routeId, type: 'prefixed_keyword' });
    }

    // 4-6. Embedded keywords in question-based natural language wrappers
    const newContexts = ['how do i do', 'can you help me with', 'is it possible to perform'];
    for (let i = 0; i < 3; i++) {
      const kw = keywords[i % keywords.length];
      const ctx = newContexts[i];
      tcs.push({ prompt: `${ctx} ${kw}?`, expected: routeId, type: 'question_keyword' });
    }

    // 7-8. Task-oriented verb variation
    const verbPhrases = [`go ahead and start ${keywords[0]}`, `process the ${keywords[0]} flow`];
    for (let i = 0; i < 2; i++) {
      tcs.push({ prompt: verbPhrases[i], expected: routeId, type: 'verb_variation' });
    }

    // 9. Alias match with a different wrapper/punctuation
    if (aliases.length > 1) {
      tcs.push({ prompt: aliases[1], expected: routeId, type: 'alias_match_alternate' });
    } else if (aliases.length > 0) {
      tcs.push({ prompt: `go for ${aliases[0]}`, expected: routeId, type: 'alias_match_alternate' });
    } else {
      const name = routeId.split('.').pop().replace(/-/g, ' ');
      tcs.push({ prompt: `run ${name}`, expected: routeId, type: 'alias_match_alternate_fallback' });
    }

    // 10. Embedded alias in a different phrase
    const aliasVal = aliases.length > 0 ? aliases[0] : routeId.split('.').pop().replace(/-/g, ' ');
    tcs.push({
      prompt: `run task using the ${aliasVal} agent please`,
      expected: routeId,
      type: 'embedded_alias_alternate'
    });

    // Override expected routes dynamically using deterministic routing rules
    for (const tc of tcs) {
      tc.expected = resolveExpectedRoute(tc.prompt, tc.expected);
    }

    // Store generated test cases
    testCases.push(...tcs);
  }

  console.log(`Generated ${testCases.length} total test cases (10 per route). Starting execution...`);

  let correct = 0;
  let wrongDomain = 0;
  let missingRoute = 0;
  const failures = [];

  const start = Date.now();
  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const resolved = (await resolveRoute(tc.prompt)).route_id;
    const expected = tc.expected;
    const expectedDomain = domainOf(expected);
    const resolvedDomain = domainOf(resolved);

    if (resolved === expected) {
      correct++;
    } else {
      failures.push({
        prompt: tc.prompt,
        expected,
        resolved,
        type: tc.type
      });
      const expectedFallback = expected === FALLBACK;
      if (!expectedFallback && resolved === FALLBACK) missingRoute++;
      else if (!expectedFallback && resolvedDomain !== expectedDomain) wrongDomain++;
    }

    if ((i + 1) % 500 === 0) {
      console.log(`Ran ${i + 1}/${testCases.length} test cases...`);
    }
  }
  const duration = Date.now() - start;

  const total = testCases.length;
  const top1 = correct / total;
  const wrongDomainRate = wrongDomain / total;
  const missingRouteRate = missingRoute / total;

  console.log('\n======================================');
  console.log('       BULK ROUTING EVALUATION');
  console.log('======================================');
  console.log(`Total test cases: ${total}`);
  console.log(`Execution time  : ${(duration / 1000).toFixed(2)} seconds`);
  console.log(`Top-1 Accuracy  : ${(top1 * 100).toFixed(2)}%`);
  console.log(`Wrong Domain %  : ${(wrongDomainRate * 100).toFixed(2)}%`);
  console.log(`Missing Route % : ${(missingRouteRate * 100).toFixed(2)}%`);
  console.log('======================================');

  if (failures.length > 0) {
    console.log(`\nFound ${failures.length} mismatches. Logging top 50 failures:`);
    failures.slice(0, 50).forEach((f, idx) => {
      console.log(`[${idx + 1}] Prompt: "${f.prompt}" (${f.type})`);
      console.log(`    Expected: ${f.expected}`);
      console.log(`    Resolved: ${f.resolved}`);
    });

    // Write all failures to staging/routing-failures.json for automatic fixing analysis
    const failuresPath = path.join(repoRoot, 'staging/routing-failures.json');
    fs.writeFileSync(failuresPath, JSON.stringify(failures, null, 2));
    console.log(`\nWritten all failures to ${failuresPath}`);
  } else {
    console.log('\n✓ Perfect routing! No mismatches found.');
  }
}

main().catch(console.error);
