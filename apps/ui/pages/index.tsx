import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout/Layout'
import { Card } from 'semantic-ui-react'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'

const query = `
  query {
    avos {
      id
      image
      name
      createdAt
      sku
      attributes {
        description
        taste
        shape
        hardiness
      }
    }
  }
`

const getAvos = () =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

const useAvos = () => {
  const [data, setData] = useState<TProduct[]>([])
  const [status, setStatus] = useState<RequestStatus>('idle')

  const fetchItems = async () => {
    setStatus('loading')

    try {
      const response = await getAvos()
      const { data } = (await response.json()) as { data: { avos: TProduct[] } }
      setData(data.avos)
      setStatus('success')
    } catch (e) {
      setStatus('error')
      console.log('Something went wrong', e)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return { data, status }
}

const HomePage = () => {
  const { data, status } = useAvos()

  console.log({ data, status })

  return (
    <Layout title="Home">
      <KawaiiHeader />
      <Card.Group itemsPerRow={2} centered>
        {documentationList.map((doc) => (
          <Card
            key={doc.link}
            href={doc.link}
            header={doc.title}
            meta={doc.meta}
            description={doc.description}
          />
        ))}
      </Card.Group>
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
