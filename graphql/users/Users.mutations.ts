import { gql } from '@apollo/client';
import { User } from 'models';

type UserRegistration = {
  username: string;
  phoneNumber: string;
  fullName: string;
  password: string;
}

export const REGISTER_USER = {
  mutation: gql`
    mutation registerUser($user: UserRegistration!) {
      registerUser(user: $user) {
        username
      }
    }
  `,
  variables: ({ username, phoneNumber, fullName, password }: User): { user: UserRegistration } => ({ user: { username, phoneNumber, fullName, password } })
}

export const LOGIN_USER = {
  mutation: gql`
    mutation login($input: UserLogin!){
      login(input: $input){
        fullName
        expoToken
      }
    }
  `,
  variables: ({ username, password }) => ({ input: { username, password } })
}

export const SET_TOKEN = {
  mutation: gql`
    mutation setToken($input: TokenRegistration!) {
      setToken(input: $input){
        fullName
        expoToken
      }
    }
  `,
  variables: ({ username, expoToken }) => ({ input: { username, expoToken } })
}