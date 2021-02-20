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
