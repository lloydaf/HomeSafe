import * as exported from './index';
import { isGraphQLWrapper } from '../GraphQLWrapper.type';

describe('index should export both queries and mutations', () => {
  describe('exported queries', () => {
    it('should export GET_USER', () => {
      const GET_USER = exported.GET_USER;
      expect(GET_USER).toBeDefined();
      expect(isGraphQLWrapper(GET_USER)).toBeTruthy();
    })
  });

  describe('exported mutations', () => {
    it('should export REGISTER_USER', () => {
      const REGISTER_USER = exported.REGISTER_USER;
      expect(REGISTER_USER).toBeDefined();
      expect(isGraphQLWrapper(REGISTER_USER)).toBeTruthy();
    })
    it('should export LOGIN_USER', () => {
      const LOGIN_USER = exported.LOGIN_USER;
      expect(LOGIN_USER).toBeDefined();
      expect(isGraphQLWrapper(LOGIN_USER)).toBeTruthy();
    })
    it('should export SET_TOKEN', () => {
      const SET_TOKEN = exported.SET_TOKEN;
      expect(SET_TOKEN).toBeDefined();
      expect(isGraphQLWrapper(SET_TOKEN)).toBeTruthy();
    })
  })
})