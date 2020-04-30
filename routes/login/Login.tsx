import { TextInput, Button, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { REGISTER_USER, SET_TOKEN } from 'graphql-schema/users';
import { User } from 'models/users';
import { useMutation } from '@apollo/client';
import { Config } from 'utils/expo/config.util';
import { UserContext, UserContextType, useUsername } from 'stores/users';
import { getToken } from 'utils/expo/expo.util';

export const Login = () => {

  let username: string = null;
  const [disabled, setDisabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');

  const [user$, username$] = useUsername();

  const fetchUser = (name: string) => {
    username = name;
    username$.next(name);
  }

  const userSubscription$ = user$.subscribe((user: User) => {
    user.username ? setDisabled(true): setDisabled(false);
  });

  useEffect(() => {
    return () => {
      userSubscription$.unsubscribe();
    }
  });

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

  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Full Name'} defaultValue={fullName} onChangeText={setFullName}></TextInput>
            <TextInput placeholder={'Username'} defaultValue={username} onChangeText={fetchUser}></TextInput>
            <TextInput placeholder={'Phone Number'} defaultValue={phoneNumber} onChangeText={setPhoneNumber}></TextInput>
            <Button title='Submit' disabled={!fullName || !phoneNumber || disabled} onPress={() => registerAndNavigate({ login })}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  );
}
