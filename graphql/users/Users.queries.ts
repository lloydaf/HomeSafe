import { gql } from '@apollo/client';
import { GraphQLWrapper } from 'graphql-schema/GraphQLWrapper.type';

export const GET_USER = {
  query: gql`
    query getUser($username: String!){
      user(username: $username) {
        username
        expoToken
      }
    }`,
  variables: (username: string) => ({ username })
};