import { DocumentNode } from "graphql";

export type GraphQLMutation = {
  mutation: DocumentNode;
  variables: Function;
}

export type GraphQLQuery = {
  query: DocumentNode;
  variables: Function;
}

// Only for testing
export function isGraphQLMutation(obj: any): obj is GraphQLMutation {
  return (obj.variables !== undefined && (obj.query !== undefined || obj.mutation !== undefined));
}

export function isGraphQLQuery(obj: any): obj is GraphQLQuery {
  return (obj.variables !== undefined && (obj.query !== undefined || obj.mutation !== undefined));
}