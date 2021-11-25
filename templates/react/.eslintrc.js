module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'react-hooks'],
  rules: {
    'indent': 0,
    'react/require-default-props': 0,
    'no-empty': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'no-shadow': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react/display-name': 0,
    'react/destructuring-assignment': 0,
    'react/sort-comp': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-wrap-multilines': 0,
    'wrap-iife': 0,
    'object-curly-newline': 0,
    'react/jsx-one-expression-per-line': 0,
    'implicit-arrow-linebreak': 0,
    'import/order': 0,
    'consistent-return': 0,
    'max-len': [2, { 'code': 120, 'tabWidth': 4, 'comments': 90}],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'semi': 0,
    '@typescript-eslint/semi': [2, 'always'],
    'quotes': 0,
    '@typescript-eslint/quotes': [2, 'single'],
    'comma-dangle': 0,
    '@typescript-eslint/comma-dangle': [2, {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      "exports": 'always-multiline',
      'functions': 'always-multiline',
      'enums': 'always-multiline',
      'generics': 'always-multiline',
      'tuples': 'always-multiline'
    }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/member-delimiter-style': [2, {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': true
      }
    }],
    '@typescript-eslint/prefer-enum-initializers': 2
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
