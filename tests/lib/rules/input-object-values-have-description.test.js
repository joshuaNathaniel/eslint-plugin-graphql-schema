import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/input-object-values-have-description';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('input-object-values-have-description', () => {
    ruleTester.run('input-object-values-have-description', rule, {
        valid: [
          {
                code: `
       type A {
         hello(argumentWithoutDescription: String): String
       }
    `,
                parser
        },
        {
                code: `
      input F {
        # F
        f: String
      }
    `,
                parser,
                options: [{
                    commentDescriptions: true
                }]
            },
        ],
        invalid: [
            {
                code: `
      input User {
        username: String
        "Description"
        withDescription: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The input value `User.username` is missing a description.'
                    }
                ]
            }
        ]
    });
});
