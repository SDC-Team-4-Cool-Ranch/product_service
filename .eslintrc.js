module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'valid-typeof': 0,
    camelcase: 0,
    'max-len': 0,
    'no-restricted-syntax': 0,
    'func-names': 0,
  },
};
