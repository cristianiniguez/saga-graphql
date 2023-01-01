import { ApolloServer } from 'apollo-server'

const typeDefs = `
  type Query {
    info: String!
  }
`

const resolvers = {
  Query: {
    info: () => 'This is the API',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server listening on ${url}`))
