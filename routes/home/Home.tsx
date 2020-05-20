import { TextInput } from 'react-native'
import { Tab, Tabs, Button, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Settings } from 'routes/settings/Settings';
import { sendPushNotification } from 'utils/expo/expo.util';
import { useUsername } from 'stores/users';
import { User } from 'models';
import {Main} from 'routes/main/Main'

import { AddNewGroup } from 'routes/add-new-group/AddNewGroup';
export const Home = ({navigation}) => {

  const [message, setMessage] = useState('');
  const [expoToken, setExpoToken] = useState('');
  const [disabled, setDisabled] = useState(true);
  const {
    subscribeTo$: user$,
    emitFrom$: username$
  } = useUsername();

  const fetchUser = (username: string) => {
    username$.next(username);
  }

  const subscription = user$.subscribe((user: User) => {
    if (user && user.expoToken) {
      setExpoToken(user.expoToken);
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  })
  useEffect(() => {
    return () => {
      subscription && subscription.unsubscribe();
    }
  });


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
        <Main navigation={navigation}/>
      </Tab>
      <Tab heading="Settings">
        <Settings />
      </Tab>
    </Tabs>

  )
}