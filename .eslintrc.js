module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
  env: {
    browser: true,
  },
  ignorePatterns: ['dist/*'],
  extends: '@funboxteam',
  rules: {
    'no-unused-vars': 'off',
  },
};
