import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/type-fields-have-descriptions';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('type-fields-have-descriptions', () => {
    ruleTester.run('type-fields-have-descriptions', rule, {
        valid: [
            {
                // gets descriptions correctly with commentDescriptions option
                code:       `
      type A {
        "Description"
        withDescription: String
        # Comment Description
        withCommentDescription: String
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
                // catches fields that have no description
                code:       `
      type A {
        withoutDescription: String
        withoutDescriptionAgain: String!
        "Description"
        withDescription: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The field `A.withoutDescription` is missing a description.'
                    },
                    {
                        message: 'The field `A.withoutDescriptionAgain` is missing a description.'
                    }
                ]
            }
        ]
    });

});
