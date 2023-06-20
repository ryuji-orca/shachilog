/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: "avoid",
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,

  printWidth: 80,
  quoteProps: "as-needed",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",

  // @ianvs/prettier-plugin-sort-imports
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.4",
}
