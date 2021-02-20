# Deprecations have a reason
#### `graphql-schema/deprecations-have-a-reason`

## Rule details

Validates that all deprecations have a reason.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/deprecations-have-a-reason": ["warn"]
            }
        }
    ]
}
```

## Examples

### valid
```graphql
type A {
  deprecatedWithReason: String @deprecated(reason: "Reason")
}
```

### invalid
```graphql
type A {
  deprecatedWithoutReason: String @deprecated
}
```
