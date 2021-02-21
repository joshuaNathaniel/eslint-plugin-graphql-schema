# Type fields have descriptions
#### `graphql-schema/type-fields-have-descriptions`

## Rule details

Validates that object type fields and interface type fields have a description.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/type-fields-have-descriptions": ["warn", {"commentDescriptions": false}]
      }
    }
  ]
}
```

## Examples

### valid `commentDescriptions: false`
```graphql
type F {
  "F"
  f: String
}
```

### valid `commentDescriptions: true`
```graphql
type F {
  # F
  f: String
  "G"
  g: String
}
```

### invalid
```graphql
type F {
  f: String
}
```
