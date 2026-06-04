import { writeGenerated } from '../index.js';

function boot(ctx) {
  return `# AGENTS.md - Yes-human for Cursor

${ctx.bootText.trim()}

Use \`yes route "<task>" --dry-run\` before loading agents. Learning feedback is staged only; production routing is never mutated directly.
`;
}

export async function generate(ctx) {
  writeGenerated('cursor', 'AGENTS.md', boot(ctx));
  writeGenerated(
    'cursor',
    '.cursor/rules/yes-human.mdc',
    `---
description: Yes-human low-token router
alwaysApply: true
---

Route through \`graph/indexes/ROUTE_TABLE.min.json\` and lazy-load \`registry/routes.json\`.
Use tenant-redacted traces via \`yes evaluator trace\`.
`
  );
  console.log('  ✓ cursor bundle generated');
}
