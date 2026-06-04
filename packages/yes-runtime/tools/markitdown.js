import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// tools/ -> yes-runtime/ -> packages/ -> repo root
const repoRoot = path.resolve(__dirname, '../../..');

// Markdown image syntax: ![alt](src)
const IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)/g;

/**
 * Resolves the Python interpreter that has MarkItDown installed.
 * Order: YES_PYTHON env var -> project .venv -> system python3.
 */
function resolvePython() {
  if (process.env.YES_PYTHON && fs.existsSync(process.env.YES_PYTHON)) {
    return process.env.YES_PYTHON;
  }
  const venvPython = path.join(repoRoot, '.venv', 'bin', 'python');
  if (fs.existsSync(venvPython)) {
    return venvPython;
  }
  return 'python3';
}

/** Collects markdown image references so the caller can flag them. */
function extractImages(markdown) {
  const images = [];
  let match;
  IMAGE_RE.lastIndex = 0;
  while ((match = IMAGE_RE.exec(markdown)) !== null) {
    images.push({ alt: match[1] || null, ref: match[2] });
  }
  return images;
}

/**
 * Appends an LLM-facing notice so a vision-capable model knows the source had
 * images that MarkItDown could not transcribe to text.
 */
function annotateImages(markdown, images) {
  if (images.length === 0) return markdown;
  const lines = images.map((img, i) => {
    const caption = img.alt ? `"${img.alt}"` : '(no caption)';
    return `- Image ${i + 1}: ${caption}${img.ref ? ` — ${img.ref}` : ''}`;
  });
  return (
    `${markdown}\n\n---\n` +
    `> [!NOTE] This document contains ${images.length} embedded image(s) that were ` +
    `not transcribed to text. If their content matters, a vision-capable model should inspect them:\n` +
    `${lines.join('\n')}\n`
  );
}

/**
 * Converts a document (PDF, PPTX, DOCX, XLSX, images, etc.) to Markdown using
 * the local MarkItDown Python utility.
 *
 * Embedded images are not OCR'd; instead they are detected and surfaced via an
 * LLM-facing notice (set options.annotateImages = false to disable).
 *
 * @param {string} filePath - Path to the input file.
 * @param {object} [options]
 * @param {string} [options.outputPath] - Write markdown to this file and return its contents.
 * @param {boolean} [options.annotateImages=true] - Append a notice listing detected images.
 * @param {boolean} [options.detailed=false] - Resolve { markdown, images, hasImages } instead of a string.
 * @returns {Promise<string|{markdown:string,images:object[],hasImages:boolean}>}
 */
export function convertToMarkdown(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    const python = resolvePython();

    // Fail early with an actionable message if MarkItDown is not available.
    const check = spawnSync(python, ['-c', 'import markitdown'], { encoding: 'utf8' });
    if (check.status !== 0) {
      return reject(
        new Error(
          `MarkItDown is not installed for interpreter "${python}". Set it up with:\n` +
            `  python3 -m venv .venv && .venv/bin/python -m pip install -r requirements.txt\n` +
            `or point YES_PYTHON at an interpreter that has markitdown[all].`
        )
      );
    }

    const args = ['-m', 'markitdown', filePath];
    if (options.outputPath) {
      args.push('-o', options.outputPath);
    }

    const child = spawn(python, args);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `MarkItDown conversion failed with code ${code} for ${path.basename(filePath)}. Error: ${stderr.trim()}`
          )
        );
      }

      let markdown;
      if (options.outputPath) {
        try {
          markdown = fs.readFileSync(options.outputPath, 'utf8');
        } catch (readErr) {
          return reject(new Error(`Failed to read output file ${options.outputPath}: ${readErr.message}`));
        }
      } else {
        markdown = stdout;
      }

      const images = extractImages(markdown);
      const result = options.annotateImages === false ? markdown : annotateImages(markdown, images);

      if (options.detailed) {
        resolve({ markdown: result, images, hasImages: images.length > 0 });
      } else {
        resolve(result);
      }
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to start MarkItDown process: ${err.message}`));
    });
  });
}
