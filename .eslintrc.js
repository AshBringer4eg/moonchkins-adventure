module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'ignorePatterns': ['src/types/index.d.ts'],
  'rules': {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/object-curly-spacing': [2, 'always'],
    '@typescript-eslint/indent': [2, 2, { 'SwitchCase': 1 }], // Enforce consistent indentation
    '@typescript-eslint/space-infix-ops': ["error", { "int32Hint": true }],
    "@typescript-eslint/no-namespace": "off",

    'space-infix-ops': 'off',
    'semi': 'off',
    'no-unused-vars': 'off',
    'object-curly-spacing': 'off', // Enforce consistent spacing inside braces
    'indent': 'off', // Enforce consistent indentation
    'no-multi-spaces': 0, // Disallow multiple spaces
    'no-unused-expressions': 1,// Disallow unused expressions
    'no-empty-class': 0, // Disallows empty character classes in regular expressions.
    'quotes': [0, 'single'], // Enforce the consistent use of single quotes
    'space-in-parens': [2, 'never'], // Enforce consistent spacing inside parentheses
    'no-use-before-define': 0, // Disallow the use of variables before they are defined
    'no-throw-literal': 0, // Disallow throwing literals as exceptions
    'for-direction': 1, // Prevents from an infinite loop and wrong conditions
    'no-var': 2, // You can't use var
    'prefer-arrow-callback': [ 'error', { 'allowNamedFunctions': true , 'allowUnboundThis': true } ] , // Require using arrow functions for callbacks
    'prefer-const': 2, // Require const declarations for variables that are never reassigned after declared
    'require-await': 1, // Disallow async functions which have no await expression
    'arrow-spacing': ['error', { 'before': true, 'after': true }], // Enforce consistent spacing before and after the arrow in arrow functions
    'comma-style': ['error', 'last'], // Enforce consistent comma style
    'comma-dangle': ['error', {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
    }],
    'func-call-spacing': ['error', 'never'], // Require or disallow spacing between function identifiers and their invocations
    'keyword-spacing': ['error', { 'before': true }], // Enforce consistent spacing before and after keywords
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'], // Disallow mixed spaces and tabs for indentation
    'no-multiple-empty-lines': ['error', { 'max': 5, 'maxEOF': 0 }], // Disallow multiple empty lines
    'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
    'no-whitespace-before-property': 'error', // Disallow whitespace before properties
    'max-lines-per-function': ['error', 100], // Max length of function
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }], // Enforce the consistent use of either function declarations or expressions
    'eqeqeq': ['error', 'smart'], // Require the use of === and !==
  },
};
