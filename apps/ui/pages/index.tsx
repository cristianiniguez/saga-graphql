import { GetStaticProps, NextPage } from 'next'
import client from '@gql/client'
import { GetAllAvosDocument, Avocado } from '@gql/generated/graphql'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'

type HomePageProps = {
  products: Avocado[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const response = await client.query({ query: GetAllAvosDocument })

    const products: Avocado[] = []
    response.data.avos.forEach((avo) => avo && products.push(avo))

    return {
      props: {
        products,
      },
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

const documentationList = [
  {
    title: 'Documentación Proyecto',
    meta: 'Proyecto',
    description:
      '¿Tienes dudas sobre este proyecto? Aquí encuentras la documentación para configurar todo. Aségurate de leerlo.',
    link: 'https://github.com/jonalvarezz/platzi-graphql-fullstack',
  },
  {
    title: 'Documentación Next.js',
    meta: 'Documentación',
    description:
      'Aquí encuentras la documentación sobre el framework base con el que realizaremos todo.',
    link: 'https://nextjs.org/docs/getting-started',
  },
  {
    title: 'Documentación GraphQL',
    meta: 'Documentación',
    description:
      'Nuestra aplicación conecta a Contenful para leer todo el contenido que mostraremos. Contenful provee la capa de GraphQL.',
    link: 'https://graphql.org/learn/',
  },
  {
    title: 'Curso de GraphQL con Node.js',
    meta: 'Proyecto',
    description:
      'Revisa el curso en donde creamos todo el backend y la API para este proyecto.',
    link: 'https://platzi.com/cursos/graphql-nodejs/',
  },
]

export default HomePage
