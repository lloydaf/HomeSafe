import React, { useState, useEffect, useMemo } from 'react'
import { TextInput, Button, AsyncStorage } from 'react-native'
import { useMutation } from '@apollo/client'

import { getToken } from '../../utils/expo/expo.util'
import { useRxState } from '../../utils/hooks/useRxState'
import { useLazyQuery$ } from '../../wrappers'
import { User } from '../../models'
import { UserContext, UserContextType } from '../../stores/users'
import { GET_USER, REGISTER_USER, SET_TOKEN } from '../../graphql/users'

import { BehaviorSubject, from, Subject, Subscription } from 'rxjs'
import { useFetchUser } from '../../stores/users/Users.service'


export const SignUp = ({ navigation }) => {

  const username$ = useMemo(() => new Subject<string>(), [])

  const username = useRxState(username$)



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
            <TextInput placeholder={'Username'} value={username} onChangeText={(val) => username$.next(val)}></TextInput>
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