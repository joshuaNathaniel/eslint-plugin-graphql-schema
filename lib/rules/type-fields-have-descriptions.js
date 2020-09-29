const utils = require('graphql/utilities/extendSchema');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'arg',
            category: 'Stylistic Issues',
            recommended: true
        },
        fixable: 'code',
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
            FieldDefinition(node) {
                if (utils.getDescription(node, context.options.length > 0 ? context.options[0] : {})) {
                    return;
                }
                const fieldName = node.name.value;
                const parentName = node.parent.name.value;

                context.report({
                    node: node,
                    message: `The field \`${parentName}.${fieldName}\` is missing a description.`
                });
            }
        };
    }
};
