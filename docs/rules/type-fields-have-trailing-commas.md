# Type fields have trailing commas
#### `graphql-schema/type-fields-have-trailing-commas`

## Rule details

Validates that object type fields and interface type fields have trailing commas.

## Default configuration
```json
{
  "overrides":[
    {
      "rules": {
        "graphql-schema/type-fields-have-trailing-commas": ["error", "never"]
      }
    }
  ]
}
```

## Examples

### valid `always`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID,
  before: String!,
  after: String!,
}

extend type Query {
  comma(couponId: ID!, filter: String): TrailingComma,
}
```

### invalid `always`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID,
  before: String!,
  after: String!
}
```

### valid `multiline`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID,
  before: String!,
  after: String!
}

extend type Query {
  comma(couponId: ID!, filter: String): TrailingComma
}
```

### invalid `multiline`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID,
  before: String!,
  after: String!,
}
```

### valid `never`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID
  before: String!
  after: String!
}

extend type Query {
  comma(couponId: ID!, filter: String): TrailingComma
}
```

### invalid `never`

```graphql
type TrailingComma @key(fields: "commaId") {
  commaId: ID,
  before: String!,
  after: String!
}
```
