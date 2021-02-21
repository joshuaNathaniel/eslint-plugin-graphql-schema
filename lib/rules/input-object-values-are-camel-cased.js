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
            InputValueDefinition(node) {
                const inputValueName = node.name.value;
                const parentNode = node.parent;

                const fieldName = node.name.value;
                if (!camelCaseTest.test(fieldName)) {
                    const inputObjectName = parentNode.name.value;
                    context.report({
                        node,
                        message: `The input value \`${inputObjectName}.${inputValueName}\` is not camel cased.`
                    });
                }
            },
        };
    }
};
