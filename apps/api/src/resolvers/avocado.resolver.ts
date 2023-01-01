import { createHash } from 'crypto'
import { baseModelResolver } from './base.resolver'

const avos: Avocado[] = [
  {
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
    name: 'Pinkerton Avocado',
    id: 'fpr72m9k',
    sku: 'B4HZ42TM',
    price: 1.27,
    image: '/images/pinkerton.jpg',
    attributes: {
      description: 'First grown on the Pinkerton Ranch in Saticoy, California.',
      shape: 'Long pear',
      hardiness: '-1 ºC',
      taste: 'Marvelous, is an avocado',
    },
  },
]

export const findAll = (): Avocado[] => avos

export const findOne = (id: string): Avocado | null => avos[0]

export const resolver: Record<keyof Avocado, (parent: Avocado) => unknown> = {
  ...baseModelResolver,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

export const create = (
  parent: unknown,
  {
    data,
  }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Avocado['attributes'] }
): Avocado => {
  const currentLength = avos.length
  const { name, price, image, description, shape, hardiness, taste } = data

  const newAvo: Avocado = {
    id: String(currentLength + 1),
    sku: createHash('sha256')
      .update(data.name, 'utf8')
      .digest('base64')
      .slice(-6),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    name,
    price,
    image,
    attributes: { description, shape, hardiness, taste },
  }

  avos.push(newAvo)
  return newAvo
}
