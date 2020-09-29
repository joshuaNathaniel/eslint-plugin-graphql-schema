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
            EnumValueDefinition(node) {
                const enumValueName = node.name.value;
                const parentName = node.parent.name.value;

                if (enumValueName !== enumValueName.toUpperCase()) {
                    context.report({
                        node,
                        message: `The enum value \`${parentName}.${enumValueName}\` should be uppercase.`
                    });
                }
            },
        };
    }
};
