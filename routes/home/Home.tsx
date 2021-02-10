import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import { Tab, Tabs, Button, Text } from 'native-base'

import { Settings } from '../../routes/settings/Settings'
import { sendPushNotification } from '../../utils/expo/expo.util'
import { useUsername } from '../../stores/users'
import { User } from '../../models'

export const Home = () => {

  const [message, setMessage] = useState('')
  const [expoToken, setExpoToken] = useState('')
  const [disabled, setDisabled] = useState(true)
  const {
    subscribeTo$: user$,
    emitFrom$: username$
  } = useUsername()

  const fetchUser = (username: string) => {
    username$.next(username)
  }

  const subscription = user$.subscribe((user: User) => {
    if (user && user.expoToken) {
      setExpoToken(user.expoToken)
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  })
  useEffect(() => {
    return () => {
      subscription && subscription.unsubscribe()
    }
  })


  const sendMessage = async ({ expoToken, body }) => {
    console.log(expoToken, body)
    await sendPushNotification({
      expoToken,
      body,
      title: 'Message!'
    })
  }

  return (
    <Tabs>
      <Tab heading="Home">
        <TextInput placeholder="username" onChangeText={fetchUser}></TextInput>
        <TextInput placeholder="message" defaultValue={message} onChangeText={setMessage}></TextInput>
        <Button disabled={disabled || !message} onPress={() => sendMessage({ expoToken, body: message })}>
          <Text>Send Me!</Text>
        </Button>
      </Tab>
      <Tab heading="Settings">
        <Settings />
      </Tab>
    </Tabs>
  )
}