# Codex Export Example

Shows how to programmatically invoke the `exportToCodex` adapter:

```typescript
import { exportToCodex } from "@yes-human/adapters";
import { defaultPack } from "@yes-human/packs";

exportToCodex(defaultPack.workflows, "./exported-codex");
```
