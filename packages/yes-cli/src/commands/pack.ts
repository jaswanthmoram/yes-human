import {
  developerPack,
  documentPack,
  businessPack,
  securityPack,
  startupPack,
  defaultPack
} from "@yes-human/packs";

const ALL_PACKS = [
  developerPack,
  documentPack,
  businessPack,
  securityPack,
  startupPack,
  defaultPack
];

export async function cmdPack(args: string[]): Promise<number> {
  const subcommand = args[0];

  if (subcommand === "list") {
    console.log("\n=== Loaded Packs ===");
    for (const pack of ALL_PACKS) {
      console.log(`- ${pack.name}: ${pack.description} (${pack.workflows.length} workflows)`);
    }
    return 0;
  }

  if (subcommand === "inspect") {
    const packName = args[1];
    if (!packName) {
      console.error("Usage: yes pack inspect <pack-name>");
      return 1;
    }

    const pack = ALL_PACKS.find(
      (p) => p.name.toLowerCase() === packName.toLowerCase() || p.name.toLowerCase().includes(packName.toLowerCase())
    );

    if (!pack) {
      console.error(`Error: Pack "${packName}" not found.`);
      return 1;
    }

    console.log(`\n=== Pack: ${pack.name} ===`);
    console.log(`Description: ${pack.description}`);

    console.log("\nWorkflows:");
    for (const w of pack.workflows) {
      console.log(`  - ${w.name} (\`${w.id}\`)`);
      console.log(`    Triggers: ${w.triggerPhrases.join(", ")}`);
      console.log(`    Skills:   ${w.requiredSkills.join(", ")}`);
    }

    console.log("\nSkills:");
    for (const s of pack.skills) {
      console.log(`  - ${s.name} (\`${s.id}\`): ${s.description}`);
    }
    return 0;
  }

  console.error("Usage:\n  yes pack list\n  yes pack inspect <pack-name>");
  return 1;
}
