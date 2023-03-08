/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment Avocado on Avocado {\n  id\n  image\n  name\n  createdAt\n  sku\n  price\n  attributes {\n    description\n    taste\n    shape\n    hardiness\n  }\n}\n\nquery GetAllAvocados {\n  avos {\n    ...Avocado\n  }\n}\n\nquery GetAvocado($avoId: ID!) {\n  avo(id: $avoId) {\n    ...Avocado\n  }\n}\n\nmutation AddAvocado($data: AvoCreateInput!) {\n  createAvo(data: $data) {\n    ...Avocado\n  }\n}": types.AvocadoFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Avocado on Avocado {\n  id\n  image\n  name\n  createdAt\n  sku\n  price\n  attributes {\n    description\n    taste\n    shape\n    hardiness\n  }\n}\n\nquery GetAllAvocados {\n  avos {\n    ...Avocado\n  }\n}\n\nquery GetAvocado($avoId: ID!) {\n  avo(id: $avoId) {\n    ...Avocado\n  }\n}\n\nmutation AddAvocado($data: AvoCreateInput!) {\n  createAvo(data: $data) {\n    ...Avocado\n  }\n}"): (typeof documents)["fragment Avocado on Avocado {\n  id\n  image\n  name\n  createdAt\n  sku\n  price\n  attributes {\n    description\n    taste\n    shape\n    hardiness\n  }\n}\n\nquery GetAllAvocados {\n  avos {\n    ...Avocado\n  }\n}\n\nquery GetAvocado($avoId: ID!) {\n  avo(id: $avoId) {\n    ...Avocado\n  }\n}\n\nmutation AddAvocado($data: AvoCreateInput!) {\n  createAvo(data: $data) {\n    ...Avocado\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;