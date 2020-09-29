module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'arg',
            category: 'Stylistic Issues',
            recommended: true
        },
        fixable: 'code',
        schema: [
            {
                enum: ['always', 'multiline', 'never'],
            }
        ]
    },
    create: (context) => {
        return {
            FieldDefinition(node) {
                const line = node.loc.source.body.substring(node.oldLoc.start, node.oldLoc.end + 1);
                const fieldName = node.name.value;
                const parentName = node.parent.name.value;
                const hasTrailingComma = !!line.match(/.*,$/);

                    switch(context.options[0]) {
                    case 'never':
                        if (hasTrailingComma) {
                            context.report({
                                node: node,
                                message: `The field \`${parentName}.${fieldName}\` has a trailing comma.`,
                                fix(fixer) {
                                    return [
                                        fixer.removeRange([node.loc.endToken.end, node.loc.endToken.end + 1])
                                    ];
                                }
                            });
                        }
                        break;
                    case 'always':
                        if (!hasTrailingComma) {
                            context.report({
                                node: node,
                                message: `The field \`${parentName}.${fieldName}\` should have a trailing comma.`,
                                fix(fixer) {
                                    return [
                                        fixer.insertTextAfterRange([null, node.loc.endToken.end], ",")
                                    ];
                                }
                            });
                        }
                        break;
                    case 'multiline':
                        if (node.parent.fields[node.parent.fields.length - 1] === node) {
                            if (hasTrailingComma) {
                                context.report({
                                    node: node,
                                    message: `The field \`${parentName}.${fieldName}\` has a trailing comma.`,
                                    fix(fixer) {
                                        return [
                                            fixer.removeRange([node.loc.endToken.end, node.loc.endToken.end + 1])
                                        ];
                                    }
                                });
                            } else {
                                return;
                            }
                        } else if (!hasTrailingComma) {
                            context.report({
                                node: node,
                                message: `The field \`${parentName}.${fieldName}\` should have a trailing comma.`,
                                fix(fixer) {
                                    return [
                                        fixer.insertTextAfterRange([null, node.loc.endToken.end], ",")
                                    ];
                                }
                            });
                        }
                        break;
                }
            }
        };
    }
};
