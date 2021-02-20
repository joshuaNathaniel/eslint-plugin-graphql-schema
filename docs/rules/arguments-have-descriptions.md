# Arguments have descriptions
#### `graphql-schema/arguments-have-descriptions`

## Rule details

Validates that all field arguments have a description.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/arguments-have-descriptions": ["warn", {"commentDescriptions": false}]
            }
        }
    ]
}
```

## Examples

### valid `comentDescriptions: true`
```graphql
type Box {
  widget(
    # Widget ID
    id: Int
    "Widget type"
    type: String
  ): String!
}
```
### invalid `commentDescriptions: true`
```graphql
type Box {
  widget(
    id: Int
    type: String
  ): String!
}
```

### valid `comentDescriptions: false`
```graphql
type Box {
  widget(
    # Widget ID
    id: Int
    type: String
  ): String!
}
```

### invalid `commentDescriptions: false`
```graphql
type Box {
  widget(
    "Widget ID"
    id: Int
    type: String
  ): String!
}
```
