import { DocumentNode } from "graphql";

type GraphQLMutation = {
  mutation: DocumentNode;
  variables: Function
}

type GraphQLQuery = {
  query: DocumentNode;
  variables: Function;
}

export type GraphQLWrapper = GraphQLMutation | GraphQLQuery;

// Only for testing
export function isGraphQLWrapper(obj: any): obj is GraphQLWrapper {
  return (obj.variables !== undefined && (obj.query !== undefined || obj.mutation !== undefined));
}