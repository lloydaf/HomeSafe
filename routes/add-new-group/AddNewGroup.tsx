import React, {useState} from 'react';
import { Button, Text } from 'native-base';
import {TextInput} from 'react-native';
import {GroupItem} from 'components/group-item/GroupItem'
import { GroupContext, GroupContextType } from 'stores/groups/Groups.store';

export const AddNewGroup = ({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const saveAndNavigate = (groupName, callback) => {
    callback({name: groupName});
    navigation.navigate("Home")
  }
  return (
    <GroupContext.Consumer>
      {
        ({createNewGroup}: GroupContextType) => (
        <>
        
          <TextInput placeholder={"Group Name"} defaultValue={groupName} onChangeText={setGroupName}></TextInput>
          <Button disabled={!groupName} onPress={() => saveAndNavigate(groupName, createNewGroup)}>
            <Text>Submit</Text>
          </Button>
        </>
        )
      }
    </GroupContext.Consumer>
      
  )
}