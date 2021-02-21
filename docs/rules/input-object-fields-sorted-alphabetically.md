# Input object fields sorted alphabetically
#### `graphql-schema/input-object-fields-sorted-alphabetically`

## Rule details

Validates that all input object fields sorted alphabetically. 

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/input-object-fields-sorted-alphabetically": ["warn"]
      }
    }
  ]
}
```

## Examples

### valid
```graphql
input Stage {
  bar: String
  foo: String
}
```

### invalid
```graphql
input Stage {
  foo: String
  bar: String
}
```
