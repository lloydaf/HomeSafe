import renderer, { ReactTestRenderer, act} from 'react-test-renderer';
import {AddNewGroup} from './AddNewGroup';
import React from 'react';
import {GroupContext, GroupContextType} from 'stores/groups/Groups.store';

describe('tests for Adod New Group Component', () => {
  let component: ReactTestRenderer;
  beforeEach(() => {
    let mockGroupContext: GroupContextType = {
      createNewGroup: () => {},
      deleteGroupName: () => {},
      groups: []
    }
    let mockNavigation = {
      navigate: () => {}
    }

    component = renderer.create(
      <GroupContext.Provider value= {mockGroupContext}>
        <AddNewGroup navigation={mockNavigation}/>
      </GroupContext.Provider>
    )
  })
    it('renders without error', () => {
        expect(component).toBeTruthy();
      });
})