# eslint-plugin-graphql-schema

An ESLint plugin to validate GraphQL schema definitions against a set of rules.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-graphql-schema`:

```
$ npm install eslint-plugin-graphql-schema --save-dev
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

### Adding Config
```json
{
    "extends": [
        "plugin:graphql-schema/recommended"
   ]
}
```

### Overriding and settings rules
Configure the rules you want to use under the rules section.

```json
{
    "overrides":[
        {
            "files": ["*schema.graphql", "*schema.gql"],
            "parser": "eslint-plugin-graphql-schema/parser",
            "rules": {
               "graphql-schema/arguments-have-descriptions": ["off", {"commentDescriptions": false}],
               "graphql-schema/fields-have-descriptions": ["warning", {"commentDescriptions": false}],
               "graphql-schema/types-have-descriptions": ["off", {"commentDescriptions": false}],
               "graphql-schema/fields-have-trailing-commas": ["error", "never"]
            }
        }
    ]
}
```
