import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/types-are-capitalized';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('types-are-capitalized', () => {
    ruleTester.run('types-are-capitalized', rule, {
        valid: [
            {
                code: `
      type A {
        a: String
      }
    `,
                parser
            },
            {
                code: `
      interface A {
        a: String
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      type a {
        a: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The object type `a` should start with a capital letter.'
                    }
                ]
            },
            {
                code: `
      interface a {
        a: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The interface type `a` should start with a capital letter.'
                    }
                ]
            }
        ]
    });
});
