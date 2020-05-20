import React from 'react';
import { Button, Text, List } from 'native-base';
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
              groups.map((item, index) => (<GroupItem item={item} key={index}></GroupItem>))
            }
            </List>

            <Button style={{borderRadius: 50, height: 40, width: 40, backgroundColor: "red"}} onPress={() => navigation.navigate("AddNewGroup")}>
                <Text style={{fontSize: 14, alignContent: "center" }}>+</Text>
            </Button>
          </>
        )
    }
    </GroupContext.Consumer>
  )
}