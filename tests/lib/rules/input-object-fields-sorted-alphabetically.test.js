import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/input-object-fields-sorted-alphabetically';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('input-object-fields-sorted-alphabetically', () => {
    ruleTester.run('input-object-fields-sorted-alphabetically', rule, {
        valid: [
            {
                code: `
      input Stage {
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
      input Stage {
        foo: String
        bar: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The fields of input type `Stage` should be sorted alphabetically. Expected sorting: bar, foo',

                    }
                ]
            },
        ]
    });
});
