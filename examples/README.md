# yes-human Integration Examples

This directory contains examples demonstrating how to integrate `yes-human` into offline apps, developer tools, CLI utilities, and other systems.

## 1. Node CLI Assistant (`examples/node-cli-assistant`)
A standalone Node.js script showing how to route prompts using `yes-core` and execute trace steps using `yes-runtime` and `yes-packs`.
To run:
```bash
npm run start --workspace=examples/node-cli-assistant
```

## 2. React Local App (`examples/react-local-app`)
A premium, offline-first dashboard demonstrating task routing and execution timeline logs in a beautiful glassmorphic UI. Open [index.html](file:///Users/moramvenkatasatyajaswanth/yes-human/examples/react-local-app/index.html) in your browser.

## 3. Electron Offline App (`examples/electron-offline-app`)
A boilerplate layout demonstrating how to build an offline desktop wrapper using the `@yes-human/core` SDK.

## 4. Tauri Offline App (`examples/tauri-offline-app`)
A guide for integrating the routing engine into a Rust-backed local dashboard.

## 5. Codex Export Example (`examples/codex-export-example`)
Exemplifies how developer teams export routing rules directly into Codex agents config.

## 6. Antigravity Export Example (`examples/antigravity-export-example`)
Exemplifies how to output workflows directly into Antigravity instruction sets.
