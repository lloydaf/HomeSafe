import { gql } from "@apollo/client";
import { User } from "../../models/users";

type UserRegistration = {
  username: string;
  phoneNumber: string;
  fullName: string;
}

export const REGISTER_USER = {
  mutation: gql`
    mutation registerUser($user: UserRegistration!) {
      registerUser(user: $user) {
        username
      }
    }
  `,
  variables: ({ username, phoneNumber, fullName }: User): { user: UserRegistration } => ({ user: { username, phoneNumber, fullName } })
}