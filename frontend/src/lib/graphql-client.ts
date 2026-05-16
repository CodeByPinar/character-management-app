import { GraphQLClient } from 'graphql-request';

export const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql';

export const graphqlWsEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || graphqlEndpoint.replace(/^http/, 'ws');

export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});
