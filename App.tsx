import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NotifyList } from './components/notify-list/NotifyList';

export default function App() {
  return (
    <View style={styles.container}>
      <NotifyList data={[
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'Joel' },
        { key: 'John' },
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },
      ]}></NotifyList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
