import { DocumentNode } from "graphql";

export type GraphQLMutation = {
  mutation: DocumentNode;
  variables: Function;
}

export type GraphQLQuery = {
  query: DocumentNode;
  variables: Function;
}