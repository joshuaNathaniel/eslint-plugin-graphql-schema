import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/descriptions-are-capitalized';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('descriptions-are-capitalized', () => {
    ruleTester.run('descriptions-are-capitalized', rule, {
        valid: [
            {
                //does not err on an empty description
                code: `
      type Widget {
        ""
        name: String!
      }
    `,
                parser
            },
            {
                // Does not error on missing description
                code: `
      type Widget {
        name: String!
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      type Widget {
        "widget name"
        name: String!
        "Valid description"
        other: Int
      }
   `,
                parser,
                options: [{
                    commentDescriptions: true
                }],
                errors: [
                    {
                        message: 'The description for field `Widget.name` should be capitalized.'
                    }
                ]
            },
            {
                code: `
      type Widget {
        # widget name
        name: String!
        # Valid description
        other: Int
      }
    `,
                parser,
                options: [{
                    commentDescriptions: true
                }],
                errors: [
                    {
                        message: 'The description for field `Widget.name` should be capitalized.'
                    }
                ]
            }
        ]
    });
});
