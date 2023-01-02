import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'
import path from 'path'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const context: ResolverContext = { orm: new PrismaClient() }

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen().then(({ url }) => console.log(`Server listening on ${url}`))
