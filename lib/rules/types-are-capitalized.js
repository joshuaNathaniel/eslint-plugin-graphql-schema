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
            ObjectTypeDefinition(node) {
                const typeName = node.name.value;
                if (typeName[0] === typeName[0].toLowerCase()) {
                    context.report({
                        node,
                        message: `The object type \`${typeName}\` should start with a capital letter.`,
                    });
                }
            },

            InterfaceTypeDefinition(node) {
                const typeName = node.name.value;
                if (typeName[0] === typeName[0].toLowerCase()) {
                    context.report({
                        node,
                        message: `The interface type \`${typeName}\` should start with a capital letter.`,
                    });
                }
            },
        };
    }
};
