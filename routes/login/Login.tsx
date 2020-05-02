import { TextInput, Button, AsyncStorage } from 'react-native';
import React, { useState } from 'react';
import { LOGIN_USER, SET_TOKEN } from 'graphql-schema/users';
import { useMutation } from '@apollo/client';
import { Config } from 'utils/expo/config.util';
import { UserContext, UserContextType } from 'stores/users';
import { getToken } from 'utils/expo/expo.util';

export const Login = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [tryLogin] = useMutation(LOGIN_USER.mutation);
  const [action] = useMutation(SET_TOKEN.mutation);


  const loginUser = async ({ login }: UserContextType) => {
    try {
      const { data: loginData } = await tryLogin({
        variables: LOGIN_USER.variables({ username, password })
      });
      if (!loginData.login) throw new Error('Invalid username/password combination');
      const expoToken = await getToken();
      const { data: tokenData } = await action({
        variables: SET_TOKEN.variables({ username, expoToken })
      });
      await AsyncStorage.setItem(Config.UserName, username);
      login();
    } catch (error) {
      console.log('error logging user in', error);
    }
  }

  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <>
            <TextInput placeholder={'Username'} defaultValue={username} onChangeText={setUsername}></TextInput>
            <TextInput secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
            <Button title='Login' disabled={!username || !password} onPress={() => loginUser({ login })}></Button>
            <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}></Button>
          </>
        )
      }
    </UserContext.Consumer>
  );
}
