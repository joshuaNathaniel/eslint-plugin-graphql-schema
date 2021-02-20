const utils = require('graphql/utilities/extendSchema');

const validateTypeHasPrefixes = (context, node, typeKind) => {
    if (context.options && context.options.length === 0) {
        return;
    }

    const interfaceTypeName = node.name.value;
    const prefixes = context.options[0].prefixes;

    for (let prefix of prefixes) {
        if (interfaceTypeName.search(prefix) === 0) {
            return;
        }
    }

    context.report({
        node,
        message: `The ${typeKind} type \`${interfaceTypeName}\` is not prefixed.`
    });
}

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Validates that object types have given prefixes.',
            category: 'Stylistic Issues',
            recommended: true
        },
        schema: [{
            type: 'object',
            properties: {
                prefixes: {
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    default: []
                }
            },
            additionalProperties: false
        }]
    },
    create: (context) => {
        return {
            ObjectTypeDefinition(node) {
                validateTypeHasPrefixes(context, node, 'object');
            }
        };
    }
};
