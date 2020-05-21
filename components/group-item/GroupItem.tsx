import React from 'react';
import {Text, ListItem } from 'native-base';
import {GroupContext, GroupContextType} from 'stores/groups/Groups.store'
export const GroupItem = (params) => {
  
  return (
    <GroupContext.Consumer>
      {({deleteGroupName}: GroupContextType) => (
      <ListItem onLongPress={() => deleteGroupName(params?.item?.name)} style={{padding: 10}}>
        <Text>
        {params?.item?.name}
        </Text>
      </ListItem>
      )}
    </GroupContext.Consumer>
   )
}
