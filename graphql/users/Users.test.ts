import * as exported from './index'
import { GraphQLMutation, GraphQLQuery } from '../../graphql/GraphQLWrapper.type'

describe('Tests for Users: Queries and Mutations', () => {
  describe('exported queries', () => {
    it('should export GET_USER', () => {
      const GET_USER = exported.GET_USER
      expect(GET_USER).toBeTruthy()
      expect(isGraphQLQuery(GET_USER)).toBeTruthy()
    })
  })

  describe('exported mutations', () => {
    it('should export REGISTER_USER', () => {
      const REGISTER_USER = exported.REGISTER_USER
      expect(REGISTER_USER).toBeTruthy()
      expect(isGraphQLMutation(REGISTER_USER)).toBeTruthy()
    })
    it('should export LOGIN_USER', () => {
      const LOGIN_USER = exported.LOGIN_USER
      expect(LOGIN_USER).toBeTruthy()
      expect(isGraphQLMutation(LOGIN_USER)).toBeTruthy()
    })
    it('should export SET_TOKEN', () => {
      const SET_TOKEN = exported.SET_TOKEN
      expect(SET_TOKEN).toBeTruthy()
      expect(isGraphQLMutation(SET_TOKEN)).toBeTruthy()
    })
  })
})


// Only for testing
function isGraphQLMutation(obj: any): obj is GraphQLMutation {
  return (obj.variables !== undefined && (obj.query !== undefined || obj.mutation !== undefined))
}

function isGraphQLQuery(obj: any): obj is GraphQLQuery {
  return (obj.variables !== undefined && (obj.query !== undefined || obj.mutation !== undefined))
}