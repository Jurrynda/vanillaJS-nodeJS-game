module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'no-nested-ternary': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-multi-assign': 0,
    'operator-linebreak': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0,
  },
};
