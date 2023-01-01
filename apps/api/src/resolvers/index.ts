import { ApolloServerExpressConfig } from 'apollo-server-express'
import * as avo from './avocado.resolver'
import * as scalars from './scalars'

const resolvers: ApolloServerExpressConfig['resolvers'] = {
  ...scalars,
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Mutation: {
    createAvo: avo.create,
  },
  Avocado: avo.resolver,
}

export default resolvers
