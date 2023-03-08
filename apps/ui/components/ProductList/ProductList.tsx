import React from 'react'
import { Card } from 'semantic-ui-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avocado } from '@gql/generated/graphql'
import { getImgUrl } from '@service/assets'

type ProductListProps = {
  products: Avocado[]
}

const mapProductsToCards = (products: Avocado[]) =>
  products.map(({ name, id, price, image }) => (
    <Link key={id} href={`/product/${id}`}>
      <Card
        header={name}
        image={
          <Image src={getImgUrl(image)} width={333} height={333} alt={name} />
        }
        meta={<Card.Meta style={{ color: 'dimgray' }}>{price}</Card.Meta>}
      />
    </Link>
  ))

const ProductList = ({ products }: ProductListProps) => (
  <Card.Group itemsPerRow={2} stackable>
    {mapProductsToCards(products)}
  </Card.Group>
)

export default ProductList
