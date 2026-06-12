# @bekmurod6574/explain-deps

A lightweight Command Line Interface (CLI) tool designed to scan your project's dependencies and give you a clear, understandable breakdown of what each package does and why it's there. No more guessing why a mysterious library is sitting in your `package.json`.

---

## 🚀 Features

*   **Dependency Breakdown:** Scans your project's `dependencies` and `devDependencies`.
*   **Plain English Explanations:** Translates cryptic package names into clear descriptions of their purpose.
*   **Fast & Local:** Powered by an internal cache system for lightning-fast execution without heavy API overhead.
*   **Developer Friendly:** Zero-configuration required—just run it inside any Node.js project.

---

## 📦 Installation

You can run this tool directly without installing it globally using `npx`:

```bash
npx @bekmurod6574/explain-deps
```

## Alternatively, install it globally on your machine:
```bash
npm install -g @bekmurod6574/explain-deps
```
### Usage
Simply navigate to the root directory of any Node.js project (where your package.json lives) and run the command:
```bash
explain-deps
```
## Project Structure
For developers looking to contribute or understand the internals:
 - src/index.js - Main programmatic entry point. (empty - no need to consider)
 - src/bin/cli.js - The executable script that handles terminal commands.
 - src/data/cache.json - Core dictionary dataset mapping package names to explanations.
