module.exports = {
  extends: "eslint:recommended",
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      assert: true // Add this line to enable the assert keyword
    },
    babelOptions: {
      plugins: [
        "@babel/plugin-syntax-import-assertions"
      ]
    }
  },
  env: {
    es6: true,
    jasmine: true,
    jest: true
  },
  globals: {
    process: true
  },
  rules: {
    "node/no-missing-import": "off",
    "node/no-missing-require": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unpublished-import": "off",
    "node/no-unpublished-require": "off"
  }
};
