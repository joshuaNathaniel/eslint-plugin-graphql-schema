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
            FieldDefinition(node) {
                const fieldName = node.name.value;

                for (const arg of node.arguments) {
                    const description = utils.getDescription(arg, context.options.length > 0 ? context.options[0] : {});

                    if (typeof description !== 'string' || description.length === 0) {
                        const argName = arg.name.value;

                        context.report({
                            node: node,
                            message: `The \`${argName}\` argument of \`${fieldName}\` is missing a description.`
                        });
                    }
                }
            }
        };
    }
};
