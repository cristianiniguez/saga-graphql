import EasyGraphQLTester from 'easygraphql-tester'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { Avocado, PrismaClient, User } from '@prisma/client'
import gql from 'graphql-tag'
import { readFileSync } from 'fs'
import path from 'path'
import resolvers from '../resolvers'

const schema = readFileSync(path.join(__dirname, './schema.graphql'), 'utf8')
const tester = new EasyGraphQLTester(schema, resolvers)

export type MockResolverContext = {
  orm: DeepMockProxy<PrismaClient>
  user: User | undefined
}

export const createMockContext = () => ({
  orm: mockDeep<PrismaClient>(),
  user: undefined,
})

let mockContext: MockResolverContext
let context: ResolverContext

beforeEach(() => {
  mockContext = createMockContext()
  context = mockContext
})

const mockAvocadoDB: Avocado[] = [
  {
    id: 1,
    image: '/images/reed.jpg',
    name: 'Reed Avocado',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    sku: 'ZDIRg=',
    price: 1.18,
  },
]

test('should return a list of avos', async () => {
  mockContext.orm.avocado.findMany.mockResolvedValue(mockAvocadoDB)

  const query = gql`
    {
      avos {
        id
        name
        price
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)

  expect(result.data).toEqual({
    avos: [{ id: '1', name: 'Reed Avocado', price: 1.18 }],
  })

  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledWith({
    include: { attributes: true },
    where: undefined,
    skip: undefined,
    take: undefined,
  })

  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledTimes(1)
})
