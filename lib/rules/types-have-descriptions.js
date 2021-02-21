const utils = require('graphql/utilities/extendSchema');

const validateTypeHasDescription = (context, node, typeKind) => {
    if (utils.getDescription(node, context.options.length > 0 ? context.options[0] : {})) {
        return;
    }

    const interfaceTypeName = node.name.value;

    context.report({
        node,
        message: `The ${typeKind} type \`${interfaceTypeName}\` is missing a description.`
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
            ScalarTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'scalar');
            },

            ObjectTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'object');
            },

            InterfaceTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'interface');
            },

            UnionTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'union');
            },

            EnumTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'enum');
            },

            InputObjectTypeDefinition(node) {
                validateTypeHasDescription(context, node, 'input object');
            },
        };
    }
};
