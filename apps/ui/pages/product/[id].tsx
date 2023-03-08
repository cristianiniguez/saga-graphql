import { FC } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import client from '@gql/client'
import {
  AvocadoFragment,
  GetAllAvocadosDocument,
  GetAvocadoDocument,
} from '@gql/generated/graphql'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

type ProductPageProps = {
  product: AvocadoFragment
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.query({ query: GetAllAvocadosDocument })
  const data = response.data.avos as AvocadoFragment[]

  const paths = data.map((avo, index) => {
    if (avo === null)
      throw new Error(
        `An avocado entry with no data was found at index ${index}`
      )
    return { params: { id: avo.id } }
  })

  return { paths, fallback: 'blocking' }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await client.query({
    query: GetAvocadoDocument,
    variables: { avoId: params?.id as string },
  })
  const product = response.data.avo

  // Pass post data to the page via props
  return { props: { product } }
}

const ProductPage: FC<ProductPageProps> = ({ product }) => {
  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
