module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
  env: {
    browser: true,
  },
  ignorePatterns: ['docs/*'],
  extends: '@funboxteam',
};
