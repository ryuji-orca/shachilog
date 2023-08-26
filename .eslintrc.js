module.exports = {
  root: true,
  plugins: ["unused-imports", "tailwindcss", "import-access"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: {
    // tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  settings: {
    tailwindcss: {
      groupByResponsive: true,
      whitelist: [
        "(text|bg)-slate-(1[0-2]|[1-9])",
        "(text|bg|from|to)-blue-(1[0-2]|[1-9])",
        "(text|bg|from|to)-cyan-(1[0-2]|[1-9])",
        "(text|!text|bg|from|to|border|border-l|ring-offset)-(indigo|yellow|red)-(1[0-2]|[1-9]).*",
        "(text|bg|from|to|border)-sky-(1[0-2]|[1-9]).*",
        "(animate|slide).*",
      ],
    },
    next: {
      rootDir: true,
    },
  },
  // plugins: ['unused-imports', 'tailwindcss', 'import-access'],
  rules: {
    curly: "error",
    "no-console": ["error", { allow: ["warn", "info", "error"] }],
    "no-restricted-syntax": [
      "error",
      { selector: "TSEnumDeclaration", message: "Don't declare enums" },
    ],
    "func-style": ["error", "expression"],
    "prefer-arrow-callback": "error",
    "arrow-body-style": ["error", "always"],
    "no-restricted-imports": [
      "error",
      { paths: [{ name: "react", importNames: ["default"] }] },
    ],

    /* react */
    "react/destructuring-assignment": ["error", "always"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    /* tailwind */

    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",

    /* import 系 */
    "import/newline-after-import": "error",

    /* import-access */
    "import-access/jsdoc": "error",

    "unused-imports/no-unused-imports": "error",

    /* typescript-eslint */
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports" },
    ],

    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],

    // 配列
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
        readonly: "array",
      },
    ],
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
}
