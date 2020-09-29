import {RuleTester} from 'eslint';
import * as rule from '../../../lib/rules/defined-types-are-used';
import {parser} from '../../../lib/utils/parser'

const ruleTester = new RuleTester();

describe('defined-types-are-used', () => {
    ruleTester.run('defined-types-are-used', rule, {
        valid: [
            {
                code: `
      extend type Query {
        b: B
      }
      type A {
        a: String
      }
      union B = A | Query
    `,
                parser
            },
            {
                code: `
      extend type Query {
        c: Node
      }
      interface Node {
        id: ID!
      }
      type A implements Node {
        id: ID!
      }
    `,
                parser
            },
            {
                code: `
      extend type Query {
        B: B
      }
      type B {
        id: ID!
      }
    `,
                parser
            },
            {
                code: `
      extend type Query {
        b(date: Date): String
        c(c: C): String
      }
      scalar Date
      input C {
        c: String
      }
    `,
                parser
            },
            {
                code: `
      type Mutation {
        a: String
      }
    `,
                parser
            },
            {
                code: `
      type Subscription {
        a: String
      }
    `,
                parser
            },
            {
                code: `
      extend type Query {
        c: String
      }
    `,
                parser
            }
        ],
        invalid: [
            {
                code: `
      type A {
        a: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
            {
                code: `
      type A {
        a: String
      }
      extend type A {
        b: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
            {
                code: `
      interface A {
        a: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
            {
                code: `
      scalar A
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
            {
                code: `
      input A {
        a: String
      }
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
            {
                code: `
      union A = Query
    `,
                parser,
                errors: [
                    {
                        message: 'The type `A` is defined in the schema but not used anywhere.'
                    }
                ]
            },
        ]
    });
});
