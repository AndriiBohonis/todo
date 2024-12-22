import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist'
import perfectionistAlphabetical from 'eslint-plugin-perfectionist/configs/recommended-alphabetical'

export default tseslint.config(
    {
      plugins: {
        perfectionistAlphabetical,
        '@typescript-eslint': tseslint.plugin,
        'react': eslintReact,
        'react-hooks': eslintReactHooks,
        'react-refresh': eslintReactRefresh,
        prettier: prettierPlugin,
        perfectionist,
      },
    },
    {
      ignores: [ 'node_modules', 'coverage', 'eslint.config.js'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2020,
        },
        parserOptions: {
          project: ['dist', 'tsconfig.json', 'tsconfig.app.json','tsconfig.node.json'],
        },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        ...prettierPlugin.configs.recommended.rules,
        ...eslintConfigPrettier.rules,
        "no-unsafe-optional-chaining": "off",
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prefer-const': 'error',
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
        'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'max-lines': ['warn', { max: 124 }],
        'perfectionist/sort-enums': [
          'error',
          {
            type: 'natural',
            order: 'asc',
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            groups: ['multiline', 'unknown', 'shorthand'],
          },
        ],
        'perfectionist/sort-svelte-attributes': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            groups: ['multiline', 'unknown', ['shorthand', 'svelte-shorthand']],
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'type',
              'react',
              'nanostores',
              ['builtin', 'external'],
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'side-effect',
              'style',
              'object',
              'unknown',
            ],
            'custom-groups': {
              value: {
                react: ['react', 'react-*'],
                nanostores: '@nanostores/**',
              },
              type: {
                react: 'react',
              },
            },
            'newlines-between': 'always',
            'internal-pattern': [
              '@/components/**',
              '@/stores/**',
              '@/pages/**',
              '@/lib/**',
            ],
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off'
      },
    }
);
