import js from '@eslint/js';

export default [
  // Global ignores MUST be in their own config object (flat-config rule):
  // mixing `ignores` with `rules`/`languageOptions` scopes it to that block
  // only and does NOT exclude files globally.
  {
    ignores: [
      'node_modules/**',
      'generated/**',
      'staging/**',
      'reports/**',
      'graph/embeddings/**',
      'graph/snapshots/**',
      'graph/memory/**',
      'graph/indexes/**',
      '.venv/**',
      'coverage/**'
    ]
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URLSearchParams: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
        globalThis: 'readonly',
        performance: 'readonly',
        structuredClone: 'readonly',
        queueMicrotask: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-constant-condition': 'warn'
    }
  }
];
