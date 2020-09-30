/**
 * @fileoverview ESLint Plugin for GraphQL Schema
 * @author Joshua Nathaniel Miller
 */
"use strict";

const requireIndex = require("requireindex");

const rules = requireIndex(__dirname + "/rules");
const processors = requireIndex(__dirname + "/processors");

module.exports = {
    rules,
    configs: {
        recommended: {
            overrides: [
                {
                    files: ['*.graphql', '*.gql'],
                    parser: 'eslint-plugin-graphql-schema/parser',
                    rules: {
                        'graphql-schema/defined-types-are-used': ['warn'],
                        'graphql-schema/deprecations-have-a-reason': ['warn'],
                        'graphql-schema/enum-values-all-caps': ['error'],
                        'graphql-schema/enum-values-sorted-alphabetically': ['warn'],
                        'graphql-schema/input-object-fields-have-trailing-commas': ['error', 'never'],
                        'graphql-schema/input-object-values-are-camel-cased': ['error'],
                        'graphql-schema/input-object-values-have-description': ['warn', {commentDescriptions: true}],
                        'graphql-schema/type-fields-are-camel-cased': ['error'],
                        'graphql-schema/type-fields-have-descriptions': ['warn', {commentDescriptions: true}],
                        'graphql-schema/type-fields-have-trailing-commas': ['error', 'never'],
                        'graphql-schema/type-fields-sorted-alphabetically': ['warn'],
                        'graphql-schema/types-are-capitalized': ['error'],
                        'graphql-schema/types-have-descriptions': ['warn', {commentDescriptions: true}],
                    }
                }
            ]
        },
        // Explain yourself!
        mom: {
            overrides: [
                {
                    files: ['*.graphql', '*.gql'],
                    parser: 'eslint-plugin-graphql-schema/parser',
                    rules: {
                        'graphql-schema/deprecations-have-a-reason': ['warn'],
                        'graphql-schema/input-object-values-have-description': ['warn', {commentDescriptions: true}],
                        'graphql-schema/type-fields-have-descriptions': ['warn', {commentDescriptions: true}],
                        'graphql-schema/types-have-descriptions': ['warn', {commentDescriptions: true}],
                    }
                }
            ]
        },
        hero: {
            overrides: [
                {
                    files: ['*.graphql', '*.gql'],
                    parser: 'eslint-plugin-graphql-schema/parser',
                    rules: {
                        'graphql-schema/arguments-have-descriptions': ['error'],
                        'graphql-schema/defined-types-are-used': ['error'],
                        'graphql-schema/deprecations-have-a-reason': ['error'],
                        'graphql-schema/descriptions-are-capitalized': ['error'],
                        'graphql-schema/enum-values-all-caps': ['error'],
                        'graphql-schema/enum-values-have-descriptions': ['error'],
                        'graphql-schema/enum-values-sorted-alphabetically': ['error'],
                        'graphql-schema/input-object-fields-have-trailing-commas': ['error', 'never'],
                        'graphql-schema/input-object-fields-sorted-alphabetically': ['error'],
                        'graphql-schema/input-object-values-are-camel-cased': ['error'],
                        'graphql-schema/input-object-values-have-description': ['error'],
                        'graphql-schema/type-fields-are-camel-cased': ['error'],
                        'graphql-schema/type-fields-have-descriptions': ['error'],
                        'graphql-schema/type-fields-have-trailing-commas': ['error', 'never'],
                        'graphql-schema/type-fields-sorted-alphabetically': ['error'],
                        'graphql-schema/types-are-capitalized': ['error'],
                        'graphql-schema/types-have-descriptions': ['error'],
                    }
                }
            ]
        }
    }
};
