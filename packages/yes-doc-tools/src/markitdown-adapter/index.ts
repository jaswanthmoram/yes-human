import { spawn, spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../..");

const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)/g;

export interface ImageReference {
  alt: string | null;
  ref: string;
}

export interface DetailedConversionResult {
  markdown: string;
  images: ImageReference[];
  hasImages: boolean;
}

export interface ConvertOptions {
  outputPath?: string;
  annotateImages?: boolean;
  detailed?: boolean;
}

function resolvePython(): string {
  if (process.env.YES_PYTHON && fs.existsSync(process.env.YES_PYTHON)) {
    return process.env.YES_PYTHON;
  }
  // Try process.cwd() .venv
  const cwdVenv = path.join(process.cwd(), ".venv", "bin", "python");
  if (fs.existsSync(cwdVenv)) {
    return cwdVenv;
  }
  // Try repo root .venv
  const venvPython = path.join(repoRoot, ".venv", "bin", "python");
  if (fs.existsSync(venvPython)) {
    return venvPython;
  }
  return "python3";
}

function extractImages(markdown: string): ImageReference[] {
  const images: ImageReference[] = [];
  let match;
  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(markdown)) !== null) {
    images.push({ alt: match[1] || null, ref: match[2] });
  }
  return images;
}

function annotateImages(markdown: string, images: ImageReference[]): string {
  if (images.length === 0) return markdown;
  const lines = images.map((img, i) => {
    const caption = img.alt ? `"${img.alt}"` : "(no caption)";
    return `- Image ${i + 1}: ${caption}${img.ref ? ` — ${img.ref}` : ""}`;
  });
  return (
    `${markdown}\n\n---\n` +
    `> [!NOTE] This document contains ${images.length} embedded image(s) that were ` +
    `not transcribed to text. If their content matters, a vision-capable model should inspect them:\n` +
    `${lines.join("\n")}\n`
  );
}

export function convertToMarkdown(
  filePath: string,
  options: ConvertOptions = {}
): Promise<string | DetailedConversionResult> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    const python = resolvePython();

    const check = spawnSync(python, ["-c", "import markitdown"], {
      encoding: "utf8",
    });
    if (check.status !== 0) {
      return reject(
        new Error(
          `MarkItDown is not installed for interpreter "${python}". Set it up with:\n` +
            `  python3 -m venv .venv && .venv/bin/python -m pip install -r requirements.txt\n` +
            `or point YES_PYTHON at an interpreter that has markitdown[all].`
        )
      );
    }

    const args = ["-m", "markitdown", filePath];
    if (options.outputPath) {
      args.push("-o", options.outputPath);
    }

    const child = childProcessSpawn(python, args);
    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `MarkItDown conversion failed with code ${code} for ${path.basename(
              filePath
            )}. Error: ${stderr.trim()}`
          )
        );
      }

      let markdown: string;
      if (options.outputPath) {
        try {
          markdown = fs.readFileSync(options.outputPath, "utf8");
        } catch (readErr: any) {
          return reject(
            new Error(
              `Failed to read output file ${options.outputPath}: ${readErr.message}`
            )
          );
        }
      } else {
        markdown = stdout;
      }

      const images = extractImages(markdown);
      const result =
        options.annotateImages === false
          ? markdown
          : annotateImages(markdown, images);

      if (options.detailed) {
        resolve({
          markdown: result,
          images,
          hasImages: images.length > 0,
        });
      } else {
        resolve(result);
      }
    });

    child.on("error", (err) => {
      reject(new Error(`Failed to start MarkItDown process: ${err.message}`));
    });
  });
}

// Wrapper function to satisfy imports / ESM requirements safely
function childProcessSpawn(command: string, args: string[]) {
  return spawn(command, args);
}

export class MarkitdownAdapter {
  public convert(filePath: string): string {
    try {
      const python = resolvePython();
      const output = spawnSync(python, ["-m", "markitdown", filePath], {
        encoding: "utf8",
      });
      if (output.status !== 0) {
        throw new Error(output.stderr);
      }
      return output.stdout;
    } catch (err: any) {
      throw new Error(
        `markitdown CLI is not installed or failed. Please run 'pip install markitdown' to use document conversion tools. Error: ${err.message}`,
        { cause: err }
      );
    }
  }
}
