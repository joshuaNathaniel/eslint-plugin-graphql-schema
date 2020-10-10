# eslint-plugin-graphql-schema

An ESLint plugin to validate GraphQL schema definitions against a set of rules.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-graphql-schema`:

```
npm install eslint-plugin-graphql-schema --save-dev
```

To use you must include the `graphql` or `gql` extensions  
```
eslint --ext .graphql
```
### Plugging it in

Add `graphql-schema` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "graphql-schema"
    ]
}
```

### Overriding and settings rules
Configure the rules you want to use under the rules section. *We do recommend that you only use file
patterns that include `*Schema*` and/or `*schema*` as this is the pattern found in [Shared Configurations](#shared-configurations).*

```json
{
    "overrides":[
        {
            "files": ["*schema*.graphql", "*Schema*.graphql", "*schema*.gql", "*Schema*.gql"],
            "parser": "eslint-plugin-graphql-schema/parser",
            "rules": {
               "graphql-schema/arguments-have-descriptions": ["off", {"commentDescriptions": false}],
               "graphql-schema/type-fields-have-descriptions": ["warn", {"commentDescriptions": false}],
               "graphql-schema/types-have-descriptions": ["off", {"commentDescriptions": false}],
               "graphql-schema/type-fields-have-trailing-commas": ["error", "never"]
            }
        }
    ]
}
```

## Rules

* [graphql-schema/arguments-have-descriptions](docs/rules/arguments-have-descriptions.md): Validates that all field arguments have a description.
* [graphql-schema/defined-types-are-used](docs/rules/defined-types-are-used.md): Validates that all defined types are in use at least once in the schema.
* [graphql-schema/deprecations-have-a-reason](docs/rules/deprecations-have-a-reason.md): Validates that all deprecations have a reason.
* [graphql-schema/descriptions-are-capitalized](docs/rules/descriptions-are-capitalized.md): Validates that all field arguments have a description.
* [graphql-schema/enum-values-all-caps](docs/rules/enum-values-all-caps.md): Validates that all enum values are capitalized.
* [graphql-schema/enum-values-have-descriptions](docs/rules/enum-values-have-descriptions.md): Validates that all enum values have a description. 
* [graphql-schema/enum-values-sorted-alphabetically](docs/rules/enum-values-sorted-alphabetically.md): Validates that all enum values sorted alphabetically.
* [graphql-schema/input-object-fields-have-trailing-commas](docs/rules/input-object-fields-have-trailing-commas.md): Validates that input object fields have trailing commas.
* [graphql-schema/input-object-fields-sorted-alphabetically](docs/rules/input-object-fields-sorted-alphabetically.md): Validates that all input object fields sorted alphabetically. 
* [graphql-schema/input-object-values-are-camel-cased](docs/rules/input-object-values-are-camel-cased.md): Validates  that input object value names are camel cased.
* [graphql-schema/input-object-values-have-descriptions](docs/rules/input-object-values-have-descriptions.md): Validates that input object values have a description.
* [graphql-schema/type-fields-are-camel-cased](docs/rules/type-fields-are-camel-cased.md): Validates that object type field and interface type field names are camel cased.
* [graphql-schema/type-fields-have-descriptions](docs/rules/type-fields-have-descriptions.md): Validates that object type fields and interface type fields have a description.
* [graphql-schema/type-fields-have-trailing-commas](docs/rules/type-fields-have-trailing-commas.md): Validates that object type fields and interface type fields have trailing commas.
* [graphql-schema/type-fields-sorted-alphabetically](docs/rules/type-fields-sorted-alphabetically.md): Validates  that all type object fields sorted alphabetically.
* [graphql-schema/types-are-capitalized](docs/rules/types-are-capitalized.md): Validates that interface types and object types have capitalized names.
* [graphql-schema/types-have-descriptions](docs/rules/types-have-descriptions.md): Validates that interface types, object types, union types, scalar types, enum types and input types have descriptions.

## Shared Configurations

#### Recommended

This is a good mix of warnings and errors.

```json
{
    "extends": [
        "plugin:graphql-schema/recommended"
   ]
}
```

#### Mom

This is all about explaining yourself and giving everything a description. Don't worry!
It's only a stern warning.

```json
{
    "extends": [
        "plugin:graphql-schema/mom"
   ]
}
```

#### Hero

All rules get enabled and stand ready to error. Be the hero your team deserves!

```json
{
    "extends": [
        "plugin:graphql-schema/hero"
   ]
}
```

## Contributing
 * See [Contributing](CONTRIBUTING.md)
                                                                                 
## Credit                                                                                 
 * [graphql-schema-linter](https://github.com/cjoudrey/graphql-schema-linter): A lot of rules are from this repo and converted for use in eslint. If you do not wish to add another eslint-plugin then try this.
 * [@apollographql/eslint-plugin-graphql](https://github.com/apollographql/eslint-plugin-graphql): Great eslint-plugin if you already have schema. Highly recommended.

## License
eslint-plugin-graphql-schema is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

