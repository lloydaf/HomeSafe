import React from 'react';
import {Text, Button, List, Fab } from 'native-base';
import {GroupItem} from 'components/group-item/GroupItem'
import {GroupContextType, GroupContext} from 'stores/groups/Groups.store'

export const Main = ({navigation}) => {
  
  return (
    <GroupContext.Consumer>
      {
        ({groups}: GroupContextType) => (
          <>
            {/** my list goes below! */}
            <List>
            {
              groups.map((item, index) => (<GroupItem item={item} key={index} indexValue={index}></GroupItem>))
            }
            </List>

            <Fab style={{borderRadius: 50, height: 50, width: 50, backgroundColor: "red"}} onPress={() => navigation.navigate("AddNewGroup")}>
                <Text style={{fontSize: 24, alignContent: "center" }}>+</Text>
            </Fab>
          </>
        )
    }
    </GroupContext.Consumer>
  )
}