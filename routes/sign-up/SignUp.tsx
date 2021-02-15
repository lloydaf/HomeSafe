import React, { useState, useEffect } from 'react'
import { TextInput, Button, AsyncStorage } from 'react-native'
import { useMutation } from '@apollo/client'

import { getToken } from '../../utils/expo/expo.util'
import { useRxState } from '../../utils/hooks/useRxState'
import { UserContext, UserContextType } from '../../stores/users'
import { REGISTER_USER, SET_TOKEN } from '../../graphql/users'

import { useFetchUser } from '../../stores/users/Users.service'


export const SignUp = ({ navigation }) => {


  const [username, username$, setUsername$] = useRxState<string>()

  const [disabled, setDisabled] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const user$ = useFetchUser(username$)

  useEffect(() => {
    const subscription$ = user$.subscribe((
      { data: { user } }
    ) => {
      setDisabled(!!user)
    })
    return () => {
      username$.complete()
      subscription$.unsubscribe()
    }
  }, [username$])


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
            <TextInput placeholder={'Username'} value={username} onChangeText={setUsername$}></TextInput>
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