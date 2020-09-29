import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/deprecations-have-a-reason';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('deprecations-have-a-reason', () => {
    ruleTester.run('deprecations-have-a-reason', rule, {
        valid: [
            {
                code: `
      type A {
        deprecatedWithReason: String @deprecated(reason: "Reason")
        notDeprecated: String
      }
    `,
                parser
            },
            {
                code: `
      interface A {
        deprecatedWithReason: String @deprecated(reason: "Reason")
        notDeprecated: String
      }
    `,
                parser
            },
            {
                code: `
      enum A {
        deprecatedWithReason @deprecated(reason: "Reason")
        notDeprecated
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      type A {
        deprecatedWithoutReason: String @deprecated
        deprecatedWithReason: String @deprecated(reason: "Reason")
        notDeprecated: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The field `A.deprecatedWithoutReason` is deprecated but has no deprecation reason.'
                    }
                ]
            },
            {
                code: `
      interface A {
        deprecatedWithoutReason: String @deprecated
        deprecatedWithReason: String @deprecated(reason: "Reason")
        notDeprecated: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The field `A.deprecatedWithoutReason` is deprecated but has no deprecation reason.'
                    }
                ]
            },
            {
                code: `
      enum A {
        deprecatedWithoutReason @deprecated
        deprecatedWithReason @deprecated(reason: "Reason")
        notDeprecated
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The enum value `A.deprecatedWithoutReason` is deprecated but has no deprecation reason.'
                    }
                ]
            },
        ]
    });
});
