import { useApolloClient, OperationVariables, DocumentNode } from '@apollo/client';
import React from 'react';

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