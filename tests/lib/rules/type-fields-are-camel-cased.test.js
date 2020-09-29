import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/type-fields-are-camel-cased';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('type-fields-are-camel-cased', () => {
    ruleTester.run('type-fields-are-camel-cased', rule, {
        valid: [
            {
                code: `
      type A {
        thisIsValid: String
        thisIDIsValid: String
      }
      interface Something {
        thisIsValid: String
        thisIDIsValid: String
      }
    `,
                parser
            },
        ],
        invalid: [
            {
                code: `
      type A {
        invalid_name: String
        thisIsValid: String
        thisIDIsValid: String
        ThisIsInvalid: String
      }
      interface Something {
        invalid_name: String
        thisIsValid: String
        thisIDIsValid: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The field `A.invalid_name` is not camel cased.'
                    },
                    {
                        message: 'The field `A.ThisIsInvalid` is not camel cased.'
                    },
                    {
                        message: 'The field `Something.invalid_name` is not camel cased.'
                    }
                ]
            },
        ]
    });
});
