import { Segment, Header, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { removeToken } from '@service/auth'
import type { User } from '@service/auth'
import { AddAvocadoDocument } from '@gql/generated/graphql'

import Layout from '@components/Layout/Layout'

function Profile({ user }: { user: User }) {
  const [addAvocado, { data, loading }] = useMutation(AddAvocadoDocument)
  console.log({ data, loading })

  const createAvo = () => {
    addAvocado({
      variables: {
        data: {
          name: 'Zutano Avocado',
          sku: 'MW79JD6Y',
          price: 1.23,
          image: '/images/zutano.jpg',
          description:
            'The Zutano avocado is a cold hardy, consistent producing avocado variety. ...',
          shape: 'Pear',
          hardiness: '-5 ªC',
          taste: 'Splendid, is an avocado',
        },
      },
    })
  }

  const logout = async () => {
    await removeToken()
    window.location.reload()
  }

  return (
    <Layout title="Hola">
      <div className="mt-14" />
      <Header as="h2" size="huge" className="">
        Hola, {user.username}
      </Header>
      <Segment>
        <p>
          Si estás viendo esto es porque has iniciado sesión de forma correcta.
        </p>
        <Button type="button" positive onClick={createAvo}>
          Agregar nuevo avocado...
        </Button>{' '}
        <Button type="button" basic color="red" onClick={logout}>
          Logout
        </Button>
      </Segment>
      <div className="mb-20" />
    </Layout>
  )
}

export default Profile
