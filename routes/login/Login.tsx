import { TextInput, Button, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { GET_USER, REGISTER_USER, SET_TOKEN } from 'graphql-schema/users';
import { User } from 'models/users';
import { useLazyQueryAsync } from 'wrappers';
import { useMutation } from '@apollo/client';
import { Config } from 'utils/expo/config.util';
import { UserContext, UserContextType } from 'stores/users';
import { getToken } from 'utils/expo/expo.util';

const username$: Subject<string> = new Subject();

export const Login = () => {

  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [disabled, setDisabled] = useState(false);

  const fetchUser = (username: string) => {
    username$.next(username);
  }

  const [action, { data: tokenData }] = useMutation(SET_TOKEN.mutation);

  const [registerUser, { data: registrationData, error }] = useMutation(REGISTER_USER.mutation);

  const registerAndNavigate = async ({ login }: UserContextType) => {
    try {
      await Promise.all([
        registerUser({
          variables: REGISTER_USER.variables({ username, fullName, phoneNumber })
        }),
        AsyncStorage.setItem(Config.UserName, username),
      ]);
      const expoToken = await getToken();
      await action({
        variables: SET_TOKEN.variables({ username, expoToken })
      });
      login();
    } catch (error) {
      console.log('error', error);
    }
  }

  const getUser = useLazyQueryAsync(GET_USER.query);

  const subscription = username$.observers && !username$.observers.length && username$.pipe(
    debounceTime(1000),
    tap(setUsername),
    filter(Boolean)
  ).subscribe(async (username: string) => {
    try {
      const { data, errors } = await getUser(GET_USER.variables(username));
      if (errors) throw new Error(errors.map(err => err.message).join(','));
      if (data) {
        const { user }: { user: User } = data;
        user.username ? setDisabled(true) : setDisabled(false);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  }) || null;

  useEffect(() => {
    return () => {
      console.log('going to unsubscribe');
      subscription.unsubscribe();
    }
  }, []);


  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
            <TextInput placeholder={'Username'} defaultValue={username} onChangeText={fetchUser}></TextInput>
            <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
            <Button title='Submit' disabled={!username || !fullName || !phoneNumber || disabled} onPress={() => registerAndNavigate({ login })}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  );
}
