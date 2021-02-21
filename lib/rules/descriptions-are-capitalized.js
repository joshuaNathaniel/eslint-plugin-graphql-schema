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
                const description = utils.getDescription(node, context.options.length > 0 ? context.options[0] : {}, );

                if (typeof description !== 'string' || description.length === 0) return;

                const firstCharacter = description[0];
                if (firstCharacter === firstCharacter.toUpperCase()) return;

                const fieldName = node.name.value;
                const parentName = node.parent.name.value;

                context.report({
                    node,
                    message: `The description for field \`${parentName}.${fieldName}\` should be capitalized.`
                });
            },
        };
    }
};
