import { writeGenerated } from '../index.js';

function boot(ctx) {
  return `# AGENTS.md - Yes-human for Sourcegraph

${ctx.bootText.trim()}

Prefer read-mostly code intelligence. Route first, then load the selected agent/workflow only.
`;
}

export async function generate(ctx) {
  writeGenerated('sourcegraph', 'AGENTS.md', boot(ctx));
  writeGenerated('sourcegraph', 'sourcegraph.json', {
    name: 'yes-human',
    version: ctx.version,
    mode: 'read-mostly',
    route_table: 'graph/indexes/ROUTE_TABLE.min.json',
    registry: 'registry/routes.json',
    feedback: 'staging-only',
    generated_at: ctx.generatedAt
  });
  console.log('  ✓ sourcegraph bundle generated');
}
