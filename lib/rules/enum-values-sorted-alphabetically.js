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
            EnumTypeDefinition(node) {
                const enumValues = node.values.map((val) => {
                    return val.name.value;
                });

                const { isSorted, sortedList } = utils.listIsAlphabetical(enumValues);

                if (!isSorted) {
                    context.report({
                        node,
                        message: `The enum \`${node.name.value}\` should be sorted alphabetically. ` +
                            `Expected sorting: ${sortedList.join(', ')}`
                    });
                }
            },
        };
    }
};
