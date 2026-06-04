import { stage, apply, rollback, list } from '../../yes-absorber/index.js';

export async function cmdAbsorb(args) {
  const sub = args[0];

  if (!sub || sub === 'help') {
    console.error('Usage:');
    console.error('  yes absorb stage <github-url | local-path>   Stage a source through the license gate');
    console.error(
      '  yes absorb apply <slug> [--promote]            Promote staged source; --promote copies into content/'
    );
    console.error(
      '  yes absorb list                              Show staged / promoted / rejected / rollback records'
    );
    console.error('  yes absorb copy-skills <slug> [--domain D]   Copy staged SKILL.md files into content/skills/');
    console.error('  yes absorb rollback <change-id>              Revert a promotion');
    console.error('  yes absorb onboard [--discover] [--apply <slug>] [--wizard]');
    return 1;
  }

  if (sub === 'onboard') {
    const discover = args.includes('--discover');
    const applySlug = args.includes('--apply') ? args[args.indexOf('--apply') + 1] : null;
    const { runOnboardingWizard } = await import('../../yes-absorber/onboarding-wizard.js');

    try {
      await runOnboardingWizard({ discover, applySlug });
      return 0;
    } catch (e) {
      console.error(`✗ Onboarding failed: ${e.message}`);
      return 1;
    }
  }

  if (sub === 'stage') {
    const input = args[1];
    if (!input) {
      console.error('Usage: yes absorb stage <url-or-path>');
      return 1;
    }
    console.log(`Staging: ${input}\n`);
    try {
      const r = await stage(input);
      const m = r.manifest;
      console.log(`  slug         : ${r.slug}`);
      console.log(`  source       : ${m.source.kind} ${m.source.origin_url}`);
      console.log(`  commit/ver   : ${m.source.commit_or_version}`);
      console.log(`  license      : ${m.license.spdx ?? '(unknown)'} → ${m.license.decision}`);
      console.log(
        `  classification: ${m.classification.total_files} files (agents:${m.classification.agents}, skills:${m.classification.skills}, workflows:${m.classification.workflows}, commands:${m.classification.commands}, hooks:${m.classification.hooks})`
      );
      console.log(
        `  duplicates   : ${m.duplicates.exact_overlap_count} exact, ${m.duplicates.slug_collision_count} slug collisions`
      );
      console.log(`  manifest     : ${r.manifestPath}`);
      console.log(
        r.decision === 'staged'
          ? `\n✓ Staged. Review then run: yes absorb apply ${r.slug}`
          : `\n✗ Rejected: ${m.reason}`
      );
      return r.decision === 'staged' ? 0 : 1;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'apply') {
    const slug = args[1];
    const promote = args.includes('--promote');
    const domainArg = args.find((a, i) => args[i - 1] === '--domain');
    if (!slug || slug.startsWith('--')) {
      console.error('Usage: yes absorb apply <slug> [--promote] [--domain D]');
      return 1;
    }
    try {
      const r = await apply(slug, { promote, domain: domainArg });
      console.log(`✓ Promoted ${slug}${promote ? ' (content copied)' : ''}`);
      console.log(`  change_id : ${r.changeId}`);
      console.log(`  promoted  : ${r.promotedPath}`);
      console.log(`  rollback  : ${r.rollbackPath}`);
      if (r.promote) {
        console.log(`  files     : ${r.promote.files_added.length} added`);
        console.log(
          `  agents    : ${r.promote.promoted.agents.length}, skills: ${r.promote.promoted.skills.length}, workflows: ${r.promote.promoted.workflows.length}`
        );
      }
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'rollback') {
    const changeId = args[1];
    if (!changeId) {
      console.error('Usage: yes absorb rollback <change-id>');
      return 1;
    }
    try {
      const r = await rollback(changeId);
      console.log(`✓ Rolled back ${r.changeId}`);
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'list') {
    let l;
    try {
      l = list();
    } catch (err) {
      console.error(`✗ Absorb list failed: ${err.message}`);
      return 1;
    }
    console.log(`Staged (normalized): ${l.normalized.length}`);
    for (const e of l.normalized) console.log(`  ${e.slug.padEnd(40)} ${e.license ?? '?'.padEnd(10)} ${e.origin}`);
    console.log(`\nRejected: ${l.rejected.length}`);
    for (const e of l.rejected) console.log(`  ${e.slug.padEnd(40)} ${e.license ?? '?'.padEnd(10)} ${e.origin}`);
    console.log(`\nPromoted: ${l.promoted.length}`);
    for (const e of l.promoted) console.log(`  ${e.change_id}`);
    console.log(`\nRollback records: ${l.rollback.length}`);
    for (const e of l.rollback) console.log(`  ${e.change_id}`);
    return 0;
  }

  console.error(`Unknown absorb subcommand: ${sub}`);
  return 1;
}
