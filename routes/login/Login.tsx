import { TextInput, Button } from 'react-native';
import { useState } from 'react';
import { LOGIN_USER, SET_TOKEN } from 'graphql-schema/users';
import { useMutation } from '@apollo/client';
import { UserContext, UserContextType } from 'stores/users';
import { getToken } from 'utils/expo/expo.util';
import { Container, View, Content, Card, CardItem, Body } from 'native-base';
import React from 'react';

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
      login({ username });
  

    } catch (error) {
      console.log('error logging user in', error);
    }
  }

  return (
    <UserContext.Consumer>
      {
        ({ login }: UserContextType) => (
          <Container>
        <Content style={{padding: 10}}>
          <Card>
            <CardItem>
              <Body>
            <TextInput style={{padding: 10}} placeholder={'Username'} defaultValue={username} onChangeText={setUsername}></TextInput>
            <TextInput style={{padding: 10}} secureTextEntry placeholder={'Password'} defaultValue={password} onChangeText={setPassword}></TextInput>
          </Body>
          </CardItem>
          </Card>
           <Button title='Login' disabled={!username || !password} onPress={() => loginUser({ login })}></Button>
            <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}></Button>
          </Content>
          </Container>
        )
      }
    </UserContext.Consumer>
  )
}
