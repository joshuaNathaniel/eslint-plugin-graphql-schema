import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/object-types-have-prefixes.js';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('object-types-have-prefixes', () => {
    ruleTester.run('object-types-have-prefixes', rule, {
        valid: [
            {
                // ignores missing prefixes option
                code: `
      type A {
        b: String
      }
    `,
                parser
            },
            {
                // matches prefixes
                code: `
      type AbcD {
        a: String
      }
      type ZyxW {
        a: String
      }
    `,
                parser,
                options: [{
                    prefixes: ['Abc', 'Zyx']
                }]
            }
        ],
        invalid: [
            {
                code: `
      type B {
        a: String
      }
      type YX {
        z: String
      }
    `,
                parser,
                options: [{
                  prefixes: ['A', 'X']
                }],
                errors: [
                    {
                        message: 'The object type `B` is not prefixed.'
                    },
                    {
                      message: 'The object type `YX` is not prefixed.'
                    }
                ]
            }
        ]
    });

});
