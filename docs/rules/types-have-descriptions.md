# Types have descriptions
#### `graphql-schema/types-have-descriptions`

## Rule details

Validates that interface types, object types, union types, scalar types, enum types and input types have descriptions.

## Default configuration
```json 
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/types-have-descriptions": ["warn", {"commentDescriptions": false}]
      }
    }
  ]
}
```

## Examples

### valid `commentDescriptions: false`
```graphql
"F"
type F {
  f: String
}
```

### valid `commentDescriptions: true`
```graphql
# F
type F {
  f: String
}
"G"
type G {
    g: String
}
```

### invalid
```graphql
type F {
  f: String
}
```
