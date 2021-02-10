import React, { useState, useEffect } from 'react'
import { TextInput, Button, AsyncStorage } from 'react-native'
import { debounceTime, filter } from 'rxjs/operators'
import { useMutation } from '@apollo/client'

import { getToken } from '../../utils/expo/expo.util'
import { useRxState } from '../../utils/hooks/useRxState'
import { useLazyQueryAsync } from '../../wrappers'
import { User } from '../../models'
import { UserContext, UserContextType } from '../../stores/users'
import { GET_USER, REGISTER_USER, SET_TOKEN } from '../../graphql/users'

export const SignUp = ({ navigation }) => {

  const [username$, setUsername] = useRxState('')
  const [disabled, setDisabled] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')


  const [setToken] = useMutation(SET_TOKEN.mutation)

  const [registerUser] = useMutation(REGISTER_USER.mutation)


  // const registerAndNavigate = async ({ login }: UserContextType) => {
  //   try {
  //     const { data: registrationData } = await registerUser({
  //       variables: REGISTER_USER.variables({ username, fullName, phoneNumber, password })
  //     })
  //     const expoToken = await getToken()
  //     const { data: tokenData } = await setToken({
  //       variables: SET_TOKEN.variables({ username, expoToken })
  //     })
  //     login({ username })
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  const getUser = useLazyQueryAsync(GET_USER.query)

  const subscription = username$.pipe(
    debounceTime(1000),
    filter(Boolean)
  ).subscribe(async (username: string) => {
    console.log('username', username)
    try {
      const { data, errors } = await getUser(GET_USER.variables(username))
      if (errors) throw new Error(errors.map(err => err.message).join(','))
      if (data) {
        const { user }: { user: User } = data
        console.log('user', user)
        user && setDisabled(true)
      }
    } catch (error) {
      console.log('error in useUsername', error.message)
    }
  }) || null

  useEffect(() => {
    return () => {
      subscription && subscription.unsubscribe()
    }
  })


  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Username'} defaultValue='' onChangeText={setUsername}></TextInput>
            <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
            <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
            <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
            <Button title='Submit' disabled={!fullName || !phoneNumber || disabled} onPress={() => null}></Button>
            <Button title='Login' onPress={() => navigation.navigate('Login')}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  )
}