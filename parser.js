/* istanbul ignore file */
const {Lexer, Source, parse, visit} = require("graphql");

function populateLines(input) {
    const lines = new Map();
    const list = input.match(/^.*$/gm);
    let lineStart = 0;
    list.forEach((line) => {
        lines.set(lineStart, line);
        lineStart += line.length + 1;
    });
    return lines;
}

function getLineColumn(lines, charIndex) {
    const iterator = lines.entries();
    let prev = null;
    let item = iterator.next();
    let index = 0;
    while (item && !item.done && item.value[0] <= charIndex) {
        prev = item;
        index += 1;
        if (item.done) {
            break;
        }
        item = iterator.next();
    }
    return {
        line: index,
        column: Math.abs(charIndex - prev.value[0])
    };
}

const visitorKeys = {
    Name: ['value'],
    Document: ['definitions'],
    OperationDefinition: ['operation','variableDefinitions', 'directives', 'selectionSet', 'name'],
    VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
    Variable: ['name'],
    SelectionSet: ['selections'],
    Field: ['arguments', 'directives', 'selectionSet', 'name', 'alias'],
    Argument: ['name', 'value'],
    FragmentSpread: ['name', 'directives'],
    InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
    FragmentDefinition: ['name', 'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
    IntValue: ['value'],
    FloatValue: ['value'],
    StringValue: ['value', 'block'],
    BooleanValue: ['value'],
    NullValue: [],
    EnumValue: ['value'],
    ListValue: ['values'],
    ObjectValue: ['fields'],
    ObjectField: ['name', 'value'],
    Directive: ['name', 'arguments'],
    NamedType: ['name'],
    ListType: ['type'],
    NonNullType: ['type'],
    SchemaDefinition: ['description', 'directives', 'operationTypes'],
    OperationTypeDefinition: ['operation', 'type'],
    ScalarTypeDefinition: ['description', 'name', 'directives'],
    ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
    FieldDefinition: ['descriptions', 'name', 'arguments', 'type', 'directives'],
    InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
    InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
    UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
    EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
    EnumValueDefinition: ['description', 'name', 'directives'],
    InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
    DirectiveDefinition: ['description', 'name', 'arguments', 'repeatable', 'locations'],
    SchemaExtension: ['directives', 'operationTypes'],
    ScalarTypeExtension: ['name', 'directives'],
    ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
    InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
    UnionTypeExtension: ['name', 'directives', 'types'],
    EnumTypeExtension: ['name', 'directives', 'values'],
    InputObjectTypeExtension: ['name', 'directives', 'fields']
};

function fixNullVerifyOnCodePathInternal() {
    try {
        const codePath_path = Object.keys(require.cache).find(path => path.endsWith('/eslint/lib/code-path-analysis/code-path.js') || path.endsWith('\\eslint\\lib\\code-path-analysis\\code-path.js'));

        if (!codePath_path) {
            throw new Error('Could not find CodePath in require cache');
        }

        const CodePath = require(codePath_path);

        CodePath.prototype.constructor.getState = function(codePath) {
            try {
                return codePath.internal;
            } catch (ignored) {
                return {currentSegments: [], headSegments: []};
            }
        };
    } catch (ignored) {
    }
}

exports.parseForESLint = function parseForESLint(code, parserOptions) {
    fixNullVerifyOnCodePathInternal();
    const lines = populateLines(code);
    const source = new Source(code, parserOptions ? parserOptions.filePath : '');
    const lexer = new Lexer(source);
    const originalAst = parse(source, {});
    const comments = [];
    let ast = originalAst;
    try {
        ast = visit(originalAst, {
            leave(node, key, parent, path, ancestors) {
                const start = getLineColumn(lines, node.loc.start);
                const end = getLineColumn(lines, node.loc.end);
                const { kind } = node;
                const newNode = { ...node };
                newNode.oldLoc = {
                    start: node.loc.start,
                    end: node.loc.end
                };
                newNode.loc.start = start;
                newNode.loc.end = end;
                newNode.type = kind;
                newNode.range = [newNode.oldLoc.start, newNode.oldLoc.end];
                return newNode;
            }
        });
    } catch (e) {
        throw new Error(e);
    }

    const tokens = [];
    let token = lexer.advance();
    while (token && token.kind !== '<EOF>') {
        tokens.push({ ...token, loc: {start: token.start, end: token.end}, range: [token.start, token.end] });
        if (token.kind === 'String' || token.kind === 'BlockString') {
            comments.push({ ...token, range: [token.start, token.end] });
        }
        token = lexer.advance();
    }

    ast.tokens = tokens;
    ast.comments = [];
    ast.range = {};

    return {
        ast,
        scopeManager: {
            variables: [],
            scopes: [{set: new Map(), variables: [], through: []}],
            globalScope: {set: new Map(), variables: []},
            getDeclaredVariables: () => []
        },
        visitorKeys
    }
};
