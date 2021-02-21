const utils = require('graphql/utilities/extendSchema');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'arg',
            category: 'Stylistic Issues',
            recommended: true
        },
        schema: [{
            type: 'object',
            properties: {
                commentDescriptions: {
                    type: 'boolean',
                    default: false
                }
            },
            additionalProperties: false
        }]
    },
    create: (context) => {
        return {
            EnumValueDefinition(node) {
                if (utils.getDescription(node, context.options.length > 0 ? context.options[0] : {})) {
                    return;
                }

                const enumValue = node.name.value;
                const parentName = node.parent.name.value;

                context.report({
                    node,
                    message: `The enum value \`${parentName}.${enumValue}\` is missing a description.`
                });
            },
        };
    }
};
