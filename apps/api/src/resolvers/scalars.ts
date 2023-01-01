import { GraphQLScalarType, Kind } from 'graphql'

export const DateTime = new GraphQLScalarType<Date | null, string>({
  name: 'DateTime',
  description: 'Represents a date time object',
  serialize: (value) => (value instanceof Date ? value.toISOString() : ''), // Convert outgoing Date to ISOString for JSON
  parseValue: (value) => (typeof value === 'string' ? new Date(value) : null), // Convert incoming integer to Date
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.INT) return null // Invalid hard-coded value (not an integer)
    return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to Date
  },
})
