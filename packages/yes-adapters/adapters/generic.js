import crypto from 'crypto';
import { writeGenerated } from '../index.js';

function signPayload(payload) {
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

function manifest(ctx) {
  const payload = {
    name: 'yes-human-generic',
    version: ctx.version,
    trust_model: 'zero-trust',
    route_table: 'graph/indexes/ROUTE_TABLE.min.json',
    registries: {
      routes: 'registry/routes.json',
      agents: 'registry/agents.json',
      workflows: 'registry/workflows.json',
      skills: 'registry/skills.json'
    },
    permissions: {
      network: 'deny',
      filesystem: 'explicit-allowlist',
      production_mutation_from_feedback: false
    },
    audit: {
      enabled: true,
      redacted: true,
      file: 'audit.jsonl'
    },
    cancellation: {
      supported: true,
      file: 'CANCEL.md'
    },
    generated_at: ctx.generatedAt
  };

  return {
    ...payload,
    signature: {
      algorithm: 'sha256',
      value: signPayload(payload)
    }
  };
}

export async function generate(ctx) {
  writeGenerated('generic', 'manifest.json', manifest(ctx));
  writeGenerated('generic', 'README.md', `# Yes-human Generic Adapter

Zero-trust adapter pack. Load \`manifest.json\`, verify the SHA-256 signature, then route through \`graph/indexes/ROUTE_TABLE.min.json\`.
`);
  writeGenerated('generic', 'sandbox.policy.json', {
    default: 'deny',
    network: 'deny',
    filesystem: {
      allow_read: ['YES_BOOT.md', 'graph/indexes/ROUTE_TABLE.min.json', 'registry/routes.json'],
      allow_write: ['graph/memory/tenants/', 'staging/feedback/', 'staging/workflow-suggestions/']
    },
    production_mutation_from_feedback: false
  });
  writeGenerated('generic', 'audit.jsonl', '');
  writeGenerated('generic', 'CANCEL.md', '# Cancellation\n\nSet host cancellation state and stop after the current checkpoint. Resume with `yes recover resume`.\n');
  console.log('  ✓ generic bundle generated');
}
