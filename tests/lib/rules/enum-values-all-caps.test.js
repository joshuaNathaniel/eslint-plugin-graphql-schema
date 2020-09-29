import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/enum-values-all-caps';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('enum-values-all-caps', () => {
    ruleTester.run('enum-values-all-caps', rule, {
        valid: [
            {
                code: `
      enum Stage {
        FOO
        FOO_BAR
        FOO_BAR_1
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      enum Stage {
        aaa
        bbb_bbb
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The enum value `Stage.aaa` should be uppercase.'
                    },
                    {
                        message: 'The enum value `Stage.bbb_bbb` should be uppercase.'
                    },
                ]
            },
        ]
    });
});
