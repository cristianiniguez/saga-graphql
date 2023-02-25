import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import { readFileSync } from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import resolvers from './resolvers'
import app from './server'

const typeDefs = readFileSync(path.join(__dirname, '../schema.graphql'), 'utf8')
const orm = new PrismaClient()

const startServer = async () => {
  // Required logic to integrate with Express
  const httpServer = http.createServer(app)

  // Same ApolloServer initialization as before, plus the drain plugin
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ orm, user: req.user }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // More required logic for integrating with Express
  await server.start()

  server.applyMiddleware({
    app,

    /**
     * By default, apollo-server hosts its GraphQL endpoint at the
     * server pot. However, *other* Apollo Server packages host it at
     * /graphql. Optionally provide this to match apollo-server
     */
    path: '/graphql',
  })

  // Modified server startup
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve)
  })

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer()
