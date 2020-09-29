import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/type-fields-sorted-alphabetically';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('type-fields-sorted-alphabetically', () => {
    ruleTester.run('type-fields-sorted-alphabetically', rule, {
        valid: [
            {
                code: `
      type Stage {
        bar: String
        foo: String
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      type Stage {
        foo: String
        bar: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The fields of object type `Stage` should be sorted alphabetically. Expected sorting: bar, foo'

                    }
                ]
            },
        ]
    });
});
