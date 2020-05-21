import renderer, { ReactTestRenderer, act} from 'react-test-renderer';
import {GroupItem} from './GroupItem';
import React from 'react';
import {GroupContext, GroupContextType} from 'stores/groups/Groups.store';

describe('tests for Group Item Component', () => {
  let component: ReactTestRenderer;
  beforeEach(() => {
    let mockGroupContext: GroupContextType = {
      createNewGroup: () => {},
      deleteGroupName: () => {},
      groups: []
    }
    let item: {
      name: string
    };
    let index: number;
    component = renderer.create(
      <GroupContext.Provider value= {mockGroupContext}>
        <GroupItem item={item} key={index} />
      </GroupContext.Provider>
    )
  })
    it('renders without error', () => {
        expect(component).toBeTruthy();
      });
})