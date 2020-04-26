import { gql } from '@apollo/client';

export const GET_USER = {
  query: gql`
    query getUser($username: String!){
      user(username: $username) {
        username
      }
    }`,
  variables: (username: string) => ({ username })
};