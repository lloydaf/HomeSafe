/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

export const UserContext = React.createContext<UserContextType>({
  login: () => { },
  logout: () => { }
})

export interface UserContextType {
  login: ({ username }: { username: string }) => void;
  logout: () => void;
}
