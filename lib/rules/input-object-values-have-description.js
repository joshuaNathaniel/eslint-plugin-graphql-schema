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
            InputValueDefinition(node) {
                if (utils.getDescription(node, context.options.length > 0 ? context.options[0] : {})) {
                    return;
                }

                const inputValueName = node.name.value;
                const parentNode = node.parent;

                if (parentNode.kind !== 'InputObjectTypeDefinition') {
                    return;
                }

                const inputObjectName = parentNode.name.value;

                context.report({
                    node,
                    message: `The input value \`${inputObjectName}.${inputValueName}\` is missing a description.`
                });
            },
        };
    }
};
