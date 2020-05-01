import { TextInput, Button, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LOGIN_USER, SET_TOKEN } from 'graphql-schema/users';
import { User, ReactiveStore } from 'models';
import { useMutation } from '@apollo/client';
import { Config } from 'utils/expo/config.util';
import { UserContext, UserContextType, useUsername } from 'stores/users';
import { getToken } from 'utils/expo/expo.util';

export const Login = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [tryLogin, { data: registrationData, error }] = useMutation(LOGIN_USER.mutation);
  const [action, { data: tokenData }] = useMutation(SET_TOKEN.mutation);


  const loginUser = async ({ login }: UserContextType) => {
    try {
      const { data } = await tryLogin({
        variables: LOGIN_USER.variables({ username, password })
      });
      if (!data.login) throw new Error('Invalid user!');
      const expoToken = await getToken();
      await action({
        variables: SET_TOKEN.variables({ username, expoToken })
      });
      login();
    } catch (error) {
      console.log('error logging user in', error);
    } finally {
      await AsyncStorage.setItem(Config.UserName, username);
    }
  }

  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Username'} defaultValue={username} onChangeText={setUsername}></TextInput>
            <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
            <Button title='Submit' disabled={!username || !password} onPress={() => loginUser({ login })}></Button>
            <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  );
}
