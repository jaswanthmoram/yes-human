# @yes-human/cli

Command line interface for the `yes-human` control plane.

## File Structure

* **`index.js`**: Thin entry point that routes CLI arguments to dynamic commands submodules.
* **`commands/`**: Submodule commands:
  - `route.js`: Routing & dry-run plans
  - `build.js`: Host export compilations
  - `doctor.js`: Environment sanity checks
  - `absorb.js`: External content absorb pipeline
  - `evaluator.js`/`trainer.js`: Phase 9 learning operations
  - `memory.js`/`dream.js`: Phase 3 cognitive cycles
  - `compile.js`: Registry synchronization
  - `helpers.js`: Shared CLI utilities
