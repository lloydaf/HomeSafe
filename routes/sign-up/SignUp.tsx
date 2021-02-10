import { TextInput, Button, AsyncStorage } from 'react-native'
import React, { useState, useEffect } from 'react'
import { REGISTER_USER, SET_TOKEN } from 'graphql-schema/users'
import { User, ReactiveStore } from 'models'
import { useMutation } from '@apollo/client'
import { Config } from 'utils/config/config.util'
import { UserContext, UserContextType, useUsername } from 'stores/users'
import { getToken } from 'utils/expo/expo.util'
let username: string = null
export const SignUp = ({ navigation }) => {

  const [disabled, setDisabled] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const {
    subscribeTo$: user$,
    emitFrom$: username$
  }: ReactiveStore<User, string> = useUsername()

  const fetchUser = (name: string) => {
    username = name
    username$.next(name)
  }

  const userSubscription$ = user$.subscribe((user: User) => {
    console.log('User is', user)
    user && user.username ? setDisabled(true) : setDisabled(false)
  })

  useEffect(() => {
    return () => {
      userSubscription$.unsubscribe()
    }
  })

  const [setToken] = useMutation(SET_TOKEN.mutation)

  const [registerUser] = useMutation(REGISTER_USER.mutation)

  const registerAndNavigate = async ({ login }: UserContextType) => {
    try {
      const { data: registrationData } = await registerUser({
        variables: REGISTER_USER.variables({ username, fullName, phoneNumber, password })
      })
      const expoToken = await getToken()
      const { data: tokenData } = await setToken({
        variables: SET_TOKEN.variables({ username, expoToken })
      })
      login({ username })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Username'} defaultValue={username} onChangeText={fetchUser}></TextInput>
            <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
            <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
            <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
            <Button title='Submit' disabled={!fullName || !phoneNumber || disabled} onPress={() => registerAndNavigate({ login })}></Button>
            <Button title='Login' onPress={() => navigation.navigate('Login')}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  )
}