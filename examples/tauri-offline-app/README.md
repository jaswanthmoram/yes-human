# Tauri Offline App Example (Structural Blueprint)

This example serves as a structural blueprint demonstrating how to integrate `yes-human` inside a desktop application powered by Tauri (Rust + WebView).

---

## Integration Patterns

Tauri allows compiling local executables with frontend templates. You can run `yes-human` in two ways:

### Pattern A: WebView Local Routing (Sub-millisecond Offline)
Because `@yes-human/core` is pure ESM with no Node dependencies, you can compile and import it directly into your Tauri frontend WebView. 

Simply import `@yes-human/core` in your React/Svelte app and call the router. No Rust bridges are needed for routing!

### Pattern B: Tauri Command Sidecar
If you want to invoke `@yes-human/cli` binary compiled as a sidecar, run it from your Rust backend command handlers.

#### 1. Define Command in Rust (`src-tauri/src/main.rs`)
```rust
#[tauri::command]
fn route_task(query: String) -> String {
    // Execute the yes-cli binary sidecar locally and capture output
    let output = std::process::Command::new("yes")
        .arg("route")
        .arg(query)
        .output()
        .expect("failed to execute process");
    String::from_utf8_lossy(&output.stdout).to_string()
}
```

#### 2. Invoke from Frontend (`App.tsx`)
```javascript
import { invoke } from "@tauri-apps/api/core";

const handleRoute = async (text) => {
  const output = await invoke("route_task", { query: text });
  console.log("CLI Routing output:", output);
};
```
