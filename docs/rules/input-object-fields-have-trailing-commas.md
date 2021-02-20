# Input object fields have trailing commas
#### `graphql-schema/input-object-fields-have-trailing-commas`

## Rule details

Validates that input object fields have trailing commas.

## Default configuration

### Always

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/input-object-fields-have-trailing-commas": ["error", "always"]
            }
        }
    ]
}
```

### Multiline

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/input-object-fields-have-trailing-commas": ["error", "multiline"]
            }
        }
    ]
}
```

### Never

```json
{
    "overrides":[
        {
            "rules": {
               "graphql-schema/input-object-fields-have-trailing-commas": ["error", "never"]
            }
        }
    ]
}
```

## Examples

### valid `always`

```graphql
input TrailingComma {
  withDescription: String,
  withCommentDescription: String,
}
```

### invalid `always`

```graphql
input TrailingComma {
  withComma: String,
  withoutComma: String
}
```

### valid `multiline`

```graphql
input TrailingComma {
  withDescription: String,
  withCommentDescription: String
}
```

### invalid `multiline`

```graphql
input TrailingComma {
  withoutComma: String
  withCommaEnd: String,
}
```

### valid `never`

```graphql
input TrailingComma {
  withDescription: String
  withCommentDescription: String
}
```

### invalid `never`

```graphql
input TrailingComma {
  withComma: String,
  withoutComma: String
}
```
