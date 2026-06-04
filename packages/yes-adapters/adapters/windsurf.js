import { writeGenerated } from '../index.js';

function boot(ctx) {
  return `# AGENTS.md - Yes-human for Windsurf

${ctx.bootText.trim()}

Run \`yes route "<task>" --dry-run\` to select the agent/workflow. Keep traces redacted and tenant-scoped.
`;
}

export async function generate(ctx) {
  writeGenerated('windsurf', 'AGENTS.md', boot(ctx));
  writeGenerated(
    'windsurf',
    '.windsurfrules',
    `Use yes-human as a boot pointer only.
Route first with graph/indexes/ROUTE_TABLE.min.json.
Never load the full registry at startup.
Stage feedback through yes feedback; do not edit production routes from feedback.
`
  );
  console.log('  ✓ windsurf bundle generated');
}
