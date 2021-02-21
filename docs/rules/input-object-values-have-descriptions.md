# Input object values have descriptions
#### `graphql-schema/input-object-values-have-descriptions`

## Rule details

Validates that input object values have a description.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/input-object-values-have-descriptions": ["warn", {"commentDescriptions": false}]
      }
    }
  ]
}
```

## Examples

### valid `commentDescriptions: false`
```graphql
input F {
  "F"
  f: String
}
```

### valid `commentDescriptions: true`
```graphql
input F {
  # F
  f: String
  "G"
  g: String
}
```

### invalid
```graphql
input F {
  f: String
}
```
