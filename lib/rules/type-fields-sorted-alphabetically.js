const utils = require('../utils/listIsAlphabetical');

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
            ObjectTypeDefinition(node) {
                const fieldList = node.fields.map((field) => field.name.value);
                const { isSorted, sortedList } = utils.listIsAlphabetical(fieldList);

                if (!isSorted) {
                    context.report({
                        node,
                        message: `The fields of object type \`${node.name.value}\` should be sorted alphabetically. ` +
                            `Expected sorting: ${sortedList.join(', ')}`
                    });
                }
            },
        };
    }
};
