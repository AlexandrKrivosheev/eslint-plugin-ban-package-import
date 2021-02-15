import { RuleTester } from "eslint";
import { banDependencyImport } from "../banDependencyImport";

const testCase = (
  code: string,
  settings: Omit<RuleTester.InvalidTestCase, "code"> = { errors: [] }
) => ({
  ...settings,
  code,
  options: [{ dependencies: ["bannedDep"] }],
});

const ruleTester = new RuleTester({
  parserOptions: { sourceType: "module", ecmaVersion: 2015 },
});

ruleTester.run("ban-dependency-import", banDependencyImport, {
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
          messageId: "bannedDependency",
        },
      ],
    }),
    testCase("import bannedDep from 'bannedDep'", {
      errors: [
        {
          messageId: "bannedDependency",
        },
      ],
    }),
    testCase("import { bannedDep } from 'bannedDep'", {
      errors: [
        {
          messageId: "bannedDependency",
        },
      ],
      parser: require.resolve("@typescript-eslint/parser"),
    }),
  ],
});
