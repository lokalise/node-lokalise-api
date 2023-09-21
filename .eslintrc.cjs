module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
    ecmaVersion: 2022,
  },
  plugins: ["@typescript-eslint", "node", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/consistent-type-assertions": [
      "warn",
      {
        assertionStyle: "angle-bracket",
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "node/file-extension-in-import": [
      "error",
      "always",
      { tryExtensions: [".js", ".json", ".node"] },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "node/no-missing-import": "off",
    "node/no-unpublished-import": ["off"],
    "import/no-unresolved": "error",
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/unbound-method": "off",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        typescript: true,
        node: true,
      },
    },
  },
};
