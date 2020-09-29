import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/input-object-values-are-camel-cased';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('input-object-values-are-camel-cased', () => {
    ruleTester.run('input-object-values-are-camel-cased', rule, {
        valid: [
            {
                code: `
      input User {
        userID: String
        withDescription: String
      }
    `,
                parser
            },
        ],
        invalid: [
            {
                code: `
      input User {
        user_name: String
        userID: String
        withDescription: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The input value `User.user_name` is not camel cased.'

                    }
                ]
            },
            {
                code: `
      type A {
        hello(argument_without_description: String): String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The input value `hello.argument_without_description` is not camel cased.'

                    }
                ]
            },
        ]
    });
});
