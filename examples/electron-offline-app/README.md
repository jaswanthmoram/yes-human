# Electron Offline App Example

This boilerplate shows how to wrap the `@yes-human/core` SDK inside an Electron main process.

Because `yes-human` runs completely offline on standard Node, you can import it directly:
```javascript
const { createRouter } = require("@yes-human/core");
// Instantiate in Electron main.js
```
