import { Rule } from "eslint";

export const banDependencyImport: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    messages: {
      bannedDependency: "Dependency '{{ dependency }}' is not allowed",
    },
  },
  create(context) {
    const bannedDeps: string[] = context.options[0]?.dependencies || [];

    return {
      // check deps when `const dep = require('dep')`
      CallExpression(node) {
        const firstArg = node.arguments[0] || {};

        if (
          node.callee.type === "Identifier" &&
          firstArg.type === "Literal" &&
          typeof firstArg.value === "string"
        ) {
          if (
            node.callee.name === "require" &&
            bannedDeps.includes(firstArg.value)
          ) {
            context.report({
              node,
              messageId: "bannedDependency",
              data: {
                dependency: firstArg.value,
              },
            });
          }
        }
      },
      // check deps when `import dep from 'dep'`
      ImportDeclaration(node) {
        const dep = node.source.value;

        if (typeof dep === "string" && bannedDeps.includes(dep)) {
          context.report({
            node,
            messageId: "bannedDependency",
            data: {
              dependency: dep,
            },
          });
        }
      },
    };
  },
};
