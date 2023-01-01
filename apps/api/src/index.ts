import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import path from 'path'
import resolvers from './resolvers'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server listening on ${url}`))
