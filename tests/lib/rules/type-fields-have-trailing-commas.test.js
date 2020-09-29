import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/type-fields-have-trailing-commas';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('type-fields-have-trailing-commas', () => {
    ruleTester.run('type-fields-have-trailing-commas', rule, {
        valid: [
            {
                code: `
    type TrailingComma @key(fields: "commaId") {
        commaId: ID
        before: String!
        after: String!
    }

    extend type Query {
        comma(couponId: ID!, filter: String): Comma
    }
`,
                parser,
                options: ['never']
            },
            {
                code: `
    type TrailingComma @key(fields: "commaId") {
        commaId: ID,
        before: String!,
        after: String!,
    }

    extend type Query {
        comma(couponId: ID!, filter: String): TrailingComma,
    }
`,
                parser,
                options: ['always']

            },
            {
                code: `
    type TrailingComma @key(fields: "commaId") {
        commaId: ID,
        before: String!,
        after: String!
    }

    extend type Query {
        comma(couponId: ID!, filter: String): TrailingComma
    }
`,
                parser,
                options: ['multiline']

            },
            {
                // should pass when no trailing commas on field definitions
                code: `
      type TrailingComma {
        withDescription: String
        withCommentDescription: String
      }
    `,
                parser,
                options: ['never']
            },
            {
                // should pass when trailing commas on all field definitions
                code: `
      type TrailingComma {
        withDescription: String,
        withCommentDescription: String,
      }
    `,
                parser,
                options: ['always']
            },
            {
                // trailing comma on all field definitions except the last field
                code: `
      type TrailingComma {
        withDescription: String,
        withCommentDescription: String
      }
    `,
                parser,
                options: ['multiline']
            }
        ],
        invalid: [
            {
                // should fail when trailing commas exist
                code: `
      type TrailingComma {
        withComma: String,
        withoutComma: String
      }
    `,
                parser,
                options: ['never'],
                output: `
      type TrailingComma {
        withComma: String
        withoutComma: String
      }
    `,
                errors: [
                    {
                        message: 'The field `TrailingComma.withComma` has a trailing comma.'
                    }
                ]
            },
            {
                // should fail when last field does not have comma
                code: `
      type TrailingComma {
        withComma: String,
        withoutComma: String
      }
    `,
                parser,
                options: ['always'],
                output: `
      type TrailingComma {
        withComma: String,
        withoutComma: String,
      }
    `,
                errors: [
                    {
                        message: 'The field `TrailingComma.withoutComma` should have a trailing comma.'
                    }
                ]
            },
            {
                // should fail when last field has comma and property is defined
                code: `
      type TrailingComma {
        withoutComma: String
        withCommaEnd: String,
      }
    `,
                parser,
                options: ['multiline'],
                output: `
      type TrailingComma {
        withoutComma: String,
        withCommaEnd: String
      }
    `,
                errors: [
                    {
                        message: 'The field `TrailingComma.withoutComma` should have a trailing comma.'
                    },
                    {
                        message: 'The field `TrailingComma.withCommaEnd` has a trailing comma.'
                    }
                ]
            }
        ]
    });

});
