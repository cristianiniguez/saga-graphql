import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '@gql/client'
import CartProvider from '@store/Cart'
import 'semantic-ui-css/semantic.min.css'
import '../globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  )
}

export default MyApp
