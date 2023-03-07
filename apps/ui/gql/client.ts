import { ApolloClient, InMemoryCache } from '@apollo/client'

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'

const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache(),
})

export default client
