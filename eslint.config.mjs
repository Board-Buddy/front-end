import nextTypescript from "eslint-config-next/typescript";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { fileURLToPath } from 'url';
import path from 'path';

import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configArray = [...nextTypescript, ...nextCoreWebVitals, {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['src/components/ui/**/*', 'public/mockServiceWorker.js'],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    react,
    'react-hooks': reactHooks,
    jsxA11y,
    prettier,
    tailwindcss,
    import: importPlugin,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    ...prettier.configs.recommended.rules,
    ...tailwindcss.configs.recommended.rules,

    // typescript
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',

    // react
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-constructed-context-values': 'off',
    'react/no-unstable-nested-components': 'off',

    // jsx-a11y
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    // import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // etc
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'warn',
    'consistent-return': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}];

export default configArray;
