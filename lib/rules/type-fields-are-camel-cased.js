const camelCaseTest = RegExp('^[a-z][a-zA-Z0-9]*$');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'arg',
            category: 'Stylistic Issues',
            recommended: true
        },
        schema: []
    },
    create: (context) => {
        return {
            FieldDefinition(node) {
                const fieldName = node.name.value;
                if (!camelCaseTest.test(fieldName)) {
                    const parentName = node.parent.name.value;
                    context.report({
                        node,
                        message: `The field \`${parentName}.${fieldName}\` is not camel cased.`
                    });
                }
            },
        };
    }
};
