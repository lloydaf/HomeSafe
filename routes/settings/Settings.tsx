import React, { useContext, useMemo } from 'react'
import { List, ListItem, Text } from 'native-base'
import { AsyncStorage } from 'react-native'

import { Config } from '../../utils/config/config.util'
import { UserContext } from '../../stores/modules/users'


export const Settings = (): JSX.Element => {
  const { logout } = useContext(UserContext)
  const signOut = useMemo(() => async () => {
    await AsyncStorage.removeItem(Config.UserName)
    logout()
  }, [logout])
  return (
    <List>
      <ListItem onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </ListItem>
    </List>
  )
}