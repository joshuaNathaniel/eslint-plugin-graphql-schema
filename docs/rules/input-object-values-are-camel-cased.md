# Input object values are camel cased
#### `graphql-schema/input-object-values-are-camel-cased`

## Rule details

Validates  that input object value names are camel cased.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/input-object-values-are-camel-cased": ["warn"]
      }
    }
  ]
}
```

## Examples

### valid
```graphql
input User {
  UserID: String
  withDescription: String
}
```

### invalid
```graphql
input User {
  user_id: String
  withdescription: String
}
```
