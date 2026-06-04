# @yes-human/absorber

The staging, normalization, and promotion pipeline for importing external rulesets, custom agents, and tool configurations.

## Onboarding Features

* **`onboarding-discover.js`**: Environmental scan for `.cursorrules`, Claude Desktop, and Node scripts.
* **`onboarding-evaluator.js`**: LLM comparison mapping logic differences against existing registries.
* **`onboarding-wizard.js`**: Readline terminal interface to merge or clone discovered rule items.
