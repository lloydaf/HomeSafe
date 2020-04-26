import { Text } from 'react-native'
import { Tab, Tabs } from 'native-base';
import React from 'react';
import { Settings } from '../settings/Settings';

export const Home = (props) => {
  return (
    <Tabs>
      <Tab heading="Home">
        <Text>You're home!</Text>
      </Tab>
      <Tab heading="Settings">
        <Settings />
      </Tab>
    </Tabs>
  )
}