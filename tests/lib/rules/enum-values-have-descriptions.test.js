import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/enum-values-have-descriptions';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('enum-values-have-descriptions', () => {
    ruleTester.run('enum-values-have-descriptions', rule, {
        valid: [
            {
                code:`
      enum Status {
        # Hidden
        HIDDEN
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
      enum Status {
        DRAFT
        "Hidden"
        HIDDEN
        PUBLISHED
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The enum value `Status.DRAFT` is missing a description.'
                    },
                    {
                        message:
                            'The enum value `Status.PUBLISHED` is missing a description.'
                    }
                ]
            },
        ]
    });
});
