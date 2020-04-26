import React from 'react';

export const UserContext = React.createContext({});

export interface UserContextType {
  login: () => void;
  logout: () => void;
}