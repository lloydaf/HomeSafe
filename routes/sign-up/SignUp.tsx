import React, { useState, useEffect, useMemo } from 'react'
import { TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { from, Subject } from 'rxjs'
import { mergeMap, switchMap, withLatestFrom } from 'rxjs/operators'

import { getToken } from '../../utils/expo/expo.util'
import { useRxState } from '../../utils/hooks/useRxState'
import { REGISTER_USER, SET_TOKEN } from '../../graphql/users'

import { useFetchUser } from '../../stores/users/Users.service'
import { useMutation$ } from '../../wrappers'


export const SignUp = (): JSX.Element => {

  const [username, setUsername$, username$] = useRxState<string>()

  const register$ = useMemo(() => new Subject<{ username: string, fullName: string, phoneNumber: string, password: string }>(), [])

  const [disabled, setDisabled] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const user$ = useFetchUser(username$)
  const setToken$ = useMutation$(SET_TOKEN.mutation)

  const registerUser$ = useMutation$(REGISTER_USER.mutation)

  useEffect(() => {
    const subscription$ = register$.pipe(
      mergeMap(({ username, fullName, phoneNumber, password }) => registerUser$(REGISTER_USER.variables({ username, fullName, phoneNumber, password }))),
      switchMap(() => from(getToken())),
      withLatestFrom(register$),
      switchMap(([expoToken, { username }]) => setToken$(SET_TOKEN.variables({ username, expoToken })))
    ).subscribe(() => navigation.navigate('Login'), (err) => console.error('Error while signing up', err))
    return () => subscription$.unsubscribe()
  }, [register$])

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

  return (
    <>
      <TextInput placeholder={'Username'} value={username} onChangeText={setUsername$}></TextInput>
      <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
      <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
      <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
      <Button title='Submit' disabled={!fullName || !phoneNumber || disabled} onPress={() => register$.next({ username, fullName, phoneNumber, password })}></Button>
      <Button title='Login' onPress={() => navigation.navigate('Login')}></Button>
    </>
  )
}