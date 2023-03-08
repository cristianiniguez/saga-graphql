import { GetStaticProps, NextPage } from 'next'
import client from '@gql/client'
import { GetAllAvocadosDocument, AvocadoFragment } from '@gql/generated/graphql'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'

type HomePageProps = {
  products: AvocadoFragment[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const response = await client.query({
      query: GetAllAvocadosDocument,
      fetchPolicy: 'network-only',
    })

    return {
      props: {
        products: response.data.avos as AvocadoFragment[],
      },
      revalidate: 10, // secs
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        products: [],
      },
    }
  }
}

const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <Layout title="Home">
      <KawaiiHeader />
      <ProductList products={products} />
    </Layout>
  )
}

export default HomePage
