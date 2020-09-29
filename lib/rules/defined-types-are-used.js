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
        const ignoredTypes = ['Query', 'Mutation', 'Subscription'];
        const definedTypes = [];
        const referencedTypes = new Set();

        const recordDefinedType = (node) => {
            if (ignoredTypes.indexOf(node.name.value) === -1) {
                definedTypes.push(node);
            }
        };

        const recordReferencedType = (value) => {
            if (ignoredTypes.indexOf(value) === -1) {
                referencedTypes.add(value);
            }
        };

        return {
            ScalarTypeDefinition: recordDefinedType,
            ObjectTypeDefinition: recordDefinedType,
            InterfaceTypeDefinition: recordDefinedType,
            UnionTypeDefinition: recordDefinedType,
            EnumTypeDefinition: recordDefinedType,
            InputObjectTypeDefinition: recordDefinedType,


            FieldDefinition: (node) => {
                if (node.parent.kind === 'ObjectTypeExtension') {
                    recordReferencedType(node.loc.endToken.value);
                }
            },

            InputValueDefinition: (node) => {
                if (node.parent.kind === 'FieldDefinition') {
                    recordReferencedType(node.loc.endToken.value);
                }
            },

            NamedType: (node) => {
                recordReferencedType(node.name.value)
            },

            "Document:exit": () => {
                definedTypes.forEach((node) => {
                    if (node.kind === 'ObjectTypeDefinition') {
                        let implementedInterfaces = node.interfaces.map((node) => {
                            return node.name.value;
                        });

                        let anyReferencedInterfaces = implementedInterfaces.some(
                            (interfaceName) => {
                                return referencedTypes.has(interfaceName);
                            }
                        );

                        if (anyReferencedInterfaces) {
                            return;
                        }
                    }

                    if (!referencedTypes.has(node.name.value)) {
                        context.report({
                            node,
                            message: `The type \`${node.name.value}\` is defined in the ` +
                                `schema but not used anywhere.`
                        });
                    }
                });
            }
        };
    }
};
