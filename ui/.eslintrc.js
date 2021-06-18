module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  ignorePatterns: [
    'gen/',
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "object-curly-spacing": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "no-plusplus": "off",
    "react/static-property-placement": "off",
  },
};
