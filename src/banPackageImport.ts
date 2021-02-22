import { Rule } from "eslint";

export const banPackageImport: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    messages: {
      bannedPackage: "Package '{{ package }}' is not allowed",
    },
  },
  create(context) {
    const bannedPackages: string[] = context.options[0]?.packages || [];

    return {
      // check deps when `const dep = require('dep')`
      CallExpression(node) {
        const pkg = node.arguments[0] || {};

        if (
          node.callee.type === "Identifier" &&
          pkg.type === "Literal" &&
          typeof pkg.value === "string"
        ) {
          if (
            node.callee.name === "require" &&
            bannedPackages.includes(pkg.value)
          ) {
            context.report({
              node,
              messageId: "bannedPackage",
              data: {
                package: pkg.value,
              },
            });
          }
        }
      },
      // check deps when `import dep from 'dep'`
      ImportDeclaration(node) {
        const pkgName = node.source.value;

        if (typeof pkgName === "string" && bannedPackages.includes(pkgName)) {
          context.report({
            node,
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
