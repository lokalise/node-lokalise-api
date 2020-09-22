module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ["@typescript-eslint", "node", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts"],
    },
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "angle-bracket",
      },
    ],
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unpublished-import": "off",
    "node/no-unpublished-require": "off",
    "node/exports-style": ["error", "module.exports"],
    "node/file-extension-in-import": ["error", "never"],
    "node/prefer-global/buffer": ["error", "always"],
    "node/prefer-global/console": ["error", "always"],
    "node/prefer-global/process": ["error", "always"],
    "node/prefer-global/url-search-params": ["error", "always"],
    "node/prefer-global/url": ["error", "always"],
    "node/prefer-promises/dns": "error",
    "node/prefer-promises/fs": "error",
  },
};
