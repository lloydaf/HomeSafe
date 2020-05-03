import { useApolloClient, OperationVariables, DocumentNode } from '@apollo/client';
import React from 'react';

/**
 * @description This function is used to lazily query a GraphQL API
 * @param query GraphQL Query Object
 */
export function useLazyQueryAsync<TData = any, TVariables = OperationVariables>(query: DocumentNode) {
  const client = useApolloClient();
  return React.useCallback(
    (variables: TVariables) =>
      client.query<TData, TVariables>({
        query: query,
        variables: variables,
      }),
    [client]
  );
}