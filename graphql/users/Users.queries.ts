import { gql } from '@apollo/client'
import { GraphQLQuery } from '../../graphql/GraphQLWrapper.type'

export const GET_USER: GraphQLQuery = {
  query: gql`
    query getUser($username: String!){
      user(username: $username) {
        username
        expoToken
      }
    }`,
  variables: (username: string) => {
    console.log('variables', username)
    return ({ username })
  }
}