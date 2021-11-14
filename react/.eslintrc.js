module.exports = {
  root: true,
  ignorePatterns: ['build/'],
  extends: ['react-app', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'react', 'simple-import-sort', 'json-format'],
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          { name: 'styled-components', message: 'Please import from styled-components/macro.' },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
    'prettier/prettier': 'warn',
    'react/jsx-key': [
      'warn',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      { callbacksLast: true, ignoreCase: false, reservedFirst: false, shorthandFirst: true },
    ],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    semi: ['warn', 'never'],
  },
  settings: {
    'json/sort-package-json': 'pro',
  },
}
