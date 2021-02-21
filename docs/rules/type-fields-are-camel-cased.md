# Type fields are camel cased
#### `graphql-schema/type-fields-are-camel-cased`

## Rule details

Validates that object type field and interface type field names are camel cased.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/type-fields-are-camel-cased": ["warn"]
      }
    }
  ]
}
```

## Examples

### valid
```graphql
type User {
  UserID: String
  withDescription: String
}
```

### invalid
```graphql
type User {
    user_id: String
    withdescription: String
}
```
