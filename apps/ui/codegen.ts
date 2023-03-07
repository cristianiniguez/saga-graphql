import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  documents: './gql/queries.graphql',
  generates: {
    'gql/generated/': {
      preset: 'client',
    },
  },
}

export default config
