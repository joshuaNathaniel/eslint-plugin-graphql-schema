# Enum values have descriptions
#### `graphql-schema/enum-values-have-descriptions`

## Rule details

Validates that all enum values have a description. 

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/enum-values-have-descriptions": ["warn", {"commentDescriptions": false}]
            }
        }
    ]
}
```

## Examples

### valid `commentDescriptions: false`
```graphql
enum Status {
  "Hidden"
  HIDDEN
}
```

### valid `commentDescriptions: true`
```graphql
enum Status {
  "Hidden"
  HIDDEN
  # Published
  PUBLISHED
  ""
  DRAFT
}
```

### invalid
```graphql
enum Status {
  HIDDEN
}
```

