import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/input-object-fields-have-trailing-commas';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('input-object-fields-have-trailing-commas', () => {
    ruleTester.run('input-object-fields-have-trailing-commas', rule, {
        valid: [
            {
                // should pass when no trailing commas on field definitions
                code: `
      input TrailingComma {
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
      input TrailingComma {
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
      input TrailingComma {
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
      input TrailingComma {
        withComma: String,
        withoutComma: String
      }
    `,
                parser,
                options: ['never'],
                output: `
      input TrailingComma {
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
      input TrailingComma {
        withComma: String,
        withoutComma: String
      }
    `,
                parser,
                options: ['always'],
                output: `
      input TrailingComma {
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
      input TrailingComma {
        withoutComma: String
        withCommaEnd: String,
      }
    `,
                parser,
                options: ['multiline'],
                output: `
      input TrailingComma {
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
