# Adapters Guide

Adapters output settings and workspace rules to make yes-human workflows compatible with popular developer tools.

## Cursor Integration
Generates `.cursorrules` outlining active workflows and guidelines.

```typescript
import { CursorAdapter } from "@yes-human/adapters";
// Generates .cursorrules file
new CursorAdapter().export(developerPack, "./");
```

## VS Code Integration
Generates task execution and workspace settings mapping yes-human workflow IDs.

```typescript
import { VSCodeAdapter } from "@yes-human/adapters";
new VSCodeAdapter().export(developerPack, "./");
```

## MCP (Model Context Protocol) Integration
Generates standard configuration files to host yes-human as an MCP server.
