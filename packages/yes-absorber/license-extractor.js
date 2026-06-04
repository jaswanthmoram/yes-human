/**
 * License extraction — read a source's LICENSE file (or package.json/pyproject)
 * and produce an SPDX identifier classified against registry/license-registry.json.
 *
 * Returns one of:
 *   { spdx, decision: 'allowed' | 'restricted' | 'forbidden' | 'unknown',
 *     evidence, source_file }
 *
 * "Unknown" is treated as forbidden by the gate (architecture §14.4).
 */

import fs from 'fs';
import path from 'path';

const LICENSE_FILE_CANDIDATES = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'LICENCE',
  'LICENCE.md',
  'LICENCE.txt',
  'COPYING',
  'COPYING.md',
  'COPYING.txt'
];

// Quick SPDX detection from license text. Pattern → SPDX id.
// Ordered: most specific first (AGPL before GPL, BSD-3 before BSD-2, etc.)
const SPDX_PATTERNS = [
  {
    spdx: 'MIT',
    re: /^MIT License|\bMIT License\b|Permission is hereby granted, free of charge.*MIT|^The MIT License/im
  },
  { spdx: 'Apache-2.0', re: /Apache License,?\s*Version\s*2\.0|Licensed under the Apache License, Version 2\.0/i },
  {
    spdx: 'BSD-3-Clause',
    re: /Redistribution and use.*\bin source and binary forms\b[\s\S]{1,400}3\.\s*Neither the name/i
  },
  {
    spdx: 'BSD-2-Clause',
    re: /Redistribution and use.*\bin source and binary forms\b[\s\S]{1,400}2\.\s*Redistributions in binary/i
  },
  { spdx: 'ISC', re: /\bISC License\b|Permission to use, copy, modify, and\/or distribute/i },
  { spdx: 'Unlicense', re: /This is free and unencumbered software released into the public domain/i },
  { spdx: 'CC0-1.0', re: /Creative Commons.*CC0|CC0\s*1\.0\s*Universal/i },
  { spdx: 'AGPL-3.0', re: /GNU AFFERO GENERAL PUBLIC LICENSE\s+Version 3/i },
  { spdx: 'GPL-3.0', re: /GNU GENERAL PUBLIC LICENSE\s+Version 3/i },
  { spdx: 'GPL-2.0', re: /GNU GENERAL PUBLIC LICENSE\s+Version 2/i },
  { spdx: 'LGPL-3.0', re: /GNU LESSER GENERAL PUBLIC LICENSE\s+Version 3/i },
  { spdx: 'LGPL-2.1', re: /GNU LESSER GENERAL PUBLIC LICENSE\s+Version 2\.1/i },
  { spdx: 'MPL-2.0', re: /Mozilla Public License Version 2\.0/i },
  { spdx: 'SSPL', re: /Server Side Public License/i }
];

/** Classify an SPDX id against the registry. */
export function classifyLicense(spdx, registry) {
  if (!spdx) return 'unknown';
  if (registry.allowed?.includes(spdx)) return 'allowed';
  if (registry.restricted?.includes(spdx)) return 'restricted';
  if (registry.forbidden?.includes(spdx)) return 'forbidden';
  return 'unknown';
}

/** Extract from license text using the SPDX patterns. */
export function spdxFromText(text) {
  if (!text) return null;
  for (const { spdx, re } of SPDX_PATTERNS) {
    if (re.test(text)) return spdx;
  }
  return null;
}

/** Inspect a source root for license signals. */
export function extractLicense(sourceRoot, registry) {
  const result = { spdx: null, decision: 'unknown', evidence: 'no license file or metadata found', source_file: null };

  // 1. Top-level LICENSE-like files
  for (const candidate of LICENSE_FILE_CANDIDATES) {
    const full = path.join(sourceRoot, candidate);
    if (fs.existsSync(full)) {
      const text = fs.readFileSync(full, 'utf8');
      const spdx = spdxFromText(text);
      if (spdx) {
        return {
          spdx,
          decision: classifyLicense(spdx, registry),
          evidence: `matched SPDX pattern in ${candidate}`,
          source_file: candidate
        };
      }
      result.evidence = `${candidate} present but no SPDX pattern matched`;
      result.source_file = candidate;
      break;
    }
  }

  // 2. package.json `license` field
  const pkgPath = path.join(sourceRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.license) {
        const spdx = String(pkg.license);
        return {
          spdx,
          decision: classifyLicense(spdx, registry),
          evidence: `package.json "license" field`,
          source_file: 'package.json'
        };
      }
    } catch {
      /* ignore */
    }
  }

  // 3. pyproject.toml — quick text scan for license = "..."
  const pyPath = path.join(sourceRoot, 'pyproject.toml');
  if (fs.existsSync(pyPath)) {
    const text = fs.readFileSync(pyPath, 'utf8');
    const m = text.match(/^\s*license\s*=\s*["']([^"']+)["']/m);
    if (m) {
      const spdx = m[1];
      return {
        spdx,
        decision: classifyLicense(spdx, registry),
        evidence: 'pyproject.toml license field',
        source_file: 'pyproject.toml'
      };
    }
  }

  return result;
}
