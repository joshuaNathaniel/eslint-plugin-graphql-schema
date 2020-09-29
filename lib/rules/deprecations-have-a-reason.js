function getDeprecatedDirective(node) {
    return node.directives.find((directive) => {
        return directive.name.value === 'deprecated';
    });
}

function getReasonArgument(deprecatedDirective) {
    return deprecatedDirective.arguments.find((arg) => {
        return arg.name.value === 'reason';
    });
}

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'arg',
            category: 'Stylistic Issues',
            recommended: true
        },
        fixable: 'code',
        schema: []
    },
    create: (context) => {
        return {
            FieldDefinition(node) {
                const deprecatedDirective = getDeprecatedDirective(node);
                if (!deprecatedDirective) {
                    return;
                }

                const reasonArgument = getReasonArgument(deprecatedDirective);
                if (reasonArgument) {
                    return;
                }

                const fieldName = node.name.value;
                const parentName = node.parent.name.value;

                context.report({
                    node,
                    message: `The field \`${parentName}.${fieldName}\` is deprecated but has no deprecation reason.`,

                });
            },

            EnumValueDefinition(node) {
                const deprecatedDirective = getDeprecatedDirective(node);
                if (!deprecatedDirective) {
                    return;
                }

                const reasonArgument = getReasonArgument(deprecatedDirective);
                if (reasonArgument) {
                    return;
                }

                const enumValueName = node.name.value;
                const parentName = node.parent.name.value;

                context.report({
                    node,
                    message: `The enum value \`${parentName}.${enumValueName}\` is deprecated but has no deprecation reason.`
                });
            },
        };
    }
};
