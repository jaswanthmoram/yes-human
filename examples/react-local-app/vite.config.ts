import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: path.resolve(__dirname, "./src/node-mock.ts"),
      path: path.resolve(__dirname, "./src/node-mock.ts"),
      url: path.resolve(__dirname, "./src/node-mock.ts")
    }
  },
  define: {
    "process.env": "{}",
    "process.cwd": "() => '/'",
    "process.platform": '"browser"',
    "process.argv": "[]"
  }
});
