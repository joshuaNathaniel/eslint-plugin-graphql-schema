const utils = require('../utils/listIsAlphabetical');

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
                const fieldList = node.fields.map((field) => field.name.value);
                const { isSorted, sortedList } = utils.listIsAlphabetical(fieldList);

                if (!isSorted) {
                    sortedList.forEach((name, index) => {
                        const field = node.fields[index];

                        if (field.name.value !== name) {
                            context.report({
                                node: field,
                                loc: field.name.loc,
                                message: `Field \`${field.name.value}\` of object type \`${node.name.value}\` should be sorted alphabetically.`,
                                fix(fixer) {
                                    const body = node.loc.source.body.split('\n').slice(node.loc.start.line - 1, node.loc.end.line).join('\n');
                                    const lines = body.split(/\n/g);
                                    const originalFields = lines.slice(1, lines.length - 1).join('\n');
                                    const sortedFields = lines.slice(1, lines.length - 1).sort().join('\n');
                                    const newBody = body.replace(originalFields, sortedFields);

                                    return fixer.replaceText(node, newBody.trim());
                                }
                            });
                        }
                    });
                }
            },
        };
    }
};
