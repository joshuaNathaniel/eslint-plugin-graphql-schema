import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/types-have-descriptions';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('types-have-descriptions', () => {
    ruleTester.run('types-have-descriptions', rule, {
        valid: [
            {
                // ignores type extensions
                code: `
      extend type Query {
        b: String
      }
      "Interface"
      interface Vehicle {
        make: String!
      }
      extend interface Vehicle {
        something: String!
      }
    `,
                parser
            },
            {
                // gets descriptions correctly with commentDescriptions option
                code: `
      # A
      scalar A
      # B
      type B {
        b: String
      }
      # C
      interface C {
        c: String
      }
      # D
      union D = B
      # E
      enum E {
        A
      }
      # F
      input F {
        f: String
      }
    `,
                parser,
                options: [{
                    commentDescriptions: true
                }]
            }
        ],
        invalid: [
            {
                code: `
      "A"
      enum A {
        A
      }
      enum STATUS {
        DRAFT
        PUBLISHED
        HIDDEN
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The enum type `STATUS` is missing a description.'
                    }
                ]
            }
        ]
    });

});
