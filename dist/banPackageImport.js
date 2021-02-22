"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banPackageImport = void 0;
exports.banPackageImport = {
    meta: {
        type: "suggestion",
        messages: {
            bannedPackage: "Package '{{ package }}' is not allowed",
        },
    },
    create: function (context) {
        var _a;
        var bannedPackages = ((_a = context.options[0]) === null || _a === void 0 ? void 0 : _a.packages) || [];
        return {
            // check deps when `const dep = require('dep')`
            CallExpression: function (node) {
                var pkg = node.arguments[0] || {};
                if (node.callee.type === "Identifier" &&
                    pkg.type === "Literal" &&
                    typeof pkg.value === "string") {
                    if (node.callee.name === "require" &&
                        bannedPackages.includes(pkg.value)) {
                        context.report({
                            node: node,
                            messageId: "bannedPackage",
                            data: {
                                package: pkg.value,
                            },
                        });
                    }
                }
            },
            // check deps when `import dep from 'dep'`
            ImportDeclaration: function (node) {
                var pkgName = node.source.value;
                if (typeof pkgName === "string" && bannedPackages.includes(pkgName)) {
                    context.report({
                        node: node,
                        messageId: "bannedPackage",
                        data: {
                            package: pkgName,
                        },
                    });
                }
            },
        };
    },
};
