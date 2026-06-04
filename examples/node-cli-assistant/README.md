# Node.js CLI Assistant Example

This example demonstrates how to integrate the `yes-human` routing and runtime engine inside a Node.js CLI interactive application. It takes user prompts, resolves them to workflows, and runs the workflow steps showing execution traces.

---

## Installation

Ensure you are in the `examples/node-cli-assistant` folder and install dependencies:

```bash
# Navigate to the folder
cd examples/node-cli-assistant

# Install dependencies (links local monorepo packages)
npm install
```

## Running the Assistant

Run the interactive Node CLI assistant:

```bash
npm start
```

You will see the prompt:
```
yes-human assistant> 
```

## Sample Usage

### 1. Sample Prompt
Enter the prompt to review code quality:
```
yes-human assistant> review this javascript logic
```

### 2. Expected Output
The assistant resolves the prompt and outputs routing details:
```
Routed Task:
  Workflow ID: developer.code-review
  Stage:       exact
  Confidence:  1

Running workflow developer.code-review...
```

### 3. Trace Output Example
The workflow trace logs every executed step and timestamp:
```
Trace Summary:
  [2026-06-04T12:00:01.000Z] read-source-files -> success
     Metadata: { result: '[Mock] Executed skill: code-reviewer' }
  [2026-06-04T12:00:01.005Z] analyze-code-style -> success
     Metadata: { result: 'Step analyze-code-style completed.' }
  [2026-06-04T12:00:01.010Z] generate-review-report -> success
     Metadata: { result: 'Step generate-review-report completed.' }

Final Output: Step generate-review-report completed.
```
