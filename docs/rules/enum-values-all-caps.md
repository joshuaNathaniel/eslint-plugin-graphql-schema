# Enum values are all capitalized
#### `graphql-schema/enum-values-all-caps`

## Rule details

Validates that all enum values are capitalized.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/enum-values-all-caps": ["warn"]
            }
        }
    ]
}
```

## Examples

### valid
```graphql
enum Stage {
  FOO
  FOO_BAR
  FOO_BAR_1
}
```

### invalid
```graphql
enum Stage {
  foo  
  foo_bar
}
```
