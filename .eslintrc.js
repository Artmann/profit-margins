module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    'block-scoped-var': 'error',
    'camelcase': 'error',
    'comma-dangle': [ 'error', 'never' ],
    'complexity': 'error',
    'indent': [ 'error', 2 ],
    'no-alert': 'error',
    'no-constructor-return': 'error',
    'no-label-var': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-throw-literal': 'error',
    'no-use-before-define': 'off',
    'prefer-promise-reject-errors': 'error',
    'quotes': [ 'error', 'single' ]
  }
};
