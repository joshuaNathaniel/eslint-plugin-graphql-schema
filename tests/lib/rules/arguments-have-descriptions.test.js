import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/arguments-have-descriptions';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('arguments-have-descriptions', () => {
    ruleTester.run('arguments-have-descriptions', rule, {
        valid: [
            {
                // gets descriptions correctly with commentDescriptions option
                code: `
      type Box {
        widget(
          # Widget ID
          id: Int
          "Widget type"
          type: String
        ): String!
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
                // catches field arguments that have no description
                code: `
      type Box {
        widget(
          id: Int
          "Widget type"
          type: String
        ): String!
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The `id` argument of `widget` is missing a description.'
                    }
                ]
            },
            {
                // catches field arguments that have empty description
                code: `
      type Box {
        widget(
          ""
          id: Int
          "Widget type"
          type: String
        ): String!
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The `id` argument of `widget` is missing a description.'
                    }
                ]
            }
        ]
    });
});
