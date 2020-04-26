import React from 'react';
import { List, ListItem, Text } from 'native-base';
import { AsyncStorage } from 'react-native';
import { Config } from '../../utils/expo/config.util';
import { UserContext, UserContextType } from '../../stores/users';

const signOut = async (callback: Function) => {
  await AsyncStorage.removeItem(Config.UserName);
  callback();
}
export const Settings = () => {
  return (
    <UserContext.Consumer>
      {
        ({ logout }: UserContextType) => (
          <List>
            <ListItem onPress={() => signOut(logout)}>
              <Text>Sign Out</Text>
            </ListItem>
          </List>
        )
      }
    </UserContext.Consumer>
  )
}