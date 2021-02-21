# Types are capitalized
#### `graphql-schema/types-are-capitalized`

## Rule details

Validates that interface types and object types have capitalized names.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/types-are-capitalized": ["warn"]
      }
    }
  ]
}
```

## Examples

### valid
```graphql
type A {
  id: String
}
```

### invalid
```graphql
type a {
  id: String
}
```
