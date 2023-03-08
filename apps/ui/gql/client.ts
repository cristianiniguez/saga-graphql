import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { retrieveToken } from '@service/auth'

const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4000'
const uri = `${baseUrl}/graphql`

const apiLink = createHttpLink({ uri })

const authLink = setContext(async (_, { headers }) => {
  const additionalHeaders: Record<string, string> = {}

  if (typeof window !== 'undefined') {
    const token = await retrieveToken()
    additionalHeaders.Authorization = `Bearer ${token}`
  }

  return {
    headers: {
      ...headers,
      ...additionalHeaders,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(apiLink),
  cache: new InMemoryCache(),
})

export default client
