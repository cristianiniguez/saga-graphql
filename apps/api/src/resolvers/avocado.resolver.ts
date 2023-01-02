import { Attributes, Avocado } from '@prisma/client'
import { GraphQLFieldResolver } from 'graphql'
import { createHash } from 'crypto'

export const findAll: GraphQLFieldResolver<
  unknown,
  ResolverContext,
  unknown,
  Promise<(Avocado & { attributes: Attributes | null })[]>
> = (parent, args, context) =>
  context.orm.avocado.findMany({ include: { attributes: true } })

export const findOne: GraphQLFieldResolver<
  unknown,
  ResolverContext,
  { id: string },
  Promise<Avocado | null>
> = (parent, args, context) =>
  context.orm.avocado.findUnique({
    where: { id: parseInt(args.id) },
    include: { attributes: true },
  })

export const resolver: Record<
  keyof (Avocado & { attributes: Attributes }),
  GraphQLFieldResolver<
    Avocado & { attributes: Attributes },
    ResolverContext,
    any,
    unknown
  >
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,

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

export const create: GraphQLFieldResolver<
  unknown,
  ResolverContext,
  {
    data: Pick<Avocado, 'name' | 'price' | 'image'> &
      Omit<Attributes, 'avocadoId'>
  },
  Promise<Avocado>
> = (parent, { data: { name, price, image, ...attributes } }, context) =>
  context.orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku: createHash('sha256').update(name, 'utf8').digest('base64').slice(-6),
      attributes: { create: attributes },
    },
  })
