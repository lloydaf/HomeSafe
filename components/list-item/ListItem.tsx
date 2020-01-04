import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const ListItem = (props) => (
  <><Text style={styles.item}>{props.item.key}</Text>
    {props.children}
  </>
)

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})