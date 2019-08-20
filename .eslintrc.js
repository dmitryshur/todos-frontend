module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'react/no-unescaped-entities': [0],
    'operator-linebreak': [0],
    'implicit-arrow-linebreak': [0],
    'no-use-before-define': [0],
    'no-confusing-arrow': [0],
    'function-paren-newline': [0]
  },
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    PRODUCTION: 'readonly',
    API_URL: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
