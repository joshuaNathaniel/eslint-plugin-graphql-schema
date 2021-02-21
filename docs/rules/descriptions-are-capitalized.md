# Descriptions are capitalized
#### `graphql-schema/descriptions-are-capitalized`

## Rule details

Validates that all field arguments have a description.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/descriptions-are-capitalized": ["warn", {"commentDescriptions": true}]
            }
        }
    ]
}
```

## Examples

### valid `commentDescriptions: false`
```graphql
type A {
  ""
  name: String!
}

type B {
  name: String!
}
```

### valid `commentDescriptions: true`
```graphql
type A {
  "Name"
  name: String!
}
```

### invalid
```graphql
type A {
  "name"
  name: String!
}
```
