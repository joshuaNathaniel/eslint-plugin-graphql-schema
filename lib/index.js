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
                    parser: 'eslint-plugin-get-off-my-grassql/parser',
                    rules: {
                        'get-off-my-grassql/defined-types-are-used': ['warn'],
                        'get-off-my-grassql/deprecations-have-a-reason': ['warn'],
                        'get-off-my-grassql/enum-values-all-caps': ['error'],
                        'get-off-my-grassql/enum-values-sorted-alphabetically': ['warn'],
                        'get-off-my-grassql/input-object-fields-have-trailing-commas': ['error', 'never'],
                        'get-off-my-grassql/input-object-values-are-camel-cased': ['error'],
                        'get-off-my-grassql/input-object-values-have-description': ['warn', {commentDescriptions: true}],
                        'get-off-my-grassql/type-fields-are-camel-cased': ['error'],
                        'get-off-my-grassql/type-fields-have-descriptions': ['warn', {commentDescriptions: true}],
                        'get-off-my-grassql/type-fields-have-trailing-commas': ['error', 'never'],
                        'get-off-my-grassql/type-fields-sorted-alphabetically': ['warn'],
                        'get-off-my-grassql/types-are-capitalized': ['error'],
                        'get-off-my-grassql/types-have-descriptions': ['warn', {commentDescriptions: true}],
                    }
                }
            ]
        },
        // Explain yourself!
        mom: {
            overrides: [
                {
                    files: ['*.graphql', '*.gql'],
                    parser: 'eslint-plugin-get-off-my-grassql/parser',
                    rules: {
                        'get-off-my-grassql/deprecations-have-a-reason': ['warn'],
                        'get-off-my-grassql/input-object-values-have-description': ['warn', {commentDescriptions: true}],
                        'get-off-my-grassql/type-fields-have-descriptions': ['warn', {commentDescriptions: true}],
                        'get-off-my-grassql/types-have-descriptions': ['warn', {commentDescriptions: true}],
                    }
                }
            ]
        },
        hero: {
            overrides: [
                {
                    files: ['*.graphql', '*.gql'],
                    parser: 'eslint-plugin-get-off-my-grassql/parser',
                    rules: {
                        'get-off-my-grassql/arguments-have-descriptions': ['error'],
                        'get-off-my-grassql/defined-types-are-used': ['error'],
                        'get-off-my-grassql/deprecations-have-a-reason': ['error'],
                        'get-off-my-grassql/descriptions-are-capitalized': ['error'],
                        'get-off-my-grassql/enum-values-all-caps': ['error'],
                        'get-off-my-grassql/enum-values-have-descriptions': ['error'],
                        'get-off-my-grassql/enum-values-sorted-alphabetically': ['error'],
                        'get-off-my-grassql/input-object-fields-have-trailing-commas': ['error', 'never'],
                        'get-off-my-grassql/input-object-fields-sorted-alphabetically': ['error'],
                        'get-off-my-grassql/input-object-values-are-camel-cased': ['error'],
                        'get-off-my-grassql/input-object-values-have-description': ['error'],
                        'get-off-my-grassql/type-fields-are-camel-cased': ['error'],
                        'get-off-my-grassql/type-fields-have-descriptions': ['error'],
                        'get-off-my-grassql/type-fields-have-trailing-commas': ['error', 'never'],
                        'get-off-my-grassql/type-fields-sorted-alphabetically': ['error'],
                        'get-off-my-grassql/types-are-capitalized': ['error'],
                        'get-off-my-grassql/types-have-descriptions': ['error'],
                    }
                }
            ]
        }
    }
};
