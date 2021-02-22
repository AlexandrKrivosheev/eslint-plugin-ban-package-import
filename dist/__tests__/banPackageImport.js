"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var eslint_1 = require("eslint");
var banPackageImport_1 = require("../banPackageImport");
var testCase = function (code, settings) {
    if (settings === void 0) { settings = { errors: [] }; }
    return (__assign(__assign({}, settings), { code: code, options: [{ packages: ["bannedDep"] }] }));
};
var ruleTester = new eslint_1.RuleTester({
    parserOptions: { sourceType: "module", ecmaVersion: 2015 },
});
ruleTester.run("ban-package-import", banPackageImport_1.banPackageImport, {
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
