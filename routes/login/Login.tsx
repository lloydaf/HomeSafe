import { TextInput, Button } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { filter, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { from, Subject } from 'rxjs'
import { useNavigation } from '@react-navigation/native'

import { LOGIN_USER, SET_TOKEN } from '../../graphql/users'
import { UserContext } from '../../stores/modules/users'
import { getToken } from '../../utils/expo/expo.util'
import { useMutation$ } from '../../wrappers'

export const Login = (): JSX.Element => {

  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login: postLogin } = useContext(UserContext)

  const login$ = useMemo(() => new Subject<{ username: string, password: string }>(), [])

  const tryLogin$ = useMutation$(LOGIN_USER.mutation)
  const setToken$ = useMutation$(SET_TOKEN.mutation)

  useEffect(() => {
    const subscription$ = login$.pipe(
      mergeMap(({ username, password }) => tryLogin$(LOGIN_USER.variables({ username, password }))),
      tap(({ data }) => !data.login && console.error('Username and password do not match!')),
      filter(({ data }) => !!data.login),
      switchMap(() => from(getToken())),
      withLatestFrom(login$),
      switchMap(([expoToken, { username }]) => setToken$(SET_TOKEN.variables({ username, expoToken }))),
    ).subscribe(result => {
      result && postLogin({ username: username })
    }, err => {
      console.error('error while logging in', err)
    })
    return () => {
      subscription$.unsubscribe()
    }
  }, [login$])

  return (
    <>
      <TextInput placeholder={'Username'} defaultValue={username} onChangeText={setUsername}></TextInput>
      <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
      <Button title='Login' disabled={!username || !password} onPress={() => login$.next({ username, password })}></Button>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')}></Button>
    </>
  )
}
