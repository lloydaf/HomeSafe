import { DocumentNode } from 'graphql'

export type GraphQLMutation = {
  mutation: DocumentNode;
  variables: any;
}

export type GraphQLQuery = {
  query: DocumentNode;
  variables: any;
}