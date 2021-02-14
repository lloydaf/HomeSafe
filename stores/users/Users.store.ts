import React from 'react'

export const UserContext = React.createContext({})

export interface UserContextType {
  login?: ({username}: {username: string}) => void;
  logout?: () => void;
}
