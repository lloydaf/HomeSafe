import { TextInput } from 'react-native'
import { Tab, Tabs, Button, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Settings } from 'routes/settings/Settings';
import { sendPushNotification } from 'utils/expo/expo.util';
import { Subject } from 'rxjs';
import { debounceTime, tap, filter } from 'rxjs/operators';
import { useLazyQueryAsync } from 'wrappers';
import { GET_USER } from 'graphql-schema/users';
import { User } from 'models/users';

const username$: Subject<string> = new Subject();



export const Home = (props) => {

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [expoToken, setExpoToken] = useState('');
  const [disabled, setDisabled] = useState(true);

  const fetchUser = (username: string) => {
    username$.next(username);
  }

  const getUser = useLazyQueryAsync(GET_USER.query);

  const subscription = username$.observers && !username$.observers.length && username$.pipe(
    debounceTime(1000),
    tap(setUsername),
    filter(Boolean)
  ).subscribe(async (username: string) => {
    try {
      setDisabled(true);
      console.log('subscribed!', username);
      const { data, errors } = await getUser(GET_USER.variables(username));
      if (errors) throw new Error(errors.map(err => err.message).join(','));
      if (data) {
        const { user }: { user: User } = data;
        if(user.expoToken) {
          setExpoToken(user.expoToken);
          setDisabled(false);
        } 
        // user.username ? setDisabled(true) : setDisabled(false);
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


  const sendMessage = async ({ expoToken, body }) => {
    console.log(expoToken, body);
    await sendPushNotification({
      expoToken,
      body,
      title: 'Message!'
    });
  }

  return (
    <Tabs>
      <Tab heading="Home">
        <TextInput placeholder="username" defaultValue={username} onChangeText={fetchUser}></TextInput>
        <TextInput placeholder="message" defaultValue={message} onChangeText={setMessage}></TextInput>
        <Button disabled={disabled} onPress={() => sendMessage({ expoToken, body: message })}>
          <Text>Send Me!</Text>
        </Button>
      </Tab>
      <Tab heading="Settings">
        <Settings />
      </Tab>
    </Tabs>
  )
}