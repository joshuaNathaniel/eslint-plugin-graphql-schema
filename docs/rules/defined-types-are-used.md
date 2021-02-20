# Defined types used
#### `graphql-schema/defined-types-are-used`

## Rule details

Validates that all defined types are in use at least once in the schema.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/defined-types-are-used": ["warn"]
            }
        }
    ]
}
```

## Examples

### valid
```graphql
type A {
  a: String
}

extend type Query {
  a: A
}
```

### invalid
```graphql
type A {
  a: String
}

extend type Query {
  a: String
}
```
