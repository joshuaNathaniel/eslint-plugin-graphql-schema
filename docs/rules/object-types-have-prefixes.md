# Types have descriptions

##### `graphql-schema/object-types-have-prefixes`

## Rule details

Validates that object types have given prefixes. Used for faux-namespacing to avoid collisions in
federated deploys.

## Default configuration

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/object-types-have-prefixes": ["error", {"prefixes": ["Org"]}]
            }
        }
    ]
}
```

## Examples

### valid `prefixes: ["Org", "Team"]`
```graphql
type TeamChart {
  id: String
}

type OrgChart {
  id: String
}

type Team {
  id: String
}

type Org {
  id: String
}
```

### invalid `prefixes: ["Org", "Team"]`
```graphql
type Chart {
  id: String
}
```

