import { gql } from '@apollo/client';
import { User } from 'models';
import { GraphQLMutation } from 'graphql-schema/GraphQLWrapper.type';

type UserRegistration = {
  username: string;
  phoneNumber: string;
  fullName: string;
  password: string;
}

export const REGISTER_USER: GraphQLMutation = {
  mutation: gql`
    mutation registerUser($user: UserRegistration!) {
      registerUser(user: $user) {
        username
      }
    }
  `,
  variables: ({ username, phoneNumber, fullName, password }: User): { user: UserRegistration } => ({ user: { username, phoneNumber, fullName, password } })
}

export const LOGIN_USER: GraphQLMutation = {
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

export const SET_TOKEN: GraphQLMutation = {
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

// to be moved to /notifications/Notifications.murations.ts
// export const SEND_NOTIFICATION: GraphQLMutation = {
//   mutation: gql`
//   mutation sendNotification($input: [Notification]!) {
//     sendNotification(input: $input){
//      message
//     }
//   }
// `,
// variables: ([Notification]) => ({ input: [Notification] })
// }