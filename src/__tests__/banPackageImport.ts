import { RuleTester } from "eslint";
import { banPackageImport } from "../banPackageImport";

const testCase = (
  code: string,
  settings: Omit<RuleTester.InvalidTestCase, "code"> = { errors: [] }
) => ({
  ...settings,
  code,
  options: [{ packages: ["bannedDep"] }],
});

const ruleTester = new RuleTester({
  parserOptions: { sourceType: "module", ecmaVersion: 2015 },
});

ruleTester.run("ban-package-import", banPackageImport, {
  valid: [
    testCase("var allowedDep = require('allowedDep')"),
    testCase("log()"),
    testCase("import allowedDep from 'allowedDep'"),
    testCase("import * as allowedDep from 'allowedDep'"),
  ],
  invalid: [
    testCase("var bannedDep = require('bannedDep')", {
      errors: [
        {
          messageId: "bannedPackage",
        },
      ],
    }),
    testCase("import bannedDep from 'bannedDep'", {
      errors: [
        {
          messageId: "bannedPackage",
        },
      ],
    }),
    testCase("import { bannedDep } from 'bannedDep'", {
      errors: [
        {
          messageId: "bannedPackage",
        },
      ],
      parser: require.resolve("@typescript-eslint/parser"),
    }),
  ],
});
