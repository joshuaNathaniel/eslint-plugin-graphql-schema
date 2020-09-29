import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/enum-values-sorted-alphabetically';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('enum-values-sorted-alphabetically', () => {
    ruleTester.run('enum-values-sorted-alphabetically', rule, {
        valid: [
            {
                code: `
      enum Stage {
        AAA
        ZZZ
      }
    `,
                parser
            },
        ],
        invalid: [
            {
                code: `
      enum Stage {
        ZZZ
        AAA
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The enum `Stage` should be sorted alphabetically. Expected sorting: AAA, ZZZ'
                    }
                ]
            },
        ]
    });
});
