import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import { Tab, Tabs, Button, Text } from 'native-base'

import { Settings } from '../../routes/settings/Settings'
import { sendPushNotification } from '../../utils/expo/expo.util'
import { User } from '../../models'
import { useRxState } from '../../utils/hooks/useRxState'
import { useFetchUser } from '../../stores/users/Users.service'

export const Home = (): JSX.Element => {


  const [, setUsername$, username$] = useRxState<string>()

  const [message, setMessage] = useState('')
  const [expoToken, setExpoToken] = useState('')
  const [disabled, setDisabled] = useState(true)

  const user$ = useFetchUser(username$)

  useEffect(() => {

    const subscription = user$.subscribe(({ data: { user } }: { data: { user: User } }) => {
      if (user && user.expoToken) {
        setExpoToken(user.expoToken)
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }
    })
    return () => {
      username$.complete()
      subscription && subscription.unsubscribe()
    }
  }, [username$])


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
        <TextInput placeholder="username" onChangeText={setUsername$}></TextInput>
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