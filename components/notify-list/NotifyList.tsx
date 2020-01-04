import React from 'react';
import { FlatList, Button, StyleSheet, View } from 'react-native';
import { ListItem } from '../list-item/ListItem';

export const NotifyList = (props) => (
  <FlatList
    data={props.data}
    renderItem={({ item }: any) =>
      <View style={styles.container}>
        <ListItem item={item}></ListItem>
        <Button title={'Press me'} onPress={null}></Button>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})