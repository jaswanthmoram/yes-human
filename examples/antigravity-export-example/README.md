# Antigravity Export Example

Shows how to programmatically invoke the `exportToAntigravity` adapter:

```typescript
import { exportToAntigravity } from "@yes-human/adapters";
import { developerPack } from "@yes-human/packs";

exportToAntigravity(developerPack.workflows, "./exported-antigravity");
```
