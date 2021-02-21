# Type fields sorted alphabetically
#### `graphql-schema/type-fields-sorted-alphabetically`

## Rule details

Validates  that all type object fields sorted alphabetically.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/type-fields-sorted-alphabetically": ["warn"]
      }
    }
  ]
}
```

## Examples

### valid
```graphql
type Stage {
  bar: String
  foo: String
}
```

### invalid
```graphql
type Stage {
  foo: String
  bar: String
}
```
